import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com", pathname: "/**" },
    ],
  },
};

// Log Supabase trạng thái ra terminal khi chạy next dev / next build
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
console.log(
  "[Supabase]",
  url && key
    ? "Đã kết nối (" + url.slice(0, 30) + "...)"
    : "Chưa cấu hình (.env.local)",
);

export default nextConfig;
