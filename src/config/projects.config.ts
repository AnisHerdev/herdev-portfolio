import { ProjectConfig } from "../types/project.types";

/**
 * Gist Schema (config.json)
 * 
 * [
 *   {
 *     "repoName": "rock-paper-scissors-rl",
 *     "alias": "AI Hand Gesture — Rock Paper Scissors",
 *     "deployedUrl": "",
 *     "featured": true
 *   }
 * ]
 */

export const LOCAL_FALLBACK: ProjectConfig[] = [
  {
    repoName: "health_care_SLM",
    alias: "Health Care SLM",
    deployedUrl: "",
    featured: true
  },
  {
    repoName: "ppf-projection-calculator-react",
    alias: "PPF Projection Calculator",
    deployedUrl: "",
    featured: true
  },
  {
    repoName: "RockPaperScissor_AIML_Tkinter_CV ",
    alias: "AI Hand Gesture — Rock Paper Scissors",
    deployedUrl: "",
    featured: true
  },
  {
    repoName: "poethra-weekly-leaderboard",
    alias: "Poethra Weekly Leaderboard",
    deployedUrl: "https://poethra-leaderboard.web.app/",
    featured: true
  },
  {
    repoName: "youtube-video-speed-enhancer",
    alias: "YouTube Video Speed Enhancer",
    deployedUrl: "",
    featured: true
  }
];
