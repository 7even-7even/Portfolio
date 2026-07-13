import React from 'react';
import { motion } from 'framer-motion';
import './App.css';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const navX = useTransform(scrollYProgress, [0, 0.1], ["0%", "-35%"]);
  
  return (
    <motion.nav 
      className="navbar"
      style={{ x: navX }}
    >
      <div className="nav-logo">7EVEN</div>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#journey">Journey</a></li>
        <li><a href="#projects">Work</a></li>
        <li><a href="#contact" className="btn-contact">Contact Me</a></li>
      </ul>
    </motion.nav>
  );
};

const HeroAboutSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Move image to the right on scroll
  const imageX = useTransform(scrollYProgress, [0, 0.5], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  
  // Content fades
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const aboutOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const aboutY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);

  return (
    <div ref={containerRef} className="hero-about-container">
      {/* Persistent Background Image */}
      <div className="sticky-image-wrapper">
        <motion.div 
          className="hero-image" 
          style={{ 
            x: imageX,
            scale: imageScale,
            backgroundImage: 'url(/hero.png)', 
          }} 
        />
        <div className="hero-overlay" />
      </div>

      {/* Hero Content Section */}
      <section className="hero-section">
        <motion.div className="hero-content" style={{ opacity: heroOpacity }}>
          <div className="hero-text-container" style={{ marginTop: '150px' }}>
            <h2 className="serif" style={{ fontSize: '4.5rem', letterSpacing: '-2px', marginBottom: '5px' }}>Siddharth Ohal</h2>
            <p style={{ letterSpacing: '8px', textTransform: 'uppercase', color: 'var(--accent-light-purple)', fontSize: '0.9rem', fontWeight: '600' }}>
              Creative Developer & Designer
            </p>
          </div>
        </motion.div>
      </section>

      {/* About Section (Reference Image Layout) */}
      <section id="about" className="about-split-section">
        <motion.div 
          className="about-content-left"
          style={{ opacity: aboutOpacity, y: aboutY }}
        >
          <h2 className="section-label">ABOUT</h2>
          <a href="mailto:sidxohal9049@gmail.com" className="about-email">sidxohal9049@gmail.com</a>
          
          <div className="about-description">
            <p>
              An IT enthusiast passionate about software development, tech solutions, and problem-solving. 
              Experienced in Python, API integration, full stack and database systems through hands-on projects.
            </p>
            <p>
              My greatest strength is my ability to merge technical excellence with creative vision, 
              enabling me to build platforms that are not just functional but also immersive.
            </p>
          </div>

          <div className="about-footer-info">
            <p>Pune, India</p>
            <p className="footer-sub">International Institute of Information Technology</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

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

const ExperienceItem = ({ date, title, company, subtitle, bullets }) => (
  <div className="item-row">
    <div className="item-date">{date}</div>
    <div className="item-detail">
      <h4>{title}</h4>
      <p className="company-name" style={{ color: 'var(--accent-light-purple)', fontWeight: '600', marginBottom: '10px' }}>{company}</p>
      <p>{subtitle}</p>
      {bullets && (
        <ul style={{ marginTop: '15px', paddingLeft: '20px', color: 'var(--text-grey)', fontSize: '1rem', lineHeight: '1.6' }}>
          {bullets.map((bullet, idx) => <li key={idx} style={{ marginBottom: '8px' }}>{bullet}</li>)}
        </ul>
      )}
    </div>
  </div>
);

const ProjectItem = ({ title, tech, url, repo, description }) => (
  <div className="item-row" style={{ borderBottom: '1px solid rgba(155, 81, 224, 0.2)' }}>
    <div className="item-date" style={{ fontSize: '0.9rem' }}>
      <div style={{ marginBottom: '10px' }}>PROJECT</div>
      <div className="skill-badges">
        {tech.split(', ').map(t => <span key={t} style={{ fontSize: '0.6rem', padding: '4px 8px' }} className="skill-badge">{t}</span>)}
      </div>
    </div>
    <div className="item-detail">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <h4 style={{ margin: 0 }}>{title}</h4>
        <div style={{ display: 'flex', gap: '15px' }}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="contact-link" style={{ fontSize: '0.9rem' }}>Live Demo</a>
          <a href={repo} target="_blank" rel="noopener noreferrer" className="contact-link" style={{ fontSize: '0.9rem' }}>GitHub</a>
        </div>
      </div>
      <p style={{ marginTop: '15px' }}>{description}</p>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroAboutSection />
      
      <main>
        <GlassCard title="Education" id="edu">
          <div className="item-row" style={{ border: 'none', padding: 0 }}>
             <div className="item-date">DEGREE</div>
             <div className="item-detail">
                <h4>Bachelor of Engineering (IT)</h4>
                <p>International Institute of Information Technology, Pune (2022-26)</p>
                <p style={{ color: 'var(--accent-light-purple)', fontWeight: 'bold' }}>Current GPA: 8.95</p>
             </div>
          </div>
        </GlassCard>

        <GlassCard title="Experience" id="journey">
          <ExperienceItem 
            date="Aug 2025 - Apr 2026" 
            title="AI-ML Project Intern" 
            company="Sociante Pvt. Ltd."
            subtitle="Worked on an AI-ML project that aimed to automatically detect vehicle class type and registration number with 90% overall system accuracy." 
            bullets={[
              "Contributed to the Detection Transformer (DETR) Pipeline achieving 89.8% reliability, rivaling traditional YOLO models.",
              "Achieved 95% detection mAP and over 85% OCR accuracy for vehicle number plates.",
              "Developed a pipeline that outperformed the previous system’s 87% record."
            ]}
          />
        </GlassCard>

        <GlassCard title="Featured Projects" id="projects">
          <ProjectItem 
            title="Cure Cafe"
            tech="Node.js, Express, PostgreSQL, JWT"
            url="https://cure-cafe.onrender.com"
            repo="https://github.com/7even-7even/Cure-Cafe"
            description="A full-stack hospital food management system featuring 8+ business modules and 45+ REST APIs. Engineered role-based workflows for 6 user roles to streamline hospital meal operations from prescription to delivery."
          />
          <ProjectItem 
            title="Colour"
            tech="React, Node.js, Socket.IO, Redis"
            url="https://colour-bay.vercel.app"
            repo="https://github.com/7even-7even/Colour"
            description="Real-time collaborative whiteboard platform supporting simultaneous multi-user drawing. Designed a horizontally scalable architecture using Redis and stateless Socket.IO servers."
          />
        </GlassCard>

        <GlassCard title="Technical Arsenal" id="tech">
          <div className="skills-container">
            <div className="skill-category">
              <h4>Programming</h4>
              <div className="skill-badges">
                {['C++', 'Java', 'Python', 'Javascript'].map(s => <span key={s} className="skill-badge">{s}</span>)}
              </div>
            </div>
            <div className="skill-category">
              <h4>Web & Backend</h4>
              <div className="skill-badges">
                {['React.js', 'Node.js', 'REST APIs', 'TailwindCSS', 'Redis', 'Socket.IO'].map(s => <span key={s} className="skill-badge">{s}</span>)}
              </div>
            </div>
            <div className="skill-category">
              <h4>Databases</h4>
              <div className="skill-badges">
                {['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Atlas'].map(s => <span key={s} className="skill-badge">{s}</span>)}
              </div>
            </div>
            <div className="skill-category">
              <h4>AI / ML</h4>
              <div className="skill-badges">
                {['Transformers', 'PyTorch', 'Tensorflow', 'Flask', 'YOLO'].map(s => <span key={s} className="skill-badge">{s}</span>)}
              </div>
            </div>
          </div>
          <div style={{ marginTop: '50px' }}>
            <h4 style={{ color: 'var(--accent-light-purple)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px' }}>Certifications</h4>
            <div className="skill-badges">
              {['Introduction to Fintech', 'Data Science', 'Computer Architecture', 'Python/C/C++', 'AI for Beginners'].map(c => <span key={c} className="skill-badge" style={{ opacity: 0.8 }}>{c}</span>)}
            </div>
          </div>
        </GlassCard>

        <section id="contact" className="contact-section">
          <h3 className="section-title">Let's Connect</h3>
          <div className="contact-grid">
            <a href="mailto:sidxohal9049@gmail.com" className="contact-link">sidxohal9049@gmail.com</a>
            <a href="https://linkedin.com/in/siddharth-7even/" target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn</a>
            <a href="https://github.com/7even-7even" target="_blank" rel="noopener noreferrer" className="contact-link">GitHub</a>
          </div>
          <p style={{ marginTop: '30px', color: 'var(--text-grey)' }}>📞 904952112</p>
        </section>
      </main>

      <footer>
        7EVEN &copy; 2026 | SIDDHARTH OHAL
      </footer>
    </div>
  );
}

export default App;
