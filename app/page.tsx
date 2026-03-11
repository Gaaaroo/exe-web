"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SignatureMoment from "@/components/SignatureMoment";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CharacterShowcase from "@/components/CharacterShowcase";
import FeaturesGrid from "@/components/FeaturesGrid";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import PurchaseSection from "@/components/PurchaseSection";
import GameFooter from "@/components/GameFooter";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const searchParams = useSearchParams();

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
          <HeroSection />
          <AboutSection />
          <CharacterShowcase />
          <FeaturesGrid />
          <StatsSection />
          <PurchaseSection />
          <GameFooter />
        </>
      )}
    </div>
  );
};

export default Index;
