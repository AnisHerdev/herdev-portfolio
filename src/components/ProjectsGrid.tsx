import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectConfig } from '../hooks/useProjectConfig';
import { ProjectCardWrapper, ProjectCardSkeleton } from './ProjectCard';
import { ProjectMeta } from '../types/project.types';
import ProjectModal from './ProjectModal';

const ProjectsGrid: React.FC = () => {
    const navigate = useNavigate();
    const { projects, loading } = useProjectConfig();
    const [selectedProject, setSelectedProject] = useState<ProjectMeta | null>(null);
    
    const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

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
                          onClick={(meta) => setSelectedProject(meta)}
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

            {selectedProject && (
                <ProjectModal 
                    project={selectedProject} 
                    onClose={() => setSelectedProject(null)} 
                />
            )}
        </div>
    );
};

export default ProjectsGrid;
