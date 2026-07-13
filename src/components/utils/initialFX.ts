import gsap from "gsap";
import { getLenis } from "../../utils/lenis";
import { TextSplitter } from "../../utils/textSplitter";

let cleanupPreviousSplit: (() => void) | null = null;

export function initialFX() {
  cleanupPreviousSplit?.();
  document.body.style.overflowY = "auto";
  getLenis()?.start();

  const main = document.querySelector("main");
  main?.classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  const landingText = new TextSplitter(
    [
      ".landing-info h3",
      ".landing-intro h2",
      ".landing-name-line",
      ".landing-h2-info",
      ".landing-h2-1",
    ].flatMap((selector) =>
      Array.from(document.querySelectorAll(selector)),
    ),
    { type: "chars,lines", linesClass: "split-line" },
  );

  const animation = gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.inOut",
      stagger: 0.025,
      delay: 0.3,
    },
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    { opacity: 1, duration: 1.2, ease: "power1.inOut", delay: 0.1 },
  );

  cleanupPreviousSplit = () => {
    animation.kill();
    landingText.revert();
    cleanupPreviousSplit = null;
  };
}
