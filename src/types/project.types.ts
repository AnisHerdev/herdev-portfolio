export interface ProjectConfig {
  repoName: string;          // exact GitHub repo name, empty string if private with no repo
  alias: string;             // display name (required, not optional)
  description: string;       // hardcoded fallback description
  techStack: string[];       // e.g. ["Python", "TensorFlow", "GitHub Actions"]
  deployedUrl?: string;      // optional — only set if there is a live hosted demo
  repoUrl?: string;          // optional — omit if isPrivate: true
  isPrivate: boolean;        // if true, never show GitHub icon or link
  featured: boolean;         // required, not optional
}

export interface ProjectMeta {
  name: string;
  alias: string;                 // alias if set, else repoName
  description: string | null;
  languages: string[];           // top 3 by bytes
  repoUrl: string;
  deployedUrl?: string;          // Only set if a live demo exists
  updatedAt: string;
  readme?: string;               // Optional full README content
  readmeUrl?: string;            // Optional direct URL to the markdown
  defaultBranch?: string;        // Branch name for media resolution (e.g. 'main')
}
