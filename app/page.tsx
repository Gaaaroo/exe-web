"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SignatureMoment from "@/components/SignatureMoment";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CharacterShowcase from "@/components/CharacterShowcase";
import FeaturesGrid from "@/components/FeaturesGrid";
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

  return (
    <div className="min-h-screen bg-background">
      <SignatureMoment onComplete={() => setIntroComplete(true)} />
      {introComplete && (
        <>
          <Navigation />
          <HeroSection />
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
