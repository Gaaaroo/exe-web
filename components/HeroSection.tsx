"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
          backgroundImage: "url(/phongcanh.png)",
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
      <div className="absolute inset-0 bg-linear-to-t from-abyss/75 via-abyss/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-abyss/30 to-abyss/45" />

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8, ease: "easeOut" }}
          className="mb-4 flex justify-center"
        >
          <Image
            src="/typo.png"
            alt="Ký Ức Di Sản"
            width={800}
            height={260}
            priority
            className="h-auto w-[260px] sm:w-[360px] md:w-[520px] lg:w-[640px] xl:w-[720px]"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 1 }}
          className="font-body text-lg md:text-xl tracking-[0.3em] text-parchment/60 mb-8 uppercase"
        >
          Di sản không chỉ để giữ gìn, mà là để sống lại
        </motion.p>

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

