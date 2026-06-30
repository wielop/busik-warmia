"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import type { CalcState } from "./Calculator";

const TELEFON = "+48 728 497 694";
const TELEFON_RAW = "48728497694";

type Props = {
  calcState: CalcState | null;
};

export default function ContactForm({ calcState }: Props) {
  const [name,     setName]     = useState("");
  const [phone,    setPhone]    = useState("");
  const [route,    setRoute]    = useState("");
  const [message,  setMessage]  = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState("");

  const daysLabel =
    calcState && calcState.days > 0
      ? `${calcState.days} ${calcState.days === 1 ? "dzień" : "dni"}`
      : "—";

  const modeLabel =
    calcState?.mode === "dlugoterminowy" ? "Wynajem długoterminowy" : "Wynajem na doby";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Imię i telefon są wymagane.");
      return;
    }
    setError("");
    setSubmitting(true);

    const payload = {
      "Imię i nazwisko": name,
      "Telefon": phone,
      "Skąd i dokąd": route || "—",
      "Wiadomość": message || "—",
      "Typ wynajmu": modeLabel,
      "Data od": calcState?.dateFrom || "—",
      "Data do": calcState?.dateTo || "—",
      "Liczba dni": daysLabel,
      "Szacowany koszt": calcState?.mode === "dlugoterminowy" ? "do ustalenia (~250 zł/dzień)" : calcState ? `${calcState.total} zł` : "—",
      "Nadprzebieg": calcState?.withOverKm ? `Tak — ${calcState.overKmCount || "liczba km niepodana"}` : "Nie",
      "Dowóz busa": calcState?.withDelivery ? `Tak — ${calcState.deliveryCity || "miejscowość niepodana"}` : "Nie",
      "Faktura VAT": calcState?.vatInvoice ? "Tak" : "Nie",
    };

    try {
      const res = await fetch("https://formspree.io/f/xrewlrej", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSuccess(true);
        setName(""); setPhone(""); setRoute(""); setMessage("");
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
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-amber-500 mx-auto mb-3" strokeWidth={1.75} />
        <h3 className="text-xl font-bold text-[#1a2332] mb-2">Wiadomość wysłana!</h3>
        <p className="text-[#64748b] text-sm">
          Skontaktuję się jak najszybciej — zazwyczaj w ciągu kilku godzin.
        </p>
        <button
          onClick={() => setSuccess(false)}
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
            Imię i nazwisko <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jan Kowalski"
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
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+48 600 000 000"
            className={inputCls}
          />
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
          placeholder="Dodatkowe informacje, pytania, preferowany termin..."
          className={`${inputCls} resize-none`}
        />
      </div>

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
        Odpowiadam zwykle w ciągu kilku godzin. Żadnego spamu.
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
