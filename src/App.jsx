import React from 'react';
import { motion } from 'framer-motion';
import './App.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="nav-logo">Han Nguyen</div>
    <ul className="nav-links">
      <li><a href="#about">About me</a></li>
      <li><a href="#resume">Resume</a></li>
      <li><a href="#work">Work</a></li>
      <li><a href="#contact" className="btn-contact">Get in touch!</a></li>
    </ul>
  </nav>
);

const HeroSection = () => (
  <section className="hero-section">
    <div className="hero-left">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="hero-title">
          PORT<br />FOLIO
          <span className="outline">FOLIO</span>
          <span className="outline">FOLIO</span>
          <span className="outline">FOLIO</span>
        </h1>
        <div className="hero-subtitle">
          I love design and anything related to art. I approach problems in a rational and pragmatic way and seek the simplest and most functional solutions possible.
        </div>
      </motion.div>
      <div className="social-links-hero">
        <p>BE: /hannnb</p>
        <p>IG: @han.nnb</p>
        <p>LI: /han-nnb</p>
      </div>
    </div>
    <motion.div 
      className="hero-right"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="hero-photo">
        <div className="placeholder-img">PHOTO PLACEHOLDER</div>
      </div>
      <div className="scroll-indicator">
        Scroll<br />down
      </div>
    </motion.div>
  </section>
);

const IntroSection = () => (
  <section className="intro-section" id="about">
    <motion.div 
      className="intro-text"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <h2>Hello,<br />I'm Han !</h2>
      <p>
        I am a self-taught Graphic Designer based in Viet Nam with extensive marketing and communication experience. I am currently living in France and pursuing a degree in Digital Web & Project Management.
      </p>
      <a href="#" className="linkedin-btn">
        <i className="linkedin-icon"></i> linkedin.com/in/han-nnb
      </a>
    </motion.div>
    <div className="intro-image-container">
      <motion.div 
        className="intro-photo-frame"
        whileHover={{ scale: 1.02 }}
      >
        <div className="placeholder-img">PHOTO PLACEHOLDER</div>
      </motion.div>
      <div className="tag" style={{ top: '20%', left: '-10%' }}>2nd August 1999</div>
      <div className="tag" style={{ bottom: '10%', right: '-5%' }}>Vietnamese</div>
    </div>
  </section>
);

const EducationSkills = () => (
  <section className="dual-section">
    <div className="education">
      <h3>Education</h3>
      {[
        { date: '2022-2023', school: 'Digital Campus, Montpellier', degree: 'Digital Web & Project Management' },
        { date: '2021-2022', school: 'IUT de Béziers', degree: 'Commercialisation Technique' },
        { date: '2017-2020', school: 'Economic University, Danang', degree: 'International Business' }
      ].map((item, index) => (
        <motion.div 
          key={index}
          className="edu-item"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="edu-date"><span className="diamond"></span> {item.date}</div>
          <div className="edu-detail">
            <h4>{item.school}</h4>
            <p>{item.degree}</p>
          </div>
        </motion.div>
      ))}
    </div>
    <div className="skills">
      <h3>Technical skills</h3>
      <div className="skill-grid">
        <div>
          <p className="skill-cat">Software Skills</p>
          <div className="skill-icons">
            {['Ps', 'Ai', 'Id', 'Xd', 'Pr'].map(s => <div key={s} className="icon-box">{s}</div>)}
          </div>
          <div className="skill-tags">
            {['Packaging', 'Visual design', 'UI/UX design', 'User Research'].map(t => <span key={t} className="skill-tag">{t}</span>)}
          </div>
        </div>
        <div>
          <p className="skill-cat">Coding skills</p>
          <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Basic knowledge of:</p>
          <div className="skill-grid-mini" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontSize: '0.8rem', marginTop: '10px' }}>
            <span>HTML</span><span>PHP</span>
            <span>CSS</span><span>SQL</span>
            <span>JavaScript</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ExperienceContact = () => (
  <section className="exp-section">
    <motion.div 
      className="exp-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3>Experience</h3>
      {[
        { date: '2022', role: 'Marketing Intern', company: 'Social media content creator', place: 'Bi Ethic, Narbonne, France' },
        { date: '2021', role: 'Freelancer', company: 'Consulted with clients, created logos, posters, presentations based on their requirements' },
        { date: '2020', role: 'Graphic Designer', company: 'Designed promotional materials for events', place: 'Songhan Incubator, Viet Nam' }
      ].map((item, index) => (
        <div key={index} className="edu-item">
          <div className="edu-date"><span className="diamond"></span> {item.date}</div>
          <div className="edu-detail">
            <h4>{item.role}</h4>
            <p>{item.company}</p>
            {item.place && <p style={{ fontStyle: 'italic' }}>{item.place}</p>}
          </div>
        </div>
      ))}
      <div className="skill-tags" style={{ marginTop: '20px' }}>
        {['#Creativity', '#Communication', '#Detail-oriented', '#Adaptability'].map(t => <span key={t} className="skill-tag" style={{ background: '#000' }}>{t}</span>)}
      </div>
    </motion.div>
    <motion.div 
      className="contact-card"
      id="contact"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3>Contact</h3>
      <div className="contact-info">
        <p>📍 Narbonne, France</p>
        <p>✉️ nnbh928@gmail.com</p>
        <p>📞 07 82 84 59 00</p>
      </div>
      <div className="resume-outline-text" style={{ marginTop: '40px', fontSize: '4rem', opacity: 0.2, fontWeight: 900 }}>
        RESUME<br />RESUME
      </div>
    </motion.div>
  </section>
);

const LanguagesHobbies = () => (
  <section className="misc-section">
    <div className="activities">
      <h3>Activities</h3>
      {[
        { date: '2020', title: "'Danang Tui' 2 exhibition", subtitle: 'Artist of miniature art' },
        { date: '2019', title: 'Danang Robodnic contest', subtitle: 'Volunteer designer and producer of promotional materials' }
      ].map((item, index) => (
        <div key={index} className="activity-item">
          <div className="edu-date"><span className="diamond"></span> {item.date}</div>
          <div className="edu-detail">
            <h4>{item.title}</h4>
            <p>{item.subtitle}</p>
          </div>
        </div>
      ))}
      <div style={{ marginTop: '50px' }}>
        <h3>Language</h3>
        <div style={{ display: 'flex', gap: '40px' }}>
          <div><strong>English</strong><br /><small>Fluent</small></div>
          <div><strong>French</strong><br /><small>Intermediate</small></div>
          <div><strong>Vietnamese</strong><br /><small>Native</small></div>
        </div>
      </div>
    </div>
    <div className="hobbies">
      <h3>Hobbies & Interests</h3>
      <div className="hobby-grid">
        <div className="hobby-item"><span className="hobby-icon">🎷</span>Classical Funky/Gypsy Jazz</div>
        <div className="hobby-item"><span className="hobby-icon">🧶</span>Crochet Knitting</div>
        <div className="hobby-item"><span className="hobby-icon">🎨</span>Digital art Miniature craft</div>
        <div className="hobby-item"><span className="hobby-icon">🐾</span>Cat, cat and cat</div>
      </div>
    </div>
  </section>
);

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <IntroSection />
      <EducationSkills />
      <ExperienceContact />
      <LanguagesHobbies />
      <footer>
        &copy; 2026 Han Nguyen. All Rights Reserved.
      </footer>
    </div>
  );
}

export default App;
