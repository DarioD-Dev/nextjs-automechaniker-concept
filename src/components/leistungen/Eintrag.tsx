import { Link } from "@/i18n/navigation";
import { type LeistungsEintrag } from "@/data/leistungen";
import { PfeilRechtsIcon } from "@/components/icons/UiIcons";
import { Preis, preisZusatz } from "@/components/ui/Preis";
import { StufenMarke } from "@/components/leistungen/StufenMarke";

/**
 * Eine Zeile der Tafel. Name links, Betrag rechts — beide auf einer
 * gemeinsamen Grundlinie, damit die große Zahl keine eigene Zeile kostet.
 * Darunter, auf derselben Logik: Satz links, Dauer rechts.
 */
export function Eintrag({
  eintrag,
  mehr,
  unfall,
}: {
  eintrag: LeistungsEintrag;
  mehr: string;
  unfall: string;
}) {
  const zusatz = preisZusatz(eintrag.preis, eintrag.dauer);
  const weiter = eintrag.ziel ? unfall : eintrag.detail ? mehr : null;

  const inhalt = (
    <>
      <p className="col-start-1 row-start-1 flex flex-wrap items-center gap-2 text-block font-semibold text-titel">
        {eintrag.titel}
        <StufenMarke art={eintrag.art} />
      </p>

      {/* Die rechte Kante der Tafel ist die Preisspalte. Rechtsbündig stehen
          die Eurozeichen untereinander; „89" und „ab 229" enden auf derselben
          Linie und sind damit vergleichbar.

          26px, nicht 45px wie auf der Startseite: Dort ist der Preis die
          Aussage des Abschnitts, hier ist er eine Spalte unter zwölf Zeilen.
          Bei 45px wäre jede Zeile ein halber Bildschirm — eine Kette von
          Preisboxen statt einer Tafel. Die Zahl bleibt trotzdem das Größte
          der Zeile und hält die Zeilenhöhe der alten Liste. */}
      <p className="col-start-2 row-start-1 text-right leading-none">
        <Preis
          preis={eintrag.preis}
          className="text-[clamp(1.25rem,1.05rem+0.6vw,1.625rem)] transition-colors group-hover:text-instrument-hell"
        />
      </p>

      {/* Auf dem Telefon steht der Zusatz unter dem Preis und der Satz über
          die volle Breite. Stünde er neben dem Satz, hielte „ca. 45 Minuten"
          die Spalte auf 100px auf und der Satz bräche auf fünf statt drei
          Zeilen um — die Zeile wäre allein deshalb ein Drittel höher. */}
      {zusatz && (
        <p className="col-start-2 row-start-2 text-right font-mono text-xs whitespace-nowrap text-text-zweit">
          {zusatz}
        </p>
      )}

      <div className="col-span-2 row-start-3 sm:col-span-1 sm:col-start-1 sm:row-start-2">
        <p className="max-w-[60ch] leading-relaxed text-text-zweit">{eintrag.satz}</p>
        {weiter && (
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm underline decoration-linie-stark underline-offset-4 transition-colors group-hover:decoration-instrument">
            {weiter}
            <span aria-hidden="true" className="kw-pfeil-schacht">
              <PfeilRechtsIcon className="kw-pfeil-quer size-4" />
            </span>
          </p>
        )}
      </div>
    </>
  );

  /* -mx/px: Die Zeile reicht bis an die Kanten der weißen Tafel, der Text
     bleibt wo er war. Ohne das klebte die Hoverfläche direkt an Schrift und
     Pfeil — sie sah aus, als wäre der Text markiert, nicht die Zeile aktiv. */
  const raster =
    "-mx-5 grid grid-cols-[1fr_auto] items-baseline gap-x-5 gap-y-1.5 px-5 py-5 sm:-mx-8 sm:gap-x-10 sm:px-8";

  if (eintrag.ziel) {
    return (
      <Link href={eintrag.ziel} className={`group ${raster} ${HOVER_ZEILE}`}>
        {inhalt}
      </Link>
    );
  }

  if (eintrag.detail) {
    return (
      <Link
        href={{ pathname: "/leistungen/[slug]", params: { slug: eintrag.slug } }}
        className={`group ${raster} ${HOVER_ZEILE}`}
      >
        {inhalt}
      </Link>
    );
  }

  return <div className={raster}>{inhalt}</div>;
}

/* Beim Überfahren tritt die Zeile aus der Tafel heraus: Der warme Grund
   kommt zurück, und links wächst eine Kante in Akzentfarbe — dieselbe
   Bewegung, die eine Zeile auf Papier bekommt, wenn man sie mit dem Finger
   nachfährt. Kein Schatten, kein Zoom. */
const HOVER_ZEILE =
  "relative transition-colors before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:origin-top before:scale-y-0 before:bg-akzent before:transition-transform hover:bg-grund hover:before:scale-y-100 focus-visible:bg-grund focus-visible:before:scale-y-100";
