'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import GameFooter from '@/components/GameFooter';

const starPackages = [
  { qty: 'x20', price: '5,000 VND' },
  { qty: 'x50', price: '10,000 VND' },
  { qty: 'x200', price: '45,000 VND' },
  { qty: 'x500', price: '100,000 VND' },
  { qty: 'x900', price: '200,000 VND' },
  { qty: 'x1800', price: '400,000 VND' },
  { qty: 'x2.100', price: '500,000 VND' },
  { qty: 'x5.000', price: '1,000,000 VND' },
  { qty: 'x12.000', price: '2,000,000 VND' },
];

const tabs = ['Star', 'Map', 'Product'];
const paymentMethods = ['momo', 'Credit Card'];

export default function TopUpPage() {
  const [activeTab, setActiveTab] = useState('Star');
  const [activePayment, setActivePayment] = useState('Credit Card');

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

      {/* Star field */}
      <div className='fixed inset-0 pointer-events-none overflow-hidden z-0'>
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className='absolute rounded-full bg-white'
            style={{
              width: i % 7 === 0 ? 2 : 1,
              height: i % 7 === 0 ? 2 : 1,
              left: `${(i * 1.73 * 100) % 100}%`,
              top: `${(i * 2.31 * 100) % 100}%`,
              opacity: 0.08 + (i % 6) * 0.06,
            }}
          />
        ))}
      </div>

      <main className='relative z-10 flex-1 pt-24 pb-16 px-4'>
        <div className='max-w-300 mx-auto'>
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mb-8'
          >
            <h1 className='text-4xl sm:text-5xl font-heading text-green-400 uppercase tracking-widest leading-tight'>
              KÝ ỨC DI SẢN
            </h1>
            <p className='font-body text-xs tracking-[0.3em] text-gold/70 uppercase mt-1'>
              TOP - UP CENTER
            </p>
          </motion.div>

          {/* Character banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='relative w-full rounded-xl overflow-hidden mb-3 border border-white/10'
            style={{ aspectRatio: '16/6' }}
          >
            <Image
              src='/topup.png'
              alt='Game Character'
              fill
              className='object-cover object-top'
              priority
            />
          </motion.div>

          {/* Account notice */}
          <p className='font-body text-white/50 text-sm mb-8'>
            No character under current account, please switch to another
            account.
          </p>

          {/* Discount section */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='mb-8'
          >
            <h2 className='font-heading text-xl text-green-400 mb-1'>
              Exclusive Top-Up Center Discount
            </h2>
            <p className='font-body text-white/50 text-sm'>
              Switch account to claim exclusive rewards
            </p>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className='mb-8'
          >
            <h3 className='font-body text-xs tracking-[0.3em] text-gold/70 uppercase mb-3'>
              Payment Method
            </h3>
            <div className='grid grid-cols-2 gap-3'>
              {paymentMethods.map((method) => (
                <button
                  key={method}
                  type='button'
                  onClick={() => setActivePayment(method)}
                  className={`py-3 px-4 rounded-4xl text-sm font-medium transition-all duration-200 cursor-pointer border text-left ${
                    activePayment === method
                      ? 'bg-[#1a3a1a] border-green-400/60 text-white'
                      : 'bg-[#0b1528]/60 border-white/15 text-white/70 hover:border-white/30'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='flex gap-4 mb-6'
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                type='button'
                onClick={() => setActiveTab(tab)}
                className={`px-15 py-2 rounded-full text-md transition-all duration-200 cursor-pointer border ${
                  activeTab === tab
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white/80 border-white/30 hover:border-white/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* Star packages grid */}
          {activeTab === 'Star' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className='grid grid-cols-3 gap-6'
            >
              {starPackages.map((pkg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className='aspect-square bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-green-400/10 transition-shadow duration-200 group flex flex-col'
                >
                  <div className='relative flex-1 flex items-center justify-center bg-white'>
                    {/* Quantity badge */}
                    <span className='absolute top-18 right-20 text-lg font-light text-green-500'>
                      {pkg.qty}
                    </span>
                    <div className='group-hover:scale-105 transition-transform duration-200'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='/star02.png'
                        alt='Star Icon'
                        width={170}
                        height={150}
                        className='object-contain'
                      />
                    </div>
                  </div>
                  {/* Price button */}
                  <div className='bg-green-400 hover:bg-yellow-400 py-4 text-center shrink-0 m-5'>
                    <span className='text-black font-light text-lg'>
                      {pkg.price}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab !== 'Star' && (
            <div className='flex items-center justify-center h-40 text-white/30 text-sm'>
              Coming soon
            </div>
          )}
        </div>
      </main>

      <GameFooter />
    </div>
  );
}
