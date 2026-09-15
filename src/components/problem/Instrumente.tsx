import type { Haeufigkeit, Pruefschritt, Stufe } from "@/data/types";
import { cn } from "@/lib/cn";
import { STUFEN_STIL, StufenSymbol } from "./Stufe";

/**
 * Die vier Darstellungsformen der Problemkarte.
 *
 * Grund für ihre Existenz: Die Karte trägt vier verschiedene Datentypen — ein
 * Urteil, Möglichkeiten mit Gewicht, ein Verfahren mit Dauern und Geld. Bisher
 * sahen alle vier gleich aus (Mono-Label, graue Liste), obwohl sie inhaltlich
 * nichts miteinander zu tun haben. Der Leser musste jeden Absatz lesen, um zu
 * erkennen, was für eine Art Information vor ihm steht.
 *
 * Jeder Baustein hier trägt echte Information. Keiner ist Schmuck.
 */

/** Häufigkeit als Gewicht, nicht als Wort. Drei Segmente = häufig, zwei =
 *  gelegentlich, eines = selten. Damit ist die Wahrscheinlichkeit sichtbar,
 *  bevor ein Wort gelesen ist. Unbunt, weil Farbe hier Dringlichkeit bedeutet
 *  und keine Häufigkeit. */
const GEWICHT: Record<Haeufigkeit, number> = { haeufig: 3, gelegentlich: 2, selten: 1 };

export function Haeufigkeitsskala({ haeufigkeit }: { haeufigkeit: Haeufigkeit }) {
  const gefuellt = GEWICHT[haeufigkeit];
  return (
    <span aria-hidden="true" className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn("block h-2.5 w-4", i < gefuellt ? "bg-instrument" : "bg-linie")}
        />
      ))}
    </span>
  );
}

/** Dauer als Länge. Zehn Minuten sehen kürzer aus als zwanzig — das ist die
 *  ganze Idee, und sie ersetzt das Lesen einer Zahlenspalte. */
