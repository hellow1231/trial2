import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Target, Users, MapPin, Calendar, TrendingUp, Award, ExternalLink, Search, Filter, Eye, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import ImageGalleryCarousel from '../components/ImageGalleryCarousel';
import { useProgramAreas } from '../hooks/useProgramAreas';
import Header from '../components/Header';

const OurWorkPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
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
    { number: '1.2M+', label: 'Lives Impacted', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { number: '219', label: 'Active Projects', icon: Target, color: 'from-blue-500 to-indigo-500' },
    { number: '52', label: 'Countries', icon: MapPin, color: 'from-indigo-500 to-purple-500' },
    { number: '850+', label: 'Local Partners', icon: Award, color: 'from-purple-500 to-pink-500' }
  ];

  const filteredProgramAreas = programAreas.filter(programArea => {
    const matchesSearch = programArea.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (programArea.description && programArea.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
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
                  <div className="w-16 h-16 bg-gradient-to-r from-base-blue to-analogous-teal rounded-2xl flex items-center justify-center mx-auto mb-4 motion-pulse">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
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
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search program areas or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* All Program Areas Grid */}
      <section id="development" className="py-20 bg-gray-50">
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
          ) : filteredProgramAreas.length === 0 ? (
            <div className="text-center py-20">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Program Areas Found</h3>
              <p className="text-gray-600 mb-8">
                No program areas match your current search criteria.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                }}
                className="text-base-blue hover:text-dark-blue font-medium"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProgramAreas.map((programArea, index) => (
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
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                        <Target className="w-12 h-12 text-blue-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 font-playfair group-hover:text-blue-700 transition-colors">
                      {programArea.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {programArea.description}
                    </p>

                    {/* Projects Count */}
                    <div className="mb-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <Target className="w-3 h-3 mr-1" />
                        {programArea.projects?.length || 0} Projects
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => viewProgramArea(programArea)}
                        className="inline-flex items-center text-base-blue hover:text-dark-blue text-sm font-medium transition-colors group/btn"
                      >
                        Learn More
                        <ExternalLink className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center reveal">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 lg:p-12 border border-blue-100">
              <h3 className="text-2xl font-bold font-playfair text-gray-900 mb-4">Manage Program Areas</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                Add, edit, and organize program areas through our comprehensive admin interface.
              </p>
              <a
                href="/admin/program-areas"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-base-blue to-analogous-teal text-white font-semibold rounded-full hover:from-dark-blue hover:to-muted-blue transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Open Admin Panel
                <ExternalLink className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurWorkPage;