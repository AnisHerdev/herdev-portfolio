import { useState, useEffect } from 'react';
import { ProjectConfig } from '../types/project.types';
import { LOCAL_FALLBACK } from '../config/projects.config';

let cachedConfig: { projects: ProjectConfig[], source: 'gist' | 'fallback' } | null = null;

export const useProjectConfig = () => {
  const [config, setConfig] = useState<{ projects: ProjectConfig[], source: 'gist' | 'fallback' } | null>(cachedConfig);

  useEffect(() => {
    if (cachedConfig) return;

    const fetchGist = async () => {
      const gistId = import.meta.env.VITE_GIST_ID;
      const pat = import.meta.env.VITE_GITHUB_PAT;

      if (!gistId || !pat) {
        cachedConfig = { projects: LOCAL_FALLBACK, source: 'fallback' };
        setConfig(cachedConfig);
        return;
      }

      try {
        const response = await fetch(`https://api.github.com/gists/${gistId}`, {
          headers: {
            Authorization: `Bearer ${pat}`,
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (!response.ok) throw new Error('Fetch failed');

        const data = await response.json();
        const firstFile = Object.values(data.files)[0] as { content: string };
        const projects = JSON.parse(firstFile.content) as ProjectConfig[];

        cachedConfig = { projects, source: 'gist' };
        setConfig(cachedConfig);
      } catch (error) {
        console.error('Error fetching project config from Gist, falling back to local:', error);
        cachedConfig = { projects: LOCAL_FALLBACK, source: 'fallback' };
        setConfig(cachedConfig);
      }
    };

    fetchGist();
  }, []);

  return config || { projects: LOCAL_FALLBACK, source: 'fallback' };
};