export function Zeitachse({
  schritte,
  minutenLabel,
  gesamtLabel,
}: {
  schritte: readonly Pruefschritt[];
  minutenLabel: string;
  gesamtLabel: string;
}) {
  const laengste = Math.max(...schritte.map((s) => s.dauerMinuten));
  const gesamt = schritte.reduce((s, x) => s + x.dauerMinuten, 0);

  return (
    <div>
      <ol className="divide-y divide-linie border-y border-linie">
        {schritte.map((schritt, i) => (
          <li key={schritt.schritt} className="grid gap-2 py-4 sm:grid-cols-[1fr_9rem] sm:gap-6">
            <p className="flex gap-3 leading-relaxed">
              <span className="font-mono text-sm text-text-zweit">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{schritt.schritt}</span>
            </p>
            <p className="flex items-center gap-2.5 sm:justify-end">
              <span
                aria-hidden="true"
                className="block h-2.5 bg-instrument"
                style={{ width: `${Math.round((schritt.dauerMinuten / laengste) * 72)}px` }}
              />
              <span className="font-mono text-sm whitespace-nowrap text-text-zweit">
                {schritt.dauerMinuten} {minutenLabel}
              </span>
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-3 flex items-baseline justify-end gap-2">
        <span className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
          {gesamtLabel}
        </span>
        <span className="font-mono text-zahl-klein font-bold">{gesamt}</span>
        <span className="font-mono text-sm text-text-zweit">{minutenLabel}</span>
      </p>
    </div>
  );
}

/** Ein Betrag in Displaygröße mit kleiner Einheit. Für die Spanne eine Achse
 *  mit beschrifteten Enden statt zweier Zahlen in einer Tabellenzeile: Sie
 *  zeigt, wie weit die Enden auseinanderliegen — die eigentliche Aussage. */
export function Zahlentafel({
  label,
  betrag,
  einheit,
  hinweis,
}: {
  label: string;
  betrag: string;
  einheit: string;
  hinweis?: string;
}) {
  return (
    <div>
      <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">{label}</p>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="font-mono text-zahl font-bold">{betrag}</span>
        <span className="font-mono text-lg text-text-zweit">{einheit}</span>
      </p>
      {hinweis && (
        <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-text-zweit">{hinweis}</p>
      )}
    </div>
  );
}

export function Spannenachse({
  label,
  von,
  bis,
  einheit,
  offen,
}: {
  label: string;
  von: number;
  bis: number;
  einheit: string;
  offen: boolean;
}) {
  return (
    <div>
      <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">{label}</p>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <span className="font-mono text-zahl-klein font-bold">
          {von} <span className="text-base font-normal text-text-zweit">{einheit}</span>
        </span>
        <span className="font-mono text-zahl-klein font-bold">
          {bis}
          {offen && <span className="text-text-zweit">+</span>}{" "}
          <span className="text-base font-normal text-text-zweit">{einheit}</span>
        </span>
      </div>
      {/* Die Achse zeigt die Spannweite, nicht eine Verteilung — eine
          Verteilung hätten wir nicht, und sie zu zeichnen wäre erfunden. */}
      <div aria-hidden="true" className="mt-2 flex items-center">
        <span className="block h-3 w-px bg-instrument" />
        <span className="block h-px flex-1 bg-linie-stark" />
        <span className={cn("block w-px bg-instrument", offen ? "h-2" : "h-3")} />
      </div>
    </div>
  );
}

/**
 * Die Befundtafel — nur auf breiten Schirmen.
 *
 * Sie ist der Grund, warum die zweite Spalte auf dem Desktop überhaupt
 * gerechtfertigt ist: Sie trägt die vier Werte, die über die nächste Handlung
 * entscheiden, an einer Stelle, die beim Scrollen stehen bleibt. Auf Mobil
 * entfällt sie ersatzlos — dort liefert die lineare Reihenfolge dasselbe, und
 * eine Zusammenfassung direkt unter dem Original wäre nur Dopplung.
 *
 * Bewusst ohne eigene Bedienelemente: Ein zweiter Telefonknopf wäre für
 * Tastatur und Screenreader eine Falle. Stattdessen ein Sprung zur Handlung.
 */
export function Befundtafel({
  stufe,
  stufenwort,
  weiterfahren,
  zeilen,
  sprungLabel,
  sprungZiel,
  titel,
}: {
  stufe: Stufe;
  stufenwort: string;
  weiterfahren: string;
  zeilen: readonly { label: string; wert: string }[];
  sprungLabel: string;
  sprungZiel: string;
  titel: string;
}) {
  const stil = STUFEN_STIL[stufe];
  return (
    <aside
      aria-label={titel}
      className="sticky top-24 hidden border border-linie bg-karte lg:block"
    >
      <p className="border-b border-linie bg-instrument px-4 py-2.5 font-mono text-label tracking-[0.09em] text-text-auf-instrument uppercase">
        {titel}
      </p>

      <div className={cn("border-b-4 px-4 py-4", stil.feld, stil.kanteUnten)}>
        <p className="flex items-center gap-2.5">
          <StufenSymbol stufe={stufe} className="size-3.5" />
          <span className={cn("font-semibold uppercase", stil.text)}>{stufenwort}</span>
        </p>
        <p className="mt-1.5 font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
          {weiterfahren}
        </p>
      </div>

      <dl className="divide-y divide-linie">
        {zeilen.map((zeile) => (
          <div key={zeile.label} className="px-4 py-3">
            <dt className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {zeile.label}
            </dt>
            <dd className="mt-0.5 font-mono text-lg font-bold">{zeile.wert}</dd>
          </div>
        ))}
      </dl>

      <a
        href={sprungZiel}
        className="block border-t border-linie px-4 py-3 text-sm font-medium underline decoration-linie-stark underline-offset-4 hover:decoration-instrument"
      >
        {sprungLabel} →
      </a>
    </aside>
  );
}
