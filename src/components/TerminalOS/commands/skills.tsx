import React from 'react';

export default function skills(): React.ReactNode {
  const sections = [
    { label: 'Languages',  items: ['Python', 'Java', 'C', 'HTML/CSS', 'JavaScript', 'SQL', 'MongoDB'] },
    { label: 'Frameworks', items: ['TensorFlow', 'pandas', 'matplotlib', 'Node.js', 'Express.js'] },
    { label: 'Tools',      items: ['VS Code', 'Google Colab', 'Git', 'GitHub Actions', 'Linux'] },
  ];

  return (
    <div style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 1.7 }}>
      {sections.map(({ label, items }, i) => (
        <div key={label} style={{ marginBottom: i < sections.length - 1 ? 12 : 0 }}>
          <div
            style={{
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: 11,
            }}
          >
            {label}
          </div>
          <div style={{ color: '#fff' }}>{items.join(', ')}</div>
        </div>
      ))}
    </div>
  );
}
