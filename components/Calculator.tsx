"use client";

import { useState, useEffect } from "react";

export type RentalType = {
  id: string;
  label: string;
  icon: string;
  pricePerDay: number;
  flatRate: boolean;
  description: string;
};

const RENTAL_TYPES: RentalType[] = [
  {
    id: "wakacje",
    label: "Wakacje / wyjazd",
    icon: "🏖️",
    pricePerDay: 280,
    flatRate: false,
    description: "280 zł / dzień",
  },
  {
    id: "ekipa",
    label: "Ekipa robocza",
    icon: "🔧",
    pricePerDay: 240,
    flatRate: false,
    description: "240 zł / dzień",
  },
  {
    id: "impreza",
    label: "Impreza / event",
    icon: "🎉",
    pricePerDay: 320,
    flatRate: false,
    description: "320 zł / dzień",
  },
  {
    id: "transfer",
    label: "Transfer / lotnisko",
    icon: "✈️",
    pricePerDay: 180,
    flatRate: true,
    description: "180 zł (ryczałt)",
  },
];

export type CalcState = {
  type: RentalType;
  dateFrom: string;
  dateTo: string;
  withDriver: boolean;
  withRack: boolean;
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
  const [selectedType, setSelectedType] = useState<RentalType>(RENTAL_TYPES[0]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [withDriver, setWithDriver] = useState(false);
  const [withRack, setWithRack] = useState(false);
  const [vatInvoice, setVatInvoice] = useState(false);

  const days = selectedType.flatRate ? 1 : getDays(dateFrom, dateTo);
  const basePrice = selectedType.pricePerDay * days;
  const driverCost = withDriver ? 100 * days : 0;
  const rackCost = withRack ? 40 * days : 0;
  const total = basePrice + driverCost + rackCost;

  const showSummary =
    selectedType.flatRate || (dateFrom && dateTo && days > 0);

  useEffect(() => {
    onChange({
      type: selectedType,
      dateFrom,
      dateTo,
      withDriver,
      withRack,
      vatInvoice,
      days,
      total,
    });
  }, [selectedType, dateFrom, dateTo, withDriver, withRack, vatInvoice, days, total]);

  const today = new Date().toISOString().split("T")[0];

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
              className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-150 focus:outline-none ${
                active
                  ? "border-[#3a7a50] bg-[#f0f7f3] shadow-sm"
                  : "border-gray-200 bg-white hover:border-[#3a7a50]/40 hover:bg-gray-50"
              }`}
            >
              <span className="text-2xl">{type.icon}</span>
              <div>
                <div
                  className={`font-semibold text-sm ${
                    active ? "text-[#1c3a2e]" : "text-gray-800"
                  }`}
                >
                  {type.label}
                </div>
                <div
                  className={`text-xs mt-0.5 ${
                    active ? "text-[#2d5a3d]" : "text-gray-500"
                  }`}
                >
                  {type.description}
                </div>
              </div>
              {active && (
                <span className="ml-auto text-[#3a7a50]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Daty */}
      {!selectedType.flatRate && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Od kiedy
            </label>
            <input
              type="date"
              min={today}
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                if (dateTo && e.target.value > dateTo) setDateTo("");
              }}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a7a50] focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Do kiedy
            </label>
            <input
              type="date"
              min={dateFrom || today}
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a7a50] focus:border-transparent bg-white"
            />
          </div>
        </div>
      )}

      {/* Dodatki */}
      <div className="mb-5">
        <p className="text-sm font-medium text-gray-700 mb-2">Opcje dodatkowe</p>
        <div className="space-y-2">
          {[
            {
              id: "driver",
              label: "Z kierowcą",
              note: "+100 zł/dzień",
              checked: withDriver,
              set: setWithDriver,
            },
            {
              id: "rack",
              label: "Hak + bagażnik dachowy",
              note: "+40 zł/dzień",
              checked: withRack,
              set: setWithRack,
            },
            {
              id: "vat",
              label: "Potrzebuję faktury VAT",
              note: "bez dopłaty",
              checked: vatInvoice,
              set: setVatInvoice,
            },
          ].map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={opt.checked}
                onChange={(e) => opt.set(e.target.checked)}
                className="w-4 h-4 accent-[#3a7a50] rounded"
              />
              <span className="text-sm text-gray-800 flex-1">{opt.label}</span>
              <span className="text-xs text-gray-500 font-medium">{opt.note}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Podsumowanie ceny */}
      {showSummary && (
        <div className="bg-[#1c3a2e] rounded-xl p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-wider text-green-300 mb-3">
            Szacunkowa wycena
          </p>
          <div className="space-y-1.5 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-green-200">
                {selectedType.flatRate
                  ? `${selectedType.label} (ryczałt)`
                  : `${selectedType.label} × ${days} ${days === 1 ? "dzień" : "dni"}`}
              </span>
              <span>{basePrice} zł</span>
            </div>
            {withDriver && (
              <div className="flex justify-between">
                <span className="text-green-200">
                  Kierowca × {days} {days === 1 ? "dzień" : "dni"}
                </span>
                <span>+{driverCost} zł</span>
              </div>
            )}
            {withRack && (
              <div className="flex justify-between">
                <span className="text-green-200">
                  Hak + bagażnik × {days} {days === 1 ? "dzień" : "dni"}
                </span>
                <span>+{rackCost} zł</span>
              </div>
            )}
            {vatInvoice && (
              <div className="flex justify-between">
                <span className="text-green-200">Faktura VAT</span>
                <span className="text-green-300 text-xs">w cenie</span>
              </div>
            )}
          </div>
          <div className="border-t border-white/20 pt-3 flex justify-between items-center">
            <span className="font-semibold text-base">Razem</span>
            <span className="font-bold text-2xl">{total} zł</span>
          </div>
          <p className="text-xs text-green-300/70 mt-3">
            Cena orientacyjna · bez kaucji zwrotnej · paliwo we własnym zakresie
          </p>
        </div>
      )}

      {!showSummary && !selectedType.flatRate && (
        <div className="rounded-xl border-2 border-dashed border-gray-200 p-5 text-center text-sm text-gray-400">
          Wybierz daty, aby zobaczyć wycenę
        </div>
      )}
    </div>
  );
}
