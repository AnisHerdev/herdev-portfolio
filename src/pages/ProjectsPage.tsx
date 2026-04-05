import React, { useState, useEffect } from 'react';
import { useProjectConfig } from '../hooks/useProjectConfig';
import { ProjectCardWrapper, ProjectCardSkeleton } from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { ProjectMeta } from '../types/project.types';

const ProjectsPage: React.FC = () => {
  const { projects, loading } = useProjectConfig();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<ProjectMeta | null>(null);
  const itemsPerPage = 6;

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const totalPages = projects.length > 0 ? Math.ceil(projects.length / itemsPerPage) : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="section !pt-32 min-h-screen">
      <div className="container px-4">
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="section-title !mb-0 !text-3xl md:!text-5xl">All Projects</h1>
        </div>

        {loading ? (
          <div className="projects-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="projects-grid">
              {currentProjects.map((project) => (
                <ProjectCardWrapper 
                   key={project.repoName} 
                   config={project} 
                   size="full" 
                   onClick={(meta) => setSelectedProject(meta)}
                   headingLevel="h2"
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination-container">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="pagination-btn"
                  aria-label="Previous Page"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                
                <div className="page-indicator">
                  <span className="page-indicator-label">Projects</span>
                  <div className="page-indicator-numbers">
                    <span className="current-page">{currentPage.toString().padStart(2, '0')}</span>
                    <span className="total-pages"> / {totalPages.toString().padStart(2, '0')}</span>
                  </div>
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="pagination-btn"
                  aria-label="Next Page"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default ProjectsPage;
