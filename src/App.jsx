import React from 'react';
import { motion } from 'framer-motion';
import './App.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="nav-logo">7EVEN</div>
    <ul className="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#journey">Journey</a></li>
      <li><a href="#projects">Work</a></li>
      <li><a href="#contact" className="btn-contact">Contact Me</a></li>
    </ul>
  </nav>
);

const HeroSection = () => (
  <section className="hero-section">
    <div className="hero-bg-container">
      {/* Assuming the image provided is placed in public/hero.png */}
      <div 
        className="hero-image" 
        style={{ 
          width: '100%', 
          height: '100%', 
          backgroundImage: 'url(/hero.png)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }} 
      />
      <div className="hero-overlay" />
    </div>
    
    <div className="hero-content">
      <motion.h1 
        className="hero-title-large"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
      >
        7EVEN
      </motion.h1>
      
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 className="serif" style={{ fontSize: '4rem', letterSpacing: '-2px' }}>Siddharth Ohal</h2>
        <p style={{ letterSpacing: '8px', textTransform: 'uppercase', color: 'var(--accent-light-purple)', marginTop: '10px' }}>
          Creative Developer & Designer
        </p>
      </motion.div>
    </div>
  </section>
);

const GlassCard = ({ title, children, id }) => (
  <section id={id}>
    <motion.div 
      className="glass-card"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="section-title">{title}</h3>
      {children}
    </motion.div>
  </section>
);

const ExperienceItem = ({ date, title, subtitle }) => (
  <div className="item-row">
    <div className="item-date">{date}</div>
    <div className="item-detail">
      <h4>{title}</h4>
      <p>{subtitle}</p>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      
      <main>
        <GlassCard title="About Me" id="about">
          <p style={{ fontSize: '1.5rem', lineHeight: '1.6', fontWeight: '300', color: 'var(--text-grey)' }}>
            I specialize in building high-end digital experiences that merge cutting-edge technology with cinematic aesthetics. 
            Inspired by the dark, neon-lit vibes of the future, I create interfaces that feel alive.
          </p>
        </GlassCard>

        <GlassCard title="Education & Journey" id="journey">
          <ExperienceItem 
            date="2022-2023" 
            title="Advanced Interactive Design" 
            subtitle="Specializing in motion graphics and immersive web architectures." 
          />
          <ExperienceItem 
            date="2019-2022" 
            title="Computer Science Degree" 
            subtitle="Focused on frontend optimization and creative coding." 
          />
        </GlassCard>

        <GlassCard title="Technical Arsenal" id="tech">
          <div className="skills-container">
            <div className="skill-category">
              <h4>Design</h4>
              <div className="skill-badges">
                {['Figma', 'Photoshop', 'After Effects', 'UI/UX', '3D Modeling'].map(s => (
                  <span key={s} className="skill-badge">{s}</span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h4>Development</h4>
              <div className="skill-badges">
                {['React', 'GSAP', 'Framer Motion', 'Three.js', 'Vite', 'Tailwind'].map(s => (
                  <span key={s} className="skill-badge">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <section id="contact" className="contact-section">
          <h3 className="section-title">Let's Connect</h3>
          <div className="contact-grid">
            <a href="mailto:sidxohal9049@gmail.com" className="contact-link">Email</a>
            <a href="#" className="contact-link">LinkedIn</a>
            <a href="#" className="contact-link">GitHub</a>
          </div>
        </section>
      </main>

      <footer>
        7EVEN &copy; 2026 | SIDDHARTH OHAL
      </footer>
    </div>
  );
}

export default App;
