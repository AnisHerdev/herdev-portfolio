export interface ProjectConfig {
  repoName: string;              // exact GitHub repo name
  alias?: string;                // optional display name override
  deployedUrl?: string;          // optional, falls back to github repo URL
  featured?: boolean;            // if true, show on landing page grid
}

export interface ProjectMeta {
  name: string;
  alias: string;                 // alias if set, else repoName
  description: string | null;
  languages: string[];           // top 3 by bytes
  repoUrl: string;
  deployedUrl: string;           // deployedUrl from config OR repoUrl
  updatedAt: string;
}
