import React, { useEffect } from 'react';
import { useBootSequence } from '../hooks/useBootSequence';
import MacDesktop from '../components/TerminalOS/MacDesktop';
import MacWindow from '../components/TerminalOS/MacWindow';

const SESSION_BOOTED = 'terminal_hasBooted';

const TerminalPage: React.FC = () => {
  const alreadyBooted = sessionStorage.getItem(SESSION_BOOTED) === 'true';
  const { phase } = useBootSequence(alreadyBooted);

  // Mark as booted once we reach 'ready'
  useEffect(() => {
    if (phase === 'ready') {
      sessionStorage.setItem(SESSION_BOOTED, 'true');
    }
  }, [phase]);

  // Hide site chrome (Navbar, Footer) while on this page
  useEffect(() => {
    document.body.classList.add('hide-chrome');
    return () => document.body.classList.remove('hide-chrome');
  }, []);

  // ── Phase: off ─────────────────────────────────────────────────────────────
  if (phase === 'off') {
    return <div style={{ background: '#000', width: '100vw', height: '100vh' }} />;
  }

  // ── Phase: flicker ─────────────────────────────────────────────────────────
  if (phase === 'flicker') {
    return (
      <div style={{ background: '#000', width: '100vw', height: '100vh', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#fff',
            animation: 'screenFlicker 400ms forwards',
          }}
        />
        <style>{`
          @keyframes screenFlicker {
            0%   { opacity: 0; }
            20%  { opacity: 0.8; }
            40%  { opacity: 0; }
            60%  { opacity: 0.4; }
            80%  { opacity: 0; }
            100% { opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  // ── Phase: desktop (no window yet) ─────────────────────────────────────────
  if (phase === 'desktop') {
    return <MacDesktop />;
  }

  // ── Phase: window-slide + ready ────────────────────────────────────────────
  return (
    <MacDesktop>
      <MacWindow phase={phase} />
    </MacDesktop>
  );
};

export default TerminalPage;
