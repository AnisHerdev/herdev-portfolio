import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { HistoryEntry, TypewriterPayload } from './useTerminal';

// ── Type guard ─────────────────────────────────────────────────────────────────
function isTypewriterPayload(v: unknown): v is TypewriterPayload {
  return (
    v !== null &&
    v !== undefined &&
    typeof v === 'object' &&
    !Array.isArray(v) &&
    (v as TypewriterPayload).type === 'typewriter' &&
    Array.isArray((v as TypewriterPayload).lines)
  );
}

// ── Typewriter block ───────────────────────────────────────────────────────────
const TypewriterOutput: React.FC<{ payload: TypewriterPayload }> = ({ payload }) => {
  const full = payload.lines.join('\n');
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    idx.current = 0;
    setDisplayed('');
    setDone(false);

    const id = setInterval(() => {
      idx.current += 1;
      setDisplayed(full.slice(0, idx.current));
      if (idx.current >= full.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 18);

    return () => clearInterval(id);
  }, [full]);

  return (
    <pre
      style={{
        fontFamily: 'monospace',
        fontSize: 13,
        color: '#fff',
        margin: 0,
        whiteSpace: 'pre-wrap',
        lineHeight: 1.6,
      }}
    >
      {displayed}
      {!done && (
        <span style={{ animation: 'termCursorBlink 1s step-end infinite' }}>|</span>
      )}
    </pre>
  );
};

// ── Main output component ──────────────────────────────────────────────────────
interface TerminalOutputProps {
  history: HistoryEntry[];
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ history }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <>
      {history.map((entry, i) => {
        const raw: unknown = entry.output;
        const isTypewriter = isTypewriterPayload(raw);

        return (
          <div key={i} style={{ marginBottom: 12 }}>
            {/* Prompt */}
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: 13,
                color: 'rgba(255,255,255,0.5)',
                marginBottom: 4,
              }}
            >
              <span style={{ color: '#28C840' }}>herdev@portfolio</span>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}> ~ %</span>
              {' '}
              <span style={{ color: '#fff' }}>{entry.command}</span>
            </div>

            {/* Output */}
            {raw != null && (
              isTypewriter
                ? <TypewriterOutput payload={raw as TypewriterPayload} />
                : <div>{raw as ReactNode}</div>
            )}
          </div>
        );
      })}
      <div ref={bottomRef} />
    </>
  );
};

export default TerminalOutput;
