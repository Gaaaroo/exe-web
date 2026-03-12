"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Crown, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const editions = [
  {
    name: "Standard Edition",
    price: "0₫",
    amount: 0,
    edition: "standard",
    icon: Shield,
    features: [
      "Bắt đầu hành trình hồi sinh di sản hoàn toàn miễn phí.",
      "Trải nghiệm cốt lõi: tự do khám phá hành trình tìm lại các làng nghề truyền thống.",
      "Làng nghề cơ bản: du hành qua những không gian di sản tiêu biểu đã được mở khóa.",
      "Cơ chế đặc trưng: sử dụng miễn phí năng lực Nhãn giới ký ức để khám phá điển tích.",
      "Nhạc nền lễ hội: đắm chìm trong không gian âm thanh chợ quê và làng nghề sống động.",
    ],
    cta: "CHƠI NGAY",
    featured: false,
  },
  {
    name: "Mở Rộng Vùng Đất (DLC Map)",
    price: "99.000₫",
    amount: 99000,
    edition: "dlc_map",
    icon: Shield,
    features: [
      "Mở rộng hành trình đến những vùng đất di sản mới.",
      "Map làng nghề mới với các khu vực chuyên biệt như Làng Tranh Kiếng Nam Bộ hoặc Làng Nón Lá.",
      "Nhiệm vụ độc quyền với mini-game độ khó cao và vật phẩm hiếm.",
      "Vật phẩm trang trí: bộ skin xưởng nghề đặc trưng theo từng vùng bản đồ.",
    ],
    cta: "MUA THÊM",
    featured: false,
  },
  {
    name: "Collector's Edition",
    price: "399.000₫",
    amount: 399000,
    edition: "collector",
    icon: Crown,
    features: [
      "Trọn bộ nội dung: bao gồm Standard Edition và tất cả các Map mở rộng.",
      "Art Book & Album nhạc chất lượng cao về các phố phường và làng nghề Việt.",
      "Đặc quyền Premium: bộ cổ phục giới hạn dành riêng cho người kế thừa di sản.",
      "Quyền truy cập sớm các tính năng mới trong 7 ngày.",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {editions.map((edition, i) => (
            <motion.div
              key={edition.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className={`relative flex flex-col h-full p-8 border transition-all duration-500 ${
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
                className={`mt-auto heat-haze w-full py-3 tracking-widest uppercase disabled:opacity-50 cursor-pointer ${
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

