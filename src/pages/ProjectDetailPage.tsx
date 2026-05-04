import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useProjectConfig } from '../hooks/useProjectConfig';
import { useGitHubRepo } from '../hooks/useGitHubRepo';
import { ProjectConfig, ProjectMeta } from '../types/project.types';
import { ProjectCardSkeleton } from '../components/ProjectCard';

const ProjectDetailPage: React.FC = () => {
  const { repoName } = useParams<{ repoName: string }>();
  const navigate = useNavigate();
  const { projects: configs, loading: configsLoading } = useProjectConfig();
  
  const [config, setConfig] = useState<ProjectConfig | null>(null);
  const { meta, loading: metaLoading } = useGitHubRepo(config);

  useEffect(() => {
    if (!configsLoading && configs.length > 0 && repoName) {
      const found = configs.find(p => p.repoName === repoName);
      setConfig(found || null);
    }
  }, [configsLoading, configs, repoName]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  if (configsLoading || metaLoading) {
    return (
      <section className="section !pt-24 min-h-screen">
        <div className="container px-4" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <ProjectCardSkeleton />
        </div>
      </section>
    );
  }

  if (!meta) {
    return (
      <section className="section !pt-32 min-h-screen">
        <div className="container text-center">
          <h1 className="section-title">Project Not Found</h1>
          <p className="text-secondary mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/#projects" className="btn btn-primary">Back to Projects</Link>
        </div>
      </section>
    );
  }

  return (
    <div 
      className="project-detail-overlay" 
      onClick={(e) => {
        if (e.target === e.currentTarget) navigate(-1);
      }}
    >
      <section className="section min-h-screen pb-24" style={{ paddingTop: '2rem' }}>
        <div className="container px-6" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="project-detail-card frosted">
            <button 
              className="project-close-btn" 
              onClick={() => navigate(-1)}
              aria-label="Close project"
            >
              <i className="fas fa-times"></i>
            </button>
            
            <div className="project-tag-container !mb-4">
              {meta.languages.map((lang) => (
                <span key={lang} className="project-tag tag-green">
                  {lang}
                </span>
              ))}
            </div>
            
            <h1 className="modal-title !text-3xl md:!text-4xl !mb-4">{meta.alias}</h1>
            
            <div className="modal-links !mb-8">
              <a href={meta.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary !py-2 !px-4 !text-xs">
                <i className="fab fa-github"></i> Repository
              </a>
              {meta.deployedUrl && (
                <a href={meta.deployedUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary !py-2 !px-4 !text-xs">
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </a>
              )}
            </div>

            <div className="markdown-body">
              {meta.readme ? (
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    img: ({ node, src, ...props }) => {
                      if (!src) return null;
                      let finalSrc = src;
                      if (!src.startsWith('http') && !src.startsWith('data:')) {
                        const cleanUri = src.replace(/^\.\/|^\//, '');
                        finalSrc = `https://raw.githubusercontent.com/AnisHerdev/${meta.name}/${meta.defaultBranch || 'main'}/${cleanUri}`;
                      }
                      return <img src={finalSrc} {...props} style={{ maxWidth: '100%', borderRadius: '12px' }} />;
                    }
                  }}
                >
                  {meta.readme}
                </ReactMarkdown>
              ) : (
                <div className="empty-readme">
                  <i className="fas fa-file-alt"></i>
                  <p>No README content available for this repository.</p>
                  <p className="text-xs">Try viewing the repository directly on GitHub.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;