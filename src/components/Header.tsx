import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigationItems = [
    {
      label: 'About',
      href: '/about',
      dropdown: [
        { name: 'Our Story', href: '/about', description: 'Learn about our mission, vision, and values' },
        { name: 'Our Team', href: '/about', description: 'Meet our leadership and expert team' },
        { name: 'Our History', href: '/about', description: 'Our journey and key milestones' },
        { name: 'Partnerships', href: '/about', description: 'Our global network of collaborators' },
        { name: 'Careers', href: '/about', description: 'Join our mission for environmental change' }
      ]
    },
    {
      label: 'Our Work',
      href: '/our-work',
      dropdown: [
        { name: 'All Programs', href: '/our-work', description: 'Overview of all our environmental programs' },
        { name: 'Climate Action', href: '/our-work', description: 'Climate adaptation and mitigation initiatives' },
        { name: 'Water & Sanitation', href: '/our-work', description: 'Clean water and sanitation projects' },
        { name: 'Renewable Energy', href: '/our-work', description: 'Clean energy solutions and programs' },
        { name: 'Forest Conservation', href: '/our-work', description: 'Forest protection and restoration efforts' },
        { name: 'Waste Management', href: '/our-work', description: 'Circular economy and waste solutions' }
      ]
    },
    {
      label: 'Research',
      href: '/ideas',
      dropdown: [
        { name: 'Publications', href: '/ideas', description: 'Research papers and academic publications' },
        { name: 'Innovation Hub', href: '/ideas', description: 'Cutting-edge environmental solutions' },
        { name: 'Policy Papers', href: '/ideas', description: 'Research-backed policy recommendations' },
        { name: 'Future Trends', href: '/ideas', description: 'Emerging trends in sustainability' },
        { name: 'Thought Leadership', href: '/ideas', description: 'Expert insights and perspectives' }
      ]
    }
  ];

  const handleNavClick = (href: string) => {
    // Close dropdowns and mobile menu
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    
    // Navigate to the page
    navigate(href);
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const isActiveDropdown = (items: any[]) => {
    return items.some(item => item.href === location.pathname);
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const handleMainNavClick = (item: any) => {
    if (item.single) {
      // For single items like Contact, navigate directly
      handleNavClick(item.href);
    } else if (item.dropdown && item.dropdown.length > 0) {
      // For items with dropdowns, toggle dropdown
      toggleDropdown(item.label);
    } else {
      // For items without dropdowns, navigate to the page
      handleNavClick(item.href);
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'glass-effect shadow-lg border-b border-white/20' 
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleNavClick('/')}>
              <img 
                src="/gei-logo.svg" 
                alt="GEI Logo" 
                className="w-6 h-6 object-contain"
              />
              <div>
                <h1 className={`text-lg font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-gray-900' : 'text-gray-900'
                }`}>
                  GEI
                </h1>
                <p className={`text-xs leading-none transition-colors duration-300 ${
                  isScrolled ? 'text-gray-600' : 'text-gray-700'
                }`}>
                  Global Environmental Initiative
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.label} className="relative" ref={item.dropdown ? dropdownRef : undefined}>
                  <button
                    onClick={() => handleMainNavClick(item)}
                    className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-base-blue hover:scale-105 ${
                      item.single 
                        ? (isActiveLink(item.href) ? 'text-base-blue border-b-2 border-base-blue' : 'text-gray-700')
                        : (isActiveDropdown(item.dropdown || []) ? 'text-base-blue border-b-2 border-base-blue' : 'text-gray-700')
                    }`}
                  >
                    <span>{item.label}</span>
                    {!item.single && (
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {!item.single && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      {item.dropdown?.map((dropdownItem, index) => (
                        <button
                          key={index}
                          onClick={() => handleNavClick(dropdownItem.href)}
                          className={`block w-full text-left px-6 py-4 transition-all duration-200 hover:bg-blue-50 hover:translate-x-1 group ${
                            isActiveLink(dropdownItem.href) 
                              ? 'bg-blue-50 text-base-blue border-r-2 border-base-blue' 
                              : 'text-gray-700 hover:text-base-blue'
                          }`}
                          style={{
                            animationDelay: `${index * 50}ms`
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-sm mb-1 group-hover:text-base-blue transition-colors duration-200">
                                {dropdownItem.name}
                              </h3>
                              <p className="text-xs text-gray-500 leading-relaxed">
                                {dropdownItem.description}
                              </p>
                            </div>
                            <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <div className="w-1.5 h-1.5 bg-base-blue rounded-full"></div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-gray-900 hover:bg-white/20'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white lg:hidden" style={{ top: '64px' }}>
          <nav className="max-w-7xl mx-auto px-6 py-8 space-y-6 animate-in slide-in-from-top duration-200">
            {navigationItems.map((item) => (
              <div key={item.label}>
                {item.single ? (
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`w-full text-left py-4 text-xl font-bold border-b border-gray-200 transition-colors duration-200 ${
                      isActiveLink(item.href) ? 'text-base-blue' : 'text-gray-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="w-full flex items-center justify-between py-4 text-xl font-bold text-gray-900 border-b border-gray-200"
                    >
                      <span>{item.label}</span>
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform duration-300 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        activeDropdown === item.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pt-4 space-y-3">
                        {item.dropdown?.map((dropdownItem, index) => (
                          <button
                            key={index}
                            onClick={() => handleNavClick(dropdownItem.href)}
                            className={`block w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 ${
                              isActiveLink(dropdownItem.href) 
                                ? 'text-base-blue bg-blue-50' 
                                : 'text-gray-700 hover:text-base-blue hover:bg-light-blue/10'
                            }`}
                          >
                            <div className="font-medium">{dropdownItem.name}</div>
                            <div className="text-sm text-gray-500 mt-1">{dropdownItem.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;