import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!cursor || !hasFinePointer || reduceMotion) return;

    let animationFrame = 0;
    let hoverTarget: HTMLElement | null = null;
    const mousePosition = { x: 0, y: 0 };
    const cursorPosition = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.x = event.clientX;
      mousePosition.y = event.clientY;
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-cursor]",
      );
      if (!target || target === hoverTarget) return;

      hoverTarget = target;
      if (target.dataset.cursor === "icons") {
        const rect = target.getBoundingClientRect();
        cursor.classList.add("cursor-icons");
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        gsap.set(cursor, { x: rect.left, y: rect.top });
      } else if (target.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (!hoverTarget) return;
      const nextTarget = event.relatedTarget as Node | null;
      if (nextTarget && hoverTarget.contains(nextTarget)) return;

      hoverTarget = null;
      cursor.classList.remove("cursor-disable", "cursor-icons");
    };

    const updateCursor = () => {
      if (!hoverTarget || hoverTarget.dataset.cursor !== "icons") {
        cursorPosition.x += (mousePosition.x - cursorPosition.x) / 6;
        cursorPosition.y += (mousePosition.y - cursorPosition.y) / 6;
        gsap.set(cursor, { x: cursorPosition.x, y: cursorPosition.y });
      }
      animationFrame = window.requestAnimationFrame(updateCursor);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    animationFrame = window.requestAnimationFrame(updateCursor);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef} aria-hidden="true" />;
};

export default Cursor;
