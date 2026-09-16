import { cn } from "@/lib/cn";

/**
 * Ein Preis ist auf dieser Seite selten nur eine Zahl. In den Daten steht er
 * als ein Stück Text — „89 €", „ab 229 €", „69 € je Saison", „kostenlos" —,
 * und genau diese Unterschiede sind Information: ein Festpreis, ein Ab-Preis,
 * ein Preis je Zeitraum, gar kein Preis.
 *
 * Gesetzt wird deshalb nicht der String, sondern seine Teile. Der Betrag ist
 * groß und behält seine rechte Kante; der Vorbehalt wird klein danebengesetzt.
 * Sonst hat „ab" dasselbe Gewicht wie die Zahl und verschiebt sie zugleich aus
 * der Spalte — dann kann man eine Preisliste nicht mehr am Rand entlanglesen.
 */
type Teile = {
  /** „ab" — steht vor dem Betrag und relativiert ihn. */
  vorsatz?: string;
  /** „229 €", „180–320 €" — das, was verglichen wird. */
  betrag?: string;
  /** „je Saison" — bezieht den Betrag auf etwas. */
  nachsatz?: string;
  /** „kostenlos", „ohne Aufpreis" — kein Betrag, also auch keine große Zahl. */
  wort?: string;
};

const MUSTER = /^(ab\s+)?([\d.,–-]+\s*€)(\s+.+)?$/;

export function zerlegePreis(preis: string): Teile {
  const treffer = MUSTER.exec(preis);
  if (!treffer) return { wort: preis };
  return { vorsatz: treffer[1]?.trim(), betrag: treffer[2], nachsatz: treffer[3]?.trim() };
}

/**
 * Nachsatz und Dauer stehen auf derselben zweiten Zeile: Beide sagen, worauf
 * sich der Betrag bezieht, und beide sind kleiner als er.
 */
export function preisZusatz(preis: string, dauer?: string) {
  const { nachsatz } = zerlegePreis(preis);
  return [nachsatz, dauer].filter(Boolean).join(" · ");
}

export function Preis({ preis, className }: { preis: string; className?: string }) {
  const { vorsatz, betrag, wort } = zerlegePreis(preis);

  /* „kostenlos" in 32px wäre eine Zahl, die keine ist. Ein Wort bekommt die
     Form eines Worts — und bleibt trotzdem in derselben Spalte. */
  if (wort) {
    return (
      <span className="font-mono text-sm font-bold tracking-[0.08em] text-titel uppercase sm:text-base">
        {wort}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "font-mono leading-none font-bold whitespace-nowrap text-titel tabular-nums [word-spacing:-0.22em]",
        className,
      )}
    >
      {vorsatz && (
        <span className="mr-1 align-[0.42em] text-[0.42em] font-medium tracking-[0.1em] text-text-zweit uppercase">
          {vorsatz}
        </span>
      )}
      {betrag}
    </span>
  );
}
