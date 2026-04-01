import { useState, useEffect, useCallback } from 'react';
import React, { ReactNode } from 'react';
import { LOCAL_FALLBACK } from '../../config/projects.config';

// ── Types ──────────────────────────────────────────────────────────────────────
export interface HistoryEntry {
  command: string;
  output: ReactNode;
}

export interface TypewriterPayload {
  type: 'typewriter';
  lines: string[];
}

export interface UseTerminalReturn {
  isOpen: boolean;
  isMinimised: boolean;
  isVisible: boolean;
  input: string;
  history: HistoryEntry[];
  commandHistory: string[];
  historyIndex: number;
  hasBeenOpened: boolean;
  setInput: (v: string) => void;
  setHistoryIndex: (v: number) => void;
  openTerminal: () => void;
  closeTerminal: () => void;
  toggleMinimise: () => void;
  submitCommand: (cmd: string) => void;
  autocomplete: (current: string) => string;
}

// ── Constants ──────────────────────────────────────────────────────────────────
const COMMANDS = ['whoami', 'skills', 'projects', 'contact', 'git log', 'clear', 'help'];

const SESSION_OPEN    = 'terminal_open';
const SESSION_HISTORY = 'terminal_history';
const SESSION_OPENED  = 'terminal_hasBeenOpened';

// ── Command implementations ────────────────────────────────────────────────────
function cmdHelp(): ReactNode {
  const rows: [string, string][] = [
    ['whoami',   'About me — rendered with a typewriter effect'],
    ['skills',   'Languages, frameworks, and tools I use'],
    ['projects', 'All portfolio projects with links'],
    ['contact',  'Email, GitHub, and LinkedIn'],
    ['git log',  'My personal highlight reel'],
    ['clear',    'Clear the terminal screen'],
    ['help',     'Show this command list'],
  ];

  return React.createElement(
    'table',
    { style: { fontFamily: 'monospace', fontSize: 13, borderCollapse: 'collapse', marginTop: 4 } },
    React.createElement(
      'tbody',
      null,
      ...rows.map(([cmd, desc]) =>
        React.createElement(
          'tr',
          { key: cmd },
          React.createElement('td', { style: { color: '#fff', paddingRight: 24, whiteSpace: 'nowrap', paddingBottom: 3 } }, cmd),
          React.createElement('td', { style: { color: 'rgba(255,255,255,0.5)', paddingBottom: 3 } }, desc)
        )
      )
    )
  );
}

export function cmdWhoami(): TypewriterPayload {
  return {
    type: 'typewriter',
    lines: [
      'S A Herdev Anish',
      'B.Tech (Hons.) CSE · RV University · CGPA 9.40',
      'Specialisation: AIML · Minor: Fintech',
      'Sharp. Creative. Driven.',
    ],
  };
}

function cmdSkills(): ReactNode {
  const sections: { label: string; items: string[] }[] = [
    { label: 'Languages',  items: ['Python', 'Java', 'C', 'HTML/CSS', 'JavaScript', 'SQL', 'MongoDB'] },
    { label: 'Frameworks', items: ['TensorFlow', 'pandas', 'matplotlib', 'Node.js', 'Express.js'] },
    { label: 'Tools',      items: ['VS Code', 'Google Colab', 'Git', 'GitHub Actions', 'Linux'] },
  ];

  return React.createElement(
    'div',
    { style: { fontFamily: 'monospace', fontSize: 13, marginTop: 4 } },
    ...sections.map(({ label, items }) =>
      React.createElement(
        'div',
        { key: label, style: { marginBottom: 6 } },
        React.createElement(
          'span',
          { style: { color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: 11, letterSpacing: 1 } },
          label
        ),
        React.createElement('br'),
        React.createElement('span', { style: { color: '#fff' } }, items.join(', '))
      )
    )
  );
}

