"use client";

import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import NewsSection from "@/components/NewsSection";
import GameFooter from "@/components/GameFooter";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorCode = params.get("error_code");
    const error = params.get("error");
    if (errorCode === "bad_oauth_state" || error === "invalid_request") {
      const next = params.get("next") ?? "/";
      window.location.replace(`/login?error=state&next=${encodeURIComponent(next)}`);
    }
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.replace(/^#/, "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <div className="relative min-h-screen">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
        src="/bg-ani.mp4"
      />
      <Navigation />
      <HeroSection />
      <NewsSection />
      <GameFooter />
      <BackToTop />
    </div>
  );
};

export default Index;
