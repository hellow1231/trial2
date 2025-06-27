import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { OurWorkPage } from './pages/OurWorkPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { Publications } from './components/Publications';
import { PublicationDetailPage } from './pages/PublicationDetailPage';
import { ProgramAreaDetailPage } from './pages/ProgramAreaDetailPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { IdeasPage } from './pages/IdeasPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/our-work" element={<OurWorkPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/publication/:id" element={<PublicationDetailPage />} />
            <Route path="/program-area/:slug" element={<ProgramAreaDetailPage />} />
            <Route path="/ideas" element={<IdeasPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}