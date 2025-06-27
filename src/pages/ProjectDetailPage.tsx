import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Users, FileText, Clock, CheckCircle } from 'lucide-react';
import { useProject } from '../hooks/useProjects';
import { ProjectStatusBadge } from '../components/projects/ProjectStatusBadge';
import { ImageGalleryCarousel } from '../components/ImageGalleryCarousel';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { project, loading, error } = useProject(id!);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading project: {error || 'Project not found'}</p>
          <button
            onClick={() => navigate('/projects')}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const projectImages = project.project_media
    ?.filter(media => media.file_type === 'image')
    .map(media => ({
      url: media.file_url,
      caption: media.caption || project.name
    })) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
              <div className="flex items-center gap-4">
                <ProjectStatusBadge status={project.status} size="lg" />
                {project.program_areas && (
                  <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm font-medium rounded-full">
                    {project.program_areas.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Images Carousel */}
      {projectImages.length > 0 && (
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ImageGalleryCarousel images={projectImages} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {project.description || 'No description available for this project.'}
              </p>
            </div>

            {/* Project Updates */}
            {project.project_updates && project.project_updates.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Updates</h2>
                <div className="space-y-6">
                  {project.project_updates
                    .sort((a, b) => new Date(b.update_date).getTime() - new Date(a.update_date).getTime())
                    .map((update) => (
                      <div key={update.id} className="border-l-4 border-teal-500 pl-4">
                        <div className="flex items-center gap-2 mb-2">
                          {update.milestone ? (
                            <CheckCircle className="w-5 h-5 text-teal-600" />
                          ) : (
                            <Clock className="w-5 h-5 text-gray-400" />
                          )}
                          <h3 className="font-semibold text-gray-900">{update.title}</h3>
                          {update.milestone && (
                            <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs font-medium rounded-full">
                              Milestone
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{update.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(update.update_date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Stakeholders */}
            {project.project_stakeholders && project.project_stakeholders.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Stakeholders</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.project_stakeholders.map((stakeholder) => (
                    <div key={stakeholder.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-teal-600 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{stakeholder.name}</h3>
                          {stakeholder.role && (
                            <p className="text-sm text-gray-600">{stakeholder.role}</p>
                          )}
                          {stakeholder.organization && (
                            <p className="text-sm text-gray-500">{stakeholder.organization}</p>
                          )}
                          <span className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${
                            stakeholder.type === 'team_member'
                              ? 'bg-blue-100 text-blue-800'
                              : stakeholder.type === 'partner'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {stakeholder.type.replace('_', ' ').toUpperCase()}
                          </span>
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
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
              <div className="space-y-4">
                {project.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Location</p>
                      <p className="text-sm text-gray-600">{project.location}</p>
                      {project.latitude && project.longitude && (
                        <p className="text-xs text-gray-500 mt-1">
                          {project.latitude.toFixed(4)}, {project.longitude.toFixed(4)}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {(project.start_date || project.end_date) && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Timeline</p>
                      <div className="text-sm text-gray-600">
                        {project.start_date && (
                          <p>Start: {new Date(project.start_date).toLocaleDateString()}</p>
                        )}
                        {project.end_date && (
                          <p>End: {new Date(project.end_date).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Created</p>
                    <p className="text-sm text-gray-600">
                      {new Date(project.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Last Updated</p>
                    <p className="text-sm text-gray-600">
                      {new Date(project.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Documents */}
            {project.project_media?.filter(media => media.file_type === 'document').length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
                <div className="space-y-3">
                  {project.project_media
                    .filter(media => media.file_type === 'document')
                    .map((document) => (
                      <a
                        key={document.id}
                        href={document.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {document.file_name || 'Document'}
                          </p>
                          {document.caption && (
                            <p className="text-xs text-gray-500">{document.caption}</p>
                          )}
                        </div>
                      </a>
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