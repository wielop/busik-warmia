import type { Metadata } from "next";
import Link from "next/link";
import Gallery from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Nasz bus – Opel Zafira Life Business | Warmia i Mazury",
  description:
    "Zobacz jak wygląda nasz Opel Zafira Life Business 180 KM. Przestronne wnętrze, 9 miejsc, automatyczna skrzynia, hak holowniczy. Olsztyn i okolice.",
};

export default function AutaPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* nagłówek */}
      <div style={{ background: "linear-gradient(135deg, #1c3a2e 0%, #2d5a3d 100%)" }}>
        <div className="max-w-4xl mx-auto px-5 py-12 text-white">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-green-300 hover:text-white text-sm mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Wróć na stronę główną
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Sprawdź czym pojedziesz</h1>
          <p className="text-green-200 text-base">
            Opel Zafira Life Business · 180 KM · automat · 9 miejsc · srebrny metalik
          </p>
        </div>
      </div>

      {/* specyfikacja */}
      <div className="max-w-4xl mx-auto px-5 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { icon: "⚡", label: "180 KM", desc: "Silnik benzynowy" },
            { icon: "🔄", label: "Automat", desc: "8-biegowa skrzynia" },
            { icon: "💺", label: "9 miejsc", desc: "3 rzędy siedzeń" },
            { icon: "🪝", label: "Hak", desc: "Fabryczny hak holowniczy" },
          ].map((f) => (
            <div key={f.label} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <div className="text-2xl mb-1">{f.icon}</div>
              <div className="font-bold text-gray-900 text-sm">{f.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* galeria */}
        <Gallery />

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/#zamow"
            className="inline-flex items-center gap-2 bg-[#1c3a2e] text-white font-bold px-8 py-3.5 rounded-xl text-base hover:bg-[#2d5a3d] transition-colors duration-150"
          >
            Podoba mi się — chcę zarezerwować
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
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
