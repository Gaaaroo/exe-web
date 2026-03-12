"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SignatureMoment from "@/components/SignatureMoment";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CharacterShowcase from "@/components/CharacterShowcase";
import FeaturesGrid from "@/components/FeaturesGrid";
import StatsSection from "@/components/StatsSection";
import PurchaseSection from "@/components/PurchaseSection";
import GameFooter from "@/components/GameFooter";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!introComplete) return;
    // Nếu user quay về với hash (vd. /#purchase sau khi đăng nhập) thì cho scroll ngay, không cần đợi hero
    if (typeof window !== "undefined" && window.location.hash) {
      setCanScroll(true);
      return;
    }
    const preventScroll = (e: Event) => {
      if (!canScroll) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    if (!canScroll) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [introComplete, canScroll]);

  useEffect(() => {
    const errorCode = searchParams.get("error_code");
    const error = searchParams.get("error");
    if (errorCode === "bad_oauth_state" || error === "invalid_request") {
      const next = searchParams.get("next") ?? "/#purchase";
      window.location.replace(`/login?error=state&next=${encodeURIComponent(next)}`);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!introComplete) return;

    const scrollToHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.replace(/^#/, "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // Khi intro vừa xong, nếu URL đã có #purchase thì kéo xuống
    scrollToHash();

    // Và nếu hash đổi (vd: click link # khác) thì cũng kéo
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [introComplete]);

  return (
    <div className="min-h-screen bg-background">
      <SignatureMoment onComplete={() => setIntroComplete(true)} />
      {introComplete && (
        <>
          <Navigation />
          <HeroSection onReady={() => setCanScroll(true)} />
          <AboutSection />
          <CharacterShowcase />
          <FeaturesGrid />
          <StatsSection />
          <PurchaseSection />
          <GameFooter />
          <BackToTop />
        </>
      )}
    </div>
  );
};

export default Index;
