import React from 'react';

export const LoadingHeroSkeleton = () => (
  <section className="hero">
    <div className="hero-container frosted">
      <div className="flex flex-col items-center gap-6">
        <div 
          className="animate-pulse" 
          style={{ 
            width: 'clamp(100px, 25vw, 150px)', 
            height: 'clamp(100px, 25vw, 150px)', 
            borderRadius: '50%', 
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)'
          }} 
        />
        <div className="flex flex-col items-center gap-2">
          <div 
            className="animate-pulse" 
            style={{ 
              width: 'clamp(180px, 60vw, 280px)', 
              height: '2.5rem', 
              borderRadius: '8px', 
              background: 'var(--glass-bg)' 
            }} 
          />
          <div 
            className="animate-pulse" 
            style={{ 
              width: 'clamp(140px, 45vw, 200px)', 
              height: '1rem', 
              borderRadius: '4px', 
              background: 'var(--glass-bg)' 
            }} 
          />
        </div>
        <div 
          className="animate-pulse" 
          style={{ 
            width: 'clamp(280px, 85vw, 400px)', 
            height: '3.5rem', 
            borderRadius: '8px', 
            background: 'var(--glass-bg)' 
          }} 
        />
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="animate-pulse" 
              style={{ 
                width: 'clamp(40px, 10vw, 48px)', 
                height: 'clamp(40px, 10vw, 48px)', 
                borderRadius: '50%', 
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)'
              }} 
            />
          ))}
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          <div 
            className="animate-pulse" 
            style={{ 
              width: 'clamp(120px, 40vw, 160px)', 
              height: '48px', 
              borderRadius: '100px', 
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)'
            }} 
          />
          <div 
            className="animate-pulse" 
            style={{ 
              width: 'clamp(100px, 35vw, 140px)', 
              height: '48px', 
              borderRadius: '100px', 
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)'
            }} 
          />
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