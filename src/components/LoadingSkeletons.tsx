import React from 'react';

export const LoadingHeroSkeleton = () => (
  <section className="hero">
    <div className="hero-container frosted">
      <div className="flex flex-col items-center gap-6">
        <div 
          className="animate-pulse" 
          style={{ 
            width: '150px', 
            height: '150px', 
            borderRadius: '50%', 
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)'
          }} 
        />
        <div className="flex flex-col items-center gap-2">
          <div 
            className="animate-pulse" 
            style={{ 
              width: '280px', 
              height: '2.5rem', 
              borderRadius: '8px', 
              background: 'var(--glass-bg)' 
            }} 
          />
          <div 
            className="animate-pulse" 
            style={{ 
              width: '200px', 
              height: '1rem', 
              borderRadius: '4px', 
              background: 'var(--glass-bg)' 
            }} 
          />
        </div>
        <div 
          className="animate-pulse" 
          style={{ 
            width: '400px', 
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
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)'
              }} 
            />
          ))}
        </div>
        <div className="flex gap-4">
          <div 
            className="animate-pulse" 
            style={{ 
              width: '160px', 
              height: '48px', 
              borderRadius: '100px', 
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)'
            }} 
          />
          <div 
            className="animate-pulse" 
            style={{ 
              width: '140px', 
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
          width: '200px', 
          height: '2rem', 
          borderRadius: '8px', 
          margin: '0 auto 2rem',
          background: 'var(--glass-bg)' 
        }} 
      />
      <div 
        className="about-card frosted"
        style={{ height: '200px' }}
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
          width: '220px', 
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
            style={{ height: '180px' }}
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
          width: '180px', 
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
            style={{ height: '280px' }}
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
        className="contact-card frosted"
        style={{ height: '250px' }}
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