import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Target, Users, MapPin, Calendar, TrendingUp, Award, ExternalLink, Search, Filter, Eye, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageGalleryCarousel from '../components/ImageGalleryCarousel';
import { usePrograms } from '../hooks/usePrograms';

const OurWorkPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { programs, loading, error } = usePrograms();

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
  }, [programs]);

  const impactStats = [
    { number: '1.2M+', label: 'Lives Impacted', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { number: '219', label: 'Active Projects', icon: Target, color: 'from-blue-500 to-indigo-500' },
    { number: '52', label: 'Countries', icon: MapPin, color: 'from-indigo-500 to-purple-500' },
    { number: '850+', label: 'Local Partners', icon: Award, color: 'from-purple-500 to-pink-500' }
  ];

  const statuses = ['all', 'Active', 'Completed', 'Planning'];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredPrograms = programs.filter(program => {
    const matchesStatus = selectedStatus === 'all' || program.status === selectedStatus;
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (program.description && program.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (program.location && program.location.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const featuredPrograms = filteredPrograms.filter(program => program.is_featured);
  const regularPrograms = filteredPrograms.filter(program => !program.is_featured);

  const viewProgram = (program: any) => {
    navigate(`/programs/${program.slug}`);
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
        <Header />
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Programs</h2>
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
      <Header />
      
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
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search programs, locations, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedStatus === status
                        ? 'bg-gradient-to-r from-base-blue to-analogous-teal text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {status === 'all' ? 'All Programs' : status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      {featuredPrograms.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center mb-16 reveal">
              <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Featured Programs</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Highlighting our most impactful initiatives that are creating lasting change worldwide.
              </p>
            </div>

            <div className="space-y-12">
              {featuredPrograms.map((program, index) => (
                <div
                  key={program.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl hover-lift border border-gray-100 group reveal"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative overflow-hidden h-64 lg:h-auto">
                      {program.hero_image ? (
                        <img
                          src={program.hero_image}
                          alt={program.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                          <Target className="w-16 h-16 text-blue-400" />
                        </div>
                      )}
                      <div className="absolute top-6 left-6">
                        <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium rounded-full shadow-lg">
                          Featured
                        </span>
                      </div>
                      <div className="absolute bottom-6 left-6 text-white">
                        {program.location && (
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm font-medium">{program.location}</span>
                          </div>
                        )}
                        {program.start_date && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{new Date(program.start_date).getFullYear()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(program.status)}`}>
                          {program.status}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 font-playfair group-hover:text-blue-700 transition-colors">
                        {program.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                        {program.description || program.overview}
                      </p>

                      {/* Impact Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {program.beneficiaries && (
                          <div>
                            <div className="text-xl font-bold gradient-text">{program.beneficiaries}</div>
                            <div className="text-sm text-gray-600">Beneficiaries</div>
                          </div>
                        )}
                        {program.budget && (
                          <div>
                            <div className="text-xl font-bold gradient-text">{program.budget}</div>
                            <div className="text-sm text-gray-600">Budget</div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => viewProgram(program)}
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-base-blue to-analogous-teal text-white font-semibold rounded-lg hover:from-dark-blue hover:to-muted-blue transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group/btn"
                        >
                          <Eye className="w-5 h-5 mr-2" />
                          View Program
                          <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Programs Grid */}
      <section id="development" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">All Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive portfolio of environmental and sustainability programs.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading programs...</p>
              </div>
            </div>
          ) : filteredPrograms.length === 0 ? (
            <div className="text-center py-20">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Programs Found</h3>
              <p className="text-gray-600 mb-8">
                No programs match your current search and filter criteria.
              </p>
              <button 
                onClick={() => {
                  setSelectedStatus('all');
                  setSearchTerm('');
                }}
                className="text-base-blue hover:text-dark-blue font-medium"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPrograms.map((program, index) => (
                <div
                  key={program.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift border border-gray-100 group reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden h-48">
                    {program.hero_image ? (
                      <img
                        src={program.hero_image}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                        <Target className="w-12 h-12 text-blue-400" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(program.status)}`}>
                        {program.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 font-playfair group-hover:text-blue-700 transition-colors">
                      {program.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {program.description || program.overview}
                    </p>

                    {/* Program Details */}
                    <div className="space-y-2 mb-4">
                      {program.location && (
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {program.location}
                        </div>
                      )}
                      {program.beneficiaries && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="w-3 h-3 mr-1" />
                          {program.beneficiaries}
                        </div>
                      )}
                      {program.budget && (
                        <div className="flex items-center text-xs text-blue-600 font-semibold">
                          <Target className="w-3 h-3 mr-1" />
                          {program.budget}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => viewProgram(program)}
                        className="inline-flex items-center text-base-blue hover:text-dark-blue text-sm font-medium transition-colors group/btn"
                      >
                        Learn More
                        <ExternalLink className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                      
                      {program.start_date && (
                        <span className="text-xs text-gray-500">
                          Since {new Date(program.start_date).getFullYear()}
                        </span>
                      )}
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
              <h3 className="text-2xl font-bold font-playfair text-gray-900 mb-4">Manage Programs</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                Add, edit, and organize programs through our comprehensive admin interface.
              </p>
              <a
                href="/admin/programs"
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