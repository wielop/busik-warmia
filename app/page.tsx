"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Snowflake, PackageOpen, Anchor, PanelLeftOpen, Gauge, Check, Star, Phone, MessageCircle } from "lucide-react";
import Calculator from "@/components/Calculator";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import type { CalcState } from "@/components/Calculator";

const TELEFON     = "+48 000 000 000";
const TELEFON_RAW = "48000000000";
const WA_RAW      = "48000000000";
const IMIE        = "[IMIĘ]";

const USE_CASES = [
  "Wyjazd na wakacje",
  "Delegacje służbowe",
  "Ekipy budowlane",
  "Lotnisko (Gdańsk / Modlin)",
  "Wesele i goście",
  "Wieczór kawalerski",
];

const FEATURES = [
  { icon: <Snowflake className="w-6 h-6" strokeWidth={1.75} />,  title: "Klimatyzacja", sub: "osobna strefa pasażerska" },
  { icon: <PackageOpen className="w-6 h-6" strokeWidth={1.75} />, title: "Bagażnik 1400 l", sub: "po złożeniu siedzeń" },
  { icon: <Anchor className="w-6 h-6" strokeWidth={1.75} />,      title: "Hak holowniczy", sub: "fabrycznie montowany" },
  { icon: <PanelLeftOpen className="w-6 h-6" strokeWidth={1.75} />, title: "Boczne drzwi elektryczne", sub: "wygoda i komfort" },
];

const REVIEWS = [
  { text: "[UZUPEŁNIJ opinię]", name: "Marek", city: "Olsztyn" },
  { text: "[UZUPEŁNIJ opinię]", name: "Kasia", city: "Mrągowo" },
  { text: "[UZUPEŁNIJ opinię]", name: "Tomek", city: "Ostróda" },
];

