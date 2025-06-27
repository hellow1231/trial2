import { supabase } from './supabase';
import type { Project, ProjectFormData, ProjectStatus } from '../types/project';

export class ProjectsAPI {
  async getProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_media(*),
          project_stakeholders(*),
          project_updates(*)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getProjects:', error);
      return [];
    }
  }

  async getProject(id: string): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_media(*),
          project_stakeholders(*),
          project_updates(*)
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching project:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getProject:', error);
      return null;
    }
  }

  async createProject(projectData: ProjectFormData): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          title: projectData.title,
          description: projectData.description,
          status: projectData.status,
          start_date: projectData.start_date,
          end_date: projectData.end_date,
          location: projectData.location,
          budget: projectData.budget,
          program_area_id: projectData.program_area_id
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating project:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in createProject:', error);
      return null;
    }
  }

  async updateProject(id: string, projectData: Partial<ProjectFormData>): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating project:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in updateProject:', error);
      return null;
    }
  }

  async deleteProject(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting project:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteProject:', error);
      return false;
    }
  }

  async uploadProjectMedia(projectId: string, file: File): Promise<string | null> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${projectId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('project-media')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        return null;
      }

      const { data } = supabase.storage
        .from('project-media')
        .getPublicUrl(fileName);

      // Save media record to database
      const { error: dbError } = await supabase
        .from('project_media')
        .insert([{
          project_id: projectId,
          file_url: data.publicUrl,
          file_name: file.name,
          file_type: file.type
        }]);

      if (dbError) {
        console.error('Error saving media record:', dbError);
      }

      return data.publicUrl;
    } catch (error) {
      console.error('Error in uploadProjectMedia:', error);
      return null;
    }
  }
}

export const projectsApi = new ProjectsAPI();