import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, DollarSign, Users, FileText } from 'lucide-react';
import { useProject } from '../hooks/useProjects';
import { ProjectStatusBadge } from '../components/projects/ProjectStatusBadge';
import { ImageGalleryCarousel } from '../components/ImageGalleryCarousel';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { project, loading, error } = useProject(id!);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Project not found</p>
          <Link 
            to="/projects"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const projectImages = project.project_media?.map(media => ({
    url: media.file_url,
    alt: media.file_name
  })) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              to="/projects"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
            <ProjectStatusBadge status={project.status} size="lg" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Images */}
            {projectImages.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <ImageGalleryCarousel images={projectImages} />
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Project Description</h2>
              <p className="text-gray-600 leading-relaxed">{project.description}</p>
            </div>

            {/* Updates Timeline */}
            {project.project_updates && project.project_updates.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Project Updates</h2>
                <div className="space-y-6">
                  {project.project_updates.map((update, index) => (
                    <div key={update.id} className="relative">
                      {index !== project.project_updates!.length - 1 && (
                        <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                      )}
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900">{update.title}</h3>
                            <span className="text-sm text-gray-500">
                              {new Date(update.update_date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-600">{update.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Project Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Start Date</p>
                    <p className="text-sm text-gray-600">
                      {new Date(project.start_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {project.end_date && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">End Date</p>
                      <p className="text-sm text-gray-600">
                        {new Date(project.end_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {project.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Location</p>
                      <p className="text-sm text-gray-600">{project.location}</p>
                    </div>
                  </div>
                )}

                {project.budget && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Budget</p>
                      <p className="text-sm text-gray-600">${project.budget.toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stakeholders */}
            {project.project_stakeholders && project.project_stakeholders.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-gray-400" />
                  <h2 className="text-lg font-bold text-gray-900">Stakeholders</h2>
                </div>
                <div className="space-y-3">
                  {project.project_stakeholders.map((stakeholder) => (
                    <div key={stakeholder.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                      <p className="font-medium text-gray-900">{stakeholder.name}</p>
                      <p className="text-sm text-gray-600">{stakeholder.role}</p>
                      {stakeholder.organization && (
                        <p className="text-sm text-gray-500">{stakeholder.organization}</p>
                      )}
                      {stakeholder.email && (
                        <p className="text-sm text-blue-600">{stakeholder.email}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}