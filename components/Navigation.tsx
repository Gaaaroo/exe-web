"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowCta(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

        <AnimatePresence>
          {showCta && (
            <motion.a
              href="#purchase"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="hidden md:block heat-haze px-5 py-2 border border-gold/50 text-gold text-sm font-body tracking-wider hover:border-gold transition-all duration-300"
            >
              ĐẶT TRƯỚC
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
