import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
) => {
  const loadCharacter = async (): Promise<GLTF> => {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader(dracoLoader);

    let blobUrl: string | null = null;

    try {
      const decryptedModel = await decryptFile(
        "/models/character.enc",
        "Character3D#@",
      );
      blobUrl = URL.createObjectURL(new Blob([decryptedModel]));

      const gltf = await loader.loadAsync(blobUrl);
      const character = gltf.scene;
      await renderer.compileAsync(character, camera, scene);

      character.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        child.castShadow = false;
        child.receiveShadow = false;
        child.frustumCulled = true;
      });

      const rightFoot = character.getObjectByName("footR");
      const leftFoot = character.getObjectByName("footL");
      if (rightFoot) rightFoot.position.y = 3.36;
      if (leftFoot) leftFoot.position.y = 3.36;

      return gltf;
    } finally {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      dracoLoader.dispose();
    }
  };

  return { loadCharacter };
};

export default setCharacter;
