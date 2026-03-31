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
    repoName: "rock-paper-scissors-rl", 
    alias: "AI Hand Gesture — Rock Paper Scissors", 
    deployedUrl: "", 
    featured: true 
  },
  { 
    repoName: "ppf-calculator", 
    alias: "PPF Projection Calculator", 
    deployedUrl: "", 
    featured: true 
  },
  { 
    repoName: "poethra-leaderboard", 
    alias: "Poethra Weekly Leaderboard", 
    deployedUrl: "", 
    featured: true 
  }
];
