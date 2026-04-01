import React from 'react';

export default function contact(): React.ReactNode {
  const links = [
    { label: 'Email',    href: 'mailto:anisherdev@gmail.com',                     display: 'anisherdev@gmail.com' },
    { label: 'GitHub',   href: 'https://github.com/AnisHerdev',                   display: 'github.com/AnisHerdev' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/herdev-anish-1678452a9/', display: 'linkedin.com/in/herdev-anish-1678452a9' },
  ];

  return (
    <div style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 2 }}>
      {links.map(({ label, href, display }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', minWidth: 80 }}>{label}</span>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#58A6FF', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
          >
            {display}
          </a>
        </div>
      ))}
    </div>
  );
}
