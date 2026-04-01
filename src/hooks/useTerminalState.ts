import { useState, useCallback } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import registry, { COMMAND_NAMES } from '../components/TerminalOS/commands/index';
import { TypewriterPayload } from '../components/TerminalOS/commands/whoami';

export interface HistoryEntry {
  id: string;
  command: string;
  output: React.ReactNode | TypewriterPayload;
}

export interface UseTerminalStateReturn {
  history: HistoryEntry[];
  input: string;
  setInput: (v: string) => void;
  handleCommand: (raw: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SESSION_CMD_HISTORY = 'terminal_cmd_history';

function loadCmdHistory(): string[] {
  try { return JSON.parse(sessionStorage.getItem(SESSION_CMD_HISTORY) ?? '[]'); }
  catch { return []; }
}

function saveCmdHistory(arr: string[]) {
  sessionStorage.setItem(SESSION_CMD_HISTORY, JSON.stringify(arr));
}

export function useTerminalState(): UseTerminalStateReturn {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input,   setInput]   = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>(loadCmdHistory);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const handleCommand = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const cmd = trimmed.toLowerCase();

    // Update command history (no consecutive duplicates)
    setCmdHistory(prev => {
      const next = prev[0] === trimmed ? prev : [trimmed, ...prev].slice(0, 20);
      saveCmdHistory(next);
      return next;
    });
    setHistoryIdx(-1);
    setInput('');

    if (cmd === 'exit') {
      navigate('/');
      return;
    }

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    const handler = registry[cmd];
    const output = handler ? handler() : (
      React.createElement(
        'span',
        { style: { fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.5)' } },
        `command not found: ${trimmed} — type 'help' for available commands`
      )
    );

    const id = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 8);

    setHistory(prev => [...prev, { id, command: trimmed, output }]);
  }, [navigate]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? '' : (cmdHistory[next] ?? ''));
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (input) {
        const match = COMMAND_NAMES.find(c => c.startsWith(input.toLowerCase()));
        if (match) setInput(match);
      }
    }
  }, [historyIdx, cmdHistory, input]);

  return { history, input, setInput, handleCommand, handleKeyDown };
}
