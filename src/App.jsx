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
      <motion.div
        className="hero-text-container"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 40, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ marginTop: '150px' }}
      >
        <h2 className="serif" style={{ fontSize: '4.5rem', letterSpacing: '-2px', marginBottom: '5px' }}>Siddharth Ohal</h2>
        <p style={{ letterSpacing: '8px', textTransform: 'uppercase', color: 'var(--accent-light-purple)', fontSize: '0.9rem', fontWeight: '600' }}>
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
      <HeroSection />
      
      <main>
        <GlassCard title="About Me" id="about">
          <p style={{ fontSize: '1.5rem', lineHeight: '1.6', fontWeight: '300', color: 'var(--text-grey)', marginBottom: '30px' }}>
            An IT enthusiast passionate about software development, tech solutions, and problem-solving. 
            Experienced in Python, API integration, full stack and database systems through hands-on projects. 
            Eager to contribute to innovative solutions and adapting new technologies.
          </p>
          <div className="item-row" style={{ border: 'none', padding: 0 }}>
             <div className="item-date">EDUCATION</div>
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
