"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface GameStat {
  key: string;
  value: number;
  label: string;
}

const fallbackStats: GameStat[] = [
  { key: "total_landmarks", value: 50, label: "Di Tích Lịch Sử" },
  { key: "total_artifacts", value: 100, label: "Cổ Vật Khám Phá" },
  { key: "graphics_quality", value: 4, label: "Đồ Họa Siêu Thực" },
  { key: "play_hours", value: 40, label: "Nội Dung Chơi" },
];

const formatValue = (key: string, value: number): string => {
  if (key === "graphics_quality") return `${value}K`;
  if (key === "play_hours") return `${value}h+`;
  return `${value}+`;
};

const StatsSection = () => {
  const [stats, setStats] = useState<GameStat[]>(fallbackStats);

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from("game_stats")
        .select("key, value, label");
      if (!error && data && Array.isArray(data) && data.length) {
        setStats(data as GameStat[]);
      }
    };
    void fetchStats();
  }, []);

  return (
    <section className="relative py-24 px-6 border-y border-border">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto text-center"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
            >
              <p className="font-heading text-4xl md:text-5xl text-parchment tracking-wider mb-2">
                {formatValue(stat.key, stat.value)}
              </p>
              <p className="font-body text-xs text-gold/60 tracking-widest uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;

