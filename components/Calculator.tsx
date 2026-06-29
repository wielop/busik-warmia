"use client";

import { useState, useEffect } from "react";
import { Umbrella, HardHat, PartyPopper, Plane, CheckCircle2, Receipt, Truck, Gauge } from "lucide-react";

export type RentalType = {
  id: string;
  label: string;
  icon: string;
  pricePerDay: number;
  flatRate: boolean;
  description: string;
};

const RENTAL_TYPES: RentalType[] = [
  { id: "wakacje", label: "Wakacje / wyjazd",    icon: "wakacje",  pricePerDay: 280, flatRate: false, description: "280 zł / dzień" },
  { id: "ekipa",   label: "Ekipa robocza",        icon: "ekipa",    pricePerDay: 240, flatRate: false, description: "240 zł / dzień" },
  { id: "impreza", label: "Impreza / event",      icon: "impreza",  pricePerDay: 320, flatRate: false, description: "320 zł / dzień" },
  { id: "transfer",label: "Transfer / lotnisko",  icon: "transfer", pricePerDay: 180, flatRate: true,  description: "180 zł (ryczałt)" },
];

function TypeIcon({ id, active }: { id: string; active: boolean }) {
  const cls = `w-5 h-5 shrink-0 ${active ? "text-amber-500" : "text-slate-400"}`;
  if (id === "wakacje")  return <Umbrella     className={cls} strokeWidth={1.75} />;
  if (id === "ekipa")    return <HardHat      className={cls} strokeWidth={1.75} />;
  if (id === "impreza")  return <PartyPopper  className={cls} strokeWidth={1.75} />;
  return <Plane className={cls} strokeWidth={1.75} />;
}

