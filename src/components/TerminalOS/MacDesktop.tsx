import React from 'react';
import MacMenubar from './MacMenubar';
import MacDock from './MacDock';

interface MacDesktopProps {
  children?: React.ReactNode;
}

const MacDesktop: React.FC<MacDesktopProps> = ({ children }) => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 20% 50%, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%)',
      }}
    >
      {/* SVG grain filter definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* Grain overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          filter: 'url(#grain)',
          opacity: 0.04,
          pointerEvents: 'none',
          background: '#fff',
        }}
      />

      <MacMenubar />
      <MacDock />

      {/* Page content (the MacWindow) */}
      {children}
    </div>
  );
};

export default MacDesktop;
