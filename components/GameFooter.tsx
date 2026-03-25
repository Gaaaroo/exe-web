'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const socialLinks = [
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <Image
        src='/mxh-01.png'
        alt='Facebook'
        width={40}
        height={40}
      />
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <Image
        src='/mxh-02.png'
        alt='YouTube'
        width={40}
        height={40}
      />
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <Image
        src='/mxh-03.png'
        alt='Instagram'
        width={40}
        height={40}
      />
    ),
  },
  {
    label: 'TikTok',
    href: '#',
    icon: (
      <Image
        src='/mxh-04.png'
        alt='TikTok'
        width={40}
        height={40}
      />
    ),
  },
];

const footerLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Term of Service', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Contact Us', href: '#' },
  { label: 'Help Center', href: '#' },
];

const GameFooter = () => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  return (
    <footer className='bg-transparent'>
      {/* Social icons row */}
      <div className='border-t border-b border-gray-100/50 py-5 px-4 bg-green-600/40'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className='flex items-center justify-center gap-30'
        >
          {socialLinks.map((s) => (
            <a
              key={s.label}
              // href={s.href}
              aria-label={s.label}
              className='transition-colors duration-200'
            >
              {s.icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Subscribe row */}
      <div className='border-t border-white/8 py-10 px-4 backdrop-brightness-70'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-6'
        >
          <p className='text-green-400 text-md whitespace-nowrap shrink-0 mb-8 mr-10'>
            Subcribe for the lastest news
          </p>

          <div className='flex-1 w-full flex flex-col gap-3'>
            <div className='flex gap-5 w-full'>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='flex-1 bg-white border border-white/20 rounded-md px-4 py-2.5 text-gray-700 placeholder:text-gray-500 text-sm focus:outline-none focus:border-green-400/60 transition-colors'
              />
              <button
                type='button'
                className='bg-green-400 hover:bg-green-300 text-black font-bold px-5 py-2.5 rounded-md text-sm transition-colors duration-200 whitespace-nowrap cursor-pointer'
              >
                Subcribe Now
              </button>
            </div>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='checkbox'
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className='w-4 h-4 accent-green-400 cursor-pointer'
              />
              <span className='text-white/60 text-xs'>I agree</span>
            </label>
          </div>
        </motion.div>
      </div>

      {/* Footer links + logo */}
      <div className='border-t border-white/8 py-8 px-4 backdrop-brightness-70'>
        <div className='max-w-3xl mx-auto flex flex-col items-center gap-5'>
          <div className='flex flex-wrap items-center justify-center gap-4 sm:gap-6'>
            {footerLinks.map((link) => (
              <a
                key={link.label}
                // href={link.href}
                className='text-white/50 hover:text-white/80 text-sm transition-colors duration-200'
              >
                {link.label}
              </a>
            ))}
          </div>

          <Image
            src='/3x3logo.png'
            alt='Logo'
            width={200}
            height={150}
            className='inline-block -mt-1'
          />

          {/* <Image
            src='/quote.png'
            alt='Quote'
            width={120}
            height={20}
            className='inline-block -mt-1 opacity-50'
          /> */}
          <p className='text-white/50 text-sm'>
            Nơi mỗi mảnh ghép ký ức trở thành nhịp thở của di sản
          </p>
        </div>
      </div>
    </footer>
  );
};

export default GameFooter;
