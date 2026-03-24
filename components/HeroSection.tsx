"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 15,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 15,
      });
    };
    const el = containerRef.current;
    el?.addEventListener("mousemove", handleMouseMove);
    return () => el?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/phongcanh.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        animate={{
          x: mousePos.x * -0.4,
          y: mousePos.y * -0.4,
          scale: 1.05,
        }}
        transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-[#060d1e]/80 via-[#060d1e]/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-[#060d1e]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Game title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          className="mb-6"
        >
          <Image
            src="/typo.png"
            alt="Ký Ức Đồ Gần"
            width={900}
            height={280}
            priority
            className="h-auto w-70 sm:w-100 md:w-140 lg:w-175 xl:w-200"
          />
        </motion.div>

        {/* Video play button */}
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300 cursor-pointer mb-8"
          aria-label="Play trailer"
        >
          <svg
            className="w-8 h-8 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </motion.button>

        {/* Heritage Echoes */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="italic text-white/70 text-xl md:text-2xl font-light mb-10"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Heritage Echoes
        </motion.p>

        {/* App store buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-row gap-4 flex-wrap justify-center"
        >
          {/* App Store */}
          <a
            href="#"
            className="flex items-center gap-3 bg-black border border-white/30 hover:border-white/60 text-white px-6 py-3 rounded-xl transition-all duration-200 hover:bg-white/5"
          >
            <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="text-left">
              <p className="text-[10px] text-white/60 leading-none mb-0.5">Download on the</p>
              <p className="text-base font-semibold leading-none">App Store</p>
            </div>
          </a>

          {/* Google Play */}
          <a
            href="#"
            className="flex items-center gap-3 bg-black border border-white/30 hover:border-white/60 text-white px-6 py-3 rounded-xl transition-all duration-200 hover:bg-white/5"
          >
            <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.3.17.64.24.99.2L15.5 12 12 8.5 3.18 23.76zM20.93 10.6L18.1 9l-3.6 3 3.6 3.6 2.84-1.62c.81-.46.81-1.92-.01-2.38zM2.19.24C2.07.5 2 .8 2 1.15v21.7c0 .35.07.65.19.9L15.5 12 2.19.24zM15.5 12L3.17 23.76c.08.05.17.08.26.1L17.5 14.5 15.5 12z"/>
            </svg>
            <div className="text-left">
              <p className="text-[10px] text-white/60 leading-none mb-0.5">GET IT ON</p>
              <p className="text-base font-semibold leading-none">Google Play</p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
