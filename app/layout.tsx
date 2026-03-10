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
  title: "Huyền Sử Việt",
  description: "Trang giới thiệu game Huyền Sử Việt",
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

