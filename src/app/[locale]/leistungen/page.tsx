import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { assertLocale } from "@/i18n/locale";
import { buildAlternates } from "@/lib/seo";
import { LEISTUNGEN, type Ehrlichkeitsstufe, type LeistungsEintrag } from "@/data/leistungen";
import { WERKSTATT } from "@/data/werkstatt";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";
import { PfeilRechtsIcon } from "@/components/icons/UiIcons";
import { Preis, preisZusatz } from "@/components/ui/Preis";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/leistungen">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Leistungen" });
  return {
    title: t("titel"),
    description: t("lead"),
    alternates: buildAlternates("/leistungen", locale),
  };
}

export default async function LeistungenSeite({ params }: PageProps<"/[locale]/leistungen">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("Leistungen");
  // Die drei Zusagen stehen im Start-Namensraum. Sie hier zu wiederholen wäre
  // eine zweite Wahrheit — also werden sie von dort gelesen.
  const tStart = await getTranslations("Start");

  const stufen = [
    { art: "fest", name: t("stufeFest"), text: t("stufeFestText") },
    { art: "spanne", name: t("stufeSpanne"), text: t("stufeSpanneText") },
    { art: "nachBefund", name: t("stufeNachBefund"), text: t("stufeNachBefundText") },
    { art: "kostenlos", name: t("stufeKostenlos"), text: t("stufeKostenlosText") },
  ] as const;

  return (
    <article>
      <Container className="max-w-[62rem] pt-10 pb-8 sm:pt-14">
        <h1 className="text-hero font-bold">{t("titel")}</h1>
        <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">{t("lead")}</p>
      </Container>

      {/* Die Ehrlichkeitsstufen stehen VOR dem Katalog. Sie sind der Grund,
          warum dort überhaupt Preise stehen können: Was nicht festpreisfähig
          ist, wird als das ausgewiesen, was es ist — statt wegzubleiben. */}
      <Section className="border-y border-linie">
        <Container className="max-w-[62rem]">
          <AbschnittsLabel nummer="01">{t("stufenLabel")}</AbschnittsLabel>
          <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {stufen.map((s) => (
              <div key={s.art} className="flex gap-3">
                <StufenMarke art={s.art} />
                <div>
                  <dt className="font-semibold">{s.name}</dt>
                  <dd className="mt-1 leading-relaxed text-text-zweit">{s.text}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-[62rem]">
          <AbschnittsLabel nummer="02">{t("katalogLabel")}</AbschnittsLabel>

          {/* FORM B — DIE PREISTAFEL
              Ein Katalog besteht aus vergleichbaren Posten. Vorher stand der
              Betrag klein rechts als Randnotiz — dabei ist er das, wonach
              gesucht wird. Jetzt trägt er die zweitgrößte Schriftgröße der
              Seite und behält eine harte rechte Kante: Man kann die Tafel am
              Rand entlanglesen, ohne einen einzigen Namen zu lesen.

              Betrag rechts, Name links — nicht umgekehrt wie im Prototyp. Die
              Positionsspalte links kostete eine eigene Spalte, einen Abstand
              und ein 85px-Loch vor kurzen Beträgen, und die Nummern begannen
              in jeder Gruppe wieder bei 01. Eine Ordnungszahl, die nichts
              ordnet, ist Dekoration.

              Name und Betrag teilen sich eine Zeile auf gemeinsamer
              Grundlinie. Dadurch ist die Zeile trotz der großen Zahl so hoch
              wie vorher — bei zwölf Einträgen ist das der Unterschied
              zwischen einer Tafel und einer Kette von Preisboxen.

              Weiße Fläche gegen den warmen Grund: Die Tafel ist ein eigenes
              Objekt, keine Sammlung gerahmter Karten. */}
          <div className="mt-8 -mx-5 bg-karte px-5 py-8 sm:-mx-8 sm:px-8 sm:py-10">
            <div className="space-y-10">
              {LEISTUNGEN.map((gruppe) => (
                <section key={gruppe.titel}>
                  <h2 className="text-abschnitt font-semibold text-titel">{gruppe.titel}</h2>
                  {/* Starke Oberkante, feine Trennlinien: der Gruppenkopf
                      einer Tafel, nicht der Rahmen einer Karte. */}
                  <ul className="mt-5 border-t border-linie-stark">
                    {gruppe.eintraege.map((eintrag) => (
                      <li
                        key={eintrag.slug}
                        id={eintrag.slug}
                        className="scroll-mt-20 border-b border-linie"
                      >
                        <Eintrag
                          eintrag={eintrag}
                          mehr={t("mehrDazu")}
                          unfall={t("zurUnfallseite")}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>

          <p className="mt-10 max-w-[62ch] leading-relaxed text-text-zweit">{t("fehlt")}</p>
        </Container>
      </Section>

      {/* Zwei Zahlen — die beiden Beträge, die für jede Position auf jeder
          Rechnung gelten. Ohne Rahmen: Zwei Karten nebeneinander sähen aus
          wie zwei Angebote, dabei sind es zwei Konstanten. Die Fuge zwischen
          ihnen ist eine Linie, kein Abstand. */}
      <Section className="border-t border-linie">
        <Container className="max-w-[62rem]">
          <AbschnittsLabel nummer="03">{t("zahlenLabel")}</AbschnittsLabel>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-0">
            <Konstante
              titel={t("stundensatz")}
              betrag={`${WERKSTATT.stundensatz} €`}
              text={t("stundensatzText")}
            />
            <Konstante
              titel={t("diagnose")}
              betrag={`${WERKSTATT.diagnosepauschale} €`}
              text={t("diagnoseText")}
              className="border-linie sm:border-l sm:pl-8"
            />
          </div>
        </Container>
      </Section>

      {/* FORM A — DAS DUNKLE STATEMENT
          Die drei Zusagen sind das einzige auf dieser Seite, das keine Zahl,
          keine Dauer und keinen Umfang hat. Sie sind Aussagen — und stehen
          deshalb als einziger Abschnitt der Seite auf der Markenfläche.
          Einmal pro Seite: Der Katalog darüber lebt davon, dass diese Fläche
          nicht noch einmal vorkommt. */}
      <section className="bg-instrument text-text-auf-instrument">
        <Container className="max-w-[62rem] py-14 sm:py-16 lg:py-20">
          <p className="font-mono text-label tracking-[0.09em] text-white/70 uppercase">
            {tStart("zusagenTitel")} / 04
          </p>
          <ol className="mt-8 divide-y divide-white/15 border-y border-white/15">
            {[tStart("zusage1"), tStart("zusage2"), tStart("zusage3")].map((zusage, i) => (
              <li key={zusage} className="flex items-baseline gap-5 py-5 sm:gap-8">
                {/* Weiß/45 misst 3,6:1 auf der Markenfläche — schwächer und
                    die Zahl wäre unter der Schwelle für Großtext. */}
                <span className="font-mono text-2xl font-bold text-white/45 sm:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[clamp(1.125rem,1rem+0.7vw,1.5rem)] leading-snug font-medium">
                  {zusage}
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </article>
  );
}

/**
 * Eine Zeile der Tafel. Name links, Betrag rechts — beide auf einer
 * gemeinsamen Grundlinie, damit die große Zahl keine eigene Zeile kostet.
 * Darunter, auf derselben Logik: Satz links, Dauer rechts.
 */
function Eintrag({
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

/** Vier Formen statt vier Farben: Rot, Gelb und Blau tragen auf dieser Seite
 *  Dringlichkeit und dürfen hier nichts bedeuten. */
function StufenMarke({ art }: { art: Ehrlichkeitsstufe }) {
  return (
    <svg viewBox="0 0 12 12" className="size-2.5 shrink-0 text-text-zweit" aria-hidden="true">
      {art === "fest" && <rect x="1" y="1" width="10" height="10" fill="currentColor" />}
      {art === "spanne" && (
        <rect
          x="1"
          y="1"
          width="10"
          height="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      )}
      {art === "nachBefund" && (
        <circle
          cx="6"
          cy="6"
          r="4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="2.4 2"
        />
      )}
      {art === "kostenlos" && <circle cx="6" cy="6" r="5" fill="currentColor" />}
    </svg>
  );
}

function Konstante({
  titel,
  betrag,
  text,
  className,
}: {
  titel: string;
  betrag: string;
  text: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">{titel}</p>
      <p className="mt-3 leading-none">
        <Preis preis={betrag} className="text-zahl" />
      </p>
      <p className="mt-4 max-w-[46ch] leading-relaxed text-text-zweit">{text}</p>
    </div>
  );
}
