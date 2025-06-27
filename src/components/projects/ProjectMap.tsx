import React from 'react';
import { MapPin } from 'lucide-react';
import { Project } from '../../types/project';

interface ProjectMapProps {
  projects: Project[];
}

export function ProjectMap({ projects }: ProjectMapProps) {
  // For now, we'll create a simple visual representation
  // In a real implementation, you would integrate with a mapping service like Google Maps or Mapbox
  
  return (
    <div className="bg-gray-100 rounded-xl p-8 min-h-96">
      <div className="text-center mb-8">
        <MapPin className="w-12 h-12 text-teal-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Map</h3>
        <p className="text-gray-600">
          Map integration would be implemented here with a service like Google Maps or Mapbox
        </p>
      </div>

      {/* Project Location List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">{project.name}</h4>
                <p className="text-sm text-gray-600">{project.location}</p>
                {project.latitude && project.longitude && (
                  <p className="text-xs text-gray-500 mt-1">
                    {project.latitude.toFixed(4)}, {project.longitude.toFixed(4)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}