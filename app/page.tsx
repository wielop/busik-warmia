"use client";

import { useState } from "react";
import Calculator from "@/components/Calculator";
import ContactForm from "@/components/ContactForm";
import type { CalcState } from "@/components/Calculator";

const CHIPS = ["Wakacje", "Ekipa na budowę", "Wieczór kawalerski", "Lotnisko"];

export default function Home() {
  const [calcState, setCalcState] = useState<CalcState | null>(null);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1c3a2e 0%, #2d5a3d 60%, #1a4a35 100%)" }}
      >
        {/* subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 75%, white 1px, transparent 1px), radial-gradient(circle at 75% 25%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-5 py-20 sm:py-28 text-white text-center">
          {/* badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="text-base">🚐</span>
            Citroën SpaceTourer · Warmia i Mazury
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
            Bus 9-osobowy
            <br />
            <span className="text-green-300">na każdą okazję</span>
          </h1>

          <p className="text-lg sm:text-xl text-green-100 mb-8 max-w-xl mx-auto">
            Klimatyzacja · 9 miejsc · Wygodne podróże
            <br />
            <span className="text-green-300/80 text-base">Olsztyn i okolice</span>
          </p>

          {/* chips */}
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

          <a
            href="#kalkulator"
            className="inline-flex items-center gap-2 bg-white text-[#1c3a2e] font-bold px-8 py-3.5 rounded-xl text-base hover:bg-green-50 transition-colors duration-150 shadow-lg"
          >
            Sprawdź cenę
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* ─── CECHY ────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-5 -mt-6 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: "❄️", label: "Klimatyzacja" },
            { icon: "💺", label: "9 wygodnych miejsc" },
            { icon: "🧳", label: "Duży bagażnik" },
            { icon: "📍", label: "Warmia i Mazury" },
          ].map((f) => (
            <div
              key={f.label}
              className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100"
            >
              <div className="text-2xl mb-1">{f.icon}</div>
              <div className="text-xs font-medium text-gray-700">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── KALKULATOR ───────────────────────────────────────── */}
      <section id="kalkulator" className="max-w-4xl mx-auto px-5 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Ile będzie kosztować?
          </h2>
          <p className="text-gray-500 text-sm">
            Wybierz typ wyjazdu, ustaw daty i od razu zobaczysz cenę
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <Calculator onChange={setCalcState} />
        </div>
      </section>

      {/* ─── KONTAKT ──────────────────────────────────────────── */}
      <section id="kontakt" className="max-w-4xl mx-auto px-5 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Napisz lub zadzwoń
          </h2>
          <p className="text-gray-500 text-sm">
            Odpowiadam szybko — zazwyczaj w ciągu kilku godzin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* info box */}
          <div className="lg:col-span-2">
            <div className="bg-[#1c3a2e] text-white rounded-2xl p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-4">Kontakt bezpośredni</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">📞</span>
                    <div>
                      <p className="text-green-300 text-xs font-semibold uppercase tracking-wider mb-0.5">
                        Telefon
                      </p>
                      <p className="font-semibold text-base">+48 000 000 000</p>
                      <p className="text-green-200/60 text-xs mt-0.5">
                        pon–sob, 8:00–20:00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">📍</span>
                    <div>
                      <p className="text-green-300 text-xs font-semibold uppercase tracking-wider mb-0.5">
                        Lokalizacja
                      </p>
                      <p className="font-semibold">Olsztyn i okolice</p>
                      <p className="text-green-200/60 text-xs mt-0.5">
                        Warmia i Mazury
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-green-200/60 text-xs">
                  Działam prywatnie — bez korporacyjnych marż. Cena, którą widzisz, to cena, którą płacisz.
                </p>
              </div>
            </div>
          </div>

          {/* form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
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
