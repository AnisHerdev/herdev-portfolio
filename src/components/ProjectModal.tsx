import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ProjectMeta } from '../types/project.types';

interface ProjectModalProps {
  project: ProjectMeta;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal-container glass animate-modal-in" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <i className="fas fa-times"></i>
        </button>

        <div className="modal-header">
          <div className="project-tag-container">
            {project.languages.map((lang) => (
              <span key={lang} className="project-tag tag-green">
                {lang}
              </span>
            ))}
          </div>
          <h2 className="modal-title">{project.alias}</h2>
          <div className="modal-links">
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary !py-2 !px-4 !text-xs">
              <i className="fab fa-github"></i> Repository
            </a>
            {project.deployedUrl && (
              <a href={project.deployedUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary !py-2 !px-4 !text-xs">
                <i className="fas fa-external-link-alt"></i> Live Demo
              </a>
            )}
          </div>
        </div>

        <div className="modal-content markdown-body">
          {project.readme ? (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ node, src, ...props }) => {
                  if (!src) return null;
                  let finalSrc = src;
                  if (!src.startsWith('http') && !src.startsWith('data:')) {
                    const cleanUri = src.replace(/^\.\/|^\//, '');
                    finalSrc = `https://raw.githubusercontent.com/AnisHerdev/${project.name}/${project.defaultBranch || 'main'}/${cleanUri}`;
                  }
                  return <img src={finalSrc} {...props} style={{ maxWidth: '100%', borderRadius: '12px' }} />;
                }
              }}
            >
              {project.readme}
            </ReactMarkdown>
          ) : (
            <div className="empty-readme">
               <i className="fas fa-file-alt"></i>
               <p>No README content available for this repository.</p>
               <p className="text-secondary text-xs">Try viewing the repository directly on GitHub.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
