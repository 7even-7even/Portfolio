import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { config } from "../config";
import WorkImage from "./WorkImage";
import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const workListRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const workList = workListRef.current;
    if (!section || !container || !workList) return;

    const media = gsap.matchMedia();
    media.add("(min-width: 769px)", () => {
      const getScrollDistance = () =>
        Math.max(0, workList.scrollWidth - container.clientWidth);

      const animation = gsap.to(workList, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "work",
        },
      });

      return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
      };
    });

    return () => media.revert();
  }, []);

  return (
    <section className="work-section" id="work" ref={sectionRef}>
      <div
        className="work-container section-container"
        ref={containerRef}
      >
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex" ref={workListRef}>
          {config.projects.slice(0, 5).map((project, index) => (
            <article className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.technologies}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} />
            </article>
          ))}
          <div className="work-box work-box-cta">
            <div className="see-all-works">
              <h3>Want to see more?</h3>
              <p>Explore all of my projects and creations</p>
              <Link to="/myworks" className="see-all-btn" data-cursor="disable">
                See All Works →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
