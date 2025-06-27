import React from 'react';
import { Calendar, MapPin, DollarSign, Users } from 'lucide-react';
import { ProjectStatusBadge } from './ProjectStatusBadge';
import type { Project } from '../../types/project';

interface ProjectOverviewProps {
  project: Project;
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
        <ProjectStatusBadge status={project.status} />
      </div>

      <p className="text-gray-600 mb-6">{project.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-5 h-5" />
          <div>
            <p className="font-medium">Start Date</p>
            <p className="text-sm">{new Date(project.start_date).toLocaleDateString()}</p>
          </div>
        </div>

        {project.end_date && (
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5" />
            <div>
              <p className="font-medium">End Date</p>
              <p className="text-sm">{new Date(project.end_date).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {project.location && (
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-sm">{project.location}</p>
            </div>
          </div>
        )}

        {project.budget && (
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="w-5 h-5" />
            <div>
              <p className="font-medium">Budget</p>
              <p className="text-sm">${project.budget.toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>

      {project.project_stakeholders && project.project_stakeholders.length > 0 && (
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium text-gray-900">Stakeholders</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {project.project_stakeholders.map((stakeholder) => (
              <div key={stakeholder.id} className="text-sm">
                <p className="font-medium">{stakeholder.name}</p>
                <p className="text-gray-600">{stakeholder.role}</p>
                {stakeholder.organization && (
                  <p className="text-gray-500">{stakeholder.organization}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}