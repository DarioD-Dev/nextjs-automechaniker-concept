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
      <section className="relative flex min-h-[calc(100svh-4.25rem)] flex-col">
        {/* Das Bild ist kein Bildrechteck neben dem Text, sondern eine eigene
            Fläche: randlos bis zum rechten Seitenrand, bündig mit dem
            Markenband unten, und oben bleibt Off-White stehen. Dadurch ist die
            Aufteilung in beiden Richtungen asymmetrisch — kein 50/50-Hero.

            Der Ausschnitt: Rad, Heck und Hebebühne. Der Absaugschlauch ab 74 %
            des Originals bleibt draußen, er wäre die unruhigste Stelle im
            Bild. object-position 20 % legt das Fenster auf 10–60 % der
            Bildbreite. */}
        <div className="pointer-events-none absolute top-[21%] right-0 bottom-0 hidden w-[42vw] max-w-[44rem] lg:block">
          <Image
            src="/bilder/werkstatt-hebebuehne.jpg"
            alt={t("bildAlt")}
            fill
            priority
            sizes="42vw"
            className="object-cover object-[4%_center]"
          />
        </div>

        <Container className="relative flex flex-1 flex-col justify-center py-16 sm:py-24">
          <p className="font-mono text-label tracking-[0.09em] text-titel uppercase">
            {t("ortLabel")} {WERKSTATT.plz} {WERKSTATT.ort}
          </p>

          {/* hyphens-none: Die globale Trennregel ist für Fachkomposita gedacht
              („Motorkontrollleuchte"). Hier trennte sie „Ih-rem" — im
              Markenmoment ist das der teuerste mögliche Umbruch. */}
          <h1 className="mt-6 max-w-[13ch] text-marke font-bold text-titel hyphens-none lg:max-w-[9ch]">
            {t("titel")}
          </h1>

          <p className="mt-8 max-w-[44ch] text-lead leading-relaxed text-text-zweit lg:max-w-[38ch]">
            {t("lead")}
          </p>

          {/* Genau eine Handlung. Sie führt nicht weg, sondern weiter: in den
              Finder direkt darunter. */}
          <a
            href="#finder"
            className="mt-10 inline-flex w-fit items-center gap-3 rounded-sm bg-akzent px-6 py-4 text-base font-bold text-text transition-colors hover:bg-akzent-feld"
          >
            {t("heroCta")}
            <PfeilRechtsIcon className="size-5 rotate-90" />
          </a>
        </Container>

        {/* Mobil ein kompakter Streifen statt einer Bildfläche: Die
            Handlung soll ohne Scrollen erreichbar bleiben. */}
        <div className="relative mt-auto h-56 w-full sm:h-64 lg:hidden">
          <Image
            src="/bilder/werkstatt-hebebuehne.jpg"
            alt={t("bildAlt")}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[22%_center]"
          />
        </div>

        {/* Der Markensatz schließt den ersten Bildschirm ab und trennt ihn von
            der Informationsebene darunter. Rechts daneben der Bildnachweis —
            klein, an der Kante, statt als Bildunterschrift, die den ruhigen
            Einstieg zerschneiden würde. */}
        <div className="relative bg-instrument">
          <Container className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
            <p className="font-mono text-label tracking-[0.09em] text-text-auf-instrument uppercase">
              {WERKSTATT.zeile}
            </p>
            <p className="font-mono text-[0.6875rem] tracking-[0.06em] whitespace-nowrap text-white/65">
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
          Preisliste: Zwei Wahrheiten über denselben Preis wären eine zu viel. */}
      <Section className="border-t border-linie bg-karte">
        <Container>
          <AbschnittsLabel nummer="01">{t("festpreiseLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("festpreiseTitel")}</h2>
          <p className="mt-3 max-w-[56ch] text-lead text-text-zweit">{t("festpreiseLead")}</p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {(["§57a Pickerl", "Ölservice", "Reifenwechsel"] as const).map((titel) => {
              const leistung = findeLeistung(titel);
              return (
                <li key={leistung.slug} className="border border-linie bg-grund p-5">
                  <p className="font-semibold">{leistung.titel}</p>
                  <p className="mt-2 font-mono text-2xl font-bold">{leistung.preis}</p>
                  {leistung.dauer && (
                    <p className="mt-0.5 font-mono text-xs text-text-zweit">{leistung.dauer}</p>
                  )}
                  <p className="mt-3 leading-relaxed text-text-zweit">{leistung.satz}</p>
                </li>
              );
            })}
          </ul>

          <Link
            href="/leistungen"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium underline decoration-linie-stark underline-offset-4 hover:decoration-instrument"
          >
            {t("alleLeistungen")}
            <PfeilRechtsIcon className="size-4" />
          </Link>
        </Container>
      </Section>

      <Section className="border-t border-linie">
        <Container>
          <AbschnittsLabel nummer="02">{t("grenzeLabel")}</AbschnittsLabel>
          <h2 className="mt-3 max-w-[20ch] text-abschnitt font-semibold">{t("grenzeTitel")}</h2>
          <div className="mt-5 max-w-[62ch] space-y-4 text-lead leading-relaxed">
            <p>{t("grenzeAbsatz1")}</p>
            <p>{t("grenzeAbsatz2")}</p>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-linie bg-karte">
        <Container>
          <AbschnittsLabel nummer="03">{t("preiseLabel")}</AbschnittsLabel>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <ZahlenKarte
              titel={t("diagnoseTitel")}
              betrag={`${WERKSTATT.diagnosepauschale} €`}
              text={t("diagnoseText")}
            />
            <ZahlenKarte
              titel={t("stundensatzTitel")}
              betrag={`${WERKSTATT.stundensatz} €`}
              text={t("stundensatzText")}
            />
          </div>

          <h3 className="mt-12 font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
            {t("zusagenTitel")}
          </h3>
          <ul className="mt-4 divide-y divide-linie border-y border-linie">
            {[t("zusage1"), t("zusage2"), t("zusage3")].map((zusage, i) => (
              <li key={zusage} className="flex gap-4 py-4">
                <span className="font-mono text-sm text-text-zweit">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lead font-medium">{zusage}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Block 06 — die drei Zusagen darüber werden hier konkret. Eine Zusage,
          die im Ablauf keinen Ort hat, ist keine. */}
      <Section className="border-t border-linie">
        <Container>
          <AbschnittsLabel nummer="04">{t("ablaufLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("ablaufTitel")}</h2>

          <ol className="mt-8 divide-y divide-linie border-y border-linie">
            {ABLAUF.map((schritt) => (
              <li
                key={schritt.nummer}
                className="grid gap-2 py-5 sm:grid-cols-[13rem_1fr] sm:gap-6"
              >
                <p className="font-mono text-label tracking-[0.09em] uppercase">
                  {schritt.label} / {schritt.nummer}
                </p>
                <p className="max-w-[58ch] leading-relaxed">{schritt.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="border-t border-linie bg-karte">
        <Container>
          <AbschnittsLabel nummer="05">{t("menschenLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("menschenTitel")}</h2>

          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
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
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium underline decoration-linie-stark underline-offset-4 hover:decoration-instrument"
          >
            {t("zurWerkstatt")}
            <PfeilRechtsIcon className="size-4" />
          </Link>
        </Container>
      </Section>
    </>
  );
}

function ZahlenKarte({ titel, betrag, text }: { titel: string; betrag: string; text: string }) {
  return (
    <div className="border border-linie bg-karte p-6">
      <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">{titel}</p>
      <p className="mt-2 font-mono text-4xl font-bold">{betrag}</p>
      <p className="mt-3 leading-relaxed text-text-zweit">{text}</p>
    </div>
  );
}
