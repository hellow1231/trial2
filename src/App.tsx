import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Research from './components/Research';
import Faculty from './components/Faculty';
import Publications from './components/Publications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PublicationsAdmin from './components/admin/PublicationsAdmin';
import ProgramsAdmin from './components/admin/ProgramsAdmin';
import AboutPage from './pages/AboutPage';
import OurWorkPage from './pages/OurWorkPage';
import IdeasPage from './pages/IdeasPage';
import PublicationDetailPage from './pages/PublicationDetailPage';
import ProgramDetailPage from './pages/ProgramDetailPage';
import ClimateActionPage from './pages/programs/ClimateActionPage';
import WaterSanitationPage from './pages/programs/WaterSanitationPage';

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Research />
      {/* <Faculty /> */}
      <Publications />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/our-work" element={<OurWorkPage />} />
        <Route path="/ideas" element={<IdeasPage />} />
        <Route path="/publications/:id" element={<PublicationDetailPage />} />
        <Route path="/admin/publications" element={<PublicationsAdmin />} />
        <Route path="/admin/programs" element={<ProgramsAdmin />} />
        
        {/* Program Pages - Dynamic routing */}
        <Route path="/programs/:slug" element={<ProgramDetailPage />} />
        
        {/* Legacy program pages for backward compatibility */}
        <Route path="/programs/climate-action" element={<ClimateActionPage />} />
        <Route path="/programs/water-sanitation" element={<WaterSanitationPage />} />
      </Routes>
    </Router>
  );
}

export default App;