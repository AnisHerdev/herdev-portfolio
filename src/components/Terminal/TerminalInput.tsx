import React, { useEffect, useRef } from 'react';

interface TerminalInputProps {
  input: string;
  isOpen: boolean;
  commandHistory: string[];
  historyIndex: number;
  setInput: (v: string) => void;
  setHistoryIndex: (v: number) => void;
  onSubmit: (cmd: string) => void;
  onAutocomplete: (current: string) => string;
  onClose: () => void;
}

const TerminalInput: React.FC<TerminalInputProps> = ({
  input,
  isOpen,
  commandHistory,
  historyIndex,
  setInput,
  setHistoryIndex,
  onSubmit,
  onAutocomplete,
  onClose,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus when terminal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit(input);
      setInput('');
      setHistoryIndex(-1);
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      setInput(onAutocomplete(input));
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(next);
      setInput(commandHistory[next] ?? '');
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInput(next === -1 ? '' : (commandHistory[next] ?? ''));
      return;
    }

    if (e.key === 'Escape') {
      onClose();
      return;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'monospace',
        fontSize: 13,
        gap: 6,
        width: '100%',
      }}
    >
      {/* Prompt prefix */}
      <span style={{ color: '#28C840', whiteSpace: 'nowrap', userSelect: 'none' }}>
        herdev@portfolio ~ %
      </span>

      {/* Input field */}
      <input
        ref={inputRef}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: '#fff',
          fontFamily: 'monospace',
          fontSize: 13,
          caretColor: 'white',
          minWidth: 0,
        }}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        aria-label="Terminal input"
      />
    </div>
  );
};

export default TerminalInput;
