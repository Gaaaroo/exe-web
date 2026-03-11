import type { Metadata } from "next";
import { Prata, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const headingFont = Prata({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

const bodyFont = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ký Ức Di Sản",
  description: "Trang giới thiệu dự án game 3D Ký Ức Di Sản của nhóm 3X3 Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

