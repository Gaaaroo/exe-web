"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

const Pedestal = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group>
      {/* Glowing base */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.5, 64]} />
        <meshStandardMaterial
          color="#B9975B"
          emissive="#B9975B"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Rotating ring pattern */}
      <mesh ref={meshRef} position={[0, -1.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.0, 1.2, 32]} />
        <meshStandardMaterial
          color="#B9975B"
          emissive="#B9975B"
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>
      {/* Warrior placeholder */}
      <WarriorPlaceholder />
    </group>
  );
};

const WarriorPlaceholder = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, 0.2, 0]}>
        <capsuleGeometry args={[0.35, 1.2, 8, 16]} />
        <meshStandardMaterial color="#4a3520" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#6b4c30" metalness={0.4} roughness={0.5} />
      </mesh>
      {/* Helmet crest */}
      <mesh position={[0, 1.6, 0]}>
        <coneGeometry args={[0.12, 0.4, 8]} />
        <meshStandardMaterial
          color="#B9975B"
          metalness={0.8}
          roughness={0.2}
          emissive="#B9975B"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Shield (left) */}
      <mesh position={[-0.55, 0.2, 0.1]} rotation={[0, 0.3, 0]}>
        <circleGeometry args={[0.35, 16]} />
        <meshStandardMaterial
          color="#8B0000"
          metalness={0.5}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Weapon (right) */}
      <mesh position={[0.4, 0.5, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 1.8, 8]} />
        <meshStandardMaterial color="#B9975B" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Weapon tip */}
      <mesh position={[0.52, 1.35, 0]} rotation={[0, 0, -0.2]}>
        <coneGeometry args={[0.06, 0.25, 6]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

const Loader = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="loader-spiral" />
  </div>
);

const CharacterShowcase = () => {
  return (
    <section
      id="character"
      className="relative min-h-screen flex flex-col lg:flex-row items-center dong-son-pattern"
    >
      {/* 3D Canvas - Full bleed on large, stacked on mobile */}
      <div className="relative w-full lg:w-3/5 h-[60vh] lg:h-screen">
        <Suspense fallback={<Loader />}>
          <Canvas camera={{ position: [0, 0.5, 4], fov: 45 }}>
            <color attach="background" args={["#0A0A0A"]} />
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.8} color="#B9975B" />
            <pointLight position={[-3, 2, -3]} intensity={0.4} color="#8B0000" />
            <spotLight
              position={[0, 5, 0]}
              intensity={1}
              angle={0.4}
              penumbra={0.8}
              color="#B9975B"
            />
            <Pedestal />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2}
              autoRotate
              autoRotateSpeed={0.5}
            />

            <fog attach="fog" args={["#0A0A0A", 5, 15]} />
          </Canvas>
        </Suspense>

        {/* Vignette overlay */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-abyss/50 via-transparent to-abyss/50" />
      </div>

      {/* Lore text */}
      <div className="relative w-full lg:w-2/5 px-8 lg:px-16 py-16 lg:py-0">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-body text-xs tracking-[0.3em] text-gold/60 uppercase mb-4">
            Nhân vật chính
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-parchment mb-2">
            Người Kế Thừa Ký Ức
          </h2>
          <div className="w-16 h-px bg-linear-to-r from-gold to-transparent mb-6" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-body text-parchment/60 leading-relaxed mb-6 font-light"
          >
            Bạn vào vai một người trẻ yêu văn hóa, bắt đầu hành trình du hành qua các vùng miền
            để tìm lại những giá trị đang dần lùi xa vào dĩ vãng. Trên con đường ấy, bạn khám phá
            và hồi sinh các làng nghề truyền thống như tranh kiếng Nam Bộ, lồng đèn thủ công hay
            nón lá.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-body text-parchment/40 leading-relaxed mb-8 font-light text-sm"
          >
            Với sức mạnh đặc biệt mang tên “Nhãn giới ký ức”, bạn nhìn xuyên qua lớp bụi thời gian,
            chạm vào từng công đoạn chế tác tỉ mỉ và đánh thức những ký ức rực rỡ đang ngủ yên
            trong lòng di sản. Sức Mạnh, Trí Tuệ và Tốc Độ của bạn sẽ cùng nhau quyết định tương lai
            của những làng nghề ấy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex gap-8"
          >
            {[
              { label: "Sức Mạnh", value: "98" },
              { label: "Trí Tuệ", value: "92" },
              { label: "Tốc Độ", value: "87" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-2xl text-gold">{stat.value}</p>
                <p className="font-body text-xs text-parchment/40 tracking-wider uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CharacterShowcase;