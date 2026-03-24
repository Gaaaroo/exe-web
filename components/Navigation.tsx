'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'News', href: '/#news' },
  { label: 'Character', href: '/character' },
  { label: 'Mechanics', href: '/mechanics' },
  { label: 'Story', href: '/story' },
  { label: 'Explore', href: '/explore' },
  { label: 'Top - Up', href: '/topup' },
];

const Navigation = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const isAtTop = current < 10;
      const goingUp = current < lastScrollY.current;
      setVisible(isAtTop || goingUp);
      if (!goingUp) setShowUserMenu(false);
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) setUser(session.user);
    };
    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setShowUserMenu(false);
    await supabase.auth.signOut();
  };

  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email ??
    'User';
  const avatarUrl =
    user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture ?? null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/30 backdrop-blur-xs ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className='max-w-350 mx-auto flex items-center justify-between h-16 px-6 lg:px-10'>
        {/* Logo */}
        <Link
          href='/'
          className='flex items-center shrink-0'
        >
          <Image
            src='/typo.png'
            alt='Ký Ức Đồ Gần'
            width={80}
            height={36}
            className='h-9 w-auto object-contain'
            priority
          />
        </Link>

        {/* Nav links */}
        <div className='hidden md:flex items-center gap-5 lg:gap-7'>
          {navLinks.map((link) => {
            const isActive =
              link.href === pathname ||
              (link.href.startsWith('/') &&
                !link.href.includes('#') &&
                pathname === link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 whitespace-nowrap pb-0.5 ${
                  isActive
                    ? 'text-white border-b-2 border-green-400'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className='flex items-center gap-3 shrink-0'>
          <AnimatePresence mode='wait'>
            {user ? (
              <motion.div
                key='user'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='relative flex items-center gap-2'
                ref={userMenuRef}
              >
                <button
                  type='button'
                  onClick={() => setShowUserMenu((o) => !o)}
                  className='flex items-center gap-2 focus:outline-none cursor-pointer'
                >
                  <span className='text-white/80 text-sm max-w-[100px] truncate'>
                    {displayName}
                  </span>
                  <span className='w-8 h-8 rounded-full overflow-hidden border border-green-400/50 shrink-0'>
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt={displayName}
                        width={32}
                        height={32}
                        className='w-full h-full object-cover'
                        unoptimized
                      />
                    ) : (
                      <span className='w-full h-full flex items-center justify-center text-green-400 text-xs bg-green-400/10'>
                        {displayName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </span>
                </button>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='absolute right-0 top-11 min-w-[160px] rounded-lg bg-[#0d1630] border border-white/10 shadow-xl py-1'
                  >
                    <button
                      type='button'
                      onClick={handleLogout}
                      className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer'
                    >
                      <LogOut className='w-4 h-4 shrink-0' />
                      <span>Đăng xuất</span>
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.a
                key='login'
                href={`/login?next=${encodeURIComponent('/')}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-white/80 hover:text-white text-sm font-medium transition-colors'
              >
                Login
              </motion.a>
            )}
          </AnimatePresence>

          <a
            href='#'
            className='bg-green-400 hover:bg-green-300 text-black font-bold text-sm px-5 py-2 rounded-full transition-colors duration-200 whitespace-nowrap'
          >
            DOWNLOAD
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
