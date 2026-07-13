import Lenis from "lenis";

let currentLenis: Lenis | null = null;

export const getLenis = () => currentLenis;

export const setLenis = (instance: Lenis | null) => {
  currentLenis = instance;
};
