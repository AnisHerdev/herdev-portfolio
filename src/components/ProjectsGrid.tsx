import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectConfig } from '../hooks/useProjectConfig';
import { useGitHubRepo } from '../hooks/useGitHubRepo';
import ProjectCard from './ProjectCard';
import { ProjectConfig } from '../types/project.types';

const SkeletonCard = () => (
  <div className="project-card glass bg-white/[0.02] border-white/5 animate-pulse min-h-[220px] flex flex-col p-8">
    <div className="flex gap-2 mb-4">
        <div className="h-5 bg-white/10 rounded-full w-16"></div>
        <div className="h-5 bg-white/10 rounded-full w-16"></div>
    </div>
    <div className="h-8 bg-white/10 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
    <div className="h-4 bg-white/10 rounded w-5/6"></div>
    <div className="mt-auto pt-6">
        <div className="h-3 bg-white/10 rounded w-20"></div>
    </div>
  </div>
);

const ProjectCardWrapper: React.FC<{ config: ProjectConfig }> = ({ config }) => {
  const { meta, loading, error } = useGitHubRepo(config);

  if (loading) return <SkeletonCard />;
  if (error || !meta) return (
    <div className="glass p-8 text-center text-sm text-white/50 border-white/5 flex flex-col items-center justify-center min-h-[220px]">
        <i className="fas fa-exclamation-triangle mb-2 text-[#ec4899] opacity-50 text-xl"></i>
        <span>Repo fetch failed: {config.alias || config.repoName}</span>
    </div>
  );

  return <ProjectCard meta={meta} size="compact" />;
};

const ProjectsGrid: React.FC = () => {
    const navigate = useNavigate();
    const { projects, loading } = useProjectConfig();
    
    const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

    return (
        <div className="projects-grid-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
                ) : (
                    featuredProjects.map((project) => (
                        <ProjectCardWrapper key={project.repoName} config={project} />
                    ))
                )}
            </div>
            
            <div className="mt-12 flex justify-center">
                <button 
                    onClick={() => navigate('/projects')}
                    className="btn btn-secondary group flex items-center gap-2"
                    style={{ cursor: 'pointer' }}
                >
                    View All Projects <i className="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
                </button>
            </div>
        </div>
    );
};

export default ProjectsGrid;
