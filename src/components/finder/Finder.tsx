import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import { Link } from "@/i18n/navigation";
import { WARNLEUCHTEN, SYMPTOME } from "@/data/probleme";
import { STUFEN_RANG, type Problem } from "@/data/types";
import { ProblemSymbol } from "@/components/icons/ProblemSymbol";
import { PfeilRechtsIcon } from "@/components/icons/UiIcons";
import { StufenSymbol, useStufenWorte } from "@/components/problem/Stufe";

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

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {leuchten.map((problem) => (
          <li key={problem.kennung}>
            <LeuchtenKachel problem={problem} />
          </li>
        ))}
      </ul>

      <h2 className="mt-14 text-abschnitt font-semibold">{t("symptomeTitel")}</h2>
      <p className="mt-2 text-text-zweit">{t("symptomeLead")}</p>

      <ul className="mt-6 divide-y divide-linie border-y border-linie">
        {SYMPTOME.map((problem) => (
          <li key={problem.kennung}>
            <SymptomZeile problem={problem} />
          </li>
        ))}
      </ul>
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
      className="kw-selbsttest flex h-full flex-col items-center gap-2 border border-linie bg-karte px-3 py-5 text-center transition-colors hover:border-instrument"
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
      className="group flex items-center gap-4 py-4 transition-colors hover:bg-karte"
    >
      <ProblemSymbol kennung={problem.kennung} className="size-8 shrink-0 text-text-zweit" />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{problem.titel}</span>
        <span className="mt-0.5 flex items-center gap-1.5 font-mono text-xs text-text-zweit">
          <StufenSymbol stufe={problem.dringlichkeit} className="size-2.5" />
          {worte.wort}
        </span>
      </span>
      <PfeilRechtsIcon className="size-5 shrink-0 text-text-zweit transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
