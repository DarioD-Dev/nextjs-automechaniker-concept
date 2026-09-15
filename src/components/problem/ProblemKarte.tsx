import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Problem } from "@/data/types";
import { findeProblem } from "@/data/probleme";
import { findeLeistung } from "@/data/leistungen";
import { PANNENHILFE } from "@/data/werkstatt";
import { ProblemSymbol } from "@/components/icons/ProblemSymbol";
import { ZonenKontur } from "@/components/icons/ZonenKontur";
import { PfeilRechtsIcon } from "@/components/icons/UiIcons";
import { TelefonKnopf } from "@/components/layout/TelefonKnopf";
import { VorbefundKnopf } from "@/components/vorbefund/VorbefundKnopf";
import { Container } from "@/components/ui/Container";
import { StufenBlock, STUFEN_STIL, getStufenWorte } from "./Stufe";
import {
  Befundtafel,
  Haeufigkeitsskala,
  Spannenachse,
  Zahlentafel,
  Zeitachse,
} from "./Instrumente";
import { cn } from "@/lib/cn";

/**
 * Die Problemkarte trägt vier Datentypen — ein Urteil, Möglichkeiten mit
 * Gewicht, ein Verfahren mit Dauern und Geld. Sie bekommen jetzt vier
 * verschiedene Formen statt viermal dieselbe graue Liste.
 *
 * Die Reihenfolge der Felder ist unverändert: Dringlichkeit vor Ursachen,
 * Kosten vor der Grenze, Handlung zuletzt. Verändert hat sich nur, wie schnell
 * man sieht, was für eine Art Information vor einem steht.
 */
