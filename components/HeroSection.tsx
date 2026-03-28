'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
    el?.addEventListener('mousemove', handleMouseMove);
    return () => el?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id='hero'
      ref={containerRef}
      className='relative h-screen flex flex-col items-center justify-start pt-8 overflow-hidden'
    >
      {/* Background */}
      <motion.div
        className='absolute inset-0'
        style={{
          backgroundImage: 'url(/cover.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        animate={{
          x: mousePos.x * -0.4,
          y: mousePos.y * -0.4,
          scale: 1.05,
        }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
      />

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center text-center'>
        {/* Game title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
        >
          <Image
            src='/typo.png'
            alt='Ký ức di sản'
            width={900}
            height={280}
            priority
            className='max-w-155 h-auto'
          />
        </motion.div>

        {/* Video play button */}
        <motion.button
          type='button'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
          className='w-20  h-20 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center hover:scale-110 transition-all duration-200 mb-15 -mt-15'
          aria-label='Play trailer'
        >
          <svg
            className='w-8 h-8 text-white ml-1'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M8 5v14l11-7z' />
          </svg>
        </motion.button>

        {/* App store buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className='flex flex-row gap-4 flex-wrap justify-center'
        >
          <a
            href='#'
            className='flex items-center gap-3 bg-black border border-white/30 hover:border-white/60 text-white px-6 py-3 rounded-4xl transition-all duration-200 hover:bg-black/80'
          >
            <svg
              className='h-10 shrink-0'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
            </svg>
            <div className='text-left'>
              <p className='text-sm text-white leading-none mb-0.5'>
                Download on the
              </p>
              <p className='text-xl font-medium leading-none'>App Store</p>
            </div>
          </a>

          <a
            href='#'
            className='flex items-center gap-3 bg-black border border-white/30 hover:border-white/60 text-white px-6 py-3 transition-all duration-200 hover:bg-black/80 rounded-4xl'
          >
            <Image
              src='/option02.png'
              alt='Google Play'
              width={28}
              height={28}
              className='shrink-0'
            />
            <div className='text-left'>
              <p className='text-sm text-white leading-none mb-0.5'>
                GET IT ON
              </p>
              <p className='text-xl font-medium leading-none'>Google Play</p>
            </div>
          </a>
        </motion.div>
      </div>

      {/* Heritage Echoes */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className='absolute bottom-6 right-10 z-10'
      >
        <Image
          src='/typo02.png'
          alt='Heritage Echoes'
          width={300}
          height={60}
          className='h-auto w-40 sm:w-48 md:w-60 lg:w-72 mx-auto opacity-80'
        />
      </motion.p>
    </section>
  );
};

export default HeroSection;
