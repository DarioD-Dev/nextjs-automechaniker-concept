import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import { Link } from "@/i18n/navigation";
import { WARNLEUCHTEN, SYMPTOME } from "@/data/probleme";
import { STUFEN_RANG, type Problem } from "@/data/types";
import { ProblemSymbol } from "@/components/icons/ProblemSymbol";
import { AufprallIcon, PfeilRechtsIcon } from "@/components/icons/UiIcons";
import { StufenSymbol, useStufenWorte } from "@/components/problem/Stufe";
import { cn } from "@/lib/cn";

/**
 * Der Einstieg — und der Grund, warum die klickbare Fahrzeuggrafik verworfen
 * wurde: Ein Raster aus Warnleuchten beginnt bei dem, was der Kunde
 * tatsächlich hat, nämlich einer Form, die er wiedererkennt. Beschreiben kann
 * er sie nicht, erkennen schon. Eine Fahrzeuggrafik hätte von ihm verlangt,
 * sein Problem vorher selbst einem System zuzuordnen — wüsste er das, bräuchte
 * er die Seite nicht.
 *
 * Rot steht vor Gelb, mit Beschriftung dazwischen. Das ersetzt die ursprünglich
 * geplante Filterleiste: Bei dieser Anzahl ist ein Filter Beschäftigung ohne
 * Nutzen, die Sortierung lehrt dasselbe ohne eine einzige Interaktion.
 */
export async function Finder() {
  const t = await getTranslations("Start");

  const leuchten = [...WARNLEUCHTEN].sort(
    (a, b) => STUFEN_RANG[b.dringlichkeit] - STUFEN_RANG[a.dringlichkeit],
  );

  return (
    <div id="finder" className="scroll-mt-24">
      <h2 className="text-abschnitt font-semibold">{t("leuchtenTitel")}</h2>
      <p className="mt-2 text-text-zweit">{t("leuchtenLegende")}</p>

      {/* Zwei oder vier Spalten, nie drei: Die Sortierung rot-vor-gelb trägt die
          Legende darüber, und bei drei Spalten stünde eine rote Kachel in der
          gelben Reihe. Bei geraden Spaltenzahlen bleiben die beiden Vierer-
          gruppen auf jeder Breite geschlossen. */}
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {leuchten.map((problem) => (
          <li key={problem.kennung}>
            <LeuchtenKachel problem={problem} />
          </li>
        ))}
      </ul>

      <h2 className="mt-14 text-abschnitt font-semibold">{t("symptomeTitel")}</h2>
      <p className="mt-2 text-text-zweit">{t("symptomeLead")}</p>

      {/* Linien und Hoverfläche stehen 12 bzw. 16px weiter außen als der Text.
          Bündig war die aktive Zeile ein markierter Textblock statt einer
          Zeile, die auf den Zeiger reagiert. */}
      <ul className="mt-6 -mx-3 divide-y divide-linie border-y border-linie sm:-mx-4">
        {SYMPTOME.map((problem) => (
          <li key={problem.kennung}>
            <SymptomZeile problem={problem} />
          </li>
        ))}
      </ul>

      {/* Der dritte Einstieg. Er führt bewusst NICHT auf eine Problemkarte:
          Beim Unfall ist die Ursache bekannt und die Kosten trägt im Idealfall
          eine Versicherung — zwei Kartenfelder, die dort brechen würden. */}
      <h2 className="mt-14 text-abschnitt font-semibold">{t("unfallTitel")}</h2>

      {/* Dieselbe Zeilenform wie die Symptome darüber, nur mit stärkerer
          Oberkante und größerem Zeichen. Vorher war das ein gerahmter Kasten
          aus der ersten Fassung — als einziges Element des Finders, und
          damit die Stelle, an der die Seite nach Baukasten aussah. */}
      <Link
        href="/unfall"
        className="group relative mt-6 -mx-3 flex items-center gap-4 border-y border-linie-stark px-3 py-5 transition-colors before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:origin-top before:scale-y-0 before:bg-akzent before:transition-transform hover:bg-karte hover:before:scale-y-100 focus-visible:bg-karte focus-visible:before:scale-y-100 sm:-mx-4 sm:px-4"
      >
        <AufprallIcon className="size-10 shrink-0 text-text-zweit transition-colors group-hover:text-titel" />
        <span className="min-w-0 flex-1 text-lead leading-relaxed">{t("unfallLead")}</span>
        <span aria-hidden="true" className="kw-pfeil-schacht shrink-0">
          <PfeilRechtsIcon className="kw-pfeil-quer size-5 shrink-0 text-text-zweit" />
        </span>
      </Link>
    </div>
  );
}

function LeuchtenKachel({ problem }: { problem: Problem }) {
  const rot = problem.leuchtfarbe === "rot";

  return (
    <Link
      href={{ pathname: "/problem/[kennung]", params: { kennung: problem.kennung } }}
      // Die Kachelfläche flackert beim Laden, das Symbol behält seine echte
      // Leuchtenfarbe. Die Variablen füttern die Animation in globals.css.
      style={
        {
          "--selbsttest-farbe": rot ? "var(--stufe-sofort)" : "var(--stufe-bald)",
          "--selbsttest-feld": rot ? "var(--stufe-sofort-feld)" : "var(--stufe-bald-feld)",
        } as CSSProperties
      }
      /* Beim Überfahren nimmt die Kachel die Farbe an, die ihre Leuchte
         wirklich hat — Rot für „anhalten", Gelb für „bald prüfen lassen".
         Das ist der eine Ort, an dem eine Informationsfarbe auf Hover
         reagieren darf: Sie sagt hier dasselbe wie im Cockpit. */
      className={cn(
        "kw-selbsttest flex h-full flex-col items-center gap-2 border border-linie bg-karte px-3 py-5 text-center transition-colors",
        rot
          ? "hover:border-sofort hover:bg-sofort-feld focus-visible:border-sofort focus-visible:bg-sofort-feld"
          : "hover:border-bald hover:bg-bald-feld focus-visible:border-bald focus-visible:bg-bald-feld",
      )}
    >
      <ProblemSymbol
        kennung={problem.kennung}
        className={rot ? "size-11 text-sofort" : "size-11 text-bald"}
      />
      <span className="text-sm font-semibold leading-snug">{problem.titel}</span>
      <span className="font-mono text-xs leading-snug text-text-zweit">{problem.volksmund[0]}</span>
    </Link>
  );
}

function SymptomZeile({ problem }: { problem: Problem }) {
  const worte = useStufenWorte()(problem.dringlichkeit);

  return (
    <Link
      href={{ pathname: "/problem/[kennung]", params: { kennung: problem.kennung } }}
      className="group relative flex items-center gap-4 px-3 py-4 transition-colors before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:origin-top before:scale-y-0 before:bg-akzent before:transition-transform hover:bg-karte hover:before:scale-y-100 focus-visible:bg-karte focus-visible:before:scale-y-100 sm:px-4"
    >
      <ProblemSymbol
        kennung={problem.kennung}
        className="size-8 shrink-0 text-text-zweit transition-colors group-hover:text-titel"
      />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{problem.titel}</span>
        <span className="mt-0.5 flex items-center gap-1.5 font-mono text-xs text-text-zweit">
          <StufenSymbol stufe={problem.dringlichkeit} className="size-2.5" />
          {worte.wort}
        </span>
      </span>
      <span aria-hidden="true" className="kw-pfeil-schacht shrink-0">
        <PfeilRechtsIcon className="kw-pfeil-quer size-5 shrink-0 text-text-zweit" />
      </span>
    </Link>
  );
}
