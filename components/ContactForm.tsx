"use client";

import { useState, FormEvent } from "react";
import type { CalcState } from "./Calculator";

type Props = {
  calcState: CalcState | null;
};

export default function ContactForm({ calcState }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [route, setRoute] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const daysLabel =
    calcState && calcState.days > 0
      ? `${calcState.days} ${calcState.days === 1 ? "dzień" : "dni"}`
      : "—";

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
      "Typ wynajmu": calcState?.type.label || "—",
      "Data od": calcState?.dateFrom || "—",
      "Data do": calcState?.dateTo || "—",
      "Liczba dni": daysLabel,
      "Szacowany koszt": calcState ? `${calcState.total} zł` : "—",
      "Z kierowcą": calcState?.withDriver ? "Tak" : "Nie",
      "Hak + bagażnik": calcState?.withRack ? "Tak" : "Nie",
      "Faktura VAT": calcState?.vatInvoice ? "Tak" : "Nie",
    };

    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSuccess(true);
        setName("");
        setPhone("");
        setRoute("");
        setMessage("");
      } else {
        setError("Wystąpił błąd. Spróbuj zadzwonić bezpośrednio.");
      }
    } catch {
      setError("Brak połączenia. Spróbuj zadzwonić bezpośrednio.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="bg-[#f0f7f3] border border-[#3a7a50]/30 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-xl font-bold text-[#1c3a2e] mb-2">
          Wiadomość wysłana!
        </h3>
        <p className="text-gray-600 text-sm">
          Skontaktuję się z Tobą jak najszybciej — zazwyczaj w ciągu kilku godzin.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-5 text-sm text-[#3a7a50] underline underline-offset-2"
        >
          Wyślij kolejne zapytanie
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Podgląd wybranej wyceny */}
      {calcState && calcState.total > 0 && (
        <div className="bg-[#f0f7f3] border border-[#3a7a50]/30 rounded-xl p-4 text-sm">
          <p className="text-xs font-semibold text-[#2d5a3d] uppercase tracking-wider mb-1">
            Twoje zapytanie dotyczy
          </p>
          <p className="text-gray-800">
            <span className="font-medium">{calcState.type.label}</span>
            {!calcState.type.flatRate && calcState.days > 0 && (
              <>
                {" · "}
                {calcState.dateFrom} → {calcState.dateTo} ({daysLabel})
              </>
            )}
            {" · "}
            <span className="font-bold text-[#1c3a2e]">{calcState.total} zł</span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Imię i nazwisko <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jan Kowalski"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a7a50] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefon <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+48 600 000 000"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a7a50] focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Skąd i dokąd{" "}
          <span className="text-gray-400 font-normal">(opcjonalnie)</span>
        </label>
        <input
          type="text"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          placeholder="np. Olsztyn → Warszawa Lotnisko Chopina"
          className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a7a50] focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Wiadomość{" "}
          <span className="text-gray-400 font-normal">(opcjonalnie)</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Dodatkowe informacje, pytania, termin..."
          className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a7a50] focus:border-transparent resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 px-6 bg-[#1c3a2e] hover:bg-[#2d5a3d] text-white font-semibold rounded-xl transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
      >
        {submitting ? "Wysyłanie..." : "Wyślij zapytanie →"}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Odpowiadam zazwyczaj w ciągu kilku godzin · nie wysyłam spamu
      </p>
    </form>
  );
}
