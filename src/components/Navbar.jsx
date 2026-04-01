import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectsPage = location.pathname === '/projects';

  return (
    <header className="animate-fade-in">
      <div className="header-container flex items-center justify-center gap-4">
        <nav className="navbar glass">
          <Link to="/#home" className="logo">S A Herdev Anish</Link>
          
          <div className="flex items-center gap-6">
            <ul className="nav-links">
              <li><Link to="/#home">Home</Link></li>
              <li><Link to="/#about">About</Link></li>
              <li><Link to="/#skills">Skills</Link></li>
              <li><Link to="/#projects">Projects</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
            </ul>

            <button 
              className="theme-toggle glass" 
              onClick={toggleTheme} 
              aria-label="Toggle theme"
            >
              <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
        </nav>

        {isProjectsPage && (
          <button 
            onClick={() => navigate(-1)}
            className="back-btn-external glass"
          >
            <i className="fas fa-arrow-left"></i> <span>Back</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
