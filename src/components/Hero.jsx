import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container glass">
        <div className="hero-image">
          <img src="/assets/profile.jpg" alt="S A Herdev Anish" />
        </div>
        <h1>Hi, I'm <span>S A Herdev Anish</span></h1>
        <p className="tagline">CSE Student • AIML Enthusiast • Fintech Minor</p>
        <p className="intro">Passionate about engineering solutions that make life easy for everyone. I bridge the gap between complex AI and human empathy.</p>
        <div className="social-links">
          <a href="#" className="glass-icon"><i className="fab fa-github"></i></a>
          <a href="#" className="glass-icon"><i className="fab fa-linkedin"></i></a>
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
