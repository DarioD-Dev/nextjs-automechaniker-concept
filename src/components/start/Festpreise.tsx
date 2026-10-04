import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";
import { findeLeistung } from "@/data/leistungen";
import { Link } from "@/i18n/navigation";
import { PfeilRechtsIcon } from "@/components/icons/UiIcons";
import { Preis, preisZusatz } from "@/components/ui/Preis";

export async function Festpreise() {
  const t = await getTranslations("Start");
  return (
    <>
      {/* Block 03 — bedient den planbaren Besucher in fünf Sekunden. Die
          Einträge kommen aus dem Leistungskatalog, nicht aus einer zweiten
          Preisliste: Zwei Wahrheiten über denselben Preis wären eine zu viel.

          FORM B auf der Startseite: Hier ist der Preis nicht eine Spalte in
          einer Tafel, sondern die Aussage selbst — der Abschnitt heißt „Drei
          Dinge mit festem Preis". Deshalb steht der Betrag groß unter dem
          Namen statt klein daneben.

          Drei getrennte Oberkanten, keine durchgehende Linie: Diese drei
          Dinge stehen nebeneinander zur Wahl, sie folgen nicht aufeinander.
          Die durchgehende Linie bleibt dem Ablauf vorbehalten — der
          Unterschied zwischen beiden Linienarten ist Information. */}
      <Section className="border-t border-linie bg-karte">
        <Container>
          <AbschnittsLabel nummer="01">{t("festpreiseLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("festpreiseTitel")}</h2>
          <p className="mt-3 max-w-[56ch] text-lead text-text-zweit">{t("festpreiseLead")}</p>

          <ul className="kw-auf-reihe mt-10 grid gap-8 sm:grid-cols-3">
            {(["§57a Pickerl", "Ölservice", "Reifenwechsel"] as const).map((titel) => {
              const leistung = findeLeistung(titel);
              const zusatz = preisZusatz(leistung.preis, leistung.dauer);
              return (
                <li key={leistung.slug} className="border-t border-linie-stark pt-5">
                  <p className="font-mono text-label tracking-[0.09em] text-titel uppercase">
                    {leistung.titel}
                  </p>
                  <p className="mt-4 leading-none">
                    <Preis
                      preis={leistung.preis}
                      className="text-[clamp(1.75rem,1.2rem+1.8vw,3rem)]"
                    />
                  </p>
                  {zusatz && <p className="mt-2 font-mono text-xs text-text-zweit">{zusatz}</p>}
                  <p className="mt-4 max-w-[38ch] leading-relaxed text-text-zweit">
                    {leistung.satz}
                  </p>
                </li>
              );
            })}
          </ul>

          <Link
            href="/leistungen"
            className="group mt-8 -my-1 inline-flex items-center gap-1.5 py-1 text-sm font-medium underline decoration-linie-stark underline-offset-4 transition-colors hover:decoration-instrument"
          >
            {t("alleLeistungen")}
            <span aria-hidden="true" className="kw-pfeil-schacht">
              <PfeilRechtsIcon className="kw-pfeil-quer size-4" />
            </span>
          </Link>
        </Container>
      </Section>
    </>
  );
}
