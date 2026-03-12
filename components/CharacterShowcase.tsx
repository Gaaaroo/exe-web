 "use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { MyCharacter } from "./MyCharacter";

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
      <MyCharacter />
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
      className="relative min-h-screen flex flex-col lg:flex-row items-center"
    >
      {/* 3D Canvas - Full bleed on large, stacked on mobile */}
      <div className="relative w-full lg:w-3/5 h-[60vh] lg:h-screen">
        <Suspense fallback={<Loader />}>
          <Canvas
            gl={{ alpha: true }}
            camera={{ position: [0, 0.5, 4], fov: 45 }}
            style={{ background: "transparent" }}
          >
            {/* Tăng sáng tổng thể cho nhân vật hơn nữa */}
            <ambientLight intensity={0.9} />
            <pointLight position={[4, 5, 4]} intensity={1.8} color="#FFE4B8" />
            <pointLight position={[-3, 3, -2]} intensity={1} color="#FF9C5C" />
            {/* Rim light nhẹ từ phía sau để tách nhân vật khỏi nền */}
            <pointLight position={[0, 3, -4]} intensity={0.8} color="#FFFFFF" />
            <spotLight
              position={[0, 6, 2]}
              intensity={1.6}
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