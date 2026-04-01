import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNav = () => {
  const location = useLocation();
  const isProjectsPage = location.pathname === '/projects';

  return (
    <nav className="mobile-nav glass">
      <Link 
        to="/#home" 
        className="mobile-nav-link"
        onClick={(e) => {
          if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      >
        <i className="fas fa-home"></i>
        <span>Home</span>
      </Link>
      <Link 
        to="/#skills" 
        className="mobile-nav-link"
        onClick={(e) => {
          if (location.pathname === '/') {
            e.preventDefault();
            document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <i className="fas fa-lightbulb"></i>
        <span>Skills</span>
      </Link>
      
      {isProjectsPage ? (
        <Link to="/#projects" className="mobile-nav-link animate-fade-in" style={{ color: 'var(--blue-glow)' }}>
          <i className="fas fa-arrow-left"></i>
          <span className="!text-sm">Back</span>
        </Link>
      ) : (
        <Link 
          to="/#projects" 
          className="mobile-nav-link"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <i className="fas fa-code"></i>
          <span>Work</span>
        </Link>
      )}

      <Link 
        to="/#contact" 
        className="mobile-nav-link"
        onClick={(e) => {
          if (location.pathname === '/') {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <i className="fas fa-envelope"></i>
        <span>Contact</span>
      </Link>
    </nav>
  );
};

export default MobileNav;
