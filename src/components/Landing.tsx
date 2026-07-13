import { PropsWithChildren } from "react";
import { config } from "../config";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ");

  return (
    <section className="landing-section" id="landingDiv" aria-label="Introduction">
      <div className="landing-container">
        <div className="landing-intro">
          <h2>Hello! I&apos;m</h2>
          <h1>
            <span className="landing-name-line">{firstName.toUpperCase()}</span>
            {lastName && (
              <span className="landing-name-line">{lastName.toUpperCase()}</span>
            )}
          </h1>
        </div>
        <div className="landing-info">
          <h3>An</h3>
          <h2 className="landing-info-h2">
            <span className="landing-h2-1">AI Engineer</span>
          </h2>
          <h2>
            <span className="landing-h2-info">Full-Stack Developer</span>
          </h2>
        </div>
        <div className="mobile-photo">
          <img src="/images/mypicnbg.png" alt="Redoyanul Haque" />
        </div>
      </div>
      {children}
    </section>
  );
};

export default Landing;
