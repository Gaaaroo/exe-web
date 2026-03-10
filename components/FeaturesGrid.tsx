import { motion } from "framer-motion";
import { Landmark, Gamepad2, Music } from "lucide-react";

const features = [
  {
    icon: Landmark,
    title: "Văn Hóa Nghìn Năm",
    description:
      "Tái hiện chân thực hàng nghìn năm lịch sử với hơn 50 di tích được mô phỏng từ các công trình thực tế của Việt Nam.",
  },
  {
    icon: Gamepad2,
    title: "Lối Chơi Đột Phá",
    description:
      "Hệ thống chiến đấu đậm chất võ thuật cổ truyền, kết hợp phép thuật dựa trên Ngũ Hành và truyền thuyết dân gian.",
  },
  {
    icon: Music,
    title: "Âm Nhạc Dân Tộc",
    description:
      "Nhạc nền được sáng tác bởi nghệ sĩ hàng đầu, sử dụng nhạc cụ truyền thống: đàn bầu, đàn tranh, sáo trúc.",
  },
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const FeaturesGrid = () => {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-body text-xs tracking-[0.3em] text-gold/60 uppercase mb-4">
            Tính năng
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-parchment">
            Di Sản Sống Lại
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative p-8 border border-border bg-card hover:border-gold/30 transition-all duration-500"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12">
                  <feature.icon
                    className="w-6 h-6 text-gold transition-all duration-500"
                    style={{
                      filter: "drop-shadow(0 0 8px hsl(38 35% 54% / 0.4))",
                    }}
                  />
                </div>

                <h3 className="font-heading text-xl text-parchment mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-parchment/50 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesGrid;

