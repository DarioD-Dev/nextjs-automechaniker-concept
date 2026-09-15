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

export function Haeufigkeitsskala({
  haeufigkeit,
  wort,
}: {
  haeufigkeit: Haeufigkeit;
  wort: string;
}) {
  const gefuellt = GEWICHT[haeufigkeit];
  return (
    // Balken und Wort immer in einer Zeile, auf jeder Breite gleich: So
    // erklärt sich die Skala selbst. Stand der Balken über dem Wort, musste
    // man ihn erst entschlüsseln.
    <p className="flex items-center gap-2.5">
      <span aria-hidden="true" className="flex shrink-0 gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn("block h-2.5 w-3.5", i < gefuellt ? "bg-instrument" : "bg-linie")}
          />
        ))}
      </span>
      <span className="font-mono text-xs text-text-zweit">{wort}</span>
    </p>
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
          <li key={schritt.schritt} className="grid gap-2 py-4 sm:grid-cols-[1fr_11rem] sm:gap-6">
            <p className="flex gap-3 leading-relaxed">
              <span className="font-mono text-sm text-text-zweit">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{schritt.schritt}</span>
            </p>
            {/* Gemeinsame Nulllinie: Die Balken beginnen alle links an
                derselben Kante. Rechtsbündig ausgerichtet waren sie nicht
                vergleichbar — und damit war der Balken Dekoration. */}
            <p className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="block h-2.5 shrink-0 bg-instrument"
                style={{ width: `${Math.round((schritt.dauerMinuten / laengste) * 88)}px` }}
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
      <p className="font-mono text-label tracking-[0.09em] text-titel uppercase">{label}</p>
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

/** Die Spanne als EINE gesetzte Zahl, nicht als Achse mit zwei Enden.
 *  Die frühere Achse sah aus wie ein Regler — eine falsche Affordanz auf einer
 *  Seite, deren Versprechen lautet, nichts vorzutäuschen. */
export function Spanne({
  label,
  von,
  bis,
  einheit,
  offen,
  offenLabel,
}: {
  label: string;
  von: number;
  bis: number;
  einheit: string;
  offen: boolean;
  offenLabel: string;
}) {
  return (
    <div>
      <p className="font-mono text-label tracking-[0.09em] text-titel uppercase">{label}</p>
      <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
        <span className="font-mono text-zahl font-bold whitespace-nowrap">
          {von}–{bis}
        </span>
        <span className="font-mono text-lg text-text-zweit">{einheit}</span>
      </p>
      {offen && (
        <p className="mt-2 font-mono text-xs tracking-[0.06em] text-text-zweit uppercase">
          {offenLabel}
        </p>
      )}
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
        className="block border-t border-linie px-4 py-3 text-sm font-medium underline decoration-akzent decoration-2 underline-offset-4"
      >
        {sprungLabel} →
      </a>
    </aside>
  );
}
