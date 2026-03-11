"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    const run = async () => {
      const next = searchParams.get("next") ?? "/";
      const section = searchParams.get("section");

      // Supabase JS đã tự xử lý code trong URL (detectSessionInUrl: true mặc định)
      // nên ở thời điểm này, nếu user đã đăng nhập được thì getSession() sẽ có user.
      const { data, error } = await supabase.auth.getSession();
      console.log("[Auth callback] getSession()", { hasSession: !!data.session, error });

      if (error) {
        setStatus("error");
        router.replace("/login?error=auth");
        return;
      }

      if (!data.session) {
        // Không có session → quay lại login
        setStatus("error");
        router.replace("/login?error=auth");
        return;
      }

      // Đã có session → coi như đăng nhập thành công, redirect về next (+ hash section nếu có)
      setStatus("ok");
      const target = section ? `${next}#${section}` : next;
      router.replace(target);
    };
    run();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="font-body text-parchment/70">
        {status === "loading" && "Đang xác thực..."}
        {status === "ok" && "Đăng nhập thành công, đang chuyển hướng..."}
        {status === "error" && "Đang chuyển về trang đăng nhập..."}
      </p>
    </div>
  );
}
