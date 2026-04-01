/*
  GIST SCHEMA — paste this JSON into your GitHub Gist as config.json
  The Gist is config-only: repoName, alias, deployedUrl, isPrivate, featured.
  Content (description, techStack) always comes from LOCAL_FALLBACK — never from the Gist.
  [
    {
      "repoName": "health_care_SLM",
      "alias": "Health Care SLM",
      "deployedUrl": "",
      "isPrivate": false,
      "featured": true
    }
  ]
*/

import { ProjectConfig } from "../types/project.types";

export const LOCAL_FALLBACK: ProjectConfig[] = [
  {
    repoName: "health_care_SLM",
    alias: "Health Care SLM",
    description: "An AI-powered medical chatbot built with RAG to support ASHA workers across India, minimising LLM hallucination through Retrieval-Augmented Generation with research into SLMs and Google Edge AI.",
    techStack: ["Python", "TensorFlow"],
    deployedUrl: undefined,
    repoUrl: "https://github.com/AnisHerdev/health_care_SLM",
    isPrivate: false,
    featured: true
  },
  {
    repoName: "ppf-projection-calculator-react",
    alias: "PPF Projection Calculator",
    description: "Real-time PPF financial visualiser with custom compounding interest logic, type-safe TypeScript financial algorithms, Recharts integration, and deployed on Firebase Hosting.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    deployedUrl: undefined,
    repoUrl: "https://github.com/AnisHerdev/ppf-projection-calculator-react",
    isPrivate: false,
    featured: true
  },
  {
    repoName: "RockPaperScissor_AIML_Tkinter_CV",
    alias: "AI Hand Gesture — Rock Paper Scissors",
    description: "Rock-Paper-Scissors game with CV-based hand gesture recognition achieving 97.6% classification accuracy, using Q-learning reinforcement learning for adaptive gameplay and CI/CD via GitHub Actions.",
    techStack: ["Python", "Tkinter", "TensorFlow", "GitHub Actions"],
    deployedUrl: undefined,
    repoUrl: "https://github.com/AnisHerdev/RockPaperScissor_AIML_Tkinter_CV",
    isPrivate: false,
    featured: true
  },
  {
    repoName: "poethra-weekly-leaderboard",
    alias: "Poethra Weekly Leaderboard",
    description: "Modular leaderboard replacing manual Excel tracking with Firestore collections, a deterministic ranking engine with points-to-streak tie-breaking, searchable history, and prod/test environment isolation.",
    techStack: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    deployedUrl: "https://poethra-leaderboard.web.app/",
    repoUrl: "https://github.com/AnisHerdev/poethra-weekly-leaderboard",
    isPrivate: false,
    featured: true
  },
  {
    repoName: "youtube-video-speed-enhancer",
    alias: "YouTube Video Speed Enhancer",
    description: "A browser extension that enhances YouTube's native playback speed controls, allowing finer-grained speed adjustments beyond YouTube's default limits.",
    techStack: ["JavaScript", "HTML/CSS"],
    deployedUrl: undefined,
    repoUrl: "https://github.com/AnisHerdev/youtube-video-speed-enhancer",
    isPrivate: false,
    featured: false
  }
];
