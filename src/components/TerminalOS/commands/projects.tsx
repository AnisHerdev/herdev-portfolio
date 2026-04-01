import React from 'react';
import { LOCAL_FALLBACK } from '../../../config/projects.config';

export default function projects(): React.ReactNode {
  return (
    <div style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 1.8 }}>
      <div style={{ color: '#28C840', marginBottom: 8 }}>Projects:</div>
      <div style={{ height: 4 }} />
      {LOCAL_FALLBACK.map((p, i) => {
        const href = p.deployedUrl ?? p.repoUrl;
        return (
          <div key={p.repoName} style={{ marginBottom: 6 }}>
            <div style={{ color: '#fff' }}>{i + 1}. {p.alias}</div>
            <div style={{ paddingLeft: 16 }}>
              {'→ '}
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#58A6FF', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                  {href}
                </a>
              ) : (
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>(private)</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
