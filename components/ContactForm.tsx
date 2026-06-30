"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import type { CalcState } from "./Calculator";

const TELEFON = "+48 728 497 694";
const TELEFON_RAW = "48728497694";

type Props = {
  calcState: CalcState | null;
  onReset: () => void;
};

function isAfterHours(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  if (day === 0) return true;
  if (hour < 8 || hour >= 20) return true;
  return false;
}

export default function ContactForm({ calcState, onReset }: Props) {
  const [name,        setName]        = useState("");
  const [phone,       setPhone]       = useState("");
  const [message,     setMessage]     = useState("");
  const [contactPref, setContactPref] = useState<"Telefon" | "WhatsApp">("Telefon");
  const [submitting,  setSubmitting]  = useState(false);
  const [success,     setSuccess]     = useState(false);
  const [error,       setError]       = useState("");

  const afterHours = isAfterHours();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Imię i telefon są wymagane.");
      return;
    }
    if (!calcState?.dateFrom || !calcState?.dateTo) {
      setError("Wybierz daty wynajmu w kalkulatorze powyżej.");
      return;
    }
    setError("");
    setSubmitting(true);

    const daysLabel = calcState.days > 0
      ? `${calcState.days} ${calcState.days === 1 ? "dzień" : "dni"}`
      : "—";

    const payload = {
      "Imię": name,
      "Telefon": phone,
      "Preferowany kontakt": contactPref,
      "Wiadomość": message || "—",
      "Typ wynajmu": calcState.mode === "dlugoterminowy" ? "Wynajem długoterminowy" : "Wynajem na doby",
      "Cel podróży / trasa": calcState.destination || "—",
      "Liczba osób": calcState.passengers || "—",
      "Data od": calcState.dateFrom,
      "Data do": calcState.dateTo,
      "Liczba dni": daysLabel,
      "Godzina odbioru": calcState.pickupTime || "—",
      "Godzina zwrotu": calcState.returnTime || "—",
      "Szacowany koszt wynajmu": calcState.total > 0 ? `${calcState.total} zł` : "—",
      "Nadprzebieg": calcState.withOverKm ? `Tak — ${calcState.overKmCount || "liczba km niepodana"}` : "Nie",
      "Dowóz busa": calcState.withDelivery ? `Tak — ${calcState.deliveryCity || "miejscowość niepodana"}` : "Nie",
      "Faktura VAT": calcState.vatInvoice ? "Tak" : "Nie",
    };

    try {
      const res = await fetch("https://formspree.io/f/xrewlrej", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSuccess(true);
        setName(""); setPhone(""); setMessage("");
      } else {
        setError("Wystąpił błąd. Zadzwoń bezpośrednio.");
      }
    } catch {
      setError("Brak połączenia. Zadzwoń bezpośrednio.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls = "w-full px-3 py-2.5 rounded-xl border border-[#e2e8f0] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-[#1a2332] placeholder:text-[#64748b]";

  if (success) {
    const daysLabel = calcState && calcState.days > 0
      ? `${calcState.days} ${calcState.days === 1 ? "dzień" : "dni"}`
      : null;
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-amber-500 mx-auto mb-3" strokeWidth={1.75} />
        <h3 className="text-xl font-bold text-[#1a2332] mb-3">Wiadomość wysłana!</h3>
        {calcState?.dateFrom && (
          <p className="text-[#64748b] text-sm mb-1">
            Termin:{" "}
            <strong className="text-[#1a2332]">
              {calcState.dateFrom} – {calcState.dateTo}
            </strong>
            {daysLabel && ` (${daysLabel})`}
          </p>
        )}
        {calcState && calcState.total > 0 && (
          <p className="text-[#64748b] text-sm mb-1">
            Wycena wynajmu: <strong className="text-[#1a2332]">{calcState.total} zł</strong>
          </p>
        )}
        <p className="text-[#64748b] text-sm mt-3">
          Skontaktuję się jak najszybciej — zazwyczaj w ciągu kilku godzin.
        </p>
        <button
          onClick={() => { setSuccess(false); onReset(); }}
          className="mt-5 text-sm text-amber-600 underline underline-offset-2"
        >
          Wyślij kolejne zapytanie
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1a2332] mb-1.5">
            Imię <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jan"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1a2332] mb-1.5">
            Telefon <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^\d\s+\-()\d]/g, ""))}
            placeholder="+48 600 000 000"
            className={inputCls}
          />
        </div>
      </div>

      {/* Preferowany kontakt */}
      <div>
        <label className="block text-sm font-medium text-[#1a2332] mb-2">
          Jak wolisz żebym się odezwał?
        </label>
        <div className="flex gap-5">
          {(["Telefon", "WhatsApp"] as const).map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="contactPref"
                value={opt}
                checked={contactPref === opt}
                onChange={() => setContactPref(opt)}
                className="w-4 h-4 accent-amber-500"
              />
              <span className="text-sm text-[#1a2332]">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1a2332] mb-1.5">
          Wiadomość <span className="text-[#64748b] font-normal">(opcjonalnie)</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Dodatkowe informacje, pytania..."
          className={`${inputCls} resize-none`}
        />
      </div>

      {afterHours && (
        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
          Wysyłasz poza godzinami pracy (pon–sob 8:00–20:00). Odezwę się jak najszybciej będzie to możliwe.
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed text-base"
      >
        <Send className="w-4 h-4" strokeWidth={1.75} />
        {submitting ? "Wysyłanie..." : "Wyślij zapytanie"}
      </button>

      <p className="text-xs text-[#64748b] text-center">
        Odpowiadam zwykle w ciągu kilku godzin. Żadnego spamu.{" "}
        <a href="/rodo" className="underline hover:text-amber-600 transition-colors">
          Polityka prywatności
        </a>.
      </p>

      <div className="pt-1 border-t border-[#e2e8f0] text-center">
        <p className="text-xs text-[#64748b] mb-1">Wolisz zadzwonić?</p>
        <a
          href={`tel:${TELEFON_RAW}`}
          className="text-sm font-semibold text-[#1a2332] hover:text-amber-600 transition-colors"
        >
          {TELEFON}
        </a>
        <span className="text-xs text-[#64748b] ml-2">pon–sob, 8:00–20:00</span>
      </div>
    </form>
  );
}