export async function ProblemKarte({ problem }: { problem: Problem }) {
  const t = await getTranslations("Problem");
  const worte = await getStufenWorte(problem.dringlichkeit);
  const stil = STUFEN_STIL[problem.dringlichkeit];
  const leistung = findeLeistung(problem.leistung.titel);

  return (
    <article className="relative">
      {/* P1 — Die Dringlichkeitskante als Rückgrat: randlos am linken Rand,
          über die volle Höhe der Karte. Sie sagt beim Scrollen durchgehend,
          in welchem Zustand sich das Fahrzeug befindet, und ist damit die
          einzige Farbe der Seite, die tatsächlich etwas trägt. */}
      <div
        aria-hidden="true"
        className={cn("absolute top-0 bottom-0 left-0 w-1.5 sm:w-2", stil.voll)}
      />

      <Container className="py-10 sm:py-14">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start lg:gap-12">
          <div className="min-w-0">
            {/* P4 — Das Symbol ist das beste Material des Projekts und war
                56px klein. Es identifiziert das Problem schneller als jede
                Überschrift: Der Kunde erkennt die Form aus seinem Cockpit. */}
            <header className="flex items-start gap-5 sm:gap-7">
              <ProblemSymbol
                kennung={problem.kennung}
                className={cn(
                  "size-20 shrink-0 sm:size-28",
                  problem.leuchtfarbe === "rot"
                    ? "text-sofort"
                    : problem.leuchtfarbe === "gelb"
                      ? "text-bald"
                      : "text-text-zweit",
                )}
              />
              <div className="min-w-0">
                <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                  {problem.art === "warnleuchte" ? t("warnleuchte") : t("symptom")}
                </p>
                <h1 className="mt-1 text-hero font-bold">{problem.titel}</h1>
                <p className="mt-2 font-mono text-sm text-text-zweit">
                  {t("auchGenannt")} {problem.volksmund.join(", ")}
                </p>
              </div>
            </header>

            <div className="mt-8">
              <StufenBlock
                stufe={problem.dringlichkeit}
                handlung={problem.handlung}
                verschaerfung={problem.verschaerfung}
              />
            </div>

            {/* Klartext und Verwechslung standen bisher als zwei Absätze
                untereinander. Nebeneinander sind sie ein Vergleich — und genau
                das ist ihr Verhältnis. */}
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <Abschnitt titel={t("bedeutung")}>
                <p className="leading-relaxed">{problem.klartext}</p>
              </Abschnitt>
              {problem.verwechslung && (
                <Abschnitt titel={t("verwechslung")}>
                  <p className="border-l-2 border-linie-stark pl-4 leading-relaxed text-text-zweit">
                    {problem.verwechslung}
                  </p>
                </Abschnitt>
              )}
            </div>

            {/* P2 — Häufigkeit als Gewicht: Was wahrscheinlich ist, sieht man,
                bevor man es liest. */}
            <div className="mt-12">
              <Abschnitt titel={t("ursachen")} zusatz={t("ursachenHinweis")}>
                <ul className="divide-y divide-linie border-y border-linie">
                  {problem.ursachen.map((u) => (
                    <li key={u.titel} className="grid gap-2 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
                      <div className="flex items-center gap-3 sm:block">
                        <Haeufigkeitsskala haeufigkeit={u.haeufigkeit} />
                        <span className="font-mono text-xs text-text-zweit sm:mt-1.5 sm:block">
                          {t(u.haeufigkeit)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{u.titel}</p>
                        <p className="mt-1 max-w-[62ch] leading-relaxed text-text-zweit">
                          {u.erklaerung}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Abschnitt>
            </div>

            {/* P2 + ZonenKontur — die Zeichnung steht jetzt dort, wo geprüft
                wird, und nicht mehr als Vignette oben rechts. Sie beantwortet
                genau hier eine Frage: wo am Auto passiert das? */}
            <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_15rem] lg:gap-10">
              <Abschnitt titel={t("pruefung")}>
                <Zeitachse
                  schritte={problem.pruefschritte}
                  minutenLabel={t("minuten")}
                  gesamtLabel={t("zusammen")}
                />
              </Abschnitt>
              <div className="lg:pt-9">
                <ZonenKontur zone={problem.zone} className="max-w-[15rem]" />
              </div>
            </div>

            {/* P3 — Zahlen werden gesetzt. Der Preis war 18px groß, während
                die Überschrift auf 60px lief. */}
            <div className="mt-12">
              <Abschnitt titel={t("kosten")}>
                <div className="grid gap-8 border-y border-linie py-6 sm:grid-cols-2 sm:gap-12">
                  <Zahlentafel
                    label={t("kostenPruefung")}
                    betrag={String(problem.pruefkosten)}
                    einheit="€"
                    hinweis={problem.pruefkostenHinweis ?? t("kostenPruefungHinweis")}
                  />
                  {problem.reparaturSpanne && (
                    <Spannenachse
                      label={t("kostenReparatur")}
                      von={problem.reparaturSpanne.von}
                      bis={problem.reparaturSpanne.bis}
                      einheit="€"
                      offen={Boolean(problem.spannenHinweis)}
                    />
                  )}
                </div>
                {problem.spannenHinweis && (
                  <p className="mt-4 max-w-[62ch] leading-relaxed text-text-zweit">
                    {problem.spannenHinweis}
                  </p>
                )}
              </Abschnitt>
            </div>

            <section className="mt-12 border border-instrument bg-karte p-5 sm:p-6">
              <h2 className="font-mono text-label tracking-[0.09em] uppercase">{t("grenze")}</h2>
              <p className="mt-3 max-w-[62ch] text-lead leading-relaxed">{problem.grenze}</p>
            </section>

            <div id="handlung" className="mt-12 scroll-mt-24">
              <Handlung problem={problem} />
            </div>

            <div className="mt-10 space-y-2 border-t border-linie pt-6 text-sm">
              <p>
                <span className="text-text-zweit">{t("leistung")}: </span>
                <Link
                  href={{ pathname: "/leistungen", hash: leistung.slug }}
                  className="font-medium underline decoration-linie-stark underline-offset-4 hover:decoration-instrument"
                >
                  {problem.leistung.titel}
                </Link>{" "}
                <span className="font-mono">{problem.leistung.preis}</span>
              </p>
              {problem.verwandt.length > 0 && (
                <p>
                  <span className="text-text-zweit">{t("verwandt")}: </span>
                  {problem.verwandt.map((kennung, i) => {
                    const ziel = findeProblem(kennung);
                    if (!ziel) return null;
                    return (
                      <span key={kennung}>
                        {i > 0 && ", "}
                        <Link
                          href={{ pathname: "/problem/[kennung]", params: { kennung } }}
                          className="underline decoration-linie-stark underline-offset-4 hover:decoration-instrument"
                        >
                          {ziel.titel}
                        </Link>
                      </span>
                    );
                  })}
                </p>
              )}
            </div>
          </div>

          {/* P5 — Die zweite Spalte trägt Information, keinen Leerraum. */}
          <Befundtafel
            titel={t("befund")}
            stufe={problem.dringlichkeit}
            stufenwort={worte.wort}
            weiterfahren={worte.weiterfahren}
            zeilen={[
              { label: t("wasWirPruefenKurz"), wert: `${problem.pruefkosten} €` },
              ...(problem.reparaturSpanne
                ? [
                    {
                      label: t("kostenReparatur"),
                      wert: `${problem.reparaturSpanne.von}–${problem.reparaturSpanne.bis} €`,
                    },
                  ]
                : []),
              {
                label: t("zusammen"),
                wert: `${problem.pruefschritte.reduce((s, p) => s + p.dauerMinuten, 0)} ${t("minuten")}`,
              },
            ]}
            sprungLabel={t("zurHandlung")}
            sprungZiel="#handlung"
          />
        </div>
      </Container>
    </article>
  );
}

/**
 * Die Handlung richtet sich nach der Stufe — unverändert die zentrale Regel.
 * Ein Terminformular unter einem roten Befund wäre ein Designfehler mit Folgen.
 */
async function Handlung({ problem }: { problem: Problem }) {
  const t = await getTranslations("Problem");

  if (problem.dringlichkeit === "sofort") {
    return (
      <section className="border-l-4 border-sofort bg-sofort-feld p-5 sm:p-6">
        <h2 className="text-block font-semibold text-sofort">{t("nichtWeiterfahren")}</h2>
        <p className="mt-2">{t("rufenSieAn")}</p>
        <TelefonKnopf variante="zweit" className="mt-4" />
        <p className="mt-5 text-sm leading-relaxed text-text-zweit">
          {t("pannenhilfe")} {PANNENHILFE.map((p) => `${p.name} ${p.nummer}`).join(" · ")}
        </p>
        <div className="mt-5 border-t border-black/10 pt-5">
          <VorbefundKnopf kennung={problem.kennung} />
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-wrap items-center gap-4">
      <VorbefundKnopf kennung={problem.kennung} />
      <Link
        href="/termin"
        className="inline-flex items-center gap-1.5 text-sm font-medium underline decoration-linie-stark underline-offset-4 hover:decoration-instrument"
      >
        {t("terminAnfragen")}
        <PfeilRechtsIcon className="size-4" />
      </Link>
    </section>
  );
}

function Abschnitt({
  titel,
  zusatz,
  children,
}: {
  titel: string;
  zusatz?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
        {titel}
        {zusatz && <span className="ml-2 normal-case opacity-80">{zusatz}</span>}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