export default function Home() {
  const [calcState, setCalcState] = useState<CalcState | null>(null);

  return (
    <main className="min-h-screen bg-[#f8fafc]">

      {/* ─── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[580px] flex items-center overflow-hidden bg-[#1a2332]">
        {/* tło — zdjęcie busa przyciemnione */}
        <div className="absolute inset-0">
          <Image
            src="/photos/van-extra3.jpg"
            alt="Opel Zafira Life Business"
            fill
            className="object-cover object-center opacity-20"
            priority
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-5 py-20 sm:py-28 w-full">
          {/* badge */}
          <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-white/80 mb-6">
            Opel Zafira Life Business
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-white leading-[1.1] tracking-tight mb-5 max-w-3xl">
            Wygodny bus na 9 osób -{" "}
            <span className="text-amber-400">odbierz w Olsztynie i jedź gdzie chcesz!</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
            Automat, klimatyzacja, komfort z jazdy, 180 KM. 450 km w cenie doby. Wynajem prywatny od 180 zł.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#zamow"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-7 py-3.5 rounded-xl text-base transition-colors duration-150 shadow-lg"
            >
              Sprawdź wolne terminy
            </a>
            <Link
              href="/auta"
              className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-semibold px-7 py-3.5 rounded-xl text-base hover:bg-white/10 transition-colors duration-150 backdrop-blur-sm"
            >
              Zobacz busa w środku
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 2. PASEK ATUTÓW ─────────────────────────────────── */}
      <section className="bg-white border-b border-[#e2e8f0]">
        <div className="max-w-content mx-auto px-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#e2e8f0]">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-center gap-3 py-5 px-4 sm:px-6">
                <span className="text-amber-500">{f.icon}</span>
                <div>
                  <p className="font-bold text-[#1a2332] text-sm sm:text-base leading-tight">{f.title}</p>
                  <p className="text-[#64748b] text-xs sm:text-sm">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. PRZYPADKI UŻYCIA ─────────────────────────────── */}
      <section className="max-w-content mx-auto px-5 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#64748b] mb-4">
          Do czego najczęściej
        </p>
        <div className="flex flex-wrap gap-2">
          {USE_CASES.map((c) => (
            <span
              key={c}
              className="px-4 py-2 rounded-full bg-white border border-[#e2e8f0] text-sm font-medium text-[#1a2332] shadow-sm"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* ─── 4. ZDJĘCIA BUSA ─────────────────────────────────── */}
      <section className="bg-[#1a2332]">
        <div className="max-w-content mx-auto px-5 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="relative w-full lg:w-3/5 aspect-[16/10] rounded-2xl overflow-hidden shrink-0">
              <Image
                src="/photos/interior-seats.jpg"
                alt="Wnętrze Opel Zafira Life Business — 9 przestronnych siedzeń"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            <div className="text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                Zobacz, czym pojedziesz
              </h2>
              <p className="text-white/60 mb-6 leading-relaxed">
                Przestronne wnętrze, wygodne fotele z zagłówkami, panoramiczne okna.
                9 osób jedzie komfortowo — nawet w najdalszą trasę.
              </p>
              <Link
                href="/auta"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl transition-colors duration-150"
              >
                Zobacz wszystkie zdjęcia
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. CO W CENIE ───────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-content mx-auto px-5 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2332] mb-2">
            Co dostajesz w cenie
          </h2>
          <p className="text-[#64748b] mb-10">
            Bez ukrytych kosztów i gwiazdek w cenniku. To, co widzisz w wycenie, to cena końcowa.
          </p>

          <div className="space-y-3">
            {/* wyróżniona pozycja */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-amber-50 border-2 border-amber-200">
              <span className="mt-0.5 text-amber-500 shrink-0">
                <Gauge className="w-6 h-6" strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-bold text-[#1a2332]">450 km w cenie doby</p>
                <p className="text-[#64748b] text-sm mt-0.5">
                  Planujesz więcej? Napisz z góry — doliczamy nadprzebieg i nie ma niespodzianek przy zwrocie.
                </p>
              </div>
            </div>

            {/* reszta listy */}
            {[
              { label: "Pełne ubezpieczenie OC/AC", desc: "" },
              { label: "Paliwo bez kombinowania", desc: "odbierasz busa zatankowanego do pełna, takiego oddajesz" },
              { label: "Odbiór w [MIEJSCE_ODBIORU]", desc: "" },
              { label: "Faktura VAT na życzenie", desc: "bez dopłaty" },
              { label: "Kaucja 1000 zł", desc: "zwracana w całości przy oddaniu busa" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-4 rounded-2xl border border-[#e2e8f0]">
                <Check className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" strokeWidth={2} />
                <div>
                  <p className="font-semibold text-[#1a2332] text-sm">{item.label}</p>
                  {item.desc && <p className="text-[#64748b] text-sm mt-0.5">{item.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. KALKULATOR + FORMULARZ ───────────────────────── */}
      <section id="zamow" className="max-w-content mx-auto px-5 py-16 sm:py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2332] mb-2">
            Wyceń i zarezerwuj
          </h2>
          <p className="text-[#64748b]">
            Wybierz typ, daty i zostaw kontakt — oddzwonię albo odpiszę szybko.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* kontakt */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-[#1a2332] text-white rounded-2xl p-6 sticky top-6">
              <h3 className="font-bold text-lg mb-5">Kontakt bezpośredni</h3>
              <div className="space-y-5">
                <div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">Telefon</p>
                  <a href={`tel:${TELEFON_RAW}`} className="font-bold text-lg hover:text-amber-400 transition-colors">
                    {TELEFON}
                  </a>
                  <p className="text-white/40 text-xs mt-0.5">pon–sob, 8:00–20:00</p>
                </div>
                <div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">WhatsApp</p>
                  <a
                    href={`https://wa.me/${WA_RAW}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:text-amber-400 transition-colors"
                  >
                    Napisz na WhatsApp
                  </a>
                </div>
                <div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">Lokalizacja</p>
                  <p className="font-semibold">Olsztyn i okolice</p>
                  <p className="text-white/40 text-xs mt-0.5">Warmia i Mazury</p>
                </div>
              </div>
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-white/40 text-xs leading-relaxed">
                  Działam prywatnie — bez korporacyjnych marż. Cena, którą widzisz, to cena, którą płacisz.
                </p>
              </div>
            </div>
          </div>

          {/* kalkulator + form */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] p-6 sm:p-8">
              <Calculator onChange={setCalcState} />
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-[#e2e8f0]" />
                <span className="text-xs text-[#64748b] font-medium uppercase tracking-wide">Twoje dane</span>
                <div className="flex-1 h-px bg-[#e2e8f0]" />
              </div>
              <ContactForm calcState={calcState} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. OPINIE ───────────────────────────────────────── */}
      <section className="bg-white border-t border-[#e2e8f0]">
        <div className="max-w-content mx-auto px-5 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2332] mb-10">
            Co mówią pasażerowie
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-6 flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-[#1a2332] text-sm leading-relaxed flex-1 italic">&bdquo;{r.text}&rdquo;</p>
                <p className="text-[#64748b] text-xs font-semibold">{r.name}, {r.city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. O MNIE ───────────────────────────────────────── */}
      <section className="max-w-content mx-auto px-5 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#64748b] mb-3">Wynajem prywatny</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2332] mb-4">
              Cześć, tu {IMIE}
            </h2>
            <p className="text-[#64748b] text-lg leading-relaxed mb-6">
              To mój prywatny bus, którym sam jeżdżę. Wynajmuję go uczciwie, bez korporacyjnej
              papierologii i bez naciągania. Zadzwoń lub napisz — ustalimy wszystko po ludzku
              w 5 minut.
            </p>
            <a
              href={`tel:${TELEFON_RAW}`}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4" strokeWidth={1.75} />
              Zadzwoń teraz
            </a>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#e2e8f0]">
            <Image
              src="/photos/van-front.jpg"
              alt="Opel Zafira Life Business – widok z przodu"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ─── 9. FAQ ──────────────────────────────────────────── */}
      <section className="bg-white border-t border-[#e2e8f0]">
        <div className="max-w-content mx-auto px-5 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2332] mb-8">
            Najczęstsze pytania
          </h2>
          <div className="max-w-3xl">
            <FAQ />
          </div>
        </div>
      </section>

      {/* ─── 12. STOPKA ──────────────────────────────────────── */}
      <footer className="bg-[#1a2332] border-t border-white/10">
        <div className="max-w-content mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white/80">Bus 9-osobowy</span>
            <span>·</span>
            <span>Olsztyn i okolice</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${TELEFON_RAW}`} className="hover:text-white transition-colors">
              {TELEFON}
            </a>
            <a
              href={`https://wa.me/${WA_RAW}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WhatsApp
            </a>
            <span>· © {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

      {/* ─── 11. STICKY MOBILE CTA ───────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e2e8f0] p-3 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <a
          href={`tel:${TELEFON_RAW}`}
          className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition-colors"
          aria-label="Zadzwoń"
        >
          <Phone className="w-4 h-4" strokeWidth={1.75} />
          Zadzwoń
        </a>
        <a
          href={`https://wa.me/${WA_RAW}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 border-2 border-[#25d366] text-[#25d366] font-bold py-3 rounded-xl hover:bg-[#25d366]/10 transition-colors"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
          WhatsApp
        </a>
      </div>

      {/* padding dla sticky CTA na mobile */}
      <div className="lg:hidden h-20" />
    </main>
  );
}
