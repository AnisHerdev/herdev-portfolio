import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectsPage = location.pathname === '/projects';

  return (
    <header className="animate-fade-in">
      <div className="header-container">
        <nav className="navbar glass">
          <Link to="/#home" className="logo">S A Herdev Anish</Link>
          
          <div className="flex items-center gap-6">
          <ul className="nav-links">
            <li>
              <Link 
                to="/#home" 
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/#about" 
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/#skills" 
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Skills
              </Link>
            </li>
            <li>
              <Link 
                to="/#projects" 
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link 
                to="/#contact" 
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Contact
              </Link>
            </li>
          </ul>

            <button 
              className="theme-toggle glass" 
              onClick={toggleTheme} 
              aria-label="Toggle theme"
            >
              <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>

            {/* Terminal shortcut */}
            <button
              onClick={() => navigate('/terminal')}
              aria-label="Open Terminal"
              style={{
                fontFamily: 'monospace',
                fontSize: 20,
                fontWeight: 700,
                color: '#28C840',
                background: 'rgba(40,200,64,0.08)',
                border: '2px solid rgba(40,200,64,0.25)',
                borderRadius: 6,
                padding: '4px 10px',
                cursor: 'pointer',
                transition: 'background 150ms',
                flexShrink: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(40,200,64,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(40,200,64,0.08)')}
            >
              {'>_'}
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
