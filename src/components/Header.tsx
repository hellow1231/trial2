import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

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
      if (activeDropdown && !(event.target as Element).closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

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
        { name: 'Climate Action', href: '/areas/climate-action', description: 'Climate adaptation and mitigation initiatives' },
        { name: 'Water & Sanitation', href: '/areas/water-sanitation', description: 'Clean water and sanitation projects' },
        { name: 'Renewable Energy', href: '/areas/renewable-energy', description: 'Clean energy solutions and programs' },
        { name: 'Forest Conservation', href: '/areas/forest-conservation', description: 'Forest protection and restoration efforts' },
        { name: 'Waste Management', href: '/areas/waste-management', description: 'Circular economy and waste solutions' }
      ]
    },
    {
      label: 'Research',
      href: '/ideas',
      dropdown: [
        { name: 'Publications', href: '/', description: 'Research papers and academic publications' },
        { name: 'Innovation Hub', href: '/ideas', description: 'Cutting-edge environmental solutions' },
        { name: 'Policy Papers', href: '/ideas', description: 'Research-backed policy recommendations' },
        { name: 'Future Trends', href: '/ideas', description: 'Emerging trends in sustainability' },
        { name: 'Thought Leadership', href: '/ideas', description: 'Expert insights and perspectives' }
      ]
    },
    {
      label: 'Contact',
      href: '/',
      single: true
    }
  ];

  const handleNavClick = (href: string) => {
    // Close dropdowns and mobile menu
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    
    // Navigate to the page
    if (href === '/' && location.pathname === '/') {
      // If we're already on home page and clicking contact, scroll to contact
      const element = document.querySelector('#contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
    setDropdownTimeout(timeout);
  };

  const handleDropdownContentEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  const handleDropdownContentLeave = () => {
    setActiveDropdown(null);
  };

  const handleMainNavClick = (item: any) => {
    if (item.single) {
      // For single items like Contact, navigate directly
      handleNavClick(item.href);
    } else if (item.dropdown && item.dropdown.length > 0) {
      // For items with dropdowns, toggle dropdown
      setActiveDropdown(activeDropdown === item.label ? null : item.label);
    } else {
      // For items without dropdowns, navigate to the page
      handleNavClick(item.href);
    }
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
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
                <div key={item.label} className="relative dropdown-container">
                  <button
                    onClick={() => handleMainNavClick(item)}
                    onMouseEnter={() => !item.single && handleDropdownEnter(item.label)}
                    onMouseLeave={() => !item.single && handleDropdownLeave()}
                    className={`flex items-center space-x-1 font-medium transition-all duration-300 hover:scale-105 ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-base-blue' 
                        : 'text-gray-900 hover:text-base-blue'
                    }`}
                  >
                    <span>{item.label}</span>
                    {!item.single && (
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </button>
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

      {/* Dropdown Overlay */}
      {activeDropdown && (
        <div 
          className="fixed inset-x-0 glass-effect shadow-lg border-b border-white/20 z-40"
          style={{ top: '64px' }}
          onMouseEnter={handleDropdownContentEnter}
          onMouseLeave={handleDropdownContentLeave}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
            {navigationItems.map((item) => (
              activeDropdown === item.label && !item.single && (
                <div key={item.label} className="animate-fadeInUp">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold font-playfair text-gray-900 mb-3">{item.label}</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      {item.label === 'About' && 'Learn more about our mission, team, and journey toward environmental sustainability'}
                      {item.label === 'Our Work' && 'Explore our comprehensive programs creating environmental impact worldwide'}
                      {item.label === 'Research' && 'Discover our research, innovations, and thought leadership in sustainability'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {item.dropdown.map((dropdownItem, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavClick(dropdownItem.href)}
                        className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-left border border-gray-100 hover:border-base-blue/30"
                      >
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-base-blue transition-colors mb-2">
                          {dropdownItem.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {dropdownItem.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white lg:hidden" style={{ top: '64px' }}>
          <nav className="max-w-7xl mx-auto px-6 py-8 space-y-6">
            {navigationItems.map((item) => (
              <div key={item.label}>
                {item.single ? (
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="w-full text-left py-4 text-xl font-bold text-gray-900 border-b border-gray-200"
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
                        {item.dropdown.map((dropdownItem, index) => (
                          <button
                            key={index}
                            onClick={() => handleNavClick(dropdownItem.href)}
                            className="block w-full text-left py-3 px-4 text-gray-700 hover:text-base-blue hover:bg-light-blue/10 rounded-lg transition-colors duration-200"
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