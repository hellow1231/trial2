import React, { useState } from 'react';
import { Project } from '../../types/project';
import { MapPin, Calendar, Users, FileText, Search, Filter } from 'lucide-react';
import { ProjectCarousel } from './ProjectCarousel';
import { ProjectStatusBadge } from './ProjectStatusBadge';
import { ProjectMap } from './ProjectMap';

interface ProjectOverviewProps {
  projects: Project[];
  onSearch: (query: string) => void;
  onFilterStatus: (status: string) => void;
  onProjectSelect: (project: Project) => void;
}

export function ProjectOverview({ projects, onSearch, onFilterStatus, onProjectSelect }: ProjectOverviewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    if (status === 'all') {
      onSearch(''); // Reset to show all projects
    } else {
      onFilterStatus(status);
    }
  };

  const statusOptions = [
    { value: 'all', label: 'All Projects' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'on_hold', label: 'On Hold' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Management</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive portfolio of environmental and health initiatives making a positive impact worldwide.
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </form>

            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedStatus}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Project Carousel */}
      {projects.length > 0 && (
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Featured Projects</h2>
            <ProjectCarousel projects={projects.slice(0, 6)} onProjectSelect={onProjectSelect} />
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => onProjectSelect(project)}
              >
                {/* Project Image */}
                <div className="relative h-48 rounded-t-xl overflow-hidden">
                  {project.project_media && project.project_media.length > 0 ? (
                    <img
                      src={project.project_media[0].file_url}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                      <FileText className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <ProjectStatusBadge status={project.status} />
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {project.name}
                  </h3>
                  
                  {project.description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  )}

                  <div className="space-y-2 text-sm text-gray-500">
                    {project.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                    )}
                    
                    {project.start_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(project.start_date).toLocaleDateString()}
                          {project.end_date && ` - ${new Date(project.end_date).toLocaleDateString()}`}
                        </span>
                      </div>
                    )}

                    {project.project_stakeholders && project.project_stakeholders.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{project.project_stakeholders.length} stakeholders</span>
                      </div>
                    )}
                  </div>

                  {project.program_areas && (
                    <div className="mt-4">
                      <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 text-xs font-medium rounded-full">
                        {project.program_areas.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Map Section */}
      {projects.some(p => p.latitude && p.longitude) && (
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Project Locations</h2>
            <ProjectMap projects={projects.filter(p => p.latitude && p.longitude)} />
          </div>
        </div>
      )}
    </div>
  );
}