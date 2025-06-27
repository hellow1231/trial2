import { useState, useEffect } from 'react';
import { Project, CreateProjectData, UpdateProjectData } from '../types/project';
import { ProjectsAPI } from '../lib/projectsApi';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProjectsAPI.getProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: CreateProjectData) => {
    try {
      const newProject = await ProjectsAPI.createProject(projectData);
      setProjects(prev => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
      throw err;
    }
  };

  const updateProject = async (projectData: UpdateProjectData) => {
    try {
      const updatedProject = await ProjectsAPI.updateProject(projectData);
      setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
      return updatedProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project');
      throw err;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await ProjectsAPI.deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
      throw err;
    }
  };

  const searchProjects = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProjectsAPI.searchProjects(query);
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search projects');
    } finally {
      setLoading(false);
    }
  };

  const filterByStatus = async (status: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProjectsAPI.getProjectsByStatus(status);
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to filter projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    searchProjects,
    filterByStatus
  };
}

export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProjectsAPI.getProject(id);
      setProject(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch project');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  return {
    project,
    loading,
    error,
    refetch: fetchProject
  };
}