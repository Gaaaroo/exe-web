'use client';

import { Suspense, useRef, Component, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MyCharacter } from '@/components/MyCharacter';
import * as THREE from 'three';

class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const RotatingRing = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group>
      {/* Base Ring */}
      <mesh
        position={[0, -1.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.8, 1.5, 64]} />
        <meshStandardMaterial
          color='#D4AF7A'
          emissive='#D4AF7A'
          emissiveIntensity={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Rotating Ring */}
      <mesh
        ref={meshRef}
        position={[0, -1.48, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[1.0, 1.2, 32]} />
        <meshStandardMaterial
          color='#FFD89B'
          emissive='#FFD89B'
          emissiveIntensity={1}
          transparent
          opacity={0.7}
          wireframe
        />
      </mesh>

      <MyCharacter />
    </group>
  );
};

export default function CharacterCanvas() {
  return (
    <CanvasErrorBoundary>
      <Suspense fallback={null}>
        <Canvas
          gl={{ alpha: true }}
          camera={{ position: [-1, 1.5, 8], fov: 35 }}
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => {
            gl.toneMappingExposure = 1.5;
          }}
        >
          {/* LIGHTING */}

          {/* ánh sáng nền */}
          <ambientLight intensity={1.5} />

          {/* main lights */}
          <pointLight
            position={[4, 5, 4]}
            intensity={2.5}
            color='#FFF2D0'
          />
          <pointLight
            position={[-3, 3, -2]}
            intensity={1.5}
            color='#FFB87A'
          />
          <pointLight
            position={[0, 3, -4]}
            intensity={1.2}
            color='#FFFFFF'
          />

          {/* spotlight */}
          <spotLight
            position={[0, 6, 2]}
            intensity={2.2}
            angle={0.5}
            penumbra={1}
            color='#FFD89B'
          />

          <directionalLight
            position={[0, 5, 5]}
            intensity={1.5}
          />

          <RotatingRing />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.6}
          />
        </Canvas>
      </Suspense>
    </CanvasErrorBoundary>
  );
}
