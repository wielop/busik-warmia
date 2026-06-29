"use client";

import { useState } from "react";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import ContactForm from "@/components/ContactForm";
import type { CalcState } from "@/components/Calculator";

const CHIPS = ["Transport VIP", "Wakacje", "Ekipa na budowę", "Wieczór kawalerski", "Lotnisko", "Hotel & biznes"];

export default function Home() {
  const [calcState, setCalcState] = useState<CalcState | null>(null);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1c3a2e 0%, #2d5a3d 60%, #1a4a35 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 75%, white 1px, transparent 1px), radial-gradient(circle at 75% 25%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-5 py-20 sm:py-28 text-white text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="text-base">🚐</span>
            Opel Zafira Life Business · Warmia i Mazury
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
            Bus 9-osobowy
            <br />
            <span className="text-green-300">na każdą okazję</span>
          </h1>
          <p className="text-lg sm:text-xl text-green-100 mb-8 max-w-xl mx-auto">
            180 KM · automat · 9 miejsc · klimatyzacja
            <br />
            <span className="text-green-300/80 text-base">Olsztyn i okolice</span>
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CHIPS.map((chip) => (
              <span
                key={chip}
                className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-sm"
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auta"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#1c3a2e] font-bold px-7 py-3.5 rounded-xl text-base hover:bg-green-50 transition-colors duration-150 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Sprawdź busa
            </Link>
            <a
              href="#zamow"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-bold px-7 py-3.5 rounded-xl text-base hover:bg-white/20 transition-colors duration-150 backdrop-blur-sm"
            >
              Sprawdź cenę i zamów
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─── CECHY ────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-5 -mt-6 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: "⚡", label: "180 KM · automat" },
            { icon: "💺", label: "9 wygodnych miejsc" },
            { icon: "❄️", label: "Klimatyzacja" },
            { icon: "👑", label: "Komfort VIP" },
          ].map((f) => (
            <div key={f.label} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <div className="text-2xl mb-1">{f.icon}</div>
              <div className="text-xs font-medium text-gray-700">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SPRAWDŹ BUSA ─────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-5 py-12">
        <Link
          href="/auta"
          className="group flex flex-col sm:flex-row items-center gap-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="text-6xl">🚐</div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Sprawdź czym pojedziesz</h2>
            <p className="text-gray-500 text-sm">
              Opel Zafira Life Business · 180 KM · automat · 9 miejsc · srebrny metalik
            </p>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#1c3a2e] text-white font-semibold px-5 py-2.5 rounded-xl text-sm group-hover:bg-[#2d5a3d] transition-colors whitespace-nowrap">
            Zobacz zdjęcia
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </section>

      {/* ─── KALKULATOR + FORMULARZ ───────────────────────────── */}
      <section id="zamow" className="max-w-4xl mx-auto px-5 py-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Wyceń i zarezerwuj
          </h2>
          <p className="text-gray-500 text-sm">
            Wybierz typ, daty i zostaw kontakt — oddzwonię lub odpiszę szybko
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* lewa kolumna — info kontaktowe */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-[#1c3a2e] text-white rounded-2xl p-6 sticky top-6">
              <h3 className="font-bold text-lg mb-4">Kontakt</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">📞</span>
                  <div>
                    <p className="text-green-300 text-xs font-semibold uppercase tracking-wider mb-0.5">Telefon</p>
                    <p className="font-semibold text-base">+48 000 000 000</p>
                    <p className="text-green-200/60 text-xs mt-0.5">pon–sob, 8:00–20:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">📍</span>
                  <div>
                    <p className="text-green-300 text-xs font-semibold uppercase tracking-wider mb-0.5">Lokalizacja</p>
                    <p className="font-semibold">Olsztyn i okolice</p>
                    <p className="text-green-200/60 text-xs mt-0.5">Warmia i Mazury</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-green-200/60 text-xs">
                  Działam prywatnie — bez korporacyjnych marż.
                </p>
              </div>
            </div>
          </div>

          {/* prawa kolumna — kalkulator + formularz w jednej karcie */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <Calculator onChange={setCalcState} />

              {/* separator */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Dane kontaktowe</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <ContactForm calcState={calcState} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>🚐</span>
            <span className="font-semibold text-gray-700">Bus 9-osobowy</span>
            <span>·</span>
            <span>Olsztyn i okolice</span>
          </div>
          <div className="flex items-center gap-4">
            <span>+48 000 000 000</span>
            <span>·</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
