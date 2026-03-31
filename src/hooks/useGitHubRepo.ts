import { useState, useEffect } from 'react';
import { ProjectMeta, ProjectConfig } from '../types/project.types';

const repoCache = new Map<string, ProjectMeta>();

export const useGitHubRepo = (config: ProjectConfig | null) => {
  const [meta, setMeta] = useState<ProjectMeta | null>(
    config ? repoCache.get(config.repoName) || null : null
  );
  const [loading, setLoading] = useState(!meta && !!config);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!config || repoCache.has(config.repoName)) {
      if (config && repoCache.has(config.repoName)) {
        setMeta(repoCache.get(config.repoName)!);
        setLoading(false);
      }
      return;
    }

    const fetchRepoData = async () => {
      const pat = import.meta.env.VITE_GITHUB_PAT;
      setLoading(true);
      setError(false);

      if (!pat) {
          console.warn('VITE_GITHUB_PAT missing, GitHub API calls will be rate-limited and might fail.');
      }

      try {
        const [repoRes, langRes] = await Promise.all([
          fetch(`https://api.github.com/repos/AnisHerdev/${config.repoName}`, {
            headers: pat ? { Authorization: `Bearer ${pat}` } : {},
          }),
          fetch(`https://api.github.com/repos/AnisHerdev/${config.repoName}/languages`, {
            headers: pat ? { Authorization: `Bearer ${pat}` } : {},
          }),
        ]);

        if (!repoRes.ok || !langRes.ok) throw new Error('Repo fetch failed');

        const repoData = await repoRes.json();
        const langData = await langRes.json();

        // Sort languages by bytes and take top 3
        const languages = Object.entries(langData)
          .sort(([, a], [, b]) => (b as number) - (a as number))
          .slice(0, 3)
          .map(([name]) => name);

        const projectMeta: ProjectMeta = {
          name: repoData.name,
          alias: config.alias || repoData.name,
          description: repoData.description,
          languages,
          repoUrl: repoData.html_url,
          deployedUrl: config.deployedUrl || repoData.html_url,
          updatedAt: repoData.updated_at,
        };

        repoCache.set(config.repoName, projectMeta);
        setMeta(projectMeta);
      } catch (err) {
        console.error(`Error fetching repo ${config.repoName}:`, err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [config]);

  return { meta, loading, error };
};
