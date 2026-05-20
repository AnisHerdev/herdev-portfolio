import React from 'react';

export const LoadingHeroSkeleton = () => (
  <section className="hero">
    <div className="hero-container frosted">
      <div className="hero-left">
        <div className="skeleton-element skeleton-avatar"></div>
        <div className="skeleton-element skeleton-title"></div>
        <div className="skeleton-socials">
          <div className="skeleton-element skeleton-icon"></div>
          <div className="skeleton-element skeleton-icon"></div>
          <div className="skeleton-element skeleton-icon"></div>
        </div>
      </div>
      <div className="hero-right">
        <div className="skeleton-element skeleton-tagline"></div>
        <div className="skeleton-intro">
          <div className="skeleton-element skeleton-line"></div>
          <div className="skeleton-element skeleton-line"></div>
          <div className="skeleton-element skeleton-line"></div>
        </div>
        <div className="skeleton-ctas">
          <div className="skeleton-element skeleton-btn"></div>
          <div className="skeleton-element skeleton-btn"></div>
        </div>
      </div>
    </div>
  </section>
);

export const AboutSkeleton = () => (
  <section id="about" className="section">
    <div className="container">
      <div 
        className="animate-pulse" 
        style={{ 
          width: 'clamp(140px, 40vw, 200px)', 
          height: '2rem', 
          borderRadius: '8px', 
          margin: '0 auto 2rem',
          background: 'var(--glass-bg)' 
        }} 
      />
      <div 
        className="about-card frosted"
        style={{ height: 'clamp(160px, 40vw, 200px)' }}
      />
    </div>
  </section>
);

export const SkillsSkeleton = () => (
  <section id="skills" className="section">
    <div className="container">
      <div 
        className="animate-pulse" 
        style={{ 
          width: 'clamp(160px, 50vw, 220px)', 
          height: '2rem', 
          borderRadius: '8px', 
          margin: '0 auto 2rem',
          background: 'var(--glass-bg)' 
        }} 
      />
      <div className="skills-grid">
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            className="skill-card frosted animate-pulse"
            style={{ minHeight: 'clamp(140px, 30vw, 180px)' }}
          />
        ))}
      </div>
    </div>
  </section>
);

export const ProjectsSkeleton = () => (
  <section id="projects" className="section">
    <div className="container">
      <div 
        className="animate-pulse" 
        style={{ 
          width: 'clamp(120px, 40vw, 180px)', 
          height: '2rem', 
          borderRadius: '8px', 
          margin: '0 auto 2rem',
          background: 'var(--glass-bg)' 
        }} 
      />
      <div className="projects-grid">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i}
            className="project-card frosted animate-pulse"
            style={{ minHeight: 'clamp(220px, 50vw, 280px)' }}
          />
        ))}
      </div>
    </div>
  </section>
);

export const ContactSkeleton = () => (
  <section id="contact" className="section">
    <div className="container">
      <div 
        className="contact-card frosted animate-pulse"
        style={{ height: 'clamp(200px, 50vw, 250px)' }}
      />
    </div>
  </section>
);

export const HomePageSkeleton = () => (
  <>
    <LoadingHeroSkeleton />
    <AboutSkeleton />
    <SkillsSkeleton />
    <ProjectsSkeleton />
    <ContactSkeleton />
  </>
);