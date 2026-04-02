import { useState, useEffect } from 'react';
import { ProjectConfig } from '../types/project.types';
import { LOCAL_FALLBACK } from '../config/projects.config';

interface ConfigState {
  projects: ProjectConfig[];
  source: 'gist' | 'fallback';
  loading: boolean;
}

let cachedConfig: ConfigState | null = null;
let pendingRequest: Promise<ConfigState> | null = null;

export const useProjectConfig = () => {
  const [config, setConfig] = useState<ConfigState>(cachedConfig || {
    projects: LOCAL_FALLBACK,
    source: 'fallback',
    loading: !cachedConfig,
  });

  useEffect(() => {
    if (cachedConfig) return;

    if (!pendingRequest) {
      pendingRequest = (async (): Promise<ConfigState> => {
        const gistId = import.meta.env.VITE_GIST_ID;
        const pat = import.meta.env.VITE_GITHUB_PAT;

        const isInvalidGistId = !gistId || gistId === 'your_gist_id_here';
        const isInvalidPat = !pat || pat === 'your_pat_here';

        if (isInvalidGistId || isInvalidPat) {
          return { projects: LOCAL_FALLBACK, source: 'fallback', loading: false };
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
          const gistEntries = JSON.parse(firstFile.content) as Partial<ProjectConfig>[];

          const merged: ProjectConfig[] = gistEntries.map((gistEntry) => {
            // Look for enrichment data in LOCAL_FALLBACK — optional, never a gate
            const fallback = LOCAL_FALLBACK.find(f => f.repoName === gistEntry.repoName);

            return {
              // Base: LOCAL_FALLBACK enrichment if available, else safe defaults
              repoName:    gistEntry.repoName    ?? '',
              alias:       gistEntry.alias       ?? fallback?.alias       ?? gistEntry.repoName ?? '',
              description: fallback?.description ?? gistEntry.description ?? '',
              techStack:   fallback?.techStack   ?? gistEntry.techStack   ?? [],
              isPrivate:   gistEntry.isPrivate   ?? fallback?.isPrivate   ?? false,
              featured:    gistEntry.featured    ?? fallback?.featured     ?? false,
              // Optional fields — only set if defined
              ...(gistEntry.deployedUrl ? { deployedUrl: gistEntry.deployedUrl }
                  : fallback?.deployedUrl ? { deployedUrl: fallback.deployedUrl }
                  : {}),
              ...(gistEntry.repoUrl ? { repoUrl: gistEntry.repoUrl }
                  : fallback?.repoUrl ? { repoUrl: fallback.repoUrl }
                  : {}),
            };
          });

          return {
            projects: merged.length > 0 ? merged : LOCAL_FALLBACK,
            source: 'gist',
            loading: false
          };
        } catch (error) {
          console.error('Error fetching project config from Gist, falling back to local:', error);
          return { projects: LOCAL_FALLBACK, source: 'fallback', loading: false };
        }
      })();
    }

    pendingRequest.then((result) => {
      cachedConfig = result;
      setConfig(result);
    });
  }, []);

  return config;
};
