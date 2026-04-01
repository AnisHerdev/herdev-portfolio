import React, { useState, useEffect } from 'react';
import { useProjectConfig } from '../hooks/useProjectConfig';
import { ProjectCardWrapper, ProjectCardSkeleton } from '../components/ProjectCard';

const ProjectsPage: React.FC = () => {
  const { projects, loading } = useProjectConfig();
  const [currentPage, setCurrentPage] = useState(1);
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
                <ProjectCardWrapper key={project.repoName} config={project} size="full" />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="glass flex items-center justify-center w-12 h-12 rounded-full disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/10 transition-all border-white/10"
                  style={{ cursor: currentPage === 1 ? 'default' : 'pointer' }}
                >
                  <i className="fas fa-chevron-left text-sm"></i>
                </button>
                
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">
                   Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="glass flex items-center justify-center w-12 h-12 rounded-full disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/10 transition-all border-white/10"
                  style={{ cursor: currentPage === totalPages ? 'default' : 'pointer' }}
                >
                  <i className="fas fa-chevron-right text-sm"></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsPage;
