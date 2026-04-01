import React, { useEffect, useRef, useState } from 'react';
import { HistoryEntry } from '../../hooks/useTerminalState';
import { TypewriterPayload } from './commands/whoami';

function isTypewriter(v: unknown): v is TypewriterPayload {
  return (
    v !== null &&
    v !== undefined &&
    typeof v === 'object' &&
    !Array.isArray(v) &&
    (v as TypewriterPayload).__type === 'typewriter' &&
    Array.isArray((v as TypewriterPayload).lines)
  );
}

// ── Typewriter sub-component ───────────────────────────────────────────────────
const TypewriterBlock: React.FC<{ payload: TypewriterPayload; onTick: () => void }> = ({ payload, onTick }) => {
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
      onTick();
      if (idx.current >= full.length) { clearInterval(id); setDone(true); }
    }, 18);
    return () => clearInterval(id);
  }, [full]); // eslint-disable-line

  return (
    <pre style={{ fontFamily: 'monospace', fontSize: 13, color: '#fff', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
      {displayed}
      {!done && (
        <span style={{ animation: 'twBlink 1s step-end infinite', display: 'inline-block' }}>▋</span>
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

  const scrollDown = () => bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(scrollDown, [history]);

  const now = new Date();
  const bootDate = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Boot message */}
      <div style={{ fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>
        Last login: {bootDate} on ttys001
      </div>

      {/* History entries */}
      {history.map(entry => {
        const raw: unknown = entry.output;
        const tw = isTypewriter(raw);
        return (
          <div key={entry.id} style={{ marginBottom: 8 }}>
            {/* Prompt line */}
            <div style={{ fontFamily: 'monospace', fontSize: 13, marginBottom: 2 }}>
              <span style={{ color: '#28C840' }}>herdev@portfolio ~ %</span>
              {' '}
              <span style={{ color: '#fff' }}>{entry.command}</span>
            </div>
            {/* Output */}
            {raw != null && (
              tw
                ? <TypewriterBlock payload={raw as TypewriterPayload} onTick={scrollDown} />
                : <div>{raw as React.ReactNode}</div>
            )}
          </div>
        );
      })}

      <div ref={bottomRef} />

      <style>{`
        @keyframes twBlink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
};

export default TerminalOutput;
