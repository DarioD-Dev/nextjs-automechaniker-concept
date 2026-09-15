import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Haeufigkeit, Problem } from "@/data/types";
import { findeProblem } from "@/data/probleme";
import { PANNENHILFE } from "@/data/werkstatt";
import { ProblemSymbol } from "@/components/icons/ProblemSymbol";
import { ZonenKontur } from "@/components/icons/ZonenKontur";
import { PfeilRechtsIcon } from "@/components/icons/UiIcons";
import { TelefonKnopf } from "@/components/layout/TelefonKnopf";
import { VorbefundKnopf } from "@/components/vorbefund/VorbefundKnopf";
import { Container } from "@/components/ui/Container";
import { StufenBlock, STUFEN_STIL } from "./Stufe";
import { cn } from "@/lib/cn";

/**
 * Immer identisch aufgebaut. Wiedererkennbarkeit schlägt Abwechslung: Wer
 * zwei Karten liest, soll die dritte überfliegen können.
 *
 * Die Reihenfolge ist nicht verhandelbar — Dringlichkeit steht vor den
 * Ursachen, auch und gerade auf dem Telefon. Wer Angst hat, liest keine
 * Ursachenliste.
 */
export async function ProblemKarte({ problem }: { problem: Problem }) {
  const t = await getTranslations("Problem");
  const stil = STUFEN_STIL[problem.dringlichkeit];
  const gesamtdauer = problem.pruefschritte.reduce((s, p) => s + p.dauerMinuten, 0);

  return (
    <article>
      {/* Die Dringlichkeitskante trägt die wichtigste Information der Seite
          schon, bevor ein Wort gelesen ist. */}
      <div className={cn("border-t-4", stil.rand)} />

      <Container className="py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            {/* min-w-0: Gitter- und Flex-Kinder schrumpfen ohne das nicht
                unter ihre min-content-Breite — bei einem einzigen langen Wort
                ist das genau die Breite, die aus dem Bildschirm läuft. */}
            <div className="flex items-start gap-4">
              <ProblemSymbol
                kennung={problem.kennung}
                className={cn(
                  "size-14 shrink-0",
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
              </div>
            </div>
            <p className="mt-3 font-mono text-sm text-text-zweit">
              {t("auchGenannt")} {problem.volksmund.join(", ")}
            </p>
          </div>

          <div className="lg:pt-4">
            <ZonenKontur zone={problem.zone} />
          </div>
        </div>

        <div className="mt-8 max-w-[68ch] space-y-10">
          <StufenBlock
            stufe={problem.dringlichkeit}
            handlung={problem.handlung}
            verschaerfung={problem.verschaerfung}
          />

          <Abschnitt titel={t("bedeutung")}>
            <p className="leading-relaxed">{problem.klartext}</p>
          </Abschnitt>

          {problem.verwechslung && (
            <Abschnitt titel={t("verwechslung")}>
              <p className="leading-relaxed">{problem.verwechslung}</p>
            </Abschnitt>
          )}

          <Abschnitt titel={t("ursachen")} zusatz={t("ursachenHinweis")}>
            <ul className="divide-y divide-linie border-y border-linie">
              {problem.ursachen.map((u) => (
                <li key={u.titel} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
                  <p className="flex items-center gap-2 font-mono text-xs text-text-zweit sm:self-start sm:pt-1">
                    <HaeufigkeitsPunkt haeufigkeit={u.haeufigkeit} />
                    {t(u.haeufigkeit)}
                  </p>
                  <div>
                    <p className="font-semibold">{u.titel}</p>
                    <p className="mt-1 leading-relaxed text-text-zweit">{u.erklaerung}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Abschnitt>

          <Abschnitt titel={t("pruefung")}>
            <ol className="divide-y divide-linie border-y border-linie">
              {problem.pruefschritte.map((schritt, i) => (
                <li key={schritt.schritt} className="flex gap-4 py-3">
                  <span className="font-mono text-sm text-text-zweit">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 leading-relaxed">{schritt.schritt}</span>
                  <span className="font-mono text-sm whitespace-nowrap text-text-zweit">
                    {schritt.dauerMinuten} Min
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-right font-mono text-sm text-text-zweit">
              {t("dauerGesamt", { minuten: gesamtdauer })}
            </p>
          </Abschnitt>

          <Abschnitt titel={t("kosten")}>
            <dl className="divide-y divide-linie border-y border-linie">
              <div className="grid gap-1 py-4 sm:grid-cols-[8rem_auto_1fr] sm:items-baseline sm:gap-4">
                <dt className="font-semibold">{t("kostenPruefung")}</dt>
                <dd className="font-mono text-lg">{problem.pruefkosten} €</dd>
                <p className="text-sm text-text-zweit">
                  {problem.pruefkostenHinweis ?? t("kostenPruefungHinweis")}
                </p>
              </div>
              {problem.reparaturSpanne && (
                <div className="grid gap-1 py-4 sm:grid-cols-[8rem_auto_1fr] sm:items-baseline sm:gap-4">
                  <dt className="font-semibold">{t("kostenReparatur")}</dt>
                  <dd className="font-mono text-lg whitespace-nowrap">
                    {problem.reparaturSpanne.von}–{problem.reparaturSpanne.bis} €
                  </dd>
                  <p className="text-sm text-text-zweit">{t("kostenReparaturHinweis")}</p>
                </div>
              )}
            </dl>
            {problem.spannenHinweis && (
              <p className="mt-3 leading-relaxed text-text-zweit">{problem.spannenHinweis}</p>
            )}
          </Abschnitt>

          {/* Der stärkste Vertrauensbeweis der ganzen Seite: die Grenze
              benennen, statt sie zu verschweigen. Für jede Karte eigens
              geschrieben — ein Textbaustein an dieser Stelle wäre das
              Gegenteil dessen, was der Kasten behauptet. */}
          <section className="border border-instrument bg-karte p-5 sm:p-6">
            <h2 className="font-mono text-label tracking-[0.09em] uppercase">{t("grenze")}</h2>
            <p className="mt-3 leading-relaxed">{problem.grenze}</p>
          </section>

          <Handlung problem={problem} />

          <div className="space-y-2 border-t border-linie pt-6 text-sm">
            <p>
              <span className="text-text-zweit">{t("leistung")}: </span>
              <span className="font-medium">{problem.leistung.titel}</span>{" "}
              <span className="font-mono">{problem.leistung.preis}</span>
            </p>
            <p className="text-text-zweit">{t("leistungHinweis")}</p>
            {problem.verwandt.length > 0 && (
              <p className="pt-2">
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
      </Container>
    </article>
  );
}

/**
 * Die Handlung richtet sich nach der Stufe — das ist die zentrale Regel.
 * Ein Terminformular unter einem roten Befund wäre ein Designfehler mit
 * Folgen: Jemand füllt in Ruhe Felder aus, während er nicht weiterfahren darf.
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

/** Gefüllt oder hohl, nicht farbig: Farbe ist auf dieser Seite für
 *  Dringlichkeit reserviert und darf hier nichts bedeuten. */
function HaeufigkeitsPunkt({ haeufigkeit }: { haeufigkeit: Haeufigkeit }) {
  return (
    <svg viewBox="0 0 10 10" className="size-2.5 shrink-0" aria-hidden="true" focusable="false">
      <circle
        cx="5"
        cy="5"
        r="4"
        fill={haeufigkeit === "haeufig" ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        opacity={haeufigkeit === "selten" ? 0.5 : 1}
      />
    </svg>
  );
}
