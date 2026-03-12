"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroSection = ({ onReady }: { onReady?: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasCalledReady = useRef(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleReady = useCallback(() => {
    if (hasCalledReady.current || !onReady) return;
    hasCalledReady.current = true;
    onReady();
  }, [onReady]);

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

  const titleWords = ["GAME"];

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
      <div className="absolute inset-0 bg-linear-to-t from-abyss via-abyss/60 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-b from-abyss/40 to-transparent h-1/3" />

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
          Đi tìm lại những làng nghề đã lùi vào dĩ vãng
        </motion.p>

        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl tracking-wider text-gold-glow mb-8">
          {titleWords.map((word, wordIndex) => (
            <span
              key={word}
              className="inline-block whitespace-nowrap mr-3 last:mr-0"
            >
              {word.split("").map((char, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 3 + (wordIndex * 6 + i) * 0.04,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="inline-block text-parchment"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2, duration: 1 }}
          className="font-body text-parchment/60 text-lg md:text-xl max-w-xl mx-auto mb-12 font-light"
        >
          Một chuyến phiêu lưu tương tác, nơi bạn tự tay thắp sáng tranh kính, lồng đèn và những di sản đang dần bị lãng quên.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.6, duration: 0.8 }}
          onAnimationComplete={handleReady}
          className="flex flex-row items-center justify-center gap-4 sm:gap-5 flex-wrap"
        >
          <Button
            asChild
            size="lg"
            className="rounded-md w-[200px] px-8 py-3.5 text-sm font-medium tracking-[0.2em] uppercase heat-haze cursor-pointer bg-gold/20 border border-gold/60 text-parchment hover:bg-gold/30 hover:border-gold transition-all duration-300 shadow-[0_0_20px_rgba(185,151,91,0.15)]"
          >
            <Link href="#purchase">MUA NGAY</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-md w-[200px] px-8 py-3.5 text-sm font-medium tracking-[0.2em] uppercase heat-haze cursor-pointer border-2 border-parchment/40 text-parchment/90 bg-transparent hover:border-parchment hover:bg-parchment/5 hover:text-parchment transition-all duration-300"
          >
            <Link href="#">XEM TRAILER</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

