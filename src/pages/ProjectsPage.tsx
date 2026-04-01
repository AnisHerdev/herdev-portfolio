import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectConfig } from '../hooks/useProjectConfig';
import { useGitHubRepo } from '../hooks/useGitHubRepo';
import ProjectCard from '../components/ProjectCard';
import { ProjectConfig } from '../types/project.types';

const ProjectCardWrapper: React.FC<{ config: ProjectConfig }> = ({ config }) => {
  const { meta, loading, error } = useGitHubRepo(config);

  if (loading) return <div className="project-card glass bg-white/[0.02] border-white/5 animate-pulse p-8" />;
  if (error || !meta) return (
    <div className="glass p-8 text-center text-sm text-white/30 border-white/5 flex items-center justify-center">
        Repo Error: {config.alias || config.repoName}
    </div>
  );

  return <ProjectCard meta={meta} size="full" />;
};

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
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
              <div key={i} className="project-card glass bg-white/[0.02] border-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="projects-grid">
              {currentProjects.map((project) => (
                <ProjectCardWrapper key={project.repoName} config={project} />
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
