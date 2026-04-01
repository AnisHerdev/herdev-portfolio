import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectsPage = location.pathname === '/projects';

  return (
    <header>
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

          {isProjectsPage && (
            <button 
              onClick={() => navigate(-1)}
              className="btn btn-secondary !py-2 !px-5 !text-sm flex items-center gap-2 animate-fade-in"
              style={{ 
                cursor: 'pointer', 
                borderRadius: '100px', 
                minHeight: '40px',
                border: '1px solid var(--blue-glow)',
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)'
              }}
            >
              <i className="fas fa-arrow-left"></i> <span>Back</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
