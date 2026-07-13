import React, { useEffect } from 'react';
import gsap from 'gsap';
import ImageSequence from './components/ImageSequence';
import './App.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="nav-logo">PORTFOLIO</div>
    <ul className="nav-links">
      <li><a href="#about">About Me</a></li>
      <li><a href="#journey">Journey</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#tech">Tech Stack</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
);

const GlassCard = ({ title, children, id }) => {
  const cardRef = React.useRef(null);

  useEffect(() => {
    gsap.to(cardRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%",
        end: "top 40%",
        scrub: 1,
      },
      y: 0,
      opacity: 1,
      ease: "power2.out"
    });
  }, []);

  return (
    <section className="content-section" id={id}>
      <div className="glass-card" ref={cardRef}>
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <ImageSequence frameCount={240} />
        
        <section className="hero" id="home">
          <div className="hero-content">
            <h1>The Future of Motion</h1>
            <p>Scroll to explore the journey</p>
          </div>
        </section>

        <GlassCard title="About Me" id="about">
          <p>I am a creative developer focused on high-performance, immersive web experiences. This portfolio showcases the intersection of technology and design.</p>
        </GlassCard>

        <GlassCard title="Journey" id="journey">
          <p>From lines of code to seamless animations, my journey has been driven by a passion for perfection and fluid user interfaces.</p>
        </GlassCard>

        <GlassCard title="Projects" id="projects">
          <p>Exploring the boundaries of what's possible on the web, one frame at a time.</p>
        </GlassCard>

        <GlassCard title="Technology Stack" id="tech">
          <p>GSAP, ScrollTrigger, React, Canvas API, and modern frontend architectures.</p>
        </GlassCard>

        <GlassCard title="Contact Me" id="contact">
          <p>Let's build something extraordinary together.</p>
          <a href="mailto:sidxohal9049@gmail.com" className="contact-btn">Get In Touch</a>
        </GlassCard>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Siddharth Ohal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
