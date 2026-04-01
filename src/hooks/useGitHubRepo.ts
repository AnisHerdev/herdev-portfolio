import { useState, useEffect } from 'react';
import { ProjectMeta, ProjectConfig } from '../types/project.types';

const repoCache = new Map<string, ProjectMeta>();

const buildFallbackMeta = (config: ProjectConfig): ProjectMeta => ({
  name: config.repoName,
  alias: config.alias,
  description: config.description,
  languages: config.techStack,
  repoUrl: config.repoUrl || '',
  deployedUrl: config.deployedUrl || config.repoUrl || '',
  updatedAt: '',
});

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
      const isValidPat = pat && pat !== 'your_pat_here';
      setLoading(true);
      setError(false);

      if (!isValidPat) {
        console.warn('Valid VITE_GITHUB_PAT missing, fetching repositories anonymously (subject to rate limits).');
      }

      if (config.isPrivate || !config.repoName) {
        const fallbackMeta = buildFallbackMeta(config);
        repoCache.set(config.repoName, fallbackMeta);
        setMeta(fallbackMeta);
        setLoading(false);
        return;
      }

      try {
        const headers: HeadersInit = isValidPat ? { Authorization: `Bearer ${pat}` } : {};
        const [repoRes, langRes, readmeRes] = await Promise.all([
          fetch(`https://api.github.com/repos/AnisHerdev/${config.repoName}`, {
            headers,
          }),
          fetch(`https://api.github.com/repos/AnisHerdev/${config.repoName}/languages`, {
            headers,
          }),
          fetch(`https://api.github.com/repos/AnisHerdev/${config.repoName}/readme`, {
            headers: { ...headers, Accept: 'application/vnd.github.v3.raw' },
          }),
        ]);

        if (!repoRes.ok || !langRes.ok) throw new Error('Repo fetch failed');

        const repoData = await repoRes.json();
        const langData = await langRes.json();
        const readmeData = readmeRes.ok ? await readmeRes.text() : null;

        // Sort languages by bytes and take top 3
        const languages = Object.entries(langData)
          .sort(([, a], [, b]) => (b as number) - (a as number))
          .slice(0, 3)
          .map(([name]) => name);

        const projectMeta: ProjectMeta = {
          name: repoData.name,
          alias: config.alias || repoData.name,
          description: repoData.description || config.description,
          languages: languages.length > 0 ? languages : config.techStack,
          repoUrl: config.repoUrl || repoData.html_url,
          deployedUrl: config.deployedUrl || repoData.html_url,
          updatedAt: repoData.updated_at,
          readme: readmeData || undefined,
        };

        repoCache.set(config.repoName, projectMeta);
        setMeta(projectMeta);
      } catch (err) {
        console.warn(`GitHub API failed for ${config.repoName}, using local fallback.`, err);
        const fallbackMeta = buildFallbackMeta(config);
        repoCache.set(config.repoName, fallbackMeta);
        setMeta(fallbackMeta);
        setError(false);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [config]);

  return { meta, loading, error };
};
