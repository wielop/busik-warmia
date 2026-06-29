import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bus 9-osobowy na wynajem | Olsztyn, Warmia i Mazury",
  description:
    "Wynajem Opel Zafira Life Business 180 KM, 9 miejsc, automat. Bez limitu km, bez marż. Od 180 zł/dzień. Olsztyn i Warmia-Mazury.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${jakarta.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
