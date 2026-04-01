import React, { useState } from 'react';
import { useTerminal } from './useTerminal';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';

// ── Boot message ───────────────────────────────────────────────────────────────
const BootMessage: React.FC = () => {
  const now = new Date();
  const formatted = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month:   'short',
    day:     'numeric',
    year:    'numeric',
  });

  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: 12,
          color: 'rgba(255,255,255,0.3)',
        }}
      >
        Last login: {formatted}
      </div>
      <div style={{ height: 8 }} />
    </div>
  );
};

// ── Traffic light group ────────────────────────────────────────────────────────
interface TrafficLightsProps {
  onClose: () => void;
  onMinimise: () => void;
}

const TrafficLights: React.FC<TrafficLightsProps> = ({ onClose, onMinimise }) => {
  const [hovered, setHovered] = useState(false);

  const lights = [
    { color: '#FF5F57', symbol: '×', onClick: onClose },
    { color: '#FFBD2E', symbol: '−', onClick: onMinimise },
    { color: '#28C840', symbol: '+', onClick: () => {} },
  ];

  return (
    <div
      style={{ display: 'flex', gap: 6, alignItems: 'center' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {lights.map(({ color, symbol, onClick }) => (
        <button
          key={color}
          onClick={onClick}
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: color,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            flexShrink: 0,
          }}
          aria-label={symbol}
        >
          {hovered && (
            <span style={{ color: 'rgba(0,0,0,0.6)', fontSize: 8, lineHeight: 1, fontWeight: 700 }}>
              {symbol}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

// ── Main Terminal component ───────────────────────────────────────────────────
const Terminal: React.FC = () => {
  const {
    isOpen, isMinimised, isVisible,
    input, setInput,
    history,
    commandHistory, historyIndex, setHistoryIndex,
    hasBeenOpened,
    openTerminal, closeTerminal, toggleMinimise,
    submitCommand, autocomplete,
  } = useTerminal();

  if (!isVisible && !isOpen) return null;

  return (
    <>
      {/* ── Trigger button ─────────────────────────────────────────────────── */}
      {!isOpen && isVisible && (
        <button
          onClick={openTerminal}
          aria-label="Open terminal"
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 50,
            width: 44,
            height: 44,
            borderRadius: 10,
            background: '#1E1E1E',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 150ms',
            animation: 'termButtonFadeIn 250ms ease-out',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#2A2A2A')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#1E1E1E')}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 14,
              fontWeight: 700,
              color: '#28C840',
              userSelect: 'none',
            }}
          >
            {'>_'}
          </span>

          {/* Pulse dot */}
          {!hasBeenOpened && (
            <span
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#28C840',
                animation: 'termPulse 1.5s ease-in-out infinite',
              }}
            />
          )}
        </button>
      )}

      {/* ── Terminal panel ─────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            zIndex: 50,
            width: '100%',
            maxWidth: 480,
            height: 520,
            borderRadius: '10px 10px 0 0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 -4px 30px rgba(0,0,0,0.6)',
            transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 250ms ease-out',

            // Mobile override applied via JS below
          }}
          className="terminal-panel"
        >
          {/* Title bar */}
          <div
            style={{
              height: 40,
              background: '#3A3A3A',
              borderRadius: '10px 10px 0 0',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 12,
              paddingRight: 12,
              flexShrink: 0,
              position: 'relative',
            }}
          >
            <TrafficLights onClose={closeTerminal} onMinimise={toggleMinimise} />

            {/* Centred title */}
            <span
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'monospace',
                fontSize: 12,
                color: 'rgba(255,255,255,0.5)',
                userSelect: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              herdev@portfolio ~ zsh
            </span>
          </div>

          {/* Output area */}
          {!isMinimised && (
            <div
              style={{
                flex: 1,
                background: '#1E1E1E',
                padding: 12,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <BootMessage />
              <TerminalOutput history={history} />
            </div>
          )}

          {/* Input strip */}
          {!isMinimised && (
            <div
              style={{
                height: 44,
                background: '#1E1E1E',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                padding: '0 12px',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <TerminalInput
                input={input}
                isOpen={isOpen}
                commandHistory={commandHistory}
                historyIndex={historyIndex}
                setInput={setInput}
                setHistoryIndex={setHistoryIndex}
                onSubmit={submitCommand}
                onAutocomplete={autocomplete}
                onClose={closeTerminal}
              />
            </div>
          )}
        </div>
      )}

      {/* ── Global terminal keyframe styles ───────────────────────────────── */}
      <style>{`
        @keyframes termButtonFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes termPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
        @keyframes termCursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @media (max-width: 767px) {
          .terminal-panel {
            max-width: 100% !important;
            right: 0 !important;
            left: 0 !important;
            height: 60vh !important;
            border-radius: 16px 16px 0 0 !important;
          }
        }
      `}</style>
    </>
  );
};

export default Terminal;
