'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const socialLinks = [
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg
        className='w-5 h-5'
        fill='currentColor'
        viewBox='0 0 24 24'
      >
        <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg
        className='w-5 h-5'
        fill='currentColor'
        viewBox='0 0 24 24'
      >
        <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg
        className='w-5 h-5'
        fill='currentColor'
        viewBox='0 0 24 24'
      >
        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: '#',
    icon: (
      <svg
        className='w-5 h-5'
        fill='currentColor'
        viewBox='0 0 24 24'
      >
        <path d='M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' />
      </svg>
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
      <div className='border-t border-b border-gray-100/50 py-5 px-4 bg-green-700/20'>
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
              href={s.href}
              aria-label={s.label}
              className='w-12 h-12 rounded-full flex items-center justify-center text-green-400 border border-green-400/30 bg-green-400/5 hover:bg-green-400/15 hover:border-green-400 transition-all duration-200'
            >
              {s.icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Subscribe row */}
      <div className='border-t border-white/8 py-10 px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-6'
        >
          <p className='text-green-400 font-semibold text-sm whitespace-nowrap shrink-0'>
            Subcribe for the lastest news
          </p>

          <div className='flex-1 w-full flex flex-col gap-3'>
            <div className='flex gap-2 w-full'>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='flex-1 bg-transparent border border-white/20 rounded-md px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-green-400/60 transition-colors'
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
      <div className='border-t border-white/8 py-8 px-4'>
        <div className='max-w-3xl mx-auto flex flex-col items-center gap-5'>
          <div className='flex flex-wrap items-center justify-center gap-4 sm:gap-6'>
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
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
