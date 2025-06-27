import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { ProjectOverview } from '../components/projects/ProjectOverview';
import { ProjectForm } from '../components/projects/ProjectForm';
import { Project, CreateProjectData, UpdateProjectData } from '../types/project';

export function ProjectsPage() {
  const { projects, loading, error, createProject, updateProject, searchProjects, filterByStatus } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleCreateProject = async (data: CreateProjectData) => {
    try {
      setFormLoading(true);
      await createProject(data);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateProject = async (data: UpdateProjectData) => {
    try {
      setFormLoading(true);
      await updateProject(data);
      setEditingProject(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating project:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleProjectSelect = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading projects: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Action Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-8 right-8 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 hover:scale-110 z-40"
        title="Create New Project"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <ProjectOverview
        projects={projects}
        onSearch={searchProjects}
        onFilterStatus={filterByStatus}
        onProjectSelect={handleProjectSelect}
      />

      {/* Project Form Modal */}
      {showForm && (
        <ProjectForm
          project={editingProject || undefined}
          onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
          onCancel={handleCloseForm}
          isLoading={formLoading}
        />
      )}
    </div>
  );
}