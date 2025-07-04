import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Target, Users, MapPin, Calendar, TrendingUp, Award, ExternalLink, Search, Filter, Eye, Loader2, AlertCircle, Plus, SortAsc, SortDesc } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import ImageGalleryCarousel from '../components/ImageGalleryCarousel';
import { useProgramAreas } from '../hooks/useProgramAreas';
import { Link } from 'react-router-dom';
import type { ProgramArea } from '../lib/programAreasApi';

const OurWorkPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'name' | 'created_at' | 'order_index'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const { programAreas, loading, error } = useProgramAreas();

  useEffect(() => {
    // Handle hash-based scrolling
    if (location.hash) {
      const elementId = location.hash.substring(1); // Remove the '#'
      const element = document.getElementById(elementId);
      if (element) {
        // Small delay to ensure the page is fully rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [programAreas]);

  const impactStats = [
    { number: '1.2M+', label: 'Lives Impacted', icon: Users, color: 'from-blue-600 to-cyan-600' },
    { number: '219', label: 'Active Projects', icon: Target, color: 'from-blue-600 to-cyan-600' },
    { number: '52', label: 'Countries', icon: MapPin, color: 'from-blue-600 to-cyan-600' },
    { number: '850+', label: 'Local Partners', icon: Award, color: 'from-blue-600 to-cyan-600' }
  ];

  const filteredProgramAreas = programAreas.filter(programArea => {
    return true; // Show all program areas
  });

  const sortedProgramAreas = [...filteredProgramAreas].sort((a: ProgramArea, b: ProgramArea) => {
    let aValue: any = a[sortBy];
    let bValue: any = b[sortBy];
    
    if (sortBy === 'created_at') {
      aValue = new Date(a.created_at || 0);
      bValue = new Date(b.created_at || 0);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const viewProgramArea = (programArea: any) => {
    navigate(`/areas/${programArea.slug}`);
  };

  // Gallery images for Our Work page
  const workGalleryImages = [
    {
      src: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
      alt: 'Climate action project in rural community',
      caption: 'Climate resilience programs protecting vulnerable communities'
    },
    {
      src: 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
      alt: 'Water and sanitation infrastructure development',
      caption: 'Clean water access transforming health outcomes'
    },
    {
      src: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
      alt: 'Renewable energy installation in remote area',
      caption: 'Solar energy bringing power to off-grid communities'
    },
    {
      src: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
      alt: 'Forest conservation and restoration efforts',
      caption: 'Reforestation initiatives protecting biodiversity'
    },
    {
      src: 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
      alt: 'Community development and capacity building',
      caption: 'Empowering communities through skills development'
    },
    {
      src: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
      alt: 'Waste management and circular economy solutions',
      caption: 'Innovative waste solutions creating circular economies'
    }
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Program Areas</h2>
            <p className="text-gray-600 mb-8">
              We're having trouble connecting to our database. Please check your connection and try again.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="text-center reveal">
            <h1 className="text-4xl lg:text-6xl font-bold font-playfair text-gray-900 mb-6">
              Our <span className="gradient-text">Work</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Creating sustainable solutions that transform communities and protect our planet 
              through innovative programs and collaborative partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 motion-pulse shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Gallery Carousel */}
      <ImageGalleryCarousel
        images={workGalleryImages}
        sectionTitle="Transforming Communities Worldwide"
        sectionDescription="Explore our comprehensive programs that create lasting environmental and social impact across diverse communities and ecosystems around the globe."
        autoScrollSpeed={3500}
      />

      {/* Search and Filter */}
      {/* All Program Areas Grid */}
      <section id="development" className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Program Areas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive portfolio of environmental and sustainability program areas.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading program areas...</p>
              </div>
            </div>
          ) : sortedProgramAreas.length === 0 ? (
            <div className="text-center py-20">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Program Areas Found</h3>
              <p className="text-gray-600 mb-8">
                No program areas match your current search criteria.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="text-base-blue hover:text-dark-blue font-medium"
              >
                Refresh Page
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProgramAreas.map((programArea, index) => (
                <div
                  key={programArea.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift border border-gray-100 group reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden h-48">
                    {programArea.hero_image ? (
                      <img
                        src={programArea.hero_image}
                        alt={programArea.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <Target className="w-16 h-16 text-white/80 relative z-10" />
                      </div>
                    )}
                    
                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Floating badge */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="px-3 py-1 bg-gradient-to-r from-white/90 to-cyan-100/90 backdrop-blur-sm text-blue-800 text-xs font-medium rounded-full border border-white/50 shadow-lg">
                        {programArea.projectCount} Projects
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-white via-blue-50/50 to-cyan-50/30">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 font-playfair group-hover:text-blue-600 transition-colors">
                      {programArea.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {programArea.description}
                    </p>

                    {/* Projects Count */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Target className="w-4 h-4 mr-2 text-cyan-500" />
                        <span className="font-medium">{programArea.projectCount} Active Projects</span>
                      </div>
                      
                      {/* Progress indicator */}
                      <div className="w-12 h-1 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-600 rounded-full transition-all duration-700 group-hover:from-blue-600 group-hover:to-cyan-700 shadow-sm"
                          style={{ width: `${Math.min((programArea.projectCount / 10) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <button
                        onClick={() => viewProgramArea(programArea)}
                        className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 text-sm font-medium rounded-lg border border-blue-200 hover:border-transparent transition-all duration-300 group/btn shadow-sm hover:shadow-md"
                      >
                        Learn More
                        <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Admin Panel Link */}

      <Footer />
    </div>
  );
};

export default OurWorkPage;