"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };
    const el = containerRef.current;
    el?.addEventListener("mousemove", handleMouseMove);
    return () => el?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const titleChars = "HUYỀN SỬ VIỆT".split("");

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        animate={{
          x: mousePos.x * -0.5,
          y: mousePos.y * -0.5,
          scale: 1.05,
        }}
        transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-abyss/40 to-transparent h-1/3" />

      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/30"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
          className="font-body text-sm tracking-[0.3em] text-gold/70 mb-6 uppercase"
        >
          Khám phá huyền thoại ngàn năm
        </motion.p>

        <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl tracking-wider text-gold-glow mb-8">
          {titleChars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 3 + i * 0.08,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="inline-block text-parchment"
              style={{ minWidth: char === " " ? "0.3em" : undefined }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2, duration: 1 }}
          className="font-body text-parchment/60 text-lg md:text-xl max-w-xl mx-auto mb-12 font-light"
        >
          Một cuộc hành trình xuyên thời gian, nơi lịch sử và thần thoại hòa quyện
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="px-8 py-3 tracking-widest uppercase heat-haze">
            <Link href="#purchase">MUA NGAY</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3 border-parchment/30 text-parchment/80 tracking-widest uppercase heat-haze hover:border-gold/50 hover:text-gold"
          >
            XEM TRAILER
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gold/40 text-xs font-body tracking-widest">CUỘN XUỐNG</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;

