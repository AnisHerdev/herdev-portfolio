import React from 'react';
import { ProjectMeta, ProjectConfig } from '../types/project.types';
import { useGitHubRepo } from '../hooks/useGitHubRepo';

export const ProjectCardSkeleton = () => (
  <div className="project-card-skeleton">
    <div className="skeleton-tags">
        <div className="skeleton-tag"></div>
        <div className="skeleton-tag"></div>
    </div>
    <div className="skeleton-title"></div>
    <div className="skeleton-text"></div>
    <div className="skeleton-text short"></div>
    <div className="skeleton-footer">
        <div className="skeleton-link"></div>
    </div>
  </div>
);

export const ProjectCardWrapper: React.FC<{ config: ProjectConfig; size?: 'compact' | 'full'; onClick?: (meta: ProjectMeta) => void; headingLevel?: 'h2' | 'h3' }> = ({ config, size = 'compact', onClick, headingLevel }) => {
  const { meta, loading, error } = useGitHubRepo(config);

  if (loading) return <ProjectCardSkeleton />;
  if (error || !meta) return (
    <div className="project-card-error">
        <i className="fas fa-exclamation-triangle"></i>
        <span>Repo fetch failed: {config.alias || config.repoName}</span>
    </div>
  );

  return <ProjectCard meta={meta} size={size} onClick={() => onClick?.(meta)} headingLevel={headingLevel} />;
};

interface ProjectCardProps {
  meta: ProjectMeta;
  size?: 'compact' | 'full';
  onClick?: () => void;
  headingLevel?: 'h2' | 'h3';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ meta, size = 'compact', onClick, headingLevel = 'h3' }) => {
  const TitleTag = headingLevel;
  const formattedDate = new Date(meta.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <div 
      className="project-card group transition-all duration-300"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="flex flex-col h-full">
        <div className="project-tag-container">
          {meta.languages.map((lang) => (
            <span key={lang} className="project-tag tag-green">
              {lang}
            </span>
          ))}
        </div>
        
        <TitleTag className="group-hover:text-[#3b82f6] transition-colors leading-tight">
          {meta.alias}
        </TitleTag>
        
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
          {meta.deployedUrl && (
            <a 
              href={meta.deployedUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="link"
              onClick={(e) => e.stopPropagation()}
            >
              View Demo <i className="fas fa-arrow-right"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
