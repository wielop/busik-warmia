import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "Bus 9-osobowy | Warmia i Mazury | Citroën SpaceTourer",
  description:
    "Wynajem busa 9-osobowego Citroën SpaceTourer na Warmii i Mazurach. Wakacje, ekipa robocza, event, transfer na lotnisko. Olsztyn i okolice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
