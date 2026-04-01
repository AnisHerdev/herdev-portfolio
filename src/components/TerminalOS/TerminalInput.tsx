import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface TerminalInputProps {
  input: string;
  setInput: (v: string) => void;
  handleCommand: (raw: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TerminalInput: React.FC<TerminalInputProps> = ({ input, setInput, handleCommand, handleKeyDown }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Auto-focus on mount
  useEffect(() => { inputRef.current?.focus(); }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      return;
    }
    if (e.key === 'Escape') {
      navigate('/');
      return;
    }
    handleKeyDown(e);
  };

  return (
    <div
      style={{
        height: 44,
        background: '#1E1E1E',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'text',
        flexShrink: 0,
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <span
        style={{
          fontFamily: 'monospace',
          fontSize: 13,
          color: '#28C840',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          userSelect: 'none',
        }}
      >
        herdev@portfolio ~ %
      </span>
      <input
        ref={inputRef}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: '#fff',
          fontFamily: 'monospace',
          fontSize: 13,
          caretColor: '#28C840',
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
