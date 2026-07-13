import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { useLoading } from "../../context/loadingContext";
import { createLoadingProgress } from "../utils/loadingProgress";
import { setAllTimeline, setCharTimeline } from "../utils/GsapScroll";
import setAnimations from "./utils/animationUtils";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import {
  handleHeadRotation,
  handleMouseMove,
  handleTouchEnd,
  handleTouchMove,
} from "./utils/mouseUtils";
import handleResize from "./utils/resizeUtils";

const disposeMaterial = (material: THREE.Material) => {
  Object.values(material).forEach((value) => {
    if (value instanceof THREE.Texture) value.dispose();
  });
  material.dispose();
};

const disposeObject = (object: THREE.Object3D) => {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    child.geometry?.dispose();
    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];
    materials.forEach(disposeMaterial);
  });
};

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    const containerElement = canvasDiv.current;
    if (!containerElement) return;

    const scene = new THREE.Scene();
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio < 2,
        powerPreference: "high-performance",
      });
    } catch (error) {
      console.error("WebGL is unavailable; the 3D character was disabled:", error);
      setLoading(100);
      return;
    }

    let disposed = false;
    let animationFrame = 0;
    let refreshFrame = 0;
    let resizeTimer: number | undefined;
    let introTimer: number | undefined;
    let cleanupTouchReset: (() => void) | undefined;
    let cleanupCharacterTimelines: (() => void) | undefined;
    let cleanupPageTimelines: (() => void) | undefined;
    let character: THREE.Object3D | null = null;
    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Object3D | null = null;
    let animationController: ReturnType<typeof setAnimations> | null = null;

    const bounds = containerElement.getBoundingClientRect();
    const camera = new THREE.PerspectiveCamera(
      14.5,
      Math.max(1, bounds.width) / Math.max(1, bounds.height),
      0.1,
      1000,
    );
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    renderer.setSize(Math.max(1, bounds.width), Math.max(1, bounds.height));
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    containerElement.appendChild(renderer.domElement);

    const lighting = setLighting(scene);
    const loadingProgress = createLoadingProgress(setLoading);
    const clock = new THREE.Clock();
    const mouse = { x: 0, y: 0 };
    const interpolation = { x: 0.1, y: 0.2 };

    const rebuildTimelines = () => {
      cleanupCharacterTimelines?.();
      cleanupPageTimelines?.();
      if (!character) return;

      cleanupCharacterTimelines = setCharTimeline(character, camera);
      cleanupPageTimelines = setAllTimeline();
      window.cancelAnimationFrame(refreshFrame);
      refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const handleWindowResize = () => {
      handleResize(renderer, camera, containerElement);
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(rebuildTimelines, 150);
    };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => {
        mouse.x = x;
        mouse.y = y;
      });
    };

    const onTouchMove = (event: TouchEvent) => {
      handleTouchMove(event, (x, y) => {
        mouse.x = x;
        mouse.y = y;
      });
    };

    const onTouchEnd = () => {
      cleanupTouchReset?.();
      cleanupTouchReset = handleTouchEnd(
        (x, y, interpolationX, interpolationY) => {
          mouse.x = x;
          mouse.y = y;
          interpolation.x = interpolationX;
          interpolation.y = interpolationY;
        },
      );
    };

    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", handleWindowResize);
    const landingDiv = document.getElementById("landingDiv");
    landingDiv?.addEventListener("touchmove", onTouchMove, { passive: true });
    landingDiv?.addEventListener("touchend", onTouchEnd);

    const animate = () => {
      if (disposed) return;
      animationFrame = window.requestAnimationFrame(animate);

      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp,
        );
      }

      lighting.setPointLight(screenLight);
      animationController?.mixer.update(clock.getDelta());
      renderer.render(scene, camera);
    };
    animationFrame = window.requestAnimationFrame(animate);

    const loadCharacter = async () => {
      try {
        const loader = setCharacter(renderer, scene, camera);
        const gltf = await loader.loadCharacter();

        if (disposed) {
          disposeObject(gltf.scene);
          return;
        }

        character = gltf.scene;
        scene.add(character);
        headBone = character.getObjectByName("spine006") ?? null;
        screenLight = character.getObjectByName("screenlight") ?? null;
        animationController = setAnimations(gltf);
        if (hoverDivRef.current) {
          animationController.attachHover(hoverDivRef.current);
        }

        rebuildTimelines();
        await loadingProgress.finish();
        if (disposed) return;

        introTimer = window.setTimeout(() => {
          lighting.turnOnLights();
          animationController?.startIntro();
        }, 2500);
      } catch (error) {
        if (!disposed) {
          console.error("Unable to load the 3D character:", error);
          await loadingProgress.finish();
        }
      }
    };

    void loadCharacter();

    return () => {
      disposed = true;
      loadingProgress.cancel();
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(refreshFrame);
      window.clearTimeout(resizeTimer);
      window.clearTimeout(introTimer);
      cleanupTouchReset?.();
      cleanupCharacterTimelines?.();
      cleanupPageTimelines?.();
      animationController?.dispose();

      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleWindowResize);
      landingDiv?.removeEventListener("touchmove", onTouchMove);
      landingDiv?.removeEventListener("touchend", onTouchEnd);

      if (character) disposeObject(character);
      lighting.dispose();
      scene.clear();
      renderer.renderLists.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [setLoading]);

  return (
    <div className="character-container" aria-hidden="true">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim" />
        <div className="character-hover" ref={hoverDivRef} />
      </div>
    </div>
  );
};

export default Scene;
