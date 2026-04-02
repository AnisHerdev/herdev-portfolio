import React from 'react';

const TERMINAL_ASCII = `
██╗  ██╗███████╗██████╗ ██████╗ ███████╗██╗   ██╗
██║  ██║██╔════╝██╔══██╗██╔══██╗██╔════╝██║   ██║
███████║█████╗  ██████╔╝██║  ██║█████╗  ██║   ██║
██╔══██║██╔══╝  ██╔══██╗██║  ██║██╔══╝  ╚██╗ ██╔╝
██║  ██║███████╗██║  ██║██████╔╝███████╗ ╚████╔╝ 
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝  ╚═══╝  
`;


const COLOR_SWATCHES = [
  '#FF5F57',
  '#FFBD2E',
  '#28C840',
  '#58A6FF',
  '#E95420',
  '#9B59B6',
  '#1E1E1E',
  '#FFFFFF',
];

export function renderWelcomeSplash(): React.ReactNode {
  return (
    <div style={{ fontFamily: 'monospace', paddingTop: 4, paddingBottom: 8 }}>
      {/* Two-column layout */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 32, alignItems: 'flex-start' }}>
        {/* Left — ">_" ASCII art */}
        <pre
          style={{
            color: '#28C840',
            fontFamily: 'monospace',
            fontSize: 11,
            lineHeight: 1.2,
            margin: 0,
            flexShrink: 0,
          }}
        >
          {TERMINAL_ASCII}
        </pre>

        {/* Right — info table */}
        <div style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 1.9 }}>
          {/* Header */}
          <div style={{ color: '#ffffff', fontWeight: 700 }}>anisherdev@portfolio</div>
          {/* Divider */}
          <div style={{ color: 'rgba(255,255,255,0.2)' }}>────────────────────</div>

          {/* Info rows */}
          {(
            [
              ['OS', 'HerdevOS 1.0.0 LTS'],
              ['Shell', 'zsh 5.9'],
              ['Stack', 'React · TypeScript · Vite'],
              ['Role', 'B.Tech CSE · AIML · Fintech'],
              ['University', 'RV University · CGPA 9.40'],
              ['Contact', 'anisherdev@gmail.com'],
              ['GitHub', 'github.com/AnisHerdev'],
            ] as Array<[string, string]>
          ).map(([label, value]) => (
            <div key={label}>
              <span
                style={{
                  color: '#28C840',
                  minWidth: 90,
                  display: 'inline-block',
                  fontWeight: 600,
                }}
              >
                {label}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Colour swatches */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 6, marginTop: 16 }}>
        {COLOR_SWATCHES.map(color => (
          <div
            key={color}
            style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              background: color,
              border: color === '#1E1E1E' ? '1px solid rgba(255,255,255,0.15)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Hint text */}
      <div
        style={{
          color: 'rgba(255,255,255,0.3)',
          fontFamily: 'monospace',
          fontSize: 12,
          marginTop: 12,
        }}
      >
        Type &apos;help&apos; to see available commands. Type &apos;exit&apos; to return to portfolio.
      </div>
    </div>
  );
}
