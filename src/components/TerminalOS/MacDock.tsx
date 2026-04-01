import React, { useState } from 'react';

interface DockIcon {
  name: string;
  bg: string;
  content: React.ReactNode;
  isActive?: boolean;
}

const GlobeSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const CodeSVG = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

const OctocatSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const NotesSVG = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round">
    <line x1="4" y1="7" x2="20" y2="7"/>
    <line x1="4" y1="12" x2="20" y2="12"/>
    <line x1="4" y1="17" x2="14" y2="17"/>
  </svg>
);

const MusicSVG = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/>
    <circle cx="18" cy="16" r="3"/>
  </svg>
);

const MailSVG = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const icons: DockIcon[] = [
  {
    name: 'Terminal',
    bg: '#1E1E1E',
    isActive: true,
    content: (
      <span style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 700, color: '#28C840' }}>{'>_'}</span>
    ),
  },
  { name: 'Finder',  bg: '#4A90D9', content: <span style={{ fontSize: 26 }}>📁</span> },
  { name: 'Safari',  bg: 'linear-gradient(135deg, #006EFF, #00C8FF)', content: <GlobeSVG /> },
  { name: 'VS Code', bg: '#23A9F2', content: <CodeSVG /> },
  { name: 'GitHub',  bg: '#24292E', content: <OctocatSVG /> },
  { name: 'Notes',   bg: '#FFD60A', content: <NotesSVG /> },
  { name: 'Music',   bg: '#FC3C44', content: <MusicSVG /> },
  { name: 'Mail',    bg: '#3478F6', content: <MailSVG /> },
];

const MacDock: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 8,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 18,
        padding: '8px 12px',
        display: 'flex',
        gap: 8,
        alignItems: 'flex-end',
        zIndex: 100,
      }}
    >
      {icons.map((icon, i) => (
        <div
          key={icon.name}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', cursor: 'default' }}
        >
          {/* Tooltip */}
          {hoveredIndex === i && (
            <div
              style={{
                position: 'absolute',
                bottom: 66,
                background: 'rgba(30,30,30,0.9)',
                color: 'white',
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 6,
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 200,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {icon.name}
            </div>
          )}

          {/* Icon */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: icon.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: hoveredIndex === i ? 'translateY(-8px) scale(1.15)' : 'translateY(0) scale(1)',
              transition: 'transform 150ms ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
              flexShrink: 0,
            }}
          >
            {icon.content}
          </div>

          {/* Active indicator dot */}
          {icon.isActive && (
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.7)',
                marginTop: 3,
              }}
            />
          )}
          {!icon.isActive && <div style={{ height: 7 }} />}
        </div>
      ))}
    </div>
  );
};

export default MacDock;
