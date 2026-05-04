import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProjectConfig } from '../hooks/useProjectConfig';
import { ProjectCardWrapper, ProjectCardSkeleton } from './ProjectCard';

const ProjectsGrid: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { projects, loading } = useProjectConfig();
    
    const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

    const handleProjectClick = (meta: { name: string }) => {
      sessionStorage.setItem('homepage-scroll', String(window.scrollY));
      navigate(`/project/${meta.name}`, { state: { background: location } });
    };

    return (
        <div className="projects-grid-container">
            <div className="projects-grid">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => <ProjectCardSkeleton key={i} />)
                ) : (
                    featuredProjects.map((project) => (
                        <ProjectCardWrapper 
                          key={project.repoName} 
                          config={project} 
                          size="compact" 
                          onClick={handleProjectClick}
                        />
                    ))
                )}
            </div>
            
            <div className="projects-view-all">
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
