import type { Metadata } from "next";
import Link from "next/link";
import { Zap, RotateCcw, Users, Anchor } from "lucide-react";
import Gallery from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Nasz bus – Opel Zafira Life Business | Warmia i Mazury",
  description:
    "Zobacz Opel Zafira Life Business 180 KM. Przestronne wnętrze, 9 miejsc, automat, hak holowniczy. Olsztyn i okolice.",
};

export default function AutaPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* nagłówek */}
      <div className="bg-[#1a2332]">
        <div className="max-w-content mx-auto px-5 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-white text-sm mb-6 transition-colors"
          >
            ← Wróć na stronę główną
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Sprawdź czym pojedziesz
          </h1>
          <p className="text-white/50">
            Opel Zafira Life Business · 180 KM · automat · 9 miejsc · srebrny metalik
          </p>
        </div>
      </div>

      {/* specyfikacja */}
      <div className="bg-white border-b border-[#e2e8f0]">
        <div className="max-w-content mx-auto px-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#e2e8f0]">
            {[
              { icon: <Zap className="w-5 h-5" strokeWidth={1.75} />,        label: "180 KM",    desc: "benzynowy" },
              { icon: <RotateCcw className="w-5 h-5" strokeWidth={1.75} />,  label: "Automat",   desc: "8-biegowa skrzynia" },
              { icon: <Users className="w-5 h-5" strokeWidth={1.75} />,      label: "9 miejsc",  desc: "3 rzędy siedzeń" },
              { icon: <Anchor className="w-5 h-5" strokeWidth={1.75} />,     label: "Hak",       desc: "fabryczny" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3 py-5 px-4 sm:px-6">
                <span className="text-amber-500">{f.icon}</span>
                <div>
                  <p className="font-bold text-[#1a2332] text-sm">{f.label}</p>
                  <p className="text-[#64748b] text-xs">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* galeria */}
      <div className="max-w-content mx-auto px-5 py-12">
        <Gallery />

        <div className="text-center mt-10">
          <Link
            href="/#zamow"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            Podoba mi się — chcę zarezerwować →
          </Link>
        </div>
      </div>

      {/* footer */}
      <footer className="bg-[#1a2332] border-t border-white/10 mt-8">
        <div className="max-w-content mx-auto px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
          <span>Bus 9-osobowy · Olsztyn i okolice</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  );
}
