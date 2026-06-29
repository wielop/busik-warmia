"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ITEMS = [
  {
    q: "Czy wystarczy prawo jazdy kategorii B?",
    a: "Tak. Zafira Life to auto osobowe 9-miejscowe — prowadzisz je na zwykłej kategorii B, bez żadnych dodatkowych uprawnień.",
  },
  {
    q: "Czy jest limit kilometrów?",
    a: "Tak — 450 km na dobę w cenie wynajmu. Jeśli planujesz więcej, po prostu napisz z góry, ile mniej więcej km dziennie zakładasz, to doliczymy nadprzebieg i nie będzie niespodzianek przy zwrocie.",
  },
  {
    q: "Ile wynosi kaucja?",
    a: "1000 zł. Oddaję ją w całości od ręki przy zwrocie busa, pod warunkiem że wraca bez szkód i zatankowany. To zwykłe zabezpieczenie, nie ukryta opłata.",
  },
  {
    q: "Jak jest z paliwem?",
    a: "Najprościej, jak się da: odbierasz busa zatankowanego do pełna i takiego oddajesz. Żadnego przeliczania kresek ani dopłat za paliwo.",
  },
  {
    q: "Czy mogę wyjechać za granicę?",
    a: "[WYJAZD_ZAGRANICA]",
  },
  {
    q: "Gdzie odbieram i zwracam busa?",
    a: "[MIEJSCE_ODBIORU]. Możliwy dowóz pod wskazany adres za drobną dopłatą — dogadamy się.",
  },
  {
    q: "Czy mogę zabrać zwierzaka albo dziecięcy fotelik?",
    a: "Jasne. Foteliki podstawiam na życzenie, a pies czy bagaż na wyjazd to żaden problem.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-[#e2e8f0]">
      {ITEMS.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg"
            aria-expanded={open === i}
          >
            <span className="font-semibold text-[#1a2332] text-sm sm:text-base">{item.q}</span>
            <ChevronDown
              className={`w-5 h-5 text-[#64748b] shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
              strokeWidth={1.75}
            />
          </button>
          {open === i && (
            <p className="pb-5 text-[#64748b] text-sm sm:text-base leading-relaxed">
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
