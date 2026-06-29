import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "Bus 9-osobowy | Warmia i Mazury | Opel Zafira Life Business",
  description:
    "Wynajem busa 9-osobowego Opel Zafira Life Business 180 KM, automat, 9 miejsc. Transport VIP, wakacje, ekipa, event. Olsztyn i okolice.",
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
