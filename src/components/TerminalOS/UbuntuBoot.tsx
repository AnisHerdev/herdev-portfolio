import React, { useEffect, useState } from 'react';

const STATUS_MESSAGES = [
  '[ ok ] Started portfolio kernel...',
  '[ ok ] Mounting glassmorphism layers...',
  '[ ok ] Loading React components...',
  '[ ok ] Initialising project database...',
  '[ ok ] Starting terminal service...',
  '[ ok ] HerdevOS ready.',
];

const UBUNTU_LOGO = `  ░░░░░░░░░░░░░░░░░░░░░░
  ░░░██████░░██████░░░░░
  ░░██░░░░██░██░░░░██░░░
  ░░██░░░░██░██░░░░██░░░
  ░░░██████░░░██████░░░░
  ░░░░░░██░░░░░░██░░░░░░
  ░░░░░░██░░░░░░██░░░░░░
  ░░░░░░░░░░░░░░░░░░░░░░`;

const TERMINAL_ASCII = `
██╗  ██╗███████╗██████╗ ██████╗ ███████╗██╗   ██╗
██║  ██║██╔════╝██╔══██╗██╔══██╗██╔════╝██║   ██║
███████║█████╗  ██████╔╝██║  ██║█████╗  ██║   ██║
██╔══██║██╔══╝  ██╔══██╗██║  ██║██╔══╝  ╚██╗ ██╔╝
██║  ██║███████╗██║  ██║██████╔╝███████╗ ╚████╔╝ 
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝  ╚═══╝  
`;

const UbuntuBoot: React.FC = () => {
  const [progressWidth, setProgressWidth] = useState('0%');
  const [statusIdx, setStatusIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [uptime] = useState(() => Math.floor((Date.now() - performance.timeOrigin) / 1000));
  const [resolution] = useState(() => `${window.innerWidth} x ${window.innerHeight}`);

  // Trigger progress bar animation shortly after mount
  useEffect(() => {
    const t = setTimeout(() => setProgressWidth('100%'), 50);
    return () => clearTimeout(t);
  }, []);

  // Cycle status messages every 600ms, stop at last
  useEffect(() => {
    if (statusIdx >= STATUS_MESSAGES.length - 1) return;
    const id = setInterval(() => {
      setStatusIdx(prev => {
        const next = prev + 1;
        if (next >= STATUS_MESSAGES.length - 1) clearInterval(id);
        return next;
      });
    }, 600);
    return () => clearInterval(id);
  }, []);

  // Fade out 400ms before phase changes to 'desktop' (at 3000ms after mount)
  useEffect(() => {
    const t = setTimeout(() => setFading(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const infoRows: Array<{ label: string; value: string; special?: 'header' | 'divider' }> = [
    { label: 'OS',         value: 'HerdevOS 1.0.0 LTS' },
    { label: 'Host',       value: 'portfolio.anisherdev.dev' },
    { label: 'Kernel',     value: 'herdev-6.8.0-portfolio' },
    { label: 'Uptime',     value: `${uptime}s` },
    { label: 'Shell',      value: 'zsh 5.9' },
    { label: 'Resolution', value: resolution },
    { label: 'Theme',      value: 'Glassmorphism Dark' },
    { label: 'Stack',      value: 'React · TypeScript · Vite' },
    { label: 'CPU',        value: 'Brain (8 cores, overclocked)' },
    { label: 'Memory',     value: 'Ideas / ∞' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: '#1E1E1E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        opacity: fading ? 0 : 1,
        transition: 'opacity 400ms ease',
      }}
    >
      {/* Section A — Ubuntu logo + distro name */}
      <div style={{ textAlign: 'center' }}>
        <pre
          style={{
            color: '#E95420',
            fontSize: 13,
            lineHeight: 1.4,
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          {UBUNTU_LOGO}
        </pre>
        <div style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginTop: 12 }}>
          HerdevOS 1.0.0 LTS
        </div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 4 }}>
          Based on Ubuntu 24.04 · Kernel herdev-6.8.0-portfolio
        </div>
      </div>

      {/* Section B — neofetch-style system info panel */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 48,
          marginTop: 32,
          alignItems: 'flex-start',
        }}
      >
        {/* Left — ">_" ASCII art */}
        <div style={{ textAlign: 'center' }}>
          <pre
            style={{
              color: '#28C840',
              fontSize: 10,
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {TERMINAL_ASCII}
          </pre>
          <div
            style={{
              color: 'rgba(40,200,64,0.6)',
              fontSize: 10,
              marginTop: 6,
              textAlign: 'center',
            }}
          >
            portfolio terminal v1.0
          </div>
        </div>

        {/* Right — info table */}
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 13,
            lineHeight: 1.8,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {infoRows.map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'row' }}>
              <span
                style={{
                  color: '#28C840',
                  minWidth: 100,
                  display: 'inline-block',
                  fontWeight: 600,
                }}
              >
                {label}
              </span>
              <span style={{ color: '#ffffff' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section C — progress bar */}
      <div style={{ marginTop: 40, width: 280 }}>
        <div
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: 11,
            fontFamily: 'monospace',
            marginBottom: 8,
          }}
        >
          Loading portfolio...
        </div>
        <div
          style={{
            width: '100%',
            height: 4,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              background: '#E95420',
              height: '100%',
              borderRadius: 2,
              width: progressWidth,
              transition: 'width 2800ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: 11,
            fontFamily: 'monospace',
            marginTop: 8,
          }}
        >
          {STATUS_MESSAGES[statusIdx]}
        </div>
      </div>
    </div>
  );
};

export default UbuntuBoot;
