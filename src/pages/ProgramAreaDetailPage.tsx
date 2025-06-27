import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Target, 
  TrendingUp, 
  Award, 
  ExternalLink,
  Mail,
  Loader2,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useProgramArea } from '../hooks/useProgramAreas';

const ProgramAreaDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { programArea, loading, error } = useProgramArea(slug || '');

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
  }, [programArea]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading program area...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !programArea) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <div className="text-center py-20">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Program Area Not Found</h1>
              <p className="text-gray-600 mb-8">
                The program area you're looking for doesn't exist or has been removed.
              </p>
              <button
                onClick={() => navigate('/our-work')}
                className="inline-flex items-center px-6 py-3 bg-base-blue text-white font-semibold rounded-lg hover:bg-dark-blue transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Our Work
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <TrendingUp className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'planning':
        return <Clock className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

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
              <h1 className="text-4xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">
                {programArea.name}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {programArea.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg px-4 py-3 shadow-md border border-blue-100">
                  <div className="text-2xl font-bold text-base-blue">{programArea.projects?.length || 0}</div>
                  <div className="text-sm text-gray-600">Active Projects</div>
                </div>
                <div className="bg-white rounded-lg px-4 py-3 shadow-md border border-blue-100">
                  <div className="text-2xl font-bold text-base-blue">{programArea.team_members?.length || 0}</div>
                  <div className="text-sm text-gray-600">Team Members</div>
                </div>
              </div>
            </div>
            
            <div className="reveal">
              {programArea.hero_image && (
                <img 
                  src={programArea.hero_image} 
                  alt={programArea.name} 
                  className="rounded-2xl shadow-2xl motion-float w-full"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Program Area Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Projects */}
              {programArea.projects && programArea.projects.length > 0 && (
                <div className="reveal">
                  <h2 className="text-3xl font-bold font-playfair text-gray-900 mb-6">Active Projects</h2>
                  <div className="space-y-8">
                    {programArea.projects.map((project, index) => (
                      <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover-lift">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                          {project.image && (
                            <div className="relative h-64 lg:h-auto overflow-hidden">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-4 left-4 flex items-center gap-2">
                                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
                                  {getStatusIcon(project.status)}
                                  <span className="ml-1">{project.status}</span>
                                </span>
                                {project.budget && (
                                  <span className="px-3 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full border border-white/50">
                                    {project.budget}
                                  </span>
                                )}
                              </div>
                              {project.location && (
                                <div className="absolute bottom-4 left-4 text-white">
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm font-medium">{project.location}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div className="p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-playfair">
                              {project.title}
                            </h3>
                            
                            {project.description && (
                              <p className="text-gray-600 leading-relaxed mb-6">
                                {project.description}
                              </p>
                            )}

                            {project.beneficiaries && (
                              <div className="mb-4">
                                <div className="text-xl font-bold gradient-text">
                                  {project.beneficiaries}
                                </div>
                                <div className="text-sm text-gray-600">Direct Beneficiaries</div>
                              </div>
                            )}

                            {project.impact_metrics && project.impact_metrics.length > 0 && (
                              <div className="space-y-2">
                                {project.impact_metrics.map((metric, metricIndex) => (
                                  <div key={metricIndex} className="flex items-center text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-base-blue rounded-full mr-3"></div>
                                    {metric}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Program Area Details */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Program Area Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-600">Projects</span>
                      <span className="text-sm text-gray-900 font-semibold">{programArea.projects?.length || 0}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-600">Team Members</span>
                      <span className="text-sm text-gray-900 font-semibold">{programArea.team_members?.length || 0}</span>
                    </div>

                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm font-medium text-gray-600">Partners</span>
                      <span className="text-sm text-gray-900 font-semibold">{programArea.partners?.length || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                {programArea.team_members && programArea.team_members.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Team Members</h3>
                    <div className="space-y-4">
                      {programArea.team_members.map((member) => (
                        <div key={member.id} className="flex items-center space-x-4">
                          {member.image && (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900">{member.name}</h4>
                            {member.title && (
                              <p className="text-xs text-gray-600">{member.title}</p>
                            )}
                            {member.role && (
                              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-1">
                                {member.role}
                              </span>
                            )}
                          </div>
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <Mail className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Partners */}
                {programArea.partners && programArea.partners.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Partners</h3>
                    <div className="space-y-4">
                      {programArea.partners.map((partner) => (
                        <div key={partner.id} className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">{partner.name}</h4>
                            {partner.description && (
                              <p className="text-xs text-gray-600">{partner.description}</p>
                            )}
                          </div>
                          {partner.website && (
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProgramAreaDetailPage;