"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Crown, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const editions = [
  {
    name: "Standard Edition",
    price: "250.000₫",
    amount: 250000,
    edition: "standard",
    icon: Shield,
    features: [
      "Câu chuyện chính trọn vẹn",
      "4 làng nghề để khám phá",
      "Chế độ trải nghiệm tự do",
      "Nhạc nền gốc lấy cảm hứng từ lễ hội",
    ],
    cta: "MUA NGAY",
    featured: false,
  },
  {
    name: "Collector's Edition",
    price: "399.000₫",
    amount: 399000,
    edition: "collector",
    icon: Crown,
    features: [
      "Tất cả nội dung Standard Edition",
      "Art Book kỹ thuật số về làng nghề",
      "3 tuyến nhiệm vụ mở rộng",
      "Bộ skin đặc biệt cho xưởng của bạn",
      "Album nhạc lễ hội chất lượng cao",
      "Truy cập sớm 7 ngày",
    ],
    cta: "ĐẶT TRƯỚC",
    featured: true,
  },
] as const;

const PurchaseSection = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (edition: (typeof editions)[number]) => {
    setLoading(edition.edition);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        const next = window.location.pathname || "/";
        const section = "purchase";
        window.location.href = `/login?next=${encodeURIComponent(
          next
        )}&section=${encodeURIComponent(section)}`;
        setLoading(null);
        return;
      }

      const { data, error } = await supabase.functions.invoke("checkout", {
        body: {
          edition: edition.edition,
          amount: edition.amount,
          returnUrl: `${window.location.origin}/?payment=success`,
          cancelUrl: `${window.location.origin}/?payment=cancel`,
        },
      });

      if (error) throw error;
      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl as string;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="purchase" className="relative py-32 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] text-gold/60 uppercase mb-4">
            Sở hữu ngay
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-parchment">
            Chọn Phiên Bản
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {editions.map((edition, i) => (
            <motion.div
              key={edition.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className={`relative p-8 border transition-all duration-500 ${
                edition.featured ? "border-gold/40 bg-card" : "border-parchment/10 bg-card"
              }`}
            >
              {edition.featured && (
                <div className="absolute -top-px left-0 right-0 h-px bg-linear-to-r from-transparent via-gold to-transparent" />
              )}

              <div className="flex items-center gap-3 mb-6">
                <edition.icon className="w-5 h-5 text-gold" />
                <h3 className="font-heading text-xl text-parchment">{edition.name}</h3>
              </div>

              <p className="font-heading text-3xl text-parchment tracking-wider mb-8">
                {edition.price}
              </p>

              <ul className="space-y-3 mb-8">
                {edition.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-gold/60 mt-0.5 shrink-0" />
                    <span className="font-body text-sm text-parchment/60 font-light">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleCheckout(edition)}
                disabled={loading === edition.edition}
                variant={edition.featured ? "default" : "outline"}
                size="lg"
                className={`heat-haze w-full py-3 tracking-widest uppercase disabled:opacity-50 cursor-pointer ${
                  edition.featured
                    ? "bg-lacquer border border-lacquer text-parchment hover:bg-lacquer/80"
                    : "border border-gold/30 text-gold hover:border-gold"
                }`}
              >
                {loading === edition.edition ? "Đang xử lý..." : edition.cta}
              </Button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PurchaseSection;

