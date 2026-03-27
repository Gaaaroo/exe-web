'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Image from 'next/image';

type Star = {
  w: number;
  h: number;
  left: number;
  top: number;
  opacity: number;
  duration: number;
  delay: number;
};

const mechanics = [
  {
    id: 1,
    title: 'Nhãn giới ký ức',
    image: '/mechanics/nhan-gioi-ky-uc.jpg',
    description:
      'Đây là cơ chế "chữ ký" cho phép người chơi kích hoạt một chế độ nhìn đặc biệt để thấu thị các lớp bụi thời gian, nhìn thấy các linh hồn di sản, diễn tích ẩn giấu hoặc các quy tắc ngầm trong nghề thủ công.',
  },
  {
    id: 2,
    title: 'Thủ công tương tác',
    image: '/mechanics/thu-cong-tuong-tac.jpg',
    description:
      'Chuỗi game mô phỏng nơi bạn trực tiếp “nhúng tay” vào từng công đoạn: cắt giấy, ghép kính, pha màu, thắp nến… Mỗi thao tác đều ảnh hưởng trực tiếp đến độ tinh xảo của tác phẩm.',
  },
  {
    id: 3,
    title: 'Giải đố văn hóa',
    image: '/mechanics/giai-do-van-hoa.jpg',
    description:
      'Giải đố văn hóa là hành trình ngược dòng thời gian, nơi mỗi câu đố là một "mật mã" dẫn dắt người chơi khám phá những tầng sâu ẩn giấu của phong tục, lịch sử và trí tuệ dân gian.',
  },
  {
    id: 4,
    title: 'Hệ thống Gia sản',
    image: '/mechanics/he-thong-gia-san.jpg',
    description:
      'Hệ thống gia sản là kho tàng lưu giữ những báu vật tinh thần và vật chất qua nhiều đời, nơi mỗi kỷ vật hay phong tục đều là một "mảnh ghép" định hình nên bản sắc và sự hưng thịnh bền vững của một dòng tộc hay cộng đồng.',
  },
  {
    id: 5,
    title: 'Cá nhân hóa & Tủ đồ',
    image: '/mechanics/ca-nhan-hoa.jpg',
    description:
      'Tủ đồ cá nhân hóa là không gian để bạn tự do định hình phong cách và khí chất riêng, nơi mỗi bộ trang phục hay phụ kiện không chỉ là diện mạo mà còn là sự kế thừa tinh hoa, giúp nhân vật khẳng định bản sắc độc bản trong hành trình di sản.',
  },
  {
    id: 6,
    title: 'Nhiệm vụ ban đêm & Kinh dị dân gian',
    image: '/mechanics/nhiem-vu-ban-dem.jpg',
    description:
      'Nhiệm vụ ban đêm & Kinh dị dân gian là cuộc dấn thân vào những góc khuất linh thiêng khi bóng tối buông xuống, nơi các lời nguyền cổ xưa và những tập tục bí ẩn trỗi dậy, thách thức sự can trường của người kế thừa trước những nỗi sợ truyền kiếp từ lòng đất mẹ.',
  },
];

export default function MechanicsPage() {
  const [active, setActive] = useState(0);
  const [stars, setStars] = useState<Star[]>([]);
  const current = mechanics[active];

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
    <div className='min-h-screen text-white flex flex-col'>
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

      <main className='flex-1 pt-24 pb-16 px-4 max-w-300 mx-auto w-full relative z-10'>
        {/* Cards row */}
        <motion.div
          className='flex flex-wrap gap-3 mb-6 mt-6'
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {mechanics.map((m, i) => (
            <motion.button
              key={m.id}
              onClick={() => setActive(i)}
              whileTap={{ scale: 0.93 }}
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              style={{
                backgroundImage: 'url(/bg-btn.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow:
                  active === i
                    ? '0 0 14px 2px rgba(74,222,128,0.55), 0 2px 8px rgba(0,0,0,0.6)'
                    : '0 1px 4px rgba(0,0,0,0.5)',
              }}
              className={`relative flex-1 min-w-[140px] px-4 py-3 border text-md text-center cursor-pointer rounded-xl ${
                active === i
                  ? 'border-green-400 text-black'
                  : 'border-white/30 text-black hover:border-white/60'
              }`}
            >
              {m.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Content box */}
        <div className='overflow-hidden'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={active}
              className='flex flex-col md:flex-row min-h-[460px]'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image */}
              <motion.div
                className='md:w-1/2 flex items-center justify-center'
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <Image
                  src='/test.png'
                  alt='Test Image'
                  width={500}
                  height={400}
                  className='object-cover rounded-4xl'
                />
              </motion.div>

              {/* Text */}
              <motion.div
                className='md:w-1/2 flex flex-col justify-start'
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              >
                <h2 className='font-heading text-5xl text-green-400 mb-6 leading-tight'>
                  {current.title}
                </h2>
                <p className='font-body text-white/80 text-base leading-relaxed text-justify'>
                  {current.description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom CTA strip */}
      <div className='relative z-10 bg-white flex items-center justify-between px-8 md:px-16 py-8'>
        <h2 className='font-heading text-[#0a3d3a] font-black text-3xl md:text-4xl tracking-widest uppercase'>
          KÝ ỨC DI SẢN
        </h2>
        <a
          href='#'
          className='bg-green-400 hover:bg-green-300 text-black font-bold px-10 py-3.5 rounded-4xl text-sm tracking-widest transition-colors duration-200 whitespace-nowrap'
        >
          DOWNLOAD
        </a>
      </div>
    </div>
  );
}
