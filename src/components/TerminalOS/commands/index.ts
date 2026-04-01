import React from 'react';
import help from './help';
import whoami from './whoami';
import skills from './skills';
import projects from './projects';
import contact from './contact';
import gitlog from './gitlog';

export type CommandHandler = () => React.ReactNode | import('./whoami').TypewriterPayload;

export const COMMAND_NAMES = [
  'whoami', 'skills', 'projects', 'contact', 'git log', 'help', 'clear', 'exit',
];

const registry: Record<string, CommandHandler> = {
  help,
  whoami:   whoami as CommandHandler,
  skills,
  projects,
  contact,
  'git log': gitlog,
  clear:  () => null,
  exit:   () => null,
};

export default registry;
