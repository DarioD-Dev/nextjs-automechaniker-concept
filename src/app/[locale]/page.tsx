import { getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";
import { Finder } from "@/components/finder/Finder";
import { ABLAUF, PERSONEN, WERKSTATT } from "@/data/werkstatt";
import { findeLeistung } from "@/data/leistungen";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { PfeilRechtsIcon } from "@/components/icons/UiIcons";
import { Preis, preisZusatz } from "@/components/ui/Preis";

export default async function Startseite({ params }: PageProps<"/[locale]">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("Start");

  return (
    <>
      {/* Der Einstieg ist bewusst ruhig: eine Frage, ein Satz, eine Handlung.
          Die Informationsdichte beginnt erst darunter mit dem Finder — der
          Besucher soll erst ankommen und dann arbeiten.

          Keine Dringlichkeitsfarben hier: Rot, Gelb und Blau bedeuten den
          Zustand eines Fahrzeugs. Über ein Fahrzeug, das wir nicht kennen,
          sagen wir im Einstieg nichts. */}
      {/* ── Der Hero ──────────────────────────────────────────────────────
          Drei gestalterische Entscheidungen, mehr nicht:

          1. DAS FOTO LIEGT UNTER DEM PAPIER. Es läuft über die volle Höhe und
             randlos nach rechts, und seine linke Kante löst sich über eine
             Maske in den Off-White-Grund auf. Dadurch endet es nicht als
             Bildhälfte, sondern taucht aus der Fläche auf. Kein Verlauf über
             dem Bild — maskiert wird das Bild selbst, sonst entstünde ein
             grauer Schleier statt eines Übergangs.

          2. DER FIKTIONSHINWEIS STEHT IM MARKENBAND, waagerecht, neben dem
             Claim. Das Band schließt den ersten Bildschirm ab und ist die
             einzige Stelle, an der beide Sätze hingehören: was wir tun und
             woran man hier ist.

          Die Maße sind gerechnet, nicht geschätzt: Bei 50 vw Breite über die
          volle Höhe zeigt `object-cover` 58 % der Bildbreite. Genau dort endet
          die Karosserie. Säule (62 %) und Absaugschlauch (74 %) bleiben
          draußen — die beiden unruhigsten Stellen des Originals. */}
      <section className="relative flex min-h-[calc(100svh-3.75rem)] flex-col overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[50vw] lg:block"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 26%, rgba(0,0,0,0.85) 54%, #000 72%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 26%, rgba(0,0,0,0.85) 54%, #000 72%)",
          }}
        >
          <Image
            src="/bilder/werkstatt-hebebuehne.jpg"
            alt={t("bildAlt")}
            fill
            priority
            /* Unterhalb von 1024px ist dieses Bild display:none — ohne die
               Medienbedingung lädt der Browser trotzdem eine 50vw-Variante
               und legt einen Preload dafür an, der nie gebraucht wird. */
            sizes="(min-width: 64rem) 50vw, 1px"
            className="object-cover object-left"
          />
        </div>

        <Container className="relative flex flex-1 flex-col justify-center py-16 sm:py-24">
          <p className="font-mono text-label tracking-[0.09em] text-titel uppercase">
            {t("ortLabel")} {WERKSTATT.plz} {WERKSTATT.ort}
          </p>

          {/* hyphens-none: Die globale Trennregel ist für Fachkomposita gedacht
              („Motorkontrollleuchte"). Hier trennte sie „Ih-rem" — im
              Markenmoment ist das der teuerste mögliche Umbruch.

              Die Überschrift darf jetzt in die Maskenzone hineinlaufen: Das
              Bild liegt dahinter und ist dort noch fast vollständig Papier. */}
          <h1 className="mt-6 max-w-[13ch] text-marke font-bold text-titel hyphens-none lg:max-w-[11ch]">
            {t("titel")}
          </h1>

          <p className="mt-8 max-w-[44ch] text-lead leading-relaxed text-text-zweit lg:max-w-[38ch]">
            {t("lead")}
          </p>

          {/* Genau eine Handlung. Sie führt nicht weg, sondern weiter: in den
              Finder direkt darunter. Die Linie darunter zieht den Blick dorthin. */}
          <a
            href="#finder"
            className="group mt-10 inline-flex w-fit items-center gap-3 rounded-sm bg-akzent px-6 py-4 text-base font-bold text-text transition-[background-color,color,transform] hover:-translate-y-px hover:bg-instrument hover:text-text-auf-instrument active:translate-y-0"
          >
            {t("heroCta")}
            {/* Der Pfeil zeigt nach unten, weil die Handlung nach unten führt
                — in den Finder direkt darunter. Beim Überfahren läuft er
                einmal durch: unten hinaus, oben wieder herein. */}
            <span aria-hidden="true" className="kw-pfeil-schacht">
              <PfeilRechtsIcon className="kw-pfeil-ab size-5 rotate-90" />
            </span>
          </a>
        </Container>

        {/* Mobil dasselbe Prinzip um 90 Grad gedreht: Das Bild sitzt unten und
            löst sich nach oben ins Papier auf. */}
        <div
          className="pointer-events-none relative mt-auto h-64 w-full sm:h-72 lg:hidden"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 30%, #000 62%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 30%, #000 62%)",
          }}
        >
          <Image
            src="/bilder/werkstatt-hebebuehne.jpg"
            alt={t("bildAlt")}
            fill
            priority
            sizes="(min-width: 64rem) 1px, 100vw"
            className="object-cover object-[16%_center]"
          />
        </div>

        {/* Der Markensatz schließt den ersten Bildschirm ab und trennt ihn von
            der Informationsebene darunter. */}
        <div className="relative bg-instrument">
          <Container className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
            <p className="font-mono text-label tracking-[0.09em] text-text-auf-instrument uppercase">
              {WERKSTATT.zeile}
            </p>
            {/* Waagerecht und auf jeder Breite: Senkrecht an der Bildkante war
                der Hinweis zwar die Zeitschriftenkonvention, aber ausgerechnet
                die Fiktionsangabe soll man nicht mit gedrehtem Kopf lesen
                müssen. Im Markenband steht sie neben dem Claim — beide sagen,
                woran man hier ist. */}
            <p className="font-mono text-[0.6875rem] tracking-[0.06em] text-white/70">
              {t("bildCaption")}
            </p>
          </Container>
        </div>
      </section>

      <Container className="pb-abschnitt sm:pb-abschnitt-lg">
        <div className="mt-10">
          <Finder />
        </div>
      </Container>

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

      {/* FORM A — DAS DUNKLE STATEMENT
          Dieser Abschnitt ist keine Information, die man nachschlägt, sondern
          eine Aussage. Er hat als einziger Abschnitt der Startseite keine
          Liste, keine Zahl und keine Karte: eine große Fläche, ein Satz.

          Deshalb randlos in der Markenfarbe — der eine dunkle Moment der
          Seite. Und deshalb asymmetrisch: Die Aussage steht groß links, die
          Erklärung schmal rechts. Ein zentrierter Block wäre eine Anzeige;
          so ist es eine Aussage mit Begründung daneben. Beide Spalten
          beginnen auf derselben Oberkante — unten ausgerichtet schwebte die
          Erklärung über der Aussage und ließ links ein Loch stehen.

          Kein orangenes Quadrat vor dem Label: Es markierte hier nichts,
          sondern saß nur davor. Orange bleibt den Stellen vorbehalten, an
          denen es etwas bezeichnet — den Stationen der Prozesskette, der
          Haupthandlung und der Kante, die beim Überfahren wächst. */}
      <section className="bg-instrument text-text-auf-instrument">
        <Container className="py-20 sm:py-28 lg:py-36">
          <p className="font-mono text-label tracking-[0.09em] text-white/70 uppercase">
            {t("grenzeLabel")} / 02
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-20">
            <h2 className="max-w-[16ch] text-[clamp(2rem,1.2rem+3.2vw,3.5rem)] leading-[1.08] font-bold tracking-[-0.03em] hyphens-none">
              {t("grenzeTitel")}
            </h2>
            <div className="max-w-[46ch] space-y-4 leading-relaxed text-white/80">
              <p>{t("grenzeAbsatz1")}</p>
              <p>{t("grenzeAbsatz2")}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Zwei Zahlen ohne Rahmen. Zwei gerahmte Karten nebeneinander sähen
          aus wie zwei Angebote — es sind aber zwei Konstanten, die für jede
          Position auf jeder Rechnung gelten. Die Fuge dazwischen ist eine
          Linie, kein Abstand. */}
      <Section className="border-t border-linie">
        <Container>
          <AbschnittsLabel nummer="03">{t("preiseLabel")}</AbschnittsLabel>

          <div className="kw-auf-reihe mt-8 grid gap-8 sm:grid-cols-2 sm:gap-0">
            <Konstante
              titel={t("diagnoseTitel")}
              betrag={`${WERKSTATT.diagnosepauschale} €`}
              text={t("diagnoseText")}
            />
            <Konstante
              titel={t("stundensatzTitel")}
              betrag={`${WERKSTATT.stundensatz} €`}
              text={t("stundensatzText")}
              className="border-linie sm:border-l sm:pl-8"
            />
          </div>

          <h3 className="mt-14 font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
            {t("zusagenTitel")}
          </h3>
          <ul className="mt-4 divide-y divide-linie border-y border-linie">
            {[t("zusage1"), t("zusage2"), t("zusage3")].map((zusage, i) => (
              <li key={zusage} className="flex items-baseline gap-4 py-4">
                <span className="font-mono text-sm text-text-zweit">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lead font-medium">{zusage}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* FORM C — DIE PROZESSKETTE, KURZFASSUNG
          Dieselbe Form wie auf der Werkstattseite, aber mit den kurzen
          Sätzen: Der volle Wortlaut stand vorher hier und dort wortgleich.
          Wer mehr wissen will, geht auf die Werkstattseite — dafür steht der
          Verweis darunter. */}
      <Section className="border-t border-linie bg-karte">
        <Container>
          <AbschnittsLabel nummer="04">{t("ablaufLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("ablaufTitel")}</h2>

          <ol className="kw-kette mt-10 grid md:grid-cols-2 md:gap-y-12 lg:grid-cols-4 lg:gap-y-0">
            {ABLAUF.map((schritt) => (
              <li
                key={schritt.nummer}
                className="pb-10 pl-6 last:pb-0 md:pt-8 md:pr-8 md:pb-0 md:pl-0"
              >
                <span aria-hidden="true" className="kw-marke bg-akzent" />
                <p className="font-mono text-label tracking-[0.09em] text-titel uppercase">
                  {schritt.label}
                </p>
                <p className="mt-3 font-mono text-[clamp(2.25rem,1.6rem+2vw,3rem)] leading-none font-bold text-titel/60">
                  {schritt.nummer}
                </p>
                <p className="mt-4 max-w-[42ch] leading-relaxed">{schritt.kurz}</p>
              </li>
            ))}
          </ol>

          <Link
            href="/werkstatt"
            className="group mt-10 -my-1 inline-flex items-center gap-1.5 py-1 text-sm font-medium underline decoration-linie-stark underline-offset-4 transition-colors hover:decoration-instrument"
          >
            {t("ablaufMehr")}
            <span aria-hidden="true" className="kw-pfeil-schacht">
              <PfeilRechtsIcon className="kw-pfeil-quer size-4" />
            </span>
          </Link>
        </Container>
      </Section>

      <Section className="border-t border-linie">
        <Container>
          <AbschnittsLabel nummer="05">{t("menschenLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("menschenTitel")}</h2>

          <ul className="kw-auf-reihe mt-8 grid gap-6 sm:grid-cols-3">
            {PERSONEN.map((person) => (
              <li key={person.name}>
                <p
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-full bg-instrument font-mono text-sm font-bold text-text-auf-instrument"
                >
                  {person.initialen}
                </p>
                <p className="mt-4 font-semibold">{person.name}</p>
                <p className="mt-0.5 font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                  {person.rolle}
                </p>
                <p className="mt-3 leading-relaxed text-text-zweit">{person.satz}</p>
              </li>
            ))}
          </ul>

          <Link
            href="/werkstatt"
            className="group mt-8 -my-1 inline-flex items-center gap-1.5 py-1 text-sm font-medium underline decoration-linie-stark underline-offset-4 transition-colors hover:decoration-instrument"
          >
            {t("zurWerkstatt")}
            <span aria-hidden="true" className="kw-pfeil-schacht">
              <PfeilRechtsIcon className="kw-pfeil-quer size-4" />
            </span>
          </Link>
        </Container>
      </Section>
    </>
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
