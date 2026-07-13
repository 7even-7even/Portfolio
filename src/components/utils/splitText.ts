import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextSplitter } from "../../utils/textSplitter";

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return () => undefined;

  const elements = [
    ...document.querySelectorAll<HTMLElement>(".para"),
    ...document.querySelectorAll<HTMLElement>(".title:not([data-no-split])"),
  ];
  const splitters: TextSplitter[] = [];
  const animations: gsap.core.Tween[] = [];
  const triggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const toggleActions = "play pause resume reverse";

  elements.forEach((element) => {
    const isParagraph = element.classList.contains("para");
    element.classList.add("visible");

    const splitter = new TextSplitter(element, {
      type: isParagraph ? "lines,words" : "chars,lines",
      linesClass: "split-line",
    });
    splitters.push(splitter);

    const targets = isParagraph ? splitter.words : splitter.chars;
    const animation = gsap.fromTo(
      targets,
      {
        autoAlpha: 0,
        y: 80,
        rotate: isParagraph ? 0 : 10,
      },
      {
        autoAlpha: 1,
        y: 0,
        rotate: 0,
        duration: isParagraph ? 1 : 0.8,
        ease: isParagraph ? "power3.out" : "power2.inOut",
        stagger: isParagraph ? 0.02 : 0.03,
        scrollTrigger: {
          trigger: element.parentElement?.parentElement ?? element,
          toggleActions,
          start: triggerStart,
        },
      },
    );
    animations.push(animation);
  });

  return () => {
    animations.forEach((animation) => {
      animation.scrollTrigger?.kill();
      animation.kill();
    });
    splitters.forEach((splitter) => splitter.revert());
  };
}
