import React, { useState } from 'react';
import { Users, Calendar, MapPin, Award, CheckCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const project = {
  title: 'AI-Powered Climate Prediction',
  subtitle: 'Using machine learning to improve climate change predictions and early warning systems.',
  backgroundImage: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
  highlights: [
    { icon: Users, label: 'Team', value: '8 Members' },
    { icon: Calendar, label: 'Duration', value: '2023-2025' },
    { icon: MapPin, label: 'Location', value: 'Kathmandu, Nepal' },
    { icon: Award, label: 'Partners', value: 'GEI, Local NGOs' }
  ],
  description: `
    <p>This project leverages advanced machine learning algorithms to analyze climate data and provide accurate, real-time predictions for extreme weather events. Our goal is to help communities prepare for and adapt to climate change impacts.</p>
    <p>We collaborate with local governments, NGOs, and research institutions to ensure the solutions are practical and scalable.</p>
  `,
  objectives: [
    'Develop a robust AI model for climate prediction',
    'Deploy early warning systems in vulnerable regions',
    'Train local stakeholders in data interpretation',
    'Publish open-access research findings'
  ],
  gallery: [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80'
  ],
  team: [
    { name: 'Dr. Sarah Chen', role: 'Project Lead', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Ravi Shrestha', role: 'Data Scientist', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Amina Karki', role: 'Field Coordinator', image: 'https://randomuser.me/api/portraits/women/65.jpg' }
  ],
  partners: ['GEI', 'Nepal Climate Initiative', 'OpenAI'],
};

const ProjectDetailPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const totalImages = project.gallery.length;

  const goToPrev = () => setCurrentImage((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  const goToNext = () => setCurrentImage((prev) => (prev === totalImages - 1 ? 0 : prev + 1));

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero/Header */}
      <section
        className="relative h-80 flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${project.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="Project Hero Section"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-cyan-900/40" aria-hidden="true"></div>
        <div className="relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">{project.title}</h1>
          <p className="text-xl lg:text-2xl max-w-2xl mx-auto drop-shadow-md">{project.subtitle}</p>
        </div>
      </section>

      {/* Highlights/Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {project.highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-4">
                  <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{item.value}</div>
                <div className="text-gray-600 text-sm">{item.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 py-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Project Description</h2>
            <div className="prose prose-lg text-gray-700" dangerouslySetInnerHTML={{ __html: project.description }} />
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Objectives</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {project.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-cyan-600 mr-2 mt-1" aria-hidden="true" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Gallery</h3>
            <div className="relative w-full max-w-xl mx-auto">
              <img
                src={project.gallery[currentImage]}
                alt={`Project gallery image ${currentImage + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow transition-all duration-300"
              />
              {/* Carousel Controls */}
              <button
                onClick={goToPrev}
                aria-label="Previous image"
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                aria-label="Next image"
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {project.gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    aria-label={`Go to image ${idx + 1}`}
                    className={`w-3 h-3 rounded-full ${currentImage === idx ? 'bg-cyan-600' : 'bg-gray-300'} transition-all`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <aside className="space-y-8">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-900">Team Members</h4>
            <ul className="space-y-4">
              {project.team.map((member, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-600">{member.role}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-900">Partners</h4>
            <div className="flex flex-wrap gap-2">
              {project.partners.map((partner, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-cyan-100 text-cyan-800 text-xs rounded-full font-medium"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Support This Project</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join us in making a difference! Your support helps us bring innovative climate solutions to more communities.
        </p>
        <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-semibold rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300">
          Contact Us <ArrowRight className="w-5 h-5" />
        </button>
      </section>
    </div>
  );
};

export default ProjectDetailPage; 