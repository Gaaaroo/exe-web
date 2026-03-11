"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";
  const section = searchParams.get("section");
  const error = searchParams.get("error");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const origin = window.location.origin;
      const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(
        next
      )}${
        section ? `&section=${encodeURIComponent(section)}` : ""
      }`;
      // Debug: xem URL callback app sẽ dùng (mở F12 → Console)
      console.log("[Login DEBUG] redirectTo (Supabase sẽ redirect về đây sau khi chọn Google):", redirectTo);
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (err) throw err;
      // Supabase sẽ redirect sang Google, không cần redirect thủ công
    } catch (err) {
      console.error("Google sign in error:", err);
      setLoading(false);
      alert("Không thể đăng nhập. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 dong-son-pattern">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md border border-border bg-card p-8"
      >
        <h1 className="font-heading text-2xl text-parchment mb-2 text-center">
          Đăng nhập / Đăng ký
        </h1>
        <p className="font-body text-sm text-parchment/60 text-center mb-8">
          Dùng Google để tiếp tục mua game và quản lý đơn hàng.
        </p>

        {error === "auth" && (
          <p className="font-body text-sm text-destructive mb-4 text-center">
            Đăng nhập thất bại. Vui lòng thử lại.
          </p>
        )}

        {error === "state" && (
          <p className="font-body text-sm text-destructive mb-4 text-center">
            Phiên đăng nhập hết hạn hoặc thiếu cấu hình. Vào Supabase Dashboard → Authentication → URL Configuration, thêm vào <strong>Redirect URLs</strong>: <code className="text-xs break-all block mt-2">http://localhost:3000/auth/callback</code> (khi chạy dev) rồi Save và thử lại.
          </p>
        )}

        <Button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full heat-haze py-3 tracking-widest uppercase bg-card border border-gold/50 text-gold hover:border-gold hover:bg-gold/10"
        >
          {loading ? "Đang chuyển hướng..." : "Tiếp tục với Google"}
        </Button>

        <p className="font-body text-xs text-parchment/40 mt-6 text-center">
          Bấm &quot;Tiếp tục với Google&quot; sẽ mở cửa sổ đăng nhập Google. Nếu
          chưa có tài khoản, bạn có thể tạo mới ngay trong bước đó.
        </p>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <Link
            href={next}
            className="font-body text-sm text-gold/70 hover:text-gold transition-colors"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
