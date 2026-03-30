import React from 'react';

const MobileNav = () => {
  return (
    <nav className="mobile-nav glass">
      <a href="#home" className="mobile-nav-link">
        <i className="fas fa-home"></i>
        <span>Home</span>
      </a>
      <a href="#about" className="mobile-nav-link">
        <i className="fas fa-user"></i>
        <span>About</span>
      </a>
      <a href="#skills" className="mobile-nav-link">
        <i className="fas fa-lightbulb"></i>
        <span>Skills</span>
      </a>
      <a href="#projects" className="mobile-nav-link">
        <i className="fas fa-code"></i>
        <span>Work</span>
      </a>
      <a href="#contact" className="mobile-nav-link">
        <i className="fas fa-envelope"></i>
        <span>Contact</span>
      </a>
    </nav>
  );
};

export default MobileNav;
