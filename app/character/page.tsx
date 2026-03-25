'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navigation from '@/components/Navigation';

const CharacterCanvas = dynamic(() => import('@/components/CharacterCanvas'), {
  ssr: false,
});

type Star = {
  w: number;
  h: number;
  left: number;
  top: number;
  opacity: number;
  duration: number;
  delay: number;
};

export default function CharacterPage() {
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [stars] = useState<Star[]>(() =>
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

  return (
    <div className='min-h-screen flex flex-col'>
      <video
        autoPlay
        loop
        muted
        playsInline
        className='fixed inset-0 w-full h-full object-cover -z-10'
        src='/bg-ani.mp4'
      />
      <Navigation />

      {/* Main character section */}
      <section className='flex-1 relative flex items-center'>
        {/* 3D Canvas — full bleed background */}
        <div className='pl-25 absolute inset-0 z-0'>
          <CharacterCanvas />
        </div>

        {/* Starfield dots */}
        {stars.map((s, i) => (
          <motion.div
            key={i}
            className='absolute rounded-full bg-white pointer-events-none'
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

        <div className='relative z-10 max-w-300 mx-auto flex items-center justify-between gap-8 pointer-events-none'>
          {/* Left: Character info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className='w-full pointer-events-auto'
          >
            <h1 className='font-light text-green-400 text-4xl mb-5'>
              Người thừa kế Di Sản
            </h1>

            <div className='font-body text-white/70 text-sm leading-relaxed space-y-3 mb-8 font-light text-justify'>
              <p>
                Bạn vào vai một người trẻ yêu văn hóa, bắt đầu hành trình du
                hành qua các vùng miền để tìm lại những giá trị đang dần lùi xa
                vào dĩ vãng. Trên con đường ấy, bạn khám phá và hồi sinh các
                làng nghề truyền thống như tranh kiếng Nam Bộ, lồng đèn thủ công
                hay nón lá.
              </p>
              <p>
                Với sức mạnh đặc biệt mang tên "Nhãn giới ký ức", bạn nhìn xuyên
                qua lớp bụi thời gian, chạm vào từng công đoạn chế tác tỉ mỉ và
                đánh thức những ký ức rực rỡ đang ngủ yên trong lòng di sản. Sức
                Mạnh, Trí Tuệ và Tốc Độ của bạn sẽ cùng nhau quyết định tương
                lai của những làng nghề ấy.
              </p>
            </div>

            {/* Voice button */}
            <motion.button
              type='button'
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setVoicePlaying((p) => !p)}
              className='flex items-center justify-between gap-4 border border-white/30 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer'
            >
              <span>Voice</span>
              <svg
                className={`w-10 h-5 ${voicePlaying ? 'text-green-400' : 'text-white/50'} transition-colors`}
                viewBox='0 0 40 20'
                fill='none'
              >
                <rect
                  x='0'
                  y='8'
                  width='3'
                  height='4'
                  rx='1'
                  fill='currentColor'
                />
                <rect
                  x='5'
                  y='5'
                  width='3'
                  height='10'
                  rx='1'
                  fill='currentColor'
                />
                <rect
                  x='10'
                  y='2'
                  width='3'
                  height='16'
                  rx='1'
                  fill='currentColor'
                />
                <rect
                  x='15'
                  y='5'
                  width='3'
                  height='10'
                  rx='1'
                  fill='currentColor'
                />
                <rect
                  x='20'
                  y='7'
                  width='3'
                  height='6'
                  rx='1'
                  fill='currentColor'
                />
                <rect
                  x='25'
                  y='4'
                  width='3'
                  height='12'
                  rx='1'
                  fill='currentColor'
                />
                <rect
                  x='30'
                  y='6'
                  width='3'
                  height='8'
                  rx='1'
                  fill='currentColor'
                />
                <rect
                  x='35'
                  y='8'
                  width='3'
                  height='4'
                  rx='1'
                  fill='currentColor'
                />
              </svg>
            </motion.button>
          </motion.div>
          <div className='w-7xl'></div>

          {/* Right: Character portrait + buttons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className='flex flex-col items-center gap-5 pointer-events-auto'
          >
            {/* Character portrait */}
            <div className='w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden border border-white/20 bg-[#0b1528]'>
              <Image
                src='/main-avt.png'
                alt='Character'
                width={112}
                height={112}
                className='w-full h-full object-cover object-top'
              />
            </div>

            {/* Coming Soon card */}
            <div className='w-24 md:w-28 h-24 md:h-28 rounded-lg bg-[#1a4a3a] border border-green-900/50 flex items-center justify-center cursor-pointer hover:bg-[#1f5544] transition-colors'>
              <span className='text-white/80 text-xs text-center px-2'>
                ComingSoon
              </span>
            </div>

            {/* More button */}
            <motion.button
              type='button'
              whileHover={{ scale: 1.03 }}
              className='flex items-center gap-3 bg-green-400 hover:bg-green-400 text-white text-2xl pl-7 pr-2 py-2 mr-11 rounded-full transition-colors duration-200 cursor-pointer min-w-[160px] justify-between'
            >
              More
              <span className='w-8 h-8 rounded-full bg-[#1a4a3a] shrink-0' />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA strip */}
      <div className='bg-white flex items-center justify-between px-8 md:px-16 py-8'>
        <h2 className='font-heading text-[#0a3d3a] font-black text-3xl md:text-4xl tracking-widest uppercase'>
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
