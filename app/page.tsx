"use client";

import { useState } from "react";
import SignatureMoment from "@/components/SignatureMoment";
import { NavLink } from "@/components/NavLink";
import HeroSection from "@/components/HeroSection";
import CharacterShowcase from "@/components/CharacterShowcase";
import FeaturesGrid from "@/components/FeaturesGrid";
import StatsSection from "@/components/StatsSection";
import PurchaseSection from "@/components/PurchaseSection";
import GameFooter from "@/components/GameFooter";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SignatureMoment onComplete={() => setIntroComplete(true)} />
      {introComplete && (
        <>
          <NavLink href="/" />
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
