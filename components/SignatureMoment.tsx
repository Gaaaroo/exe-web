"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SignatureMoment = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"waiting" | "igniting" | "done">("waiting");

  const ignite = useCallback(() => {
    if (phase === "waiting") {
      setPhase("igniting");
      setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 2200);
    }
  }, [phase, onComplete]);

  useEffect(() => {
    const handleInteraction = () => ignite();
    window.addEventListener("mousemove", handleInteraction, { once: true });
    window.addEventListener("scroll", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });
    // Auto-ignite after 3s
    const timer = setTimeout(ignite, 3000);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [ignite]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-abyss flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Ember dot */}
          <motion.div
            className="relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              phase === "waiting"
                ? { scale: 1, opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="w-3 h-3 rounded-full bg-gold animate-pulse-glow" />
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-gold/30 blur-xl" />
          </motion.div>

          {/* Expanding spiral ring */}
          {phase === "igniting" && (
            <>
              <motion.div
                className="absolute w-40 h-40 rounded-full border border-gold/60"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 15, opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              <motion.div
                className="absolute w-20 h-20 rounded-full border border-gold/40"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 20, opacity: 0 }}
                transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
              />
              <motion.div
                className="absolute w-4 h-4 rounded-full bg-gold"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeIn" }}
              />
            </>
          )}

          {phase === "waiting" && (
            <motion.p
              className="absolute bottom-12 text-gold/30 text-xs font-body tracking-[0.4em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              Di chuyển chuột để bắt đầu
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignatureMoment;

