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
      onClick={() => window.open(meta.deployedUrl, '_blank', 'noopener,noreferrer')}
      className="project-card glass group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.06]"
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-wrap gap-2 mb-4">
          {meta.languages.map((lang) => (
            <span key={lang} className="project-tag tag-green !mb-0 !py-1 !px-3 text-[10px]">
              {lang}
            </span>
          ))}
        </div>
        
        <h3 className="!text-xl !mb-2 group-hover:text-[#3b82f6] transition-colors leading-tight">
          {meta.alias}
        </h3>
        
        <p className="text-sm text-white/70 line-clamp-2 md:line-clamp-2 overflow-hidden" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {meta.description || 'No description available'}
        </p>

        {size === 'full' && (
          <div className="mt-auto pt-6 text-[10px] uppercase tracking-widest text-white/40 font-bold">
            Updated {formattedDate}
          </div>
        )}

        <div className="mt-6 flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#3b82f6] transition-colors">
          View Demo <i className="fas fa-arrow-right text-[10px] transition-transform group-hover:translate-x-1"></i>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
