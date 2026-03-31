import React from 'react';
import { ProjectMeta } from '../types/project.types';

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
    <div
      className="project-card glass group transition-all duration-300"
    >
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
