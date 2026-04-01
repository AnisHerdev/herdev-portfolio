import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNav = () => {
  const location = useLocation();
  const isProjectsPage = location.pathname === '/projects';

  return (
    <nav className="mobile-nav glass">
      <Link to="/#home" className="mobile-nav-link">
        <i className="fas fa-home"></i>
        <span>Home</span>
      </Link>
      <Link to="/#about" className="mobile-nav-link">
        <i className="fas fa-user"></i>
        <span>About</span>
      </Link>
      <Link to="/#skills" className="mobile-nav-link">
        <i className="fas fa-lightbulb"></i>
        <span>Skills</span>
      </Link>
      <Link 
        to="/#projects" 
        className={`mobile-nav-link ${isProjectsPage ? 'animate-fade-in' : ''}`}
        style={isProjectsPage ? { color: 'var(--blue-glow)', textShadow: '0 0 10px rgba(59, 130, 246, 0.5)' } : {}}
      >
        <i className={isProjectsPage ? "fas fa-arrow-left" : "fas fa-code"}></i>
        <span>{isProjectsPage ? "Back" : "Work"}</span>
      </Link>
      <Link to="/#contact" className="mobile-nav-link">
        <i className="fas fa-envelope"></i>
        <span>Contact</span>
      </Link>
    </nav>
  );
};

export default MobileNav;
