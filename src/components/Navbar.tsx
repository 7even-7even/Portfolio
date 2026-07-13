import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { config } from "../config";
import { getLenis, setLenis } from "../utils/lenis";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.body.style.overflowY = "auto";
      return;
    }

    const instance = new Lenis({
      duration: 1.7,
      easing: (value) => Math.min(1, 1.001 - 2 ** (-10 * value)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.7,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(instance);
    instance.stop();
    instance.on("scroll", ScrollTrigger.update);

    let animationFrame = 0;
    const updateScroll = (time: number) => {
      instance.raf(time);
      animationFrame = window.requestAnimationFrame(updateScroll);
    };

    const handleResize = () => instance.resize();

    animationFrame = window.requestAnimationFrame(updateScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      instance.off("scroll", ScrollTrigger.update);
      instance.destroy();
      if (getLenis() === instance) setLenis(null);
    };
  }, []);

  const handleNavigation = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const sectionSelector = event.currentTarget.dataset.href;
    const scrollController = getLenis();

    if (!sectionSelector || !scrollController || window.innerWidth <= 1024) {
      return;
    }

    const target = document.querySelector<HTMLElement>(sectionSelector);
    if (!target) return;

    event.preventDefault();
    scrollController.scrollTo(target, { offset: 0, duration: 1.5 });
  };

  return (
    <>
      <header className="header">
        <a
          href="#landingDiv"
          data-href="#landingDiv"
          onClick={handleNavigation}
          className="navbar-title"
          data-cursor="disable"
          aria-label="Go to the top of the page"
        >
          RH
        </a>
        <a
          href={`mailto:${config.contact.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {config.contact.email}
        </a>
        <nav aria-label="Primary navigation">
          <ul>
            <li>
              <a data-href="#about" href="#about" onClick={handleNavigation}>
                <HoverLinks text="ABOUT" />
              </a>
            </li>
            <li>
              <a data-href="#work" href="#work" onClick={handleNavigation}>
                <HoverLinks text="WORK" />
              </a>
            </li>
            <li>
              <a data-href="#contact" href="#contact" onClick={handleNavigation}>
                <HoverLinks text="CONTACT" />
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="landing-circle1" aria-hidden="true" />
      <div className="landing-circle2" aria-hidden="true" />
      <div className="nav-fade" aria-hidden="true" />
    </>
  );
};

export default Navbar;
