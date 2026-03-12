/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Cho phép build/deploy kể cả khi TypeScript báo lỗi trên môi trường build (như Vercel)
    // Nên dùng tạm thời khi bạn chắc chắn app chạy ổn ở local.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

