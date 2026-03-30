import React from 'react';

const Skills = () => {
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">Core Competencies</h2>
        <div className="skills-grid">
          <div className="skill-card glass skill-blue">
            <i className="fas fa-brain"></i>
            <h3>AIML</h3>
            <p>Specialized in building intelligent systems that learn and adapt.</p>
          </div>
          <div className="skill-card glass skill-pink">
            <i className="fas fa-chart-line"></i>
            <h3>Fintech</h3>
            <p>Bridging technology with modern financial systems.</p>
          </div>
          <div className="skill-card glass skill-green">
            <i className="fas fa-users"></i>
            <h3>Social Impact</h3>
            <p>Driven by empathy to build solutions for the community.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
