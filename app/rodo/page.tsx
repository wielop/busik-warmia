import Link from "next/link";

export const metadata = {
  title: "Regulamin i polityka prywatności | Bus 9-osobowy Olsztyn",
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

        <h1 className="text-3xl font-bold text-[#1a2332] mb-2">Regulamin i polityka prywatności</h1>
        <p className="text-[#64748b] mb-12 text-sm">Ostatnia aktualizacja: czerwiec 2026</p>

        {/* REGULAMIN */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-[#1a2332] mb-6 pb-3 border-b border-[#e2e8f0]">
            Warunki wynajmu
          </h2>
          <div className="space-y-8">

            <section>
              <h3 className="text-base font-bold text-[#1a2332] mb-2">Przedmiot wynajmu</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                Wynajmującym jest Maciej Pawilonis, prowadzący prywatny wynajem pojazdu
                Opel Zafira Life Business (9 miejsc) z siedzibą w Olsztynie.
                Wynajem odbywa się na podstawie ustaleń potwierdzonych telefonicznie lub pisemnie.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-[#1a2332] mb-2">Kaucja</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <p className="text-sm text-[#1a2332] leading-relaxed">
                  Kaucja w wysokości <strong>1 000 zł</strong> jest płatna przy odbiorze pojazdu —
                  odrębnie od kosztu wynajmu. Stanowi zabezpieczenie na wypadek szkód, braków lub
                  nieoddania busa zatankowanego do pełna.
                  Po zwrocie pojazdu w stanie nieuszkodzonym i z pełnym bakiem — kaucja jest
                  zwracana Najemcy <strong>w całości</strong>, od ręki.
                  W przypadku szkód kaucja pokrywa ich wartość w całości lub częściowo;
                  ewentualna nadwyżka jest doliczana do rozliczenia końcowego.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-base font-bold text-[#1a2332] mb-2">Płatności</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                Płatność za wynajem jest wymagana <strong>z góry</strong> — najpóźniej w dniu wydania pojazdu.
                Przy odbiorze busa Najemca uiszcza pełny koszt wynajmu oraz kaucję (1 000 zł) jako
                oddzielną kwotę. Płatności są realizowane gotówką.
                Po zwrocie pojazdu bez szkód i z pełnym bakiem kaucja jest zwracana w całości.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-[#1a2332] mb-2">Limit kilometrów</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                W ramach wynajmu na doby obowiązuje limit <strong>450 km na dobę</strong>.
                Nadprzebieg jest wyceniany indywidualnie — warunki ustalane przed wyjazdem.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-[#1a2332] mb-2">Paliwo</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                Pojazd wydawany jest z pełnym bakiem. Najemca zobowiązany jest oddać pojazd
                z pełnym bakiem. W przypadku nieoddania busa zatankowanego koszt paliwa
                pokrywany jest z kaucji.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-[#1a2332] mb-2">Uprawnienia kierowcy</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                Do prowadzenia pojazdu wymagane jest prawo jazdy kategorii B.
                Kierowca musi posiadać ważne prawo jazdy przez cały okres wynajmu.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-[#1a2332] mb-2">Odpowiedzialność</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                Pojazd jest ubezpieczony w zakresie OC/AC. Najemca odpowiada za szkody
                powstałe z jego winy, niewynikające z normalnego użytkowania pojazdu,
                do wysokości kaucji. Szkody przekraczające wartość kaucji rozliczane są osobno.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-[#1a2332] mb-2">Anulowanie rezerwacji</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                Warunki anulowania ustalane są indywidualnie przy rezerwacji.
              </p>
            </section>

          </div>
        </div>

        {/* POLITYKA PRYWATNOŚCI */}
        <div>
          <h2 className="text-xl font-bold text-[#1a2332] mb-6 pb-3 border-b border-[#e2e8f0]">
            Polityka prywatności
          </h2>
          <div className="space-y-8">

            <section>
              <h3 className="text-base font-bold text-[#1a2332] mb-2">Administrator danych</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                Administratorem Twoich danych osobowych jest Maciej Pawilonis, prowadzący
                prywatny wynajem busa z siedzibą w Olsztynie. Kontakt:{" "}
                <a href="tel:48728497694" className="text-amber-600 hover:underline">
                  +48 728 497 694
                </a>.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-[#1a2332] mb-2">Jakie dane zbieramy</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                Przez formularz kontaktowy zbieramy: imię, numer telefonu oraz opcjonalnie — cel podróży,
                liczbę osób, preferowane daty, godziny odbioru i zwrotu. Dane podajesz dobrowolnie.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-[#1a2332] mb-2">Cel przetwarzania</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                Wyłącznie kontakt w celu ustalenia szczegółów wynajmu. Nie sprzedajemy danych,
                nie wysyłamy newsletterów, nie udostępniamy ich nikomu z zewnątrz.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-[#1a2332] mb-2">Okres przechowywania</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                Do czasu realizacji wynajmu lub przez kilka tygodni od ostatniego kontaktu,
                jeśli nie doszło do rezerwacji.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-[#1a2332] mb-2">Twoje prawa</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                Masz prawo do dostępu, poprawienia i usunięcia swoich danych.
                Wystarczy zadzwonić lub napisać.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-[#1a2332] mb-2">Podmiot przetwarzający</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                Formularz obsługuje <strong>Formspree</strong> (formspree.io), który przechowuje
                wiadomości i przekazuje je wyłącznie do właściciela.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-[#1a2332] mb-2">Pliki cookies</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                Strona nie używa ciasteczek śledzących ani analitycznych.
              </p>
            </section>

          </div>
        </div>

      </div>
    </main>
  );
}
