import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/HomePage';
import PublicationsAdmin from './components/admin/PublicationsAdmin';
import ProgramAreasAdmin from './components/admin/ProgramAreasAdmin';
import AboutPage from './pages/AboutPage';
import OurWorkPage from './pages/OurWorkPage';
import IdeasPage from './pages/IdeasPage';
import PublicationDetailPage from './pages/PublicationDetailPage';
import ProgramAreaDetailPage from './pages/ProgramAreaDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/our-work" element={<OurWorkPage />} />
          <Route path="/ideas" element={<IdeasPage />} />
          <Route path="/publications/:id" element={<PublicationDetailPage />} />
          <Route path="/admin/publications" element={<PublicationsAdmin />} />
          <Route path="/admin/programs" element={<ProgramAreasAdmin />} />
          <Route path="/admin/program-areas" element={<ProgramAreasAdmin />} />
          <Route path="/areas/:slug" element={<ProgramAreaDetailPage />} />
          {/* Program Pages - Dynamic routing */}
          {/* <Route path="/programs/:slug" element={<ProgramDetailPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;