"use client";

import { motion } from "framer-motion";

interface GameStat {
  key: string;
  value: number;
  label: string;
}

const stats: GameStat[] = [
  { key: "total_landmarks", value: 20, label: "Làng Nghề Khám Phá" },
  { key: "total_artifacts", value: 120, label: "Mẫu Thủ Công Tái Dựng" },
  { key: "graphics_quality", value: 4, label: "Hiệu Ứng Ánh Sáng" },
  { key: "play_hours", value: 25, label: "Giờ Hành Trình" },
];

const formatValue = (key: string, value: number): string => {
  if (key === "graphics_quality") return `${value}K`;
  if (key === "play_hours") return `${value}h+`;
  return `${value}+`;
};

const StatsSection = () => {
  return (
    <section className="relative py-24 px-6">
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

