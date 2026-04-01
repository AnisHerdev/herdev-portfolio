import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BootPhase } from '../../hooks/useBootSequence';
import TerminalEngine from './TerminalEngine';

interface MacWindowProps {
  phase: BootPhase;
}

// ── Traffic lights ─────────────────────────────────────────────────────────────
interface TrafficLightsProps {
  onClose: () => void;
  onMinimise: () => void;
  onMaximise: () => void;
}

const TrafficLights: React.FC<TrafficLightsProps> = ({ onClose, onMinimise, onMaximise }) => {
  const [hovered, setHovered] = useState(false);
  const lights = [
    { color: '#FF5F57', symbol: '×', onClick: onClose },
    { color: '#FFBD2E', symbol: '−', onClick: onMinimise },
    { color: '#28C840', symbol: '⤢', onClick: onMaximise },
  ];
  return (
    <div
      style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {lights.map(({ color, symbol, onClick }) => (
        <button
          key={color}
          onClick={onClick}
          style={{
            width: 12, height: 12, borderRadius: '50%',
            background: color, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0, flexShrink: 0,
          }}
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

// ── Main window ────────────────────────────────────────────────────────────────
const MacWindow: React.FC<MacWindowProps> = ({ phase }) => {
  const navigate   = useNavigate();
  const [minimised, setMinimised] = useState(false);
  const [maximised, setMaximised] = useState(false);

  // Drag state
  const [pos,       setPos]       = useState<{ x: number; y: number } | null>(null);
  const dragging    = useRef(false);
  const dragOffset  = useRef({ x: 0, y: 0 });

  const isSliding = phase === 'window-slide';

  // ── Drag (mouse) ──────────────────────────────────────────────────────────
  const onTitlebarMouseDown = (e: React.MouseEvent) => {
    if (maximised) return;
    dragging.current = true;
    const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const x = Math.min(Math.max(0, e.clientX - dragOffset.current.x), window.innerWidth  - 680);
      const y = Math.min(Math.max(28, e.clientY - dragOffset.current.y), window.innerHeight - 100);
      setPos({ x, y });
    };
    const onMouseUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup',   onMouseUp);
    return () => { window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp); };
  }, []);

  // ── Touch drag ────────────────────────────────────────────────────────────
  const onTitlebarTouchStart = (e: React.TouchEvent) => {
    if (maximised) return;
    dragging.current = true;
    const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
    dragOffset.current = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
  };

  useEffect(() => {
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      const x = Math.min(Math.max(0, e.touches[0].clientX - dragOffset.current.x), window.innerWidth  - 300);
      const y = Math.min(Math.max(28, e.touches[0].clientY - dragOffset.current.y), window.innerHeight - 100);
      setPos({ x, y });
    };
    const onTouchEnd = () => { dragging.current = false; };
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend',  onTouchEnd);
    return () => { window.removeEventListener('touchmove', onTouchMove); window.removeEventListener('touchend', onTouchEnd); };
  }, []);

  // ── Derived styles ────────────────────────────────────────────────────────
  const positionStyle: React.CSSProperties = maximised
    ? { position: 'fixed', top: 28, left: 0, right: 0, bottom: 72, width: 'auto', height: 'auto', borderRadius: 0 }
    : pos
      ? { position: 'fixed', top: pos.y, left: pos.x, width: 680, height: minimised ? 40 : 460 }
      : { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 680, height: minimised ? 40 : 460 };

  const slideStyle: React.CSSProperties = isSliding
    ? { opacity: 0, transform: (positionStyle.transform ?? '') + ' translateY(40px)' }
    : { opacity: 1 };

  return (
    <div
      style={{
        ...positionStyle,
        borderRadius: maximised ? 0 : 12,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 32px 64px rgba(0,0,0,0.8), 0 8px 16px rgba(0,0,0,0.4)',
        transition: 'opacity 400ms cubic-bezier(0.34,1.56,0.64,1), transform 400ms cubic-bezier(0.34,1.56,0.64,1)',
        zIndex: 50,
        ...slideStyle,
      }}
      className="mac-window-responsive"
    >
      {/* Title bar */}
      <div
        style={{
          height: 40,
          background: '#3A3A3A',
          borderRadius: `${maximised ? 0 : 12}px ${maximised ? 0 : 12}px 0 0`,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          cursor: dragging.current ? 'grabbing' : 'grab',
          position: 'relative',
          flexShrink: 0,
          userSelect: 'none',
        }}
        onMouseDown={onTitlebarMouseDown}
        onTouchStart={onTitlebarTouchStart}
      >
        <TrafficLights
          onClose={() => navigate('/')}
          onMinimise={() => setMinimised(v => !v)}
          onMaximise={() => setMaximised(v => !v)}
        />
        {/* Centred title */}
        <span
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'monospace',
            fontSize: 12,
            color: 'rgba(255,255,255,0.5)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          herdev@portfolio — zsh — 80×24
        </span>
      </div>

      {/* Content */}
      {!minimised && (
        <div style={{ flex: 1, background: '#1E1E1E', overflow: 'hidden' }}>
          <TerminalEngine />
        </div>
      )}

      {/* Mobile responsive override */}
      <style>{`
        @media (max-width: 767px) {
          .mac-window-responsive {
            width: 90vw !important;
            height: 70vh !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            position: fixed !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MacWindow;
