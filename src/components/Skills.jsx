import React from 'react';

const Skills = () => {
  const languages = ['Python', 'Java', 'C', 'HTML/CSS', 'JavaScript', 'SQL', 'MongoDB'];
  const frameworks = ['TensorFlow', 'pandas', 'matplotlib', 'Node.js', 'Express.js'];
  const tools = ['VS Code', 'Google Colab', 'Git', 'GitHub Actions', 'Linux'];

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">Core Competencies</h2>
        <div className="skills-grid">
          <div className="skill-card skill-blue">
            <i className="fas fa-code"></i>
            <h3>Languages</h3>
            <div className="skill-pill-container">
              {languages.map(skill => (
                <span key={skill} className="skill-pill">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skill-card skill-pink">
            <i className="fas fa-layer-group"></i>
            <h3>Frameworks</h3>
            <div className="skill-pill-container">
              {frameworks.map(skill => (
                <span key={skill} className="skill-pill">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skill-card skill-green">
            <i className="fas fa-tools"></i>
            <h3>Tools</h3>
            <div className="skill-pill-container">
              {tools.map(skill => (
                <span key={skill} className="skill-pill">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
