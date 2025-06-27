import { supabase } from './supabase';
import { Project, CreateProjectData, UpdateProjectData, ProjectMedia, ProjectStakeholder, ProjectUpdate } from '../types/project';

export class ProjectsAPI {
  // Project CRUD operations
  static async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        program_areas (
          id,
          name
        ),
        project_media (*),
        project_stakeholders (*),
        project_updates (*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }

    return data || [];
  }

  static async getProject(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        program_areas (
          id,
          name
        ),
        project_media (*),
        project_stakeholders (*),
        project_updates (*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching project:', error);
      throw error;
    }

    return data;
  }

  static async getProjectsByProgramArea(programAreaId: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        program_areas (
          id,
          name
        ),
        project_media (*),
        project_stakeholders (*),
        project_updates (*)
      `)
      .eq('program_area_id', programAreaId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects by program area:', error);
      throw error;
    }

    return data || [];
  }

  static async createProject(projectData: CreateProjectData): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select(`
        *,
        program_areas (
          id,
          name
        )
      `)
      .single();

    if (error) {
      console.error('Error creating project:', error);
      throw error;
    }

    return data;
  }

  static async updateProject(projectData: UpdateProjectData): Promise<Project> {
    const { id, ...updateData } = projectData;
    
    const { data, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        program_areas (
          id,
          name
        )
      `)
      .single();

    if (error) {
      console.error('Error updating project:', error);
      throw error;
    }

    return data;
  }

  static async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  // Project Media operations
  static async addProjectMedia(projectId: string, mediaData: Omit<ProjectMedia, 'id' | 'project_id' | 'created_at'>): Promise<ProjectMedia> {
    const { data, error } = await supabase
      .from('project_media')
      .insert([{ ...mediaData, project_id: projectId }])
      .select()
      .single();

    if (error) {
      console.error('Error adding project media:', error);
      throw error;
    }

    return data;
  }

  static async deleteProjectMedia(id: string): Promise<void> {
    const { error } = await supabase
      .from('project_media')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project media:', error);
      throw error;
    }
  }

  // Project Stakeholder operations
  static async addProjectStakeholder(projectId: string, stakeholderData: Omit<ProjectStakeholder, 'id' | 'project_id' | 'created_at'>): Promise<ProjectStakeholder> {
    const { data, error } = await supabase
      .from('project_stakeholders')
      .insert([{ ...stakeholderData, project_id: projectId }])
      .select()
      .single();

    if (error) {
      console.error('Error adding project stakeholder:', error);
      throw error;
    }

    return data;
  }

  static async updateProjectStakeholder(id: string, stakeholderData: Partial<Omit<ProjectStakeholder, 'id' | 'project_id' | 'created_at'>>): Promise<ProjectStakeholder> {
    const { data, error } = await supabase
      .from('project_stakeholders')
      .update(stakeholderData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating project stakeholder:', error);
      throw error;
    }

    return data;
  }

  static async deleteProjectStakeholder(id: string): Promise<void> {
    const { error } = await supabase
      .from('project_stakeholders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project stakeholder:', error);
      throw error;
    }
  }

  // Project Update operations
  static async addProjectUpdate(projectId: string, updateData: Omit<ProjectUpdate, 'id' | 'project_id' | 'created_at'>): Promise<ProjectUpdate> {
    const { data, error } = await supabase
      .from('project_updates')
      .insert([{ ...updateData, project_id: projectId }])
      .select()
      .single();

    if (error) {
      console.error('Error adding project update:', error);
      throw error;
    }

    return data;
  }

  static async deleteProjectUpdate(id: string): Promise<void> {
    const { error } = await supabase
      .from('project_updates')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project update:', error);
      throw error;
    }
  }

  // Search and filter operations
  static async searchProjects(query: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        program_areas (
          id,
          name
        ),
        project_media (*),
        project_stakeholders (*),
        project_updates (*)
      `)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching projects:', error);
      throw error;
    }

    return data || [];
  }

  static async getProjectsByStatus(status: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        program_areas (
          id,
          name
        ),
        project_media (*),
        project_stakeholders (*),
        project_updates (*)
      `)
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects by status:', error);
      throw error;
    }

    return data || [];
  }
}