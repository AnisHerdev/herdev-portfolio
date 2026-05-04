import React from 'react';

const Skills = () => {
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">Core Competencies</h2>
        <div className="skills-grid">
          <div className="skill-card skill-blue">
            <i className="fas fa-code"></i>
            <h3>Languages</h3>
            <p>Python, Java, C, HTML/CSS, JavaScript, SQL, MongoDB</p>
          </div>
          <div className="skill-card skill-pink">
            <i className="fas fa-layer-group"></i>
            <h3>Frameworks</h3>
            <p>TensorFlow, pandas, matplotlib, Node.js, Express.js</p>
          </div>
          <div className="skill-card skill-green">
            <i className="fas fa-tools"></i>
            <h3>Tools</h3>
            <p>VS Code, Google Colab, Git, GitHub Actions, Linux</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
