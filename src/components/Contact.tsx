import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { config } from "../config";
import "./styles/Contact.css";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom center",
          toggleActions: "play none none none",
        },
      });

      timeline
        .fromTo(
          "h3",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        )
        .fromTo(
          ".contact-box",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.4",
        );
    }, section);

    return () => context.revert();
  }, []);

  const socialLinks = [
    ["Github", config.contact.github],
    ["LinkedIn", config.contact.linkedin],
    ["Twitter", config.contact.twitter],
    ["Facebook", config.contact.facebook],
    ["Instagram", config.contact.instagram],
  ] as const;

  return (
    <footer
      className="contact-section section-container"
      id="contact"
      ref={sectionRef}
    >
      <div className="contact-container">
        <h3>{config.developer.fullName}</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href={`mailto:${config.contact.email}`} data-cursor="disable">
                {config.contact.email}
              </a>
            </p>
            <h4>Location</h4>
            <p>{config.social.location}</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            {socialLinks.map(([label, href]) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
                key={label}
              >
                {label} <MdArrowOutward aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by {" "}
              <span>{config.developer.fullName}</span>
            </h2>
            <h5>
              <MdCopyright aria-hidden="true" /> {new Date().getFullYear()}
            </h5>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
