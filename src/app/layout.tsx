import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--nf-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: "BAKU - Estudio de Repostería Artesanal",
  description: "Repostería artesanal con ingredientes naturales y fermentación",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`scroll-smooth ${inter.variable}`}>
      <head />
      <body>{children}</body>
    </html>
  );
}