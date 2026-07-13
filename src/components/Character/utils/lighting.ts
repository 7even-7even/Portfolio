import { gsap } from "gsap";
import * as THREE from "three";
import { RGBELoader } from "three-stdlib";

const getEmissiveMaterial = (object: THREE.Object3D | null) => {
  if (!(object instanceof THREE.Mesh) || Array.isArray(object.material)) {
    return null;
  }

  return object.material instanceof THREE.MeshStandardMaterial
    ? object.material
    : null;
};

const setLighting = (scene: THREE.Scene) => {
  const directionalLight = new THREE.DirectionalLight(0xc7a9ff, 0);
  directionalLight.position.set(-0.47, -0.32, -1);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xc2a4ff, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  scene.add(pointLight);

  let environmentTexture: THREE.DataTexture | null = null;
  let disposed = false;
  const tweens: gsap.core.Tween[] = [];

  new RGBELoader().setPath("/models/").load(
    "char_enviorment.hdr",
    (texture) => {
      if (disposed) {
        texture.dispose();
        return;
      }

      environmentTexture = texture;
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    },
    undefined,
    (error) => {
      console.warn("Unable to load the character lighting environment:", error);
    },
  );

  const setPointLight = (screenLight: THREE.Object3D | null) => {
    const material = getEmissiveMaterial(screenLight);
    pointLight.intensity =
      material && material.opacity > 0.9
        ? material.emissiveIntensity * 20
        : 0;
  };

  const turnOnLights = () => {
    tweens.push(
      gsap.to(scene, {
        environmentIntensity: 0.64,
        duration: 2,
        ease: "power2.inOut",
      }),
      gsap.to(directionalLight, {
        intensity: 1,
        duration: 2,
        ease: "power2.inOut",
      }),
      gsap.to(".character-rim", {
        y: "55%",
        opacity: 1,
        delay: 0.2,
        duration: 2,
      }),
    );
  };

  const dispose = () => {
    disposed = true;
    tweens.forEach((tween) => tween.kill());
    scene.remove(directionalLight, pointLight);
    if (scene.environment === environmentTexture) scene.environment = null;
    environmentTexture?.dispose();
  };

  return { setPointLight, turnOnLights, dispose };
};

export default setLighting;
