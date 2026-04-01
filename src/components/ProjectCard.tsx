import React from 'react';
import { ProjectMeta, ProjectConfig } from '../types/project.types';
import { useGitHubRepo } from '../hooks/useGitHubRepo';

export const ProjectCardSkeleton = () => (
  <div className="project-card glass bg-white/[0.02] border-white/5 animate-pulse flex flex-col p-8">
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

export const ProjectCardWrapper: React.FC<{ config: ProjectConfig; size?: 'compact' | 'full' }> = ({ config, size = 'compact' }) => {
  const { meta, loading, error } = useGitHubRepo(config);

  if (loading) return <ProjectCardSkeleton />;
  if (error || !meta) return (
    <div className="glass p-8 text-center text-sm text-white/50 border-white/5 flex flex-col items-center justify-center min-h-[220px]">
        <i className="fas fa-exclamation-triangle mb-2 text-[#ec4899] opacity-50 text-xl"></i>
        <span>Repo fetch failed: {config.alias || config.repoName}</span>
    </div>
  );

  return <ProjectCard meta={meta} size={size} />;
};

interface ProjectCardProps {
  meta: ProjectMeta;
  size?: 'compact' | 'full';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ meta, size = 'compact' }) => {
  const formattedDate = new Date(meta.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="project-card glass group transition-all duration-300">
      <div className="flex flex-col h-full">
        <div className="project-tag-container">
          {meta.languages.map((lang) => (
            <span key={lang} className="project-tag tag-green">
              {lang}
            </span>
          ))}
        </div>
        
        <h3 className="group-hover:text-[#3b82f6] transition-colors leading-tight">
          {meta.alias}
        </h3>
        
        {meta.description ? (
          <p className="project-description line-clamp-3">
            {meta.description}
          </p>
        ) : (
          <p className="project-description muted-placeholder">
            No description available
          </p>
        )}

        <div className="mt-auto pt-6">
          <a 
            href={meta.deployedUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="link"
          >
            View Demo <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
