"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowCta(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        console.log("[Login thành công]", {
          email: session.user.email,
          name: session.user.user_metadata?.full_name ?? session.user.user_metadata?.name ?? session.user.email,
          id: session.user.id,
        });
      }
    };
    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          console.log("[Login thành công]", {
            email: session.user.email,
            name: session.user.user_metadata?.full_name ?? session.user.user_metadata?.name ?? session.user.email,
            id: session.user.id,
          });
        }
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
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("[Logout error]", error);
    }
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
        scrolled
          ? "bg-abyss border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <a href="#hero" className="font-heading text-xl tracking-widest text-gold">
          HUYỀN SỬ VIỆT
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="story-link text-sm font-body tracking-wider text-parchment/70 hover:text-gold transition-colors duration-300"
            >
              <span>{link.label}</span>
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
              className="relative hidden md:flex items-center gap-3"
              ref={userMenuRef}
            >
              <button
                type="button"
                onClick={() => setShowUserMenu((open) => !open)}
                className="flex items-center gap-3 focus:outline-none"
              >
                <span className="font-body text-sm text-parchment/90 max-w-[120px] truncate text-left">
                  {displayName}
                </span>
                <span className="w-8 h-8 rounded-full overflow-hidden border border-gold/50 bg-card shrink-0 ring-1 ring-gold/30">
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
                  className="absolute right-0 top-10 min-w-[160px] bg-card border border-border shadow-lg py-2"
                >
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 font-body text-sm text-parchment/80 hover:bg-gold/10 hover:text-gold transition-colors"
                  >
                    Đăng xuất
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : showCta ? (
            <motion.a
              key="cta"
              href="#purchase"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="hidden md:block heat-haze px-5 py-2 border border-gold/50 text-gold text-sm font-body tracking-wider hover:border-gold transition-all duration-300"
            >
              ĐẶT TRƯỚC
            </motion.a>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
