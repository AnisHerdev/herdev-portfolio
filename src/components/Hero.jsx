import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="hero">
       <div className="hero-container frosted">
        <div className="hero-left">
          <div className="hero-image">
            <img src="/assets/profile.jpg" alt="S A Herdev Anish" width="150" height="150" />
          </div>
          <h1>Hi, I'm <span>S A Herdev Anish</span></h1>
          <div className="social-links">
            <a href="https://github.com/AnisHerdev" className="glass-icon" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub Profile"><i className="fab fa-github"></i></a>
            <a href="https://linkedin.com/in/herdev-anish-1678452a9/" className="glass-icon" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn Profile"><i className="fab fa-linkedin"></i></a>
            <a href="https://herdevanish-cv.tiiny.site" className="glass-icon" target="_blank" rel="noopener noreferrer" title="View Resume" aria-label="View Resume"><i className="fas fa-file-alt"></i></a>
          </div>
        </div>
        <div className="hero-right">
          <p className="tagline">B.Tech (Hons.) CSE • AIML Enthusiast • Fintech Minor</p>
          <p className="intro">Passionate about engineering solutions that make life easy for everyone. Pursuing specialized research in SLMs, LLMs, and RAG architectures.</p>
          <div className="cta-group">
             <Link to="/#projects" className="btn btn-primary">View Projects</Link>
             <Link to="/#contact" className="btn btn-secondary">Contact Me</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
