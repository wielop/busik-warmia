"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookies_accepted")) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookies_accepted", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-[#1a2332] border-t border-white/10 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
      <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
        Ta strona używa wyłącznie technicznych plików cookies niezbędnych do działania formularza.
        Nie śledzę Cię, nie analizuję, nie sprzedaję danych.{" "}
        <Link href="/rodo" className="text-amber-400 hover:underline">
          Regulamin i polityka prywatności
        </Link>.
      </p>
      <button
        onClick={accept}
        className="shrink-0 bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
      >
        Rozumiem
      </button>
    </div>
  );
}
