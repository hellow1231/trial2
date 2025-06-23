import React, { useEffect } from 'react';
import { ArrowLeft, Droplets, Filter, Zap, Users, Target, TrendingUp, MapPin, Calendar, Award, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const WaterSanitationPage = () => {
  const navigate = useNavigate();

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
  }, []);

  const projects = [
    {
      title: 'Cambodia Water Security Project',
      location: 'Siem Reap, Cambodia',
      duration: '2018 - 2023',
      status: 'Completed',
      budget: '$1.8M',
      beneficiaries: '25,000 people',
      description: 'Building sustainable water infrastructure and training local communities in water management and conservation practices.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80',
      impact: [
        '90% reduction in waterborne diseases',
        '300 community water points built',
        '150 local technicians trained',
        '95% system sustainability rate'
      ]
    },
    {
      title: 'Bangladesh Safe Water Initiative',
      location: 'Dhaka & Chittagong, Bangladesh',
      duration: '2020 - 2025',
      status: 'Active',
      budget: '$3.2M',
      beneficiaries: '45,000 people',
      description: 'Providing safe drinking water and sanitation facilities in urban slums and rural communities through innovative filtration systems.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80',
      impact: [
        '200 water treatment plants installed',
        '80% improvement in water quality',
        '500 sanitation facilities built',
        '1,200 families with household connections'
      ]
    },
    {
      title: 'African Rural Water Program',
      location: 'Mali & Burkina Faso',
      duration: '2019 - 2024',
      status: 'Active',
      budget: '$2.7M',
      beneficiaries: '35,000 villagers',
      description: 'Drilling boreholes and installing solar-powered water systems in remote rural communities across West Africa.',
      image: 'https://images.unsplash.com/photo-1541840031508-326b77c9a17e?auto=format&fit=crop&w=600&q=80',
      impact: [
        '120 solar-powered water systems',
        '75% reduction in water collection time',
        '400 women trained as water technicians',
        '98% system functionality rate'
      ]
    }
  ];

  const approaches = [
    {
      icon: Droplets,
      title: 'Water Access',
      description: 'Ensuring reliable access to safe drinking water through sustainable infrastructure and community management.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Filter,
      title: 'Water Treatment',
      description: 'Implementing appropriate water treatment technologies to ensure water quality and safety standards.',
      color: 'from-teal-500 to-blue-500'
    },
    {
      icon: Zap,
      title: 'Sanitation Systems',
      description: 'Building comprehensive sanitation facilities and promoting hygiene practices in communities.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Users,
      title: 'Community Training',
      description: 'Training local communities in water system maintenance, hygiene practices, and water conservation.',
      color: 'from-green-500 to-teal-500'
    }
  ];

  const stats = [
    { number: '32', label: 'Active Projects', icon: Target },
    { number: '180K+', label: 'Beneficiaries', icon: Users },
    { number: '15', label: 'Countries', icon: MapPin },
    { number: '92%', label: 'Success Rate', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          {/* Back Button */}
          <button
            onClick={() => navigate('/our-work')}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-8 group reveal"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Our Work
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 motion-pulse">
                  <Droplets className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold font-playfair text-gray-900">
                  Water & <span className="gradient-text">Sanitation</span>
                </h1>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Ensuring access to clean water and sustainable sanitation systems for underserved communities 
                through innovative technologies and community-centered approaches.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white rounded-lg px-4 py-2 shadow-md border border-blue-100">
                  <span className="text-2xl font-bold text-blue-600">32</span>
                  <span className="text-gray-600 ml-2">Active Projects</span>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 shadow-md border border-blue-100">
                  <span className="text-2xl font-bold text-blue-600">180K+</span>
                  <span className="text-gray-600 ml-2">Beneficiaries</span>
                </div>
              </div>
            </div>
            
            <div className="reveal">
              <img 
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80" 
                alt="Water and sanitation initiatives" 
                className="rounded-2xl shadow-2xl motion-float w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 motion-pulse">
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

      {/* Approaches Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Our Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We implement comprehensive water and sanitation solutions that combine innovative technology 
              with sustainable community management practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approaches.map((approach, index) => {
              const IconComponent = approach.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 group reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${approach.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-playfair group-hover:text-blue-700 transition-colors">
                    {approach.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {approach.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our most impactful water and sanitation initiatives that have transformed communities worldwide.
            </p>
          </div>

          <div className="space-y-12">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover-lift border border-gray-100 reveal"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                    <div className="absolute top-6 left-6 flex items-center gap-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        project.status === 'Active' 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {project.status}
                      </span>
                      <span className="px-3 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full border border-white/50">
                        {project.budget}
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{project.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 font-playfair">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      {project.description}
                    </p>
                    
                    {/* Primary Impact */}
                    <div className="mb-6">
                      <div className="text-2xl font-bold gradient-text mb-2">
                        {project.beneficiaries}
                      </div>
                      <div className="text-sm text-gray-600 font-medium mb-4">Direct Beneficiaries</div>
                      
                      <div className="space-y-2">
                        {project.impact.map((impact, impactIndex) => (
                          <div key={impactIndex} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            {impact}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 group">
                      Learn More
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Global Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our water and sanitation programs have created lasting change in communities worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-600 mb-2">92%</div>
                <div className="text-gray-600 font-medium mb-4">Project Success Rate</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our water and sanitation projects maintain high success rates with sustainable community management.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal" style={{ animationDelay: '0.1s' }}>
              <div className="text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-600 mb-2">180K+</div>
                <div className="text-gray-600 font-medium mb-4">People Served</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Individuals and families now have reliable access to clean water and improved sanitation facilities.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal" style={{ animationDelay: '0.2s' }}>
              <div className="text-center">
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-600 mb-2">15</div>
                <div className="text-gray-600 font-medium mb-4">Countries Reached</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our water and sanitation programs span across multiple countries, adapting to local contexts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center text-white relative reveal">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair mb-6">Join the Water Revolution</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Partner with us to ensure every community has access to clean water and proper sanitation facilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Support Our Work
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WaterSanitationPage;