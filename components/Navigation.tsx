"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const setShowUserMenuRef = useRef(setShowUserMenu);
  setShowUserMenuRef.current = setShowUserMenu;

  useEffect(() => {
    const closeUserMenu = () => setShowUserMenuRef.current(false);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowCta(window.scrollY > 200);
      closeUserMenu();
    };
    const handleWheel = () => closeUserMenu();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    document.addEventListener("wheel", handleWheel, { passive: true, capture: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      document.removeEventListener("scroll", handleScroll, true);
      document.removeEventListener("wheel", handleWheel, true);
    };
  }, []);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }
    };
    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setShowUserMenu(false);
    await supabase.auth.signOut();
  };

  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email ??
    "User";
  const avatarUrl =
    user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture ?? null;

  const navLinks = [
    { label: "Tổng Quan", href: "#hero" },
    { label: "Về Dự Án", href: "#about" },
    { label: "Nhân Vật", href: "#character" },
    { label: "Tính Năng", href: "#features" },
    { label: "Mua Game", href: "#purchase" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-abyss border-b border-parchment/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-14 sm:h-16 px-3 sm:px-6 gap-2 min-w-0">
        <a
          href="#hero"
          className="font-heading text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl tracking-[0.2em] sm:tracking-[0.3em] lg:tracking-[0.35em] text-gold uppercase whitespace-nowrap shrink min-w-0"
        >
          GAME
        </a>

        <div className="flex items-center shrink-0 gap-1 sm:gap-2 md:gap-4 lg:gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="story-link text-[10px] sm:text-xs md:text-sm font-body tracking-wider text-parchment/70 hover:text-gold transition-colors duration-300 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {user ? (
            <motion.div
              key="user"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative flex items-center shrink-0 gap-1 sm:gap-2 md:gap-3"
              ref={userMenuRef}
            >
              <button
                type="button"
                onClick={() => setShowUserMenu((open) => !open)}
                className="flex items-center gap-1 sm:gap-2 md:gap-3 focus:outline-none min-w-0 cursor-pointer"
              >
                <span className="font-body text-[10px] sm:text-xs md:text-sm text-parchment/90 max-w-[60px] sm:max-w-[80px] md:max-w-[120px] truncate text-left whitespace-nowrap">
                  {displayName}
                </span>
                <span className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full overflow-hidden border border-gold/50 bg-card shrink-0 ring-1 ring-gold/30">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={displayName}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center text-gold text-xs font-heading bg-gold/10">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </span>
              </button>

              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 top-10 min-w-[180px] rounded-lg bg-card/95 border border-parchment/10 shadow-xl shadow-black/20 py-1.5 backdrop-blur-sm"
                >
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 font-body text-sm text-parchment/80 hover:bg-gold/10 hover:text-gold transition-colors duration-200 rounded-md mx-1.5 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 shrink-0 text-gold/60" />
                    <span>Đăng xuất</span>
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : showCta ? (
            <motion.a
              key="cta"
              href={`/login?next=${encodeURIComponent("/")}&section=purchase`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="shrink-0 heat-haze px-2 py-1 sm:px-3 sm:py-1.5 md:px-5 md:py-2 border border-gold/50 text-gold text-[10px] sm:text-xs md:text-sm font-body tracking-wider hover:border-gold transition-all duration-300 whitespace-nowrap"
            >
              ĐĂNG NHẬP
            </motion.a>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
