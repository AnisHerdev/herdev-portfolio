import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BgBlobs from './components/BgBlobs';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';

const App = () => {
  return (
    <Router>
      <BgBlobs />
      <Navbar />
      <MobileNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
