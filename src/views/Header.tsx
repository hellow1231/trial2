import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { APP_CONFIG } from '../constants/app';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigationItems = [
    { 
      name: 'About', 
      path: '/about',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Our Mission', path: '/about#mission', description: 'Learn about our core mission and values' },
        { name: 'Our Team', path: '/about#team', description: 'Meet our leadership and expert team' },
        { name: 'Our History', path: '/about#history', description: 'Our journey and key milestones' },
        { name: 'Partnerships', path: '/about#partnerships', description: 'Our global network of collaborators' },
        { name: 'Careers', path: '/about#careers', description: 'Join our mission for environmental change' },
      ]
    },
    { 
      name: 'Our Work', 
      path: '/our-work',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Climate Action', path: '/our-work#climate', description: 'Fighting climate change through innovative solutions' },
        { name: 'Health & Wellness', path: '/our-work#health', description: 'Improving community health and well-being' },
        { name: 'Sustainable Development', path: '/our-work#development', description: 'Building sustainable communities' },
        { name: 'Research & Innovation', path: '/our-work#research', description: 'Advancing environmental research' },
        { name: 'Impact Stories', path: '/our-work#impact', description: 'Real-world impact and success stories' },
      ]
    },
    { 
      name: 'Ideas', 
      path: '/ideas',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Innovation Hub', path: '/ideas#innovation', description: 'Cutting-edge environmental innovations' },
        { name: 'Policy Insights', path: '/ideas#policy', description: 'Environmental policy analysis and recommendations' },
        { name: 'Research Insights', path: '/ideas#insights', description: 'Latest research findings and insights' },
        { name: 'Trends & Analysis', path: '/ideas#trends', description: 'Environmental trends and future outlook' },
        { name: 'Publications', path: '/ideas#publications', description: 'Latest publications and reports' },
      ]
    }
  ];

  // Handle scroll effect with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [activeDropdown]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    if (activeDropdown || isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [activeDropdown, isMobileMenuOpen]);

  const isActivePath = useCallback((path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleDropdown = useCallback((itemName: string) => {
    setActiveDropdown(prev => prev === itemName ? null : itemName);
  }, []);

  const handleDropdownItemClick = useCallback((path: string) => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    // Handle navigation
    if (path.includes('#')) {
      window.location.href = path;
    } else {
      window.location.href = path;
    }
  }, []);

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-white shadow-sm border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group hover:opacity-80 transition-all duration-200"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {APP_CONFIG.name}
                </div>
                <div className="text-sm text-gray-600 -mt-1 group-hover:text-blue-500 transition-colors">
                  {APP_CONFIG.fullName}
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 relative">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative dropdown-container">
                  {item.hasDropdown ? (
                    <div className="flex items-center">
                      <Link
                        to={item.path}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
                          isActivePath(item.path)
                            ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="ml-1 p-1 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                        aria-label={`Toggle ${item.name} dropdown`}
                      >
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {activeDropdown === item.name && (
                        <div className="fixed left-0 right-0 top-16 z-50 bg-white shadow-xl border-t border-gray-100 py-10 animate-slide-down w-full">
                          {/* Content Container */}
                          <div className="relative max-w-6xl mx-auto px-4">
                            {/* Dropdown Title and Subtitle */}
                            <div className="text-center mb-10">
                              <h2 className="font-playfair font-bold text-3xl text-gray-900 mb-2">{item.name}</h2>
                              {item.name === 'About' && (
                                <div className="text-gray-500 text-lg max-w-2xl mx-auto">
                                  Learn more about our mission, team, and journey toward environmental sustainability
                                </div>
                              )}
                              {item.name === 'Our Work' && (
                                <div className="text-gray-500 text-lg max-w-2xl mx-auto">
                                  Explore our programs, research, and impact stories driving global change
                                </div>
                              )}
                              {item.name === 'Ideas' && (
                                <div className="text-gray-500 text-lg max-w-2xl mx-auto">
                                  Discover insights, trends, and publications shaping the future of the environment
                                </div>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                              {item.dropdownItems?.map((dropdownItem) => (
                                <button
                                  key={dropdownItem.name}
                                  onClick={() => handleDropdownItemClick(dropdownItem.path)}
                                  className="w-full text-left bg-white rounded-xl shadow-md p-6 transition-all duration-200 border border-gray-100 hover:border-blue-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                                >
                                  <div className="font-semibold text-gray-900 text-lg mb-2">{dropdownItem.name}</div>
                                  <div className="text-gray-600 text-sm">{dropdownItem.description}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
                        isActivePath(item.path)
                          ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl animate-slide-down">
          <div className="px-4 py-4 space-y-2">
            {navigationItems.map((item, index) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center justify-between ${
                        isActivePath(item.path)
                          ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {item.name}
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    {/* Mobile Dropdown */}
                    {activeDropdown === item.name && (
                      <div className="fixed inset-0 z-50 bg-white animate-fade-in md:hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-60"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)]"></div>
                        
                        {/* Content Container */}
                        <div className="relative h-full flex flex-col">
                          {/* Header */}
                          <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <Globe className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="text-lg font-bold text-gray-900">{item.name}</div>
                                <div className="text-sm text-gray-600">{APP_CONFIG.fullName}</div>
                              </div>
                            </div>
                            <button
                              onClick={() => setActiveDropdown(null)}
                              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                            >
                              <X className="w-6 h-6 text-gray-600" />
                            </button>
                          </div>

                          {/* Main Content */}
                          <div className="flex-1 overflow-y-auto">
                            <div className="max-w-7xl mx-auto px-6 py-8">
                              {/* Section Title */}
                              <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                  {item.name}
                                </h2>
                                <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mx-auto"></div>
                              </div>

                              {/* Navigation Grid */}
                              <div className="space-y-4">
                                {item.dropdownItems?.map((dropdownItem, index) => (
                                  <button
                                    key={dropdownItem.name}
                                    onClick={() => handleDropdownItemClick(dropdownItem.path)}
                                    className="w-full group bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 text-left"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                  >
                                    <div className="space-y-3">
                                      <div className="flex items-start justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                          {dropdownItem.name}
                                        </h3>
                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                          <ChevronDown className="w-3 h-3 text-blue-600 group-hover:text-white rotate-[-90deg] transition-colors" />
                                        </div>
                                      </div>
                                      <p className="text-gray-600 text-sm leading-relaxed">
                                        {dropdownItem.description}
                                      </p>
                                      <div className="pt-2">
                                        <div className="text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                                          Learn more →
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                ))}
                              </div>

                              {/* Bottom CTA */}
                              <div className="text-center mt-12">
                                <Link
                                  to={item.path}
                                  onClick={() => setActiveDropdown(null)}
                                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                                >
                                  <span>View All {item.name}</span>
                                  <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 transform hover:scale-105 ${
                      isActivePath(item.path)
                        ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header; 