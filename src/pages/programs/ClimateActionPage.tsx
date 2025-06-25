import React, { useEffect } from 'react';
import { ArrowLeft, Leaf, Thermometer, CloudRain, Users, Target, TrendingUp, MapPin, Calendar, Award, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ClimateActionPage = () => {
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
      title: 'Nepal Climate Resilience Program',
      location: 'Sindhupalchok, Nepal',
      duration: '2020 - 2025',
      status: 'Active',
      budget: '$2.5M',
      beneficiaries: '15,000 farmers',
      description: 'Supporting farmers in adapting to climate change through sustainable agriculture practices, water management systems, and climate-smart technologies.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
      impact: [
        '50% increase in crop yields',
        '30% reduction in water usage',
        '200 water harvesting systems built',
        '500 farmers trained in climate-smart agriculture'
      ]
    },
    {
      title: 'Pacific Island Climate Adaptation',
      location: 'Vanuatu & Fiji',
      duration: '2021 - 2026',
      status: 'Active',
      budget: '$3.8M',
      beneficiaries: '25,000 islanders',
      description: 'Building climate resilience in Pacific Island communities through coastal protection, sustainable fisheries, and disaster preparedness programs.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80',
      impact: [
        '15 coastal protection barriers built',
        '80% reduction in storm damage',
        '300 families relocated to safer areas',
        '1,000 people trained in disaster response'
      ]
    },
    {
      title: 'African Drought Resilience Initiative',
      location: 'Kenya & Ethiopia',
      duration: '2019 - 2024',
      status: 'Active',
      budget: '$4.2M',
      beneficiaries: '40,000 pastoralists',
      description: 'Enhancing drought resilience among pastoralist communities through early warning systems, water infrastructure, and livelihood diversification.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80',
      impact: [
        '120 water points constructed',
        '60% improvement in livestock survival',
        '2,000 families with alternative livelihoods',
        '95% accuracy in drought early warnings'
      ]
    }
  ];

  const approaches = [
    {
      icon: Thermometer,
      title: 'Climate Monitoring',
      description: 'Advanced monitoring systems to track climate patterns and provide early warnings for extreme weather events.',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: CloudRain,
      title: 'Adaptation Strategies',
      description: 'Developing and implementing community-based adaptation strategies tailored to local climate risks.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Community Engagement',
      description: 'Empowering communities with knowledge and tools to build resilience against climate change impacts.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      title: 'Targeted Interventions',
      description: 'Implementing specific interventions based on vulnerability assessments and community needs.',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const stats = [
    { number: '45', label: 'Active Projects', icon: Target },
    { number: '250K+', label: 'Beneficiaries', icon: Users },
    { number: '12', label: 'Countries', icon: MapPin },
    { number: '85%', label: 'Success Rate', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          {/* Back Button */}
          <button
            onClick={() => navigate('/our-work')}
            className="inline-flex items-center text-base-blue hover:text-dark-blue font-medium mb-8 group reveal"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Our Work
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-base-blue to-analogous-teal rounded-2xl flex items-center justify-center mr-4 motion-pulse">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold font-playfair text-gray-900">
                  Climate <span className="gradient-text">Action</span>
                </h1>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Building climate resilience in vulnerable communities through innovative adaptation strategies, 
                sustainable practices, and community-centered solutions that protect lives and livelihoods.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white rounded-lg px-4 py-2 shadow-md border border-emerald-100">
                  <span className="text-2xl font-bold text-base-blue">45</span>
                  <span className="text-gray-600 ml-2">Active Projects</span>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 shadow-md border border-emerald-100">
                  <span className="text-2xl font-bold text-base-blue">250K+</span>
                  <span className="text-gray-600 ml-2">Beneficiaries</span>
                </div>
              </div>
            </div>
            
            <div className="reveal">
              <img 
                src="https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?auto=format&fit=crop&w=800&q=80" 
                alt="Climate action initiatives" 
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

      {/* Approaches Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Our Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We employ a comprehensive, multi-faceted approach to climate action that combines scientific rigor 
              with community-centered solutions.
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
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-playfair group-hover:text-base-blue transition-colors">
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
              Explore some of our most impactful climate action initiatives across different regions and communities.
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
                            <div className="w-2 h-2 bg-base-blue rounded-full mr-3"></div>
                            {impact}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-base-blue to-analogous-teal text-white font-medium rounded-lg hover:from-dark-blue hover:to-muted-blue transition-all duration-300 transform hover:scale-105 group">
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
      <section className="py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">Global Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our climate action programs have created measurable, lasting impact across vulnerable communities worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-base-blue mx-auto mb-4" />
                <div className="text-3xl font-bold text-base-blue mb-2">85%</div>
                <div className="text-gray-600 font-medium mb-4">Improvement in Climate Resilience</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Communities show significant improvement in their ability to adapt to and recover from climate-related challenges.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal" style={{ animationDelay: '0.1s' }}>
              <div className="text-center">
                <Users className="w-12 h-12 text-base-blue mx-auto mb-4" />
                <div className="text-3xl font-bold text-base-blue mb-2">250K+</div>
                <div className="text-gray-600 font-medium mb-4">Lives Transformed</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Individuals and families have gained access to climate-resilient livelihoods and improved living conditions.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 reveal" style={{ animationDelay: '0.2s' }}>
              <div className="text-center">
                <Award className="w-12 h-12 text-base-blue mx-auto mb-4" />
                <div className="text-3xl font-bold text-base-blue mb-2">12</div>
                <div className="text-gray-600 font-medium mb-4">Countries Reached</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our climate action programs span across multiple countries, adapting to local contexts and needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center text-white relative reveal">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair mb-6">Join the Climate Action</h2>
          <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
            Partner with us to build climate resilience and create sustainable solutions for vulnerable communities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-emerald-700 font-semibold rounded-full hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Support Our Work
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-emerald-700 transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClimateActionPage;