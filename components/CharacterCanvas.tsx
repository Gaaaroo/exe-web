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
    if (meshRef.current)
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });
  return (
    <group>
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.5, 64]} />
        <meshStandardMaterial
          color='#B9975B'
          emissive='#B9975B'
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh
        ref={meshRef}
        position={[0, -1.48, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[1.0, 1.2, 32]} />
        <meshStandardMaterial
          color='#B9975B'
          emissive='#B9975B'
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
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
        >
          <ambientLight intensity={0.9} />
          <pointLight position={[4, 5, 4]} intensity={1.8} color='#FFE4B8' />
          <pointLight position={[-3, 3, -2]} intensity={1} color='#FF9C5C' />
          <pointLight position={[0, 3, -4]} intensity={0.8} color='#FFFFFF' />
          <spotLight
            position={[0, 6, 2]}
            intensity={1.6}
            angle={0.4}
            penumbra={0.8}
            color='#B9975B'
          />
          <RotatingRing />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </Suspense>
    </CanvasErrorBoundary>
  );
}
