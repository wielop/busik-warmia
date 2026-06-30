"use client";

import { useState, useEffect } from "react";
import { CalendarRange, CheckCircle2, Receipt, Truck, Gauge, MapPin, Users, Clock } from "lucide-react";
import CalendarPicker from "./CalendarPicker";

type Mode = "wynajem" | "dlugoterminowy";

export type CalcState = {
  mode: Mode;
  dateFrom: string;
  dateTo: string;
  withDelivery: boolean;
  deliveryCity: string;
  withOverKm: boolean;
  overKmCount: string;
  vatInvoice: boolean;
  days: number;
  pricePerDay: number;
  total: number;
  destination: string;
  passengers: string;
  pickupTime: string;
  returnTime: string;
};

type Props = {
  onChange: (state: CalcState) => void;
};

function getDays(from: string, to: string): number {
  if (!from || !to) return 0;
  const d1 = new Date(from);
  const d2 = new Date(to);
  const diff = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

function getTier(days: number): { pricePerDay: number; label: string } {
  if (days <= 4)  return { pricePerDay: 400, label: "1–4 dni" };
  if (days <= 7)  return { pricePerDay: 350, label: "5–7 dni" };
  if (days <= 21) return { pricePerDay: 300, label: "8–21 dni" };
  return                 { pricePerDay: 250, label: "22+ dni" };
}

const MODES: { id: Mode; label: string; sub: string; icon: React.ReactNode }[] = [
  {
    id: "wynajem",
    label: "Wynajem na doby",
    sub: "od 250 zł / dzień",
    icon: <CalendarRange className="w-5 h-5 scale-x-[-1]" strokeWidth={1.75} />,
  },
  {
    id: "dlugoterminowy",
    label: "Wynajem długoterminowy",
    sub: "22+ dni · 250 zł/dzień",
    icon: <CalendarRange className="w-5 h-5" strokeWidth={1.75} />,
  },
];

export default function Calculator({ onChange }: Props) {
  const [mode,         setMode]         = useState<Mode>("wynajem");
  const [dateFrom,     setDateFrom]     = useState("");
  const [dateTo,       setDateTo]       = useState("");
  const [withDelivery, setWithDelivery] = useState(false);
  const [deliveryCity, setDeliveryCity] = useState("");
  const [withOverKm,   setWithOverKm]   = useState(false);
  const [overKmCount,  setOverKmCount]  = useState("");
  const [vatInvoice,   setVatInvoice]   = useState(false);
  const [destination,  setDestination]  = useState("");
  const [passengers,   setPassengers]   = useState("");
  const [pickupTime,   setPickupTime]   = useState("");
  const [returnTime,   setReturnTime]   = useState("");

  const days = getDays(dateFrom, dateTo);
  const tier = getTier(days);

  const pricePerDay = mode === "dlugoterminowy" ? 250 : tier.pricePerDay;
  const total       = pricePerDay * days;

  const showSummary =
    mode === "dlugoterminowy" ||
    (dateFrom && dateTo && days > 0);

  const today = new Date().toISOString().split("T")[0];

  const twoMonthsLater = new Date();
  twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
  const maxDate = twoMonthsLater.toISOString().split("T")[0];

  const minDays = mode === "dlugoterminowy" ? 22 : 1;
  const minDateTo = dateFrom
    ? new Date(new Date(dateFrom).getTime() + minDays * 86400000).toISOString().split("T")[0]
    : today;

  useEffect(() => {
    onChange({ mode, dateFrom, dateTo, withDelivery, deliveryCity, withOverKm, overKmCount, vatInvoice, days, pricePerDay, total, destination, passengers, pickupTime, returnTime });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, dateFrom, dateTo, withDelivery, deliveryCity, withOverKm, overKmCount, vatInvoice, days, pricePerDay, total, destination, passengers, pickupTime, returnTime]);

  const inputCls = "w-full px-3 py-2.5 rounded-xl border border-[#e2e8f0] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-[#1a2332]";

  return (
    <div>

      {/* Tryby */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
        {MODES.map((m) => {
          const active = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => { setMode(m.id); setDateFrom(""); setDateTo(""); setPassengers(""); setPickupTime(""); setReturnTime(""); setDestination(""); }}
              className={`flex flex-col items-start gap-1.5 p-4 rounded-2xl border-2 text-left transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                active
                  ? "border-amber-400 bg-amber-50 shadow-sm"
                  : "border-[#e2e8f0] bg-white hover:border-amber-200 hover:bg-amber-50/30"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={active ? "text-amber-500" : "text-[#64748b]"}>{m.icon}</span>
                {active && <CheckCircle2 className="w-4 h-4 text-amber-500" strokeWidth={1.75} />}
              </div>
              <div>
                <p className="font-semibold text-sm text-[#1a2332] leading-tight">{m.label}</p>
                <p className={`text-xs mt-0.5 font-medium ${active ? "text-amber-600" : "text-[#64748b]"}`}>{m.sub}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tiery cenowe — tylko dla wynajmu na doby */}
      {mode === "wynajem" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
          {[
            { range: "1–4 dni",  price: "400 zł/dzień" },
            { range: "5–7 dni",  price: "350 zł/dzień" },
            { range: "8–21 dni", price: "300 zł/dzień" },
            { range: "22+ dni",  price: "250 zł/dzień" },
          ].map((t) => (
            <div
              key={t.range}
              className={`rounded-xl border p-3 text-center transition-colors ${
                days > 0 && tier.label === t.range
                  ? "border-amber-300 bg-amber-50"
                  : "border-[#e2e8f0] bg-white"
              }`}
            >
              <p className="text-xs text-[#64748b] font-medium">{t.range}</p>
              <p className={`text-sm font-bold mt-0.5 ${
                days > 0 && tier.label === t.range ? "text-amber-600" : "text-[#1a2332]"
              }`}>{t.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* Info dla długoterminowego */}
      {mode === "dlugoterminowy" && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5">
          <p className="text-sm font-semibold text-[#1a2332] mb-1">Wynajem 22 dni i więcej</p>
          <p className="text-sm text-[#64748b]">
            <strong className="text-[#1a2332]">250 zł / dzień</strong> — to nasza propozycja cenowa.
            Zostaw kontakt, potwierdzimy szczegóły i termin.
          </p>
        </div>
      )}

      {/* Daty */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <CalendarPicker
          label="Od kiedy"
          value={dateFrom}
          onChange={(d) => { setDateFrom(d); if (dateTo && d >= dateTo) setDateTo(""); }}
          min={today}
          max={maxDate}
        />
        <CalendarPicker
          label="Kiedy oddajesz busa"
          value={dateTo}
          onChange={setDateTo}
          min={minDateTo}
          max={maxDate}
          hint="dzień zwrotu busa"
          dateFrom={dateFrom}
          mode={mode}
          showPrices={!!dateFrom}
        />
      </div>

      {/* Szczegóły wyjazdu */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-[#1a2332] mb-2">
          Szczegóły wyjazdu <span className="text-[#64748b] font-normal">(opcjonalnie)</span>
        </p>
        <div className="space-y-3">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" strokeWidth={1.75} />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Cel podróży / trasa (np. Gdańsk, Mazury, Praga...)"
              className={`${inputCls} pl-9`}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" strokeWidth={1.75} />
              <input
                type="number"
                min={1}
                max={9}
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                placeholder="Ile osób"
                className={`${inputCls} pl-9`}
              />
            </div>
            <div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" strokeWidth={1.75} />
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className={`${inputCls} pl-9`}
                />
              </div>
              <p className="text-xs text-[#64748b] mt-1 text-center">Godzina odbioru</p>
            </div>
            <div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" strokeWidth={1.75} />
                <input
                  type="time"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className={`${inputCls} pl-9`}
                />
              </div>
              <p className="text-xs text-[#64748b] mt-1 text-center">Godzina zwrotu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Opcje dodatkowe */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-[#1a2332] mb-2">Opcje dodatkowe</p>
        <div className="space-y-2">

          {mode === "wynajem" && (
            <div>
              <label className="flex items-center gap-3 p-3 rounded-xl border border-[#e2e8f0] bg-white cursor-pointer hover:bg-amber-50/30 hover:border-amber-200 transition-colors">
                <Gauge className="w-4 h-4 text-[#64748b] shrink-0" strokeWidth={1.75} />
                <input
                  type="checkbox"
                  checked={withOverKm}
                  onChange={(e) => { setWithOverKm(e.target.checked); if (!e.target.checked) setOverKmCount(""); }}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
                <span className="text-sm text-[#1a2332] flex-1">Planuję więcej niż 450 km/dobę</span>
                <span className="text-xs text-[#64748b] font-medium">wycena indywidualna</span>
              </label>
              {withOverKm && (
                <div className="mt-2 px-1">
                  <input
                    type="text"
                    value={overKmCount}
                    onChange={(e) => setOverKmCount(e.target.value)}
                    placeholder="Szacowana liczba km dziennie, np. 600 km..."
                    className={inputCls}
                    autoFocus
                  />
                </div>
              )}
            </div>
          )}

          <div>
            <label className="flex items-center gap-3 p-3 rounded-xl border border-[#e2e8f0] bg-white cursor-pointer hover:bg-amber-50/30 hover:border-amber-200 transition-colors">
              <Truck className="w-4 h-4 text-[#64748b] shrink-0" strokeWidth={1.75} />
              <input
                type="checkbox"
                checked={withDelivery}
                onChange={(e) => { setWithDelivery(e.target.checked); if (!e.target.checked) setDeliveryCity(""); }}
                className="w-4 h-4 accent-amber-500 rounded"
              />
              <span className="text-sm text-[#1a2332] flex-1">Dowóz busa pod adres</span>
              <span className="text-xs text-[#64748b] font-medium">wycena indywidualna</span>
            </label>
            {withDelivery && (
              <div className="mt-2 px-1">
                <input
                  type="text"
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  placeholder="Miejscowość lub adres dowozu..."
                  className={inputCls}
                />
              </div>
            )}
          </div>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-[#e2e8f0] bg-white cursor-pointer hover:bg-amber-50/30 hover:border-amber-200 transition-colors">
            <Receipt className="w-4 h-4 text-[#64748b] shrink-0" strokeWidth={1.75} />
            <input
              type="checkbox"
              checked={vatInvoice}
              onChange={(e) => setVatInvoice(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded"
            />
            <span className="text-sm text-[#1a2332] flex-1">Potrzebuję faktury VAT</span>
            <span className="text-xs text-[#64748b] font-medium">bez dopłaty</span>
          </label>

        </div>
      </div>

      {/* Podsumowanie */}
      {showSummary ? (
        <div className="bg-[#1a2332] rounded-2xl p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
            Szacunkowa wycena
          </p>
          <div className="space-y-1.5 text-sm mb-4">
            {mode === "wynajem" && days > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-300">
                  {days} {days === 1 ? "dzień" : "dni"} × {pricePerDay} zł
                  <span className="text-amber-400/70 ml-1.5">({tier.label})</span>
                </span>
                <span>{total} zł</span>
              </div>
            )}
            {mode === "dlugoterminowy" && (
              <div className="flex justify-between">
                <span className="text-slate-300">
                  {days > 0 ? `${days} dni × 250 zł` : "Długoterminowy"}
                </span>
                <span>{days > 0 ? `${total} zł` : "—"}</span>
              </div>
            )}
            {withOverKm && (
              <div className="flex justify-between">
                <span className="text-slate-300">Nadprzebieg{overKmCount ? ` ~${overKmCount}/dobę` : ""}</span>
                <span className="text-amber-400 text-xs">do ustalenia</span>
              </div>
            )}
            {withDelivery && (
              <div className="flex justify-between">
                <span className="text-slate-300">Dowóz{deliveryCity ? ` → ${deliveryCity}` : ""}</span>
                <span className="text-amber-400 text-xs">do ustalenia</span>
              </div>
            )}
            {vatInvoice && (
              <div className="flex justify-between">
                <span className="text-slate-300">Faktura VAT</span>
                <span className="text-amber-400 text-xs">w cenie</span>
              </div>
            )}
            {(withDelivery || withOverKm) && (
              <p className="text-xs text-amber-300/70 pt-1">
                + pozycje &quot;do ustalenia&quot; wyceniamy indywidualnie po kontakcie
              </p>
            )}
          </div>

          {/* Kiedy co płacisz */}
          {days > 0 && (
            <div className="border-t border-white/10 pt-3 space-y-2 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">Kiedy płacisz</p>
              <div className="flex justify-between">
                <span className="text-slate-300">Przy odbiorze busa <span className="text-white/40 text-xs">(zaliczka)</span></span>
                <span className="font-semibold">1 000 zł</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Po zwrocie busa <span className="text-white/40 text-xs">(pozostała kwota)</span></span>
                <span className="font-semibold">{total > 1000 ? `${total - 1000} zł` : "0 zł"}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 mt-1">
                <span className="font-bold">Łącznie za wynajem</span>
                <span className="font-bold text-2xl text-amber-400">{total} zł</span>
              </div>
            </div>
          )}
          <p className="text-xs text-slate-400 mt-3">
            Limit 450 km/dobę · zaliczka 1 000 zł płatna przy odbiorze
          </p>
        </div>
      ) : (
        mode === "wynajem" && (
          <div className="rounded-2xl border-2 border-dashed border-[#e2e8f0] p-5 text-center text-sm text-[#64748b]">
            Wybierz daty, aby zobaczyć wycenę
          </div>
        )
      )}

      {mode === "wynajem" && (
        <p className="text-xs text-[#64748b] mt-3 text-center">
          Wynajem powyżej 4 dni — taniej. Cena zmienia się automatycznie po wyborze dat.
        </p>
      )}
    </div>
  );
}
