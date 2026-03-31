import React from 'react';
import ProjectsGrid from './ProjectsGrid';

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="container px-4">
        <h2 className="section-title">Featured Projects</h2>
        <ProjectsGrid />
      </div>
    </section>
  );
};

export default Projects;
