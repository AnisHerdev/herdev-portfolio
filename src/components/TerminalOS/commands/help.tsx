import React from 'react';

export default function help(): React.ReactNode {
  const commands: [string, string][] = [
    ['whoami',   'Display personal info and tagline'],
    ['skills',   'List technical skills by category'],
    ['projects', 'Browse projects with links'],
    ['contact',  'Get contact information and social links'],
    ['git log',  'View experience and achievements timeline'],
    ['clear',    'Clear the terminal'],
    ['exit',     'Return to portfolio'],
    ['help',     'Show this help message'],
  ];

  return (
    <div style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 1.7 }}>
      <div style={{ color: '#28C840', marginBottom: 8 }}>Available commands:</div>
      <div style={{ height: 4 }} />
      {commands.map(([cmd, desc]) => (
        <div key={cmd} style={{ display: 'flex' }}>
          <span style={{ color: '#fff', minWidth: 120 }}>{cmd}</span>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</span>
        </div>
      ))}
    </div>
  );
}
