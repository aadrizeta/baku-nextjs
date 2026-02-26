import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}