function cmdProjects(): ReactNode {
  return React.createElement(
    'ol',
    { style: { fontFamily: 'monospace', fontSize: 13, marginTop: 4, paddingLeft: 24 } },
    ...LOCAL_FALLBACK.map((p) => {
      const href = p.deployedUrl ?? p.repoUrl;
      const children: ReactNode[] = [
        React.createElement('span', { style: { color: '#fff' } }, p.alias),
      ];
      if (href) {
        children.push(' — ');
        children.push(
          React.createElement(
            'a',
            {
              href,
              target: '_blank',
              rel: 'noopener noreferrer',
              style: { color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' },
            },
            href
          )
        );
      }
      return React.createElement('li', { key: p.repoName, style: { marginBottom: 4 } }, ...children);
    })
  );
}

function cmdContact(): ReactNode {
  const links = [
    { label: 'Email',    href: 'mailto:anisherdev@gmail.com',                     display: 'anisherdev@gmail.com' },
    { label: 'GitHub',   href: 'https://github.com/AnisHerdev',                   display: 'github.com/AnisHerdev' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/herdev-anish-1678452a9/', display: 'linkedin.com/in/herdev-anish-1678452a9' },
  ];

  return React.createElement(
    'div',
    { style: { fontFamily: 'monospace', fontSize: 13, marginTop: 4 } },
    ...links.map(({ label, href, display }) =>
      React.createElement(
        'div',
        { key: label, style: { marginBottom: 4 } },
        React.createElement(
          'span',
          { style: { color: 'rgba(255,255,255,0.4)', minWidth: 70, display: 'inline-block' } },
          label + '  '
        ),
        React.createElement(
          'a',
          { href, target: '_blank', rel: 'noopener noreferrer', style: { color: '#fff', textDecoration: 'none' } },
          display
        )
      )
    )
  );
}

function fakeSha(): string {
  return Math.floor(Math.random() * 0xfffffff).toString(16).padStart(7, '0');
}

function cmdGitLog(): ReactNode {
  const entries = [
    { date: 'Jul 2025', msg: 'Started Developer Intern @ Aarushi Infotech — RAG medical chatbot' },
    { date: 'Jul 2025', msg: 'Co-founded Poethra Writers Club @ RV University' },
    { date: 'May 2025', msg: 'Built AI Hand Gesture RPS — 97.6% accuracy' },
    { date: 'Dec 2024', msg: 'Won Ideathon 3.0 — 1st place among 90+ teams' },
    { date: 'Nov 2024', msg: 'Won CodeCon 2025 — 2nd place, 8hr coding marathon' },
    { date: 'Sep 2023', msg: 'Started B.Tech (Hons.) CSE @ RV University' },
  ];

  return React.createElement(
    'div',
    { style: { fontFamily: 'monospace', fontSize: 13, marginTop: 4 } },
    ...entries.map(({ date, msg }) =>
      React.createElement(
        'div',
        { key: msg, style: { marginBottom: 6 } },
        React.createElement('span', { style: { color: 'rgba(255,255,255,0.3)' } }, fakeSha()),
        ' · ',
        React.createElement('span', { style: { color: 'rgba(255,255,255,0.5)' } }, date),
        ' · ',
        React.createElement('span', { style: { color: '#fff' } }, msg)
      )
    )
  );
}

function cmdUnknown(input: string): ReactNode {
  return React.createElement(
    'span',
    { style: { fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.5)' } },
    `command not found: ${input} — type 'help' for available commands`
  );
}

// ── Hook ───────────────────────────────────────────────────────────────────────
export function useTerminal(): UseTerminalReturn {
  const [isOpen,         setIsOpen]         = useState(() => sessionStorage.getItem(SESSION_OPEN) === 'true');
  const [isMinimised,    setIsMinimised]    = useState(false);
  const [isVisible,      setIsVisible]      = useState(false);
  const [input,          setInput]          = useState('');
  const [history,        setHistory]        = useState<HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>(() => {
    try { return JSON.parse(sessionStorage.getItem(SESSION_HISTORY) ?? '[]'); }
    catch { return []; }
  });
  const [historyIndex,   setHistoryIndex]   = useState(-1);
  const [hasBeenOpened,  setHasBeenOpened]  = useState(
    () => sessionStorage.getItem(SESSION_OPENED) === 'true'
  );

  // Scroll visibility listener
  useEffect(() => {
    const handler = () => setIsVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Sync sessionStorage
  useEffect(() => { sessionStorage.setItem(SESSION_OPEN,    String(isOpen));              }, [isOpen]);
  useEffect(() => { sessionStorage.setItem(SESSION_HISTORY, JSON.stringify(commandHistory)); }, [commandHistory]);
  useEffect(() => { sessionStorage.setItem(SESSION_OPENED,  String(hasBeenOpened));       }, [hasBeenOpened]);

  const openTerminal   = useCallback(() => { setIsOpen(true); if (!hasBeenOpened) setHasBeenOpened(true); }, [hasBeenOpened]);
  const closeTerminal  = useCallback(() => { setIsOpen(false); setIsMinimised(false); }, []);
  const toggleMinimise = useCallback(() => setIsMinimised(v => !v), []);

  const submitCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setCommandHistory(prev => [raw, ...prev].slice(0, 20));
    setHistoryIndex(-1);

    if (cmd === 'clear') { setHistory([]); return; }

    let output: ReactNode;
    if      (cmd === 'help')    output = cmdHelp();
    else if (cmd === 'whoami')  output = cmdWhoami() as unknown as ReactNode;
    else if (cmd === 'skills')  output = cmdSkills();
    else if (cmd === 'projects') output = cmdProjects();
    else if (cmd === 'contact') output = cmdContact();
    else if (cmd === 'git log') output = cmdGitLog();
    else                        output = cmdUnknown(raw.trim());

    setHistory(prev => [...prev, { command: raw.trim(), output }]);
  }, []);

  const autocomplete = useCallback((current: string): string => {
    if (!current) return current;
    const match = COMMANDS.find(c => c.startsWith(current.toLowerCase()));
    return match ?? current;
  }, []);

  return {
    isOpen, isMinimised, isVisible,
    input, setInput,
    history,
    commandHistory, historyIndex, setHistoryIndex,
    hasBeenOpened,
    openTerminal, closeTerminal, toggleMinimise,
    submitCommand, autocomplete,
  };
}
