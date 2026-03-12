"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";
import { supabase } from "@/integrations/supabase/client";

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-login-heading",
});

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export default function LoginPage() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";
  const section = searchParams.get("section");
  const error = searchParams.get("error");
  const [loading, setLoading] = useState(false);

  // Quay về đúng section (vd. /#purchase) khi có section
  const backHref = section ? `${next.replace(/#.*$/, "")}#${section}` : next;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const origin = window.location.origin;
      const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(next)}${
        section ? `&section=${encodeURIComponent(section)}` : ""
      }`;
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (err) throw err;
    } catch (err) {
      setLoading(false);
      alert("Không thể đăng nhập. Vui lòng thử lại.");
    }
  };

  return (
    <div className={`min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 relative overflow-hidden ${cormorant.variable}`}>
      {/* Dot grid - vàng rõ hơn */}
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--gold) / 0.65) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Dong Son drum motif - vàng rõ hơn */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[min(90vmin,520px)] h-[min(90vmin,520px)] rounded-full border border-gold/20" />
        <div className="absolute w-[min(70vmin,400px)] h-[min(70vmin,400px)] rounded-full border border-gold/10" />
      </div>

      {/* Ambient glow - tăng vàng */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.div
          className="w-[min(100%,420px)] h-[480px] rounded-3xl blur-3xl"
          animate={{
            opacity: [0.4, 0.65, 0.4],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, hsl(var(--gold) / 0.18) 0%, hsl(var(--primary) / 0.15) 35%, hsl(var(--gold) / 0.08) 60%, transparent 75%)",
          }}
        />
      </motion.div>

      {/* Login card - viền trắng pha vàng, nền card có tông vàng */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[400px] rounded-2xl p-px bg-linear-to-br from-gold/40 via-white/15 to-transparent shadow-[0_0_40px_-8px_hsl(var(--gold)/0.4),0_0_60px_-16px_hsl(var(--primary)/0.12),0_25px_50px_-12px_rgba(0,0,0,0.5)]"
      >
        <div className="rounded-2xl bg-card/90 backdrop-blur-xl p-8 sm:p-10 border border-gold/15">
          <h1
            className={`text-center text-3xl sm:text-4xl font-semibold mb-2 bg-clip-text text-transparent ${cormorant.className}`}
            style={{
              backgroundImage: "linear-gradient(180deg, hsl(var(--gold-glow)) 0%, hsl(var(--parchment)) 100%)",
            }}
          >
            Đăng nhập / Đăng ký
          </h1>
          <p className="font-body text-sm text-gold/80 text-center mb-8">
            Dùng Google để tiếp tục mua game và quản lý đơn hàng.
          </p>

          {error === "auth" && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 py-3 px-4 mb-6">
              <p className="font-body text-sm text-parchment text-center">Đăng nhập thất bại. Vui lòng thử lại.</p>
            </div>
          )}

          {error === "state" && (
            <div className="rounded-lg border border-gold/30 bg-gold/10 py-3 px-4 mb-6">
              <p className="font-body text-xs text-foreground text-center leading-relaxed">
                Phiên đăng nhập hết hạn hoặc thiếu cấu hình. Vào Supabase Dashboard → Authentication → URL
                Configuration, thêm <strong>Redirect URLs</strong>:{" "}
                <code className="text-[10px] break-all block mt-2 text-gold/80">http://localhost:3000/auth/callback</code>{" "}
                rồi Save và thử lại.
              </p>
            </div>
          )}

          <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full min-h-[48px] rounded-xl py-3.5 text-sm font-medium tracking-[0.2em] uppercase cursor-pointer inline-flex items-center justify-center gap-3 border border-gold/50 bg-secondary text-foreground hover:border-gold hover:shadow-[0_0_24px_-4px_hsl(var(--gold)/0.35)] transition-all duration-300"
          >
            <GoogleIcon className="w-5 h-5 shrink-0 text-foreground/90" />
            {loading ? "Đang chuyển hướng..." : "TIẾP TỤC VỚI GOOGLE"}
          </motion.button>

          <div className="mt-8 pt-6 border-t border-border">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={backHref}
                className="font-body text-sm text-muted-foreground hover:text-gold transition-colors inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 min-h-[48px] w-full px-4 py-3.5 hover:border-white/25 bg-transparent"
              >
                <Home className="w-4 h-4 shrink-0" />
                <span>Quay lại trang chủ</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
