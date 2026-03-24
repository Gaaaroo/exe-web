"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import GameFooter from "@/components/GameFooter";

const videoThumbnails = [
  { src: "/phongcanh.png", alt: "Game Video 1" },
  { src: "/phongcanh2.png", alt: "Game Video 2" },
  { src: "/phongcanh3.png", alt: "Game Video 3" },
];

const screenshots = [
  { src: "/phongcanh.png", alt: "Screenshot 1" },
  { src: "/phongcanh2.png", alt: "Screenshot 2" },
  { src: "/phongcanh3.png", alt: "Screenshot 3" },
];

export default function ExplorePage() {
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => setActiveIdx((i) => (i - 1 + screenshots.length) % screenshots.length);
  const next = () => setActiveIdx((i) => (i + 1) % screenshots.length);

  useEffect(() => {
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10" src="/bg-ani.mp4" />
      <Navigation />

      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden"
        style={{ minHeight: "50vh" }}
      >
        {/* Star dots */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() > 0.8 ? 2 : 1,
              height: Math.random() > 0.8 ? 2 : 1,
              left: `${(i * 2.5) % 100}%`,
              top: `${(i * 3.7) % 100}%`,
              opacity: 0.1 + (i % 5) * 0.1,
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <Image
            src="/typo.png"
            alt="Ký Ức Đồ Gần"
            width={900}
            height={280}
            priority
            className="h-auto w-64 sm:w-80 md:w-[480px] lg:w-[580px]"
          />
        </motion.div>
      </section>

      {/* Game Video */}
      <section className="px-4 pb-20 max-w-300 mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-green-400 font-bold tracking-[0.25em] text-sm uppercase mb-8"
        >
          GAME VIDEO
        </motion.h2>

        <div className="grid grid-cols-3 gap-4">
          {videoThumbnails.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group cursor-pointer"
            >
              <Image
                src={v.src}
                alt={v.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Game Screenshot */}
      <section className="py-20 px-4 relative">
        {/* Glowing stars */}
        <div
          className="absolute"
          style={{
            left: "8%",
            top: "55%",
            width: 80,
            height: 80,
            background: "radial-gradient(circle, rgba(150,200,255,0.7) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(6px)",
          }}
        />
        <div
          className="absolute"
          style={{
            right: "10%",
            top: "20%",
            width: 50,
            height: 50,
            background: "radial-gradient(circle, rgba(150,200,255,0.5) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(5px)",
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-green-400 font-bold tracking-[0.25em] text-sm uppercase mb-12"
        >
          GAME SCREENSHOOT
        </motion.h2>

        <div className="relative max-w-[720px] mx-auto flex items-center gap-4">
          {/* Prev */}
          <button
            type="button"
            onClick={prev}
            className="shrink-0 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
            </svg>
          </button>

          {/* Screenshot display */}
          <div className="flex-1 relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={screenshots[activeIdx].src}
              alt={screenshots[activeIdx].alt}
              fill
              className="object-cover"
            />
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={next}
            className="shrink-0 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Next"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {screenshots.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                i === activeIdx ? "bg-green-400 w-6" : "bg-white/30"
              }`}
              aria-label={`Screenshot ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <GameFooter />
    </div>
  );
}
