"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

type Mode = "wynajem" | "dlugoterminowy";

const WEEKDAYS = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];
const MONTHS = [
  "Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec",
  "Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień",
];

function toStr(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function formatDisplay(s: string): string {
  if (!s) return "";
  const [y, m, d] = s.split("-");
  return `${d}.${m}.${y}`;
}

function daysBetween(from: string, to: string): number {
  if (!from || !to) return 0;
  return Math.round((new Date(to).getTime() - new Date(from).getTime()) / 86400000);
}

function pricePerDay(days: number, mode: Mode): number {
  if (mode === "dlugoterminowy") return 250;
  if (days <= 4) return 400;
  if (days <= 7) return 350;
  if (days <= 21) return 300;
  return 250;
}

function priceColor(price: number): string {
  if (price === 400) return "text-[#94a3b8]";
  if (price === 350) return "text-emerald-500";
  if (price === 300) return "text-amber-500";
  return "text-orange-500";
}

type Props = {
  label: string;
  value: string;
  onChange: (d: string) => void;
  min?: string;
  max?: string;
  hint?: string;
  dateFrom?: string;
  mode?: Mode;
  showPrices?: boolean;
};

export default function CalendarPicker({
  label, value, onChange, min, max, hint,
  dateFrom = "", mode = "wynajem", showPrices = false,
}: Props) {
  const todayStr = new Date().toISOString().split("T")[0];
  const anchor = value || min || todayStr;
  const anchorDate = new Date(anchor + "T00:00:00");

  const [open, setOpen]           = useState(false);
  const [viewYear, setViewYear]   = useState(anchorDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(anchorDate.getMonth());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // jump to first valid month when min changes (e.g. dateFrom just set)
  useEffect(() => {
    if (open && min) {
      const d = new Date(min + "T00:00:00");
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
    }
  }, [min, open]);

  const firstDow   = new Date(viewYear, viewMonth, 1).getDay();
  const blanks     = firstDow === 0 ? 6 : firstDow - 1;
  const daysInMon  = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(blanks).fill(null),
    ...Array.from({ length: daysInMon }, (_, i) => i + 1),
  ];

  const minDate  = min  ? new Date(min  + "T00:00:00") : new Date(todayStr + "T00:00:00");
  const maxDate  = max  ? new Date(max  + "T00:00:00") : null;
  const prevMon  = new Date(viewYear, viewMonth - 1, 1);
  const nextMon  = new Date(viewYear, viewMonth + 1, 1);
  const canPrev  = prevMon >= new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  const canNext  = maxDate ? nextMon <= new Date(maxDate.getFullYear(), maxDate.getMonth(), 1) : true;

  function prev() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function next() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  function isDisabled(day: number): boolean {
    const s = toStr(viewYear, viewMonth, day);
    if (min && s < min) return true;
    if (max && s > max) return true;
    return false;
  }

  function getPriceInfo(day: number): { label: string; color: string } | null {
    if (!showPrices || !dateFrom) return null;
    if (isDisabled(day)) return null;
    const s = toStr(viewYear, viewMonth, day);
    const d = daysBetween(dateFrom, s);
    if (d <= 0) return null;
    const price = pricePerDay(d, mode);
    return { label: `${price} zł`, color: priceColor(price) };
  }

  return (
    <div className="relative" ref={ref}>
      <label className="block text-sm font-medium text-[#1a2332] mb-1.5">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-[#e2e8f0] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-left"
      >
        <span className={value ? "text-[#1a2332]" : "text-[#64748b]"}>
          {value ? formatDisplay(value) : "Wybierz datę"}
        </span>
        <CalendarDays className="w-4 h-4 text-[#64748b] shrink-0" strokeWidth={1.75} />
      </button>
      {hint && <p className="text-xs text-[#64748b] mt-1">{hint}</p>}

      {open && (
        <div className="absolute z-50 top-full mt-2 left-0 bg-white rounded-2xl shadow-xl border border-[#e2e8f0] p-4 w-[308px]">

          {/* Nawigacja miesiąc */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={prev}
              disabled={!canPrev}
              className="p-1.5 rounded-lg hover:bg-[#f1f5f9] disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            </button>
            <span className="text-sm font-bold text-[#1a2332]">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={next}
              disabled={!canNext}
              className="p-1.5 rounded-lg hover:bg-[#f1f5f9] disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>

          {/* Nagłówki dni tygodnia */}
          <div className="grid grid-cols-7 mb-1">
            {WEEKDAYS.map(d => (
              <div key={d} className="text-center text-[10px] font-semibold text-[#94a3b8] py-0.5">{d}</div>
            ))}
          </div>

          {/* Komórki dni */}
          <div className="grid grid-cols-7">
            {cells.map((day, idx) => {
              if (!day) return <div key={`e${idx}`} />;
              const s         = toStr(viewYear, viewMonth, day);
              const disabled  = isDisabled(day);
              const selected  = value === s;
              const isToday   = s === todayStr;
              const info      = getPriceInfo(day);

              return (
                <button
                  key={day}
                  type="button"
                  disabled={disabled}
                  onClick={() => { onChange(s); setOpen(false); }}
                  className={[
                    "flex flex-col items-center justify-center rounded-lg py-1.5 transition-colors",
                    disabled  ? "cursor-not-allowed opacity-25" : "hover:bg-amber-50 cursor-pointer",
                    selected  ? "!bg-amber-500" : "",
                    isToday && !selected ? "ring-1 ring-amber-400" : "",
                  ].join(" ")}
                >
                  <span className={`text-sm font-medium leading-none ${selected ? "text-white" : "text-[#1a2332]"}`}>
                    {day}
                  </span>
                  {info && !selected && (
                    <span className={`text-[8px] font-semibold leading-none mt-0.5 ${info.color}`}>
                      {info.label}
                    </span>
                  )}
                  {!info && showPrices && !disabled && !selected && (
                    <span className="text-[8px] leading-none mt-0.5 opacity-0">—</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legenda cen */}
          {showPrices && dateFrom && (
            <div className="mt-3 pt-3 border-t border-[#e2e8f0] flex flex-wrap gap-x-3 gap-y-1">
              {mode === "wynajem" ? (
                <>
                  <span className="text-[9px] text-[#94a3b8]">● 400 zł — 1–4 dni</span>
                  <span className="text-[9px] text-emerald-500">● 350 zł — 5–7 dni</span>
                  <span className="text-[9px] text-amber-500">● 300 zł — 8–21 dni</span>
                  <span className="text-[9px] text-orange-500">● 250 zł — 22+ dni</span>
                </>
              ) : (
                <span className="text-[9px] text-orange-500">● 250 zł — wynajem 22+ dni</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