export type CalcState = {
  type: RentalType;
  dateFrom: string;
  dateTo: string;
  withDelivery: boolean;
  deliveryCity: string;
  withOverKm: boolean;
  overKmCount: string;
  vatInvoice: boolean;
  days: number;
  total: number;
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

export default function Calculator({ onChange }: Props) {
  const [selectedType,  setSelectedType]  = useState<RentalType>(RENTAL_TYPES[0]);
  const [dateFrom,      setDateFrom]      = useState("");
  const [dateTo,        setDateTo]        = useState("");
  const [withDelivery,  setWithDelivery]  = useState(false);
  const [deliveryCity,  setDeliveryCity]  = useState("");
  const [withOverKm,    setWithOverKm]    = useState(false);
  const [overKmCount,   setOverKmCount]   = useState("");
  const [vatInvoice,    setVatInvoice]    = useState(false);

  const days      = selectedType.flatRate ? 1 : getDays(dateFrom, dateTo);
  const basePrice = selectedType.pricePerDay * days;
  const total     = basePrice;
  const showSummary = selectedType.flatRate || (dateFrom && dateTo && days > 0);

  useEffect(() => {
    onChange({ type: selectedType, dateFrom, dateTo, withDelivery, deliveryCity, withOverKm, overKmCount, vatInvoice, days, total });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType, dateFrom, dateTo, withDelivery, deliveryCity, vatInvoice, days, total]);

  const today    = new Date().toISOString().split("T")[0];
  const inputCls = "w-full px-3 py-2.5 rounded-xl border border-[#e2e8f0] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-[#1a2332]";

  return (
    <div>
      {/* Typ wynajmu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {RENTAL_TYPES.map((type) => {
          const active = selectedType.id === type.id;
          return (
            <button
              key={type.id}
              onClick={() => setSelectedType(type)}
              className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                active
                  ? "border-amber-400 bg-amber-50 shadow-sm"
                  : "border-[#e2e8f0] bg-white hover:border-amber-200 hover:bg-amber-50/30"
              }`}
            >
              <TypeIcon id={type.id} active={active} />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-[#1a2332]">{type.label}</div>
                <div className={`text-xs mt-0.5 font-medium ${active ? "text-amber-600" : "text-[#64748b]"}`}>
                  {type.description}
                </div>
              </div>
              {active && <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" strokeWidth={1.75} />}
            </button>
          );
        })}
      </div>

      {/* Daty */}
      {!selectedType.flatRate && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-[#1a2332] mb-1.5">Od kiedy</label>
            <input
              type="date"
              min={today}
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                if (dateTo && e.target.value > dateTo) setDateTo("");
              }}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1a2332] mb-1.5">Do kiedy</label>
            <input
              type="date"
              min={dateFrom || today}
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>
      )}

      {/* Opcje dodatkowe */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-[#1a2332] mb-2">Opcje dodatkowe</p>
        <div className="space-y-2">

          {/* Dowóz busa */}
          <div>
            <label className="flex items-center gap-3 p-3 rounded-xl border border-[#e2e8f0] bg-white cursor-pointer hover:bg-amber-50/30 hover:border-amber-200 transition-colors">
              <Truck className="w-4 h-4 text-[#64748b] shrink-0" strokeWidth={1.75} />
              <input
                type="checkbox"
                checked={withDelivery}
                onChange={(e) => {
                  setWithDelivery(e.target.checked);
                  if (!e.target.checked) setDeliveryCity("");
                }}
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
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* Nadprzebieg */}
          <div>
            <label className="flex items-center gap-3 p-3 rounded-xl border border-[#e2e8f0] bg-white cursor-pointer hover:bg-amber-50/30 hover:border-amber-200 transition-colors">
              <Gauge className="w-4 h-4 text-[#64748b] shrink-0" strokeWidth={1.75} />
              <input
                type="checkbox"
                checked={withOverKm}
                onChange={(e) => {
                  setWithOverKm(e.target.checked);
                  if (!e.target.checked) setOverKmCount("");
                }}
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

          {/* Faktura VAT */}
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
            <div className="flex justify-between">
              <span className="text-slate-300">
                {selectedType.flatRate
                  ? `${selectedType.label} (ryczałt)`
                  : `${selectedType.label} × ${days} ${days === 1 ? "dzień" : "dni"}`}
              </span>
              <span>{basePrice} zł</span>
            </div>
            {withOverKm && (
              <div className="flex justify-between">
                <span className="text-slate-300">
                  Nadprzebieg{overKmCount ? ` ~${overKmCount}/dobę` : ""}
                </span>
                <span className="text-amber-400 text-xs">do ustalenia</span>
              </div>
            )}
            {withDelivery && (
              <div className="flex justify-between">
                <span className="text-slate-300">
                  Dowóz{deliveryCity ? ` → ${deliveryCity}` : ""}
                </span>
                <span className="text-amber-400 text-xs">do ustalenia</span>
              </div>
            )}
            {vatInvoice && (
              <div className="flex justify-between">
                <span className="text-slate-300">Faktura VAT</span>
                <span className="text-amber-400 text-xs">w cenie</span>
              </div>
            )}
          </div>
          <div className="border-t border-white/10 pt-3 flex justify-between items-center">
            <span className="font-semibold text-base">Razem</span>
            <span className="font-bold text-2xl text-amber-400">{total} zł</span>
          </div>
          {(withDelivery || withOverKm) && (
            <p className="text-xs text-amber-300/70 mt-2">
              + pozycje &quot;do ustalenia&quot; wyceniamy indywidualnie po kontakcie
            </p>
          )}
          <p className="text-xs text-slate-400 mt-2">
            Cena orientacyjna · limit 450 km/dobę · kaucja 1000 zł zwracana przy oddaniu
          </p>
        </div>
      ) : (
        !selectedType.flatRate && (
          <div className="rounded-2xl border-2 border-dashed border-[#e2e8f0] p-5 text-center text-sm text-[#64748b]">
            Wybierz daty, aby zobaczyć wycenę
          </div>
        )
      )}

      <p className="text-xs text-[#64748b] mt-3 text-center">
        Wynajem powyżej 4 dni — taniej. Napisz po indywidualną wycenę.
      </p>
    </div>
  );
}
