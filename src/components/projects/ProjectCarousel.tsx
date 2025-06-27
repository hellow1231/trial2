import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Project } from '../../types/project';
import { ProjectStatusBadge } from './ProjectStatusBadge';

interface ProjectCarouselProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

export function ProjectCarousel({ projects, onProjectSelect }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!isPlaying || projects.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + direction;
        
        if (nextIndex >= projects.length - 1) {
          setDirection(-1);
          return projects.length - 1;
        } else if (nextIndex <= 0) {
          setDirection(1);
          return 0;
        }
        
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, direction, projects.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (projects.length === 0) return null;

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Main Carousel Container */}
      <div 
        className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {/* Project Slides */}
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="min-w-full h-full relative cursor-pointer"
              onClick={() => onProjectSelect(project)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                {project.project_media && project.project_media.length > 0 ? (
                  <img
                    src={project.project_media[0].file_url}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-teal-500 via-blue-500 to-purple-600" />
                )}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center text-white p-8">
                <div className="text-center max-w-4xl">
                  <div className="mb-4">
                    <ProjectStatusBadge status={project.status} />
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    {project.name}
                  </h2>
                  
                  {project.description && (
                    <p className="text-xl md:text-2xl mb-6 opacity-90 line-clamp-3">
                      {project.description}
                    </p>
                  )}

                  <div className="flex flex-wrap justify-center gap-4 text-lg">
                    {project.location && (
                      <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                        📍 {project.location}
                      </span>
                    )}
                    {project.program_areas && (
                      <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                        🎯 {project.program_areas.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-teal-600 scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
        <div
          className="bg-teal-600 h-1 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / projects.length) * 100}%` }}
        />
      </div>
    </div>
  );
}