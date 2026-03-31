import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container glass">
        <div className="hero-image">
          <img src="/assets/profile.jpg" alt="S A Herdev Anish" />
        </div>
        <h1>Hi, I'm <span>S A Herdev Anish</span></h1>
        <p className="tagline">B.Tech (Hons.) CSE • AIML Enthusiast • Fintech Minor</p>
        <p className="intro">Passionate about engineering solutions that make life easy for everyone. Pursuing specialized research in SLMs, LLMs, and RAG architectures.</p>
        <div className="social-links">
          <a href="https://github.com/AnisHerdev" className="glass-icon" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
          <a href="https://linkedin.com/in/herdev-anish-1678452a9/" className="glass-icon" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
        </div>
        <div className="cta-group">
          <a href="#projects" className="btn btn-primary glass">View Projects</a>
          <a href="#contact" className="btn btn-secondary glass">Contact Me</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
