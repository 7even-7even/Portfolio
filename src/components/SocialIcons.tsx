import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import { config } from "../config";
import HoverLinks from "./HoverLinks";
import "./styles/SocialIcons.css";

const SocialIcons = () => {
  const handleMouseMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const link = event.currentTarget.querySelector<HTMLElement>("a");
    if (!link) return;

    link.style.setProperty("--siLeft", `${event.clientX - rect.left}px`);
    link.style.setProperty("--siTop", `${event.clientY - rect.top}px`);
  };

  const resetPosition = (event: React.MouseEvent<HTMLSpanElement>) => {
    const link = event.currentTarget.querySelector<HTMLElement>("a");
    link?.style.setProperty("--siLeft", "50%");
    link?.style.setProperty("--siTop", "50%");
  };

  const links = [
    { href: config.contact.github, label: "GitHub", icon: <FaGithub /> },
    { href: config.contact.linkedin, label: "LinkedIn", icon: <FaLinkedinIn /> },
    { href: config.contact.twitter, label: "X / Twitter", icon: <FaXTwitter /> },
    { href: config.contact.instagram, label: "Instagram", icon: <FaInstagram /> },
  ];

  return (
    <aside className="icons-section" aria-label="Social links">
      <div className="social-icons" data-cursor="icons" id="social">
        {links.map(({ href, label, icon }) => (
          <span
            key={label}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetPosition}
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              {icon}
            </a>
          </span>
        ))}
      </div>
      <button
        className="resume-button"
        type="button"
        disabled
        title="Resume will be available soon"
      >
        <HoverLinks text="RESUME" />
        <span aria-hidden="true">
          <TbNotes />
        </span>
      </button>
    </aside>
  );
};

export default SocialIcons;
