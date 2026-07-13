import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { eyebrowBoneNames, typingBoneNames } from "../../../data/boneData";

const setAnimations = (gltf: GLTF) => {
  const character = gltf.scene;
  const mixer = new THREE.AnimationMixer(character);
  let introTimer: number | undefined;
  let cleanupHover: (() => void) | undefined;

  const introClip = THREE.AnimationClip.findByName(
    gltf.animations,
    "introAnimation",
  );
  const introAction = introClip ? mixer.clipAction(introClip) : null;
  if (introAction) {
    introAction.setLoop(THREE.LoopOnce, 1);
    introAction.clampWhenFinished = true;
  }

  ["key1", "key2", "key5", "key6"].forEach((name) => {
    const clip = THREE.AnimationClip.findByName(gltf.animations, name);
    if (!clip) return;

    const action = mixer.clipAction(clip);
    action.play();
    action.timeScale = 1.2;
  });

  const typingAction = createBoneAction(
    gltf,
    mixer,
    "typing",
    typingBoneNames,
  );
  if (typingAction) {
    typingAction.enabled = true;
    typingAction.play();
    typingAction.timeScale = 1.2;
  }

  const startIntro = () => {
    introAction?.reset().play();
    introTimer = window.setTimeout(() => {
      const blinkClip = THREE.AnimationClip.findByName(gltf.animations, "Blink");
      if (blinkClip) mixer.clipAction(blinkClip).play().fadeIn(0.5);
    }, 2500);
  };

  const attachHover = (hoverDiv: HTMLDivElement) => {
    const eyebrowAction = createBoneAction(
      gltf,
      mixer,
      "browup",
      eyebrowBoneNames,
    );
    let isHovering = false;

    if (eyebrowAction) {
      eyebrowAction.setLoop(THREE.LoopOnce, 1);
      eyebrowAction.clampWhenFinished = true;
      eyebrowAction.enabled = true;
    }

    const handleMouseEnter = () => {
      if (!eyebrowAction || isHovering) return;
      isHovering = true;
      eyebrowAction.reset();
      eyebrowAction.enabled = true;
      eyebrowAction.setEffectiveWeight(4);
      eyebrowAction.fadeIn(0.5).play();
    };

    const handleMouseLeave = () => {
      if (!eyebrowAction || !isHovering) return;
      isHovering = false;
      eyebrowAction.fadeOut(0.6);
    };

    hoverDiv.addEventListener("mouseenter", handleMouseEnter);
    hoverDiv.addEventListener("mouseleave", handleMouseLeave);

    cleanupHover = () => {
      hoverDiv.removeEventListener("mouseenter", handleMouseEnter);
      hoverDiv.removeEventListener("mouseleave", handleMouseLeave);
    };
  };

  const dispose = () => {
    window.clearTimeout(introTimer);
    cleanupHover?.();
    mixer.stopAllAction();
    mixer.uncacheRoot(character);
  };

  return { mixer, startIntro, attachHover, dispose };
};

const createBoneAction = (
  gltf: GLTF,
  mixer: THREE.AnimationMixer,
  clipName: string,
  boneNames: string[],
): THREE.AnimationAction | null => {
  const animationClip = THREE.AnimationClip.findByName(
    gltf.animations,
    clipName,
  );
  if (!animationClip) return null;

  const filteredTracks = animationClip.tracks.filter((track) =>
    boneNames.some((boneName) => track.name.includes(boneName)),
  );
  const filteredClip = new THREE.AnimationClip(
    `${animationClip.name}_filtered`,
    animationClip.duration,
    filteredTracks,
  );

  return mixer.clipAction(filteredClip);
};

export default setAnimations;
