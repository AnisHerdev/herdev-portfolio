import React from 'react';

export default function gitlog(): React.ReactNode {
  const entries = [
    { hex: 'a3f9c21', date: 'Jul 2025', msg: 'feat: joined Aarushi Infotech as Developer Intern — RAG medical chatbot for 1.2M ASHA workers' },
    { hex: 'b82e4d0', date: 'Jul 2025', msg: 'feat: co-founded Poethra Writers Club — managed ₹15,000 budget, delivered ₹3,076 surplus' },
    { hex: 'c14a87f', date: 'May 2025', msg: 'feat: shipped AI Hand Gesture RPS — 97.6% accuracy, Q-learning RL, CI/CD via GitHub Actions' },
    { hex: 'd3091bc', date: 'Dec 2024', msg: 'award: Ideathon 3.0 — 1st place among 90+ teams, AI-driven phishing detection' },
    { hex: 'e77f3a5', date: 'Nov 2024', msg: 'award: CodeCon 2025 — 2nd place, 8-hour coding marathon' },
    { hex: 'f209d6e', date: 'Sep 2023', msg: 'init: started B.Tech (Hons.) CSE @ RV University · CGPA 9.40 · AIML + Fintech' },
  ];

  return (
    <div style={{ fontFamily: 'monospace', fontSize: 13 }}>
      {entries.map(({ hex, date, msg }) => (
        <div key={hex} style={{ marginBottom: 12 }}>
          <div style={{ color: '#F0A500' }}>commit {hex}</div>
          <div style={{ color: 'rgba(255,255,255,0.4)' }}>Date:   {date}</div>
          <div style={{ height: 4 }} />
          <div style={{ color: '#fff', paddingLeft: 16 }}>{msg}</div>
        </div>
      ))}
    </div>
  );
}
