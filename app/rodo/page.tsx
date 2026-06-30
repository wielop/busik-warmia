import Link from "next/link";

export const metadata = {
  title: "Polityka prywatności | Bus 9-osobowy Olsztyn",
};

export default function Rodo() {
  return (
    <main className="min-h-screen bg-[#f8fafc] py-16 px-5">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-sm text-amber-600 hover:underline mb-8 inline-block"
        >
          ← Wróć na stronę główną
        </Link>

        <h1 className="text-3xl font-bold text-[#1a2332] mb-2">Polityka prywatności</h1>
        <p className="text-[#64748b] mb-10 text-sm">Ostatnia aktualizacja: czerwiec 2026</p>

        <div className="space-y-8">

          <section>
            <h2 className="text-lg font-bold text-[#1a2332] mb-2">Kto jest administratorem danych</h2>
            <p className="text-[#64748b] text-sm leading-relaxed">
              Administratorem Twoich danych osobowych jest Maciej [Twoje nazwisko], prowadzący
              prywatny wynajem busa z siedzibą w Olsztynie. Kontakt w sprawie danych osobowych:{" "}
              <a href="tel:48728497694" className="text-amber-600 hover:underline">
                +48 728 497 694
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a2332] mb-2">Jakie dane zbieramy</h2>
            <p className="text-[#64748b] text-sm leading-relaxed">
              Przez formularz kontaktowy zbieramy: imię, numer telefonu oraz opcjonalnie — cel podróży,
              liczbę osób, preferowane daty, godziny odbioru i zwrotu. Dane podajesz dobrowolnie.
              Bez nich nie możemy się z Tobą skontaktować.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a2332] mb-2">Po co zbieramy te dane</h2>
            <p className="text-[#64748b] text-sm leading-relaxed">
              Wyłącznie po to, żeby oddzwonić lub odpisać i ustalić szczegóły wynajmu. Nie sprzedajemy
              danych, nie wysyłamy newsletterów, nie udostępniamy ich nikomu z zewnątrz.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a2332] mb-2">Jak długo przechowujemy dane</h2>
            <p className="text-[#64748b] text-sm leading-relaxed">
              Do czasu realizacji wynajmu lub — jeśli nie doszło do rezerwacji — przez kilka tygodni
              od ostatniego kontaktu. Potem dane są usuwane.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a2332] mb-2">Twoje prawa</h2>
            <p className="text-[#64748b] text-sm leading-relaxed">
              Na podstawie RODO masz prawo do: dostępu do swoich danych, ich poprawienia, usunięcia
              oraz wniesienia sprzeciwu wobec przetwarzania. Wystarczy zadzwonić lub napisać —
              zajmiemy się tym bez zbędnych formalności.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a2332] mb-2">Podmiot przetwarzający</h2>
            <p className="text-[#64748b] text-sm leading-relaxed">
              Formularz kontaktowy obsługuje serwis <strong>Formspree</strong> (formspree.io),
              który przechowuje wiadomości i przekazuje je wyłącznie do właściciela. Formspree
              przetwarza dane zgodnie ze swoją polityką prywatności dostępną na formspree.io.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a2332] mb-2">Pliki cookies</h2>
            <p className="text-[#64748b] text-sm leading-relaxed">
              Strona nie używa ciasteczek śledzących ani analitycznych. Mogą być używane techniczne
              pliki cookies niezbędne do działania formularza.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
