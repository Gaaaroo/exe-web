 "use client";

import { useRef, type JSX } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type MyCharacterProps = JSX.IntrinsicElements["group"];

export const MyCharacter = (props: MyCharacterProps) => {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/mainchar.glb");

  // Tăng kích thước nhân vật (gấp ~15 lần so với gốc)
  scene.scale.set(15, 15, 15);
  scene.position.set(0, -1.2, 0);

  useFrame((state) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 0.5;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload("/mainchar.glb");

