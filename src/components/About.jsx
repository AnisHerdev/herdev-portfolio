import React from 'react';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">Empathy Meets Engineering</h2>
        <div className="v1-grid">
          {/* Bio card */}
          <div className="about-rich-card v1-c1">
            <div className="arc-card-inner">
              <div className="arc-label"><span className="arc-dot arc-dot--blue"></span>Philosophy</div>
              <p className="arc-quote">"I care for people around me — and that drives everything I build."</p>
              <p className="arc-body">Technology is how I translate empathy into impact. Whether it's a note-taking app or a hackathon prototype, I build things that solve real problems for real people.</p>
            </div>
          </div>

          {/* Academic specs */}
          <div className="about-rich-card v1-c2">
            <div className="arc-card-inner">
              <div className="arc-label"><span className="arc-dot arc-dot--pink"></span>Academic Track</div>
              <div className="arc-spec-row">
                <span className="arc-spec-label">Degree</span>
                <span className="arc-spec-value">B.Tech (Hons.) CSE</span>
              </div>
              <div className="arc-spec-row">
                <span className="arc-spec-label">Institution</span>
                <span className="arc-spec-value">RV University</span>
              </div>
              <div className="arc-spec-row">
                <span className="arc-spec-label">Specialization</span>
                <span className="arc-spec-value">AIML</span>
              </div>
              <div className="arc-spec-row">
                <span className="arc-spec-label">Minor</span>
                <span className="arc-spec-value">Fintech</span>
              </div>
              <div className="arc-spec-row">
                <span className="arc-spec-label">Batch</span>
                <span className="arc-spec-value">Class of '27</span>
              </div>
            </div>
          </div>

          {/* Awards */}
          <div className="about-rich-card v1-c3">
            <div className="arc-card-inner">
              <div className="arc-label"><span className="arc-dot arc-dot--amber"></span>Awards</div>
              <div className="arc-award-item">
                <div>
                  <div className="arc-award-title">🥇 Ideathon 3.0 — 1st Place</div>
                  <div className="arc-award-detail">1st among 90+ inter-college teams · Cyber Security domain</div>
                </div>
              </div>
              <div className="arc-award-item">
                <div>
                  <div className="arc-award-title">🥈 CodeCon 2025 — 2nd Place</div>
                  <div className="arc-award-detail">8-hour coding marathon · RV University</div>
                </div>
              </div>
              <div className="arc-award-item">
                <div>
                  <div className="arc-award-title">🏅 Merit Scholarship</div>
                  <div className="arc-award-detail">Top 5% academic rank · Years 1 & 2</div>
                </div>
              </div>
            </div>
          </div>

          {/* Leadership */}
          <div className="about-rich-card v1-c4">
            <div className="arc-card-inner">
              <div className="arc-label"><span className="arc-dot arc-dot--green"></span>Leadership</div>
              <div className="arc-award-item">
                <div>
                  <div className="arc-award-title">Poethra — Writer's Club</div>
                  <div className="arc-award-detail">Co-founder & Treasurer · Jul 2025–Present</div>
                  <div className="arc-award-detail" style={{ marginTop: '0.3rem' }}>Managed ₹15,000 event budget for a large-scale Book Exhibition · Delivered 20.5% surplus returned to college.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="about-rich-card v1-c5">
            <div className="arc-card-inner">
              <div className="arc-label"><span className="arc-dot arc-dot--blue"></span>Certifications</div>
              <div className="arc-award-item">
                <div>
                  <div className="arc-award-title">NPTEL — Modern C++</div>
                  <div className="arc-award-detail">ELITE Certificate</div>
                </div>
              </div>
              <div className="arc-award-item">
                <div>
                  <div className="arc-award-title">IBM SkillsBuild</div>
                  <div className="arc-award-detail">Big Data 101</div>
                </div>
              </div>
              <div className="arc-award-item">
                <div>
                  <div className="arc-award-title">HCI Design</div>
                  <div className="arc-award-detail">Design & Implementation of Human-Computer Interfaces</div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="about-rich-card v1-c6">
            <div className="arc-card-inner">
              <div className="arc-label"><span className="arc-dot arc-dot--pink"></span>Technical Toolkit</div>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginBottom: '0.4rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Languages</div>
                  <div className="arc-skill-tags">
                    {['Python', 'Java', 'C', 'JavaScript', 'SQL', 'HTML/CSS', 'MongoDB'].map(s => <span className="arc-skill-tag" key={s}>{s}</span>)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginBottom: '0.4rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Frameworks</div>
                  <div className="arc-skill-tags">
                    {['TensorFlow', 'pandas', 'Node.js', 'Express.js', 'React', 'Flutter'].map(s => <span className="arc-skill-tag" key={s}>{s}</span>)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginBottom: '0.4rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Tools</div>
                  <div className="arc-skill-tags">
                    {['Git', 'GitHub Actions', 'Firebase', 'VS Code', 'Google Colab'].map(s => <span className="arc-skill-tag" key={s}>{s}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
