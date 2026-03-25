'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

type Star = {
  w: number;
  h: number;
  left: number;
  top: number;
  opacity: number;
  duration: number;
  delay: number;
};

export default function StoryPage() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 60 }, () => ({
        w: Math.random() > 0.8 ? 2 : 1,
        h: Math.random() > 0.8 ? 2 : 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: 0.1 + Math.random() * 0.5,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 3,
      })),
    );
  }, []);

  return (
    <div className='h-screen text-white flex flex-col overflow-hidden'>
      <video
        autoPlay
        loop
        muted
        playsInline
        className='fixed inset-0 w-full h-full object-cover -z-10'
        src='/bg-ani.mp4'
      />
      <Navigation />

      {/* Starfield */}
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className='fixed rounded-full bg-white pointer-events-none'
          style={{
            width: s.w,
            height: s.h,
            left: `${s.left}%`,
            top: `${s.top}%`,
            opacity: s.opacity,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
          }}
        />
      ))}

      {/* Glowing orb */}
      <div
        className='fixed pointer-events-none'
        style={{
          right: '35%',
          top: '30%',
          width: 120,
          height: 120,
          background:
            'radial-gradient(circle, rgba(150,200,255,0.6) 0%, rgba(100,160,255,0.2) 40%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(8px)',
        }}
      />

      <main className='flex-1 flex flex-col p-20 md:px-16 relative z-10 min-h-0 max-w-300 mx-auto w-full'>
        <motion.h1
          className='font-heading text-3xl md:text-4xl text-green-400 mt-6 mb-2'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          BACK STORY
        </motion.h1>

        {/* Image grid — fills remaining space */}
        <motion.div
          className='flex-1 grid grid-cols-[2fr_1fr] gap-3 min-h-0'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        >
          {/* Left column: chiếm 2 phần */}
          <div className='flex flex-col gap-3 min-h-0'>
            <div className='flex-1 overflow-hidden rounded-sm min-h-0'>
              <img
                src='/bgs-01.png'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='flex-1 overflow-hidden rounded-sm min-h-0'>
              <img
                src='/bgs-02.png'
                className='w-full h-full object-cover'
              />
            </div>
          </div>

          {/* Right column: chiếm 1 phần */}
          <div className='overflow-hidden rounded-sm min-h-0'>
            <img
              src='/bgs-03.png'
              className='w-full h-full object-cover object-top'
            />
          </div>
        </motion.div>
      </main>

      {/* Bottom CTA strip */}
      <div className='relative z-10 bg-white flex items-center justify-between px-8 md:px-16 py-8 shrink-0'>
        <h2
          className='font-heading text-[#0a3d3a] font-black text-3xl md:text-4xl tracking-widest uppercase'
        >
          KÝ ỨC DI SẢN
        </h2>
        <a
          href='#'
          className='bg-green-400 hover:bg-green-300 text-black font-bold px-10 py-3.5 rounded-lg text-sm tracking-widest transition-colors duration-200 whitespace-nowrap'
        >
          DOWNLOAD
        </a>
      </div>
    </div>
  );
}
