import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { assertLocale } from "@/i18n/locale";
import { buildAlternates } from "@/lib/seo";
import { ABLAUF, ANFAHRT, AUSSTATTUNG, NICHT_IM_HAUS, PERSONEN, WERKSTATT } from "@/data/werkstatt";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";
import { PfeilRechtsIcon } from "@/components/icons/UiIcons";
import { TelefonKnopf } from "@/components/layout/TelefonKnopf";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/werkstatt">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Werkstatt" });
  return {
    title: t("titel"),
    description: t("lead"),
    alternates: buildAlternates("/werkstatt", locale),
  };
}

export default async function WerkstattSeite({ params }: PageProps<"/[locale]/werkstatt">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("Werkstatt");

  return (
    <article>
      <Container className="max-w-[62rem] pt-10 pb-8 sm:pt-14">
        <h1 className="text-hero font-bold">{t("titel")}</h1>
        <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">{t("lead")}</p>
      </Container>

      {/* Der Ablauf steht zuerst: Die meiste Unsicherheit in einer Werkstatt
          kommt nicht aus der Technik, sondern daraus, dass niemand sagt, was
          als Nächstes passiert. */}
      <Section className="border-y border-linie bg-karte">
        <Container className="max-w-[62rem]">
          <AbschnittsLabel nummer="01">{t("ablaufLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("ablaufTitel")}</h2>
          <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">
            {t("ablaufLead")}
          </p>

          {/* FORM C — DIE PROZESSKETTE
              Vier untereinander gesetzte Zeilen sind eine Liste. Ein Ablauf
              ist aber keine Liste, sondern eine Kette: Die Reihenfolge ist die
              Information. Deshalb liegen die vier Stationen auf einer
              durchgehenden Linie, jede mit einer Marke darauf.

              Zwischen den Spalten steht kein Gap, sondern Innenabstand: Mit
              Gap zerfiele die Linie in vier Striche, und genau das wäre
              wieder eine Liste. Auf schmalen Geräten kippt die Kette in die
              Senkrechte und die Linie läuft links durch; die Aussage bleibt
              dieselbe. Dazwischen — Tablet — zwei mal zwei: Vier Spalten
              wären dort zu schmal, eine einzige ließe die halbe Breite leer.

              Linie und Marke liegen in globals.css (.kw-kette), weil die
              Linie sich beim Hereinscrollen aufbauen soll. Als Rahmen der
              Zelle ginge das nicht, ohne dass der Text mitspringt. */}
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
                <p className="mt-4 max-w-[46ch] leading-relaxed">{schritt.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="border-b border-linie">
        <Container className="max-w-[62rem]">
          <AbschnittsLabel nummer="02">{t("menschenLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("menschenTitel")}</h2>
          <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">
            {t("menschenLead")}
          </p>

          <ul className="kw-auf-reihe mt-8 grid gap-6 sm:grid-cols-3">
            {PERSONEN.map((person) => (
              <li key={person.name} className="border border-linie bg-karte p-5">
                {/* Initialen statt Stockfoto — Begründung im Datenmodell. */}
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

          <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-text-zweit">
            {t("menschenFiktion")}
          </p>
        </Container>
      </Section>

      <Section className="border-b border-linie bg-karte">
        <Container className="max-w-[62rem]">
          <AbschnittsLabel nummer="03">{t("ausstattungLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("ausstattungTitel")}</h2>
          <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">
            {t("ausstattungLead")}
          </p>

          <ul className="mt-8 divide-y divide-linie border-y border-linie">
            {AUSSTATTUNG.map((geraet) => (
              <li key={geraet.titel} className="grid gap-1 py-5 sm:grid-cols-[20rem_1fr] sm:gap-6">
                <p className="font-semibold">{geraet.titel}</p>
                <p className="max-w-[58ch] leading-relaxed text-text-zweit">{geraet.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-l-4 border-linie-stark pl-5">
            <h3 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {t("nichtImHausTitel")}
            </h3>
            <p className="mt-2 max-w-[60ch] leading-relaxed">{NICHT_IM_HAUS}</p>
          </div>
        </Container>
      </Section>

      {/* FORM A — DAS DUNKLE STATEMENT
          Die Ermächtigung ist keine Leistung und keine Zahl, sondern die eine
          überprüfbare Aussage dieser Seite. Sie stand als gerahmte Karte
          zwischen zwei Listen und sah aus wie ein weiterer Eintrag.

          Aussage groß links, Begründung schmal rechts, beide auf einer
          Oberkante. Einmal pro Seite — die Listen darüber und darunter leben
          davon, dass diese Fläche nicht wiederkehrt. */}
      <section className="bg-instrument text-text-auf-instrument">
        <Container className="max-w-[62rem] py-16 sm:py-20 lg:py-24">
          <p className="font-mono text-label tracking-[0.09em] text-white/70 uppercase">
            {t("pruefstelleLabel")} / 04
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
            <h2 className="max-w-[18ch] text-[clamp(1.75rem,1.1rem+2.6vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.02em] hyphens-none">
              {t("pruefstelleTitel")}
            </h2>
            <div className="max-w-[48ch]">
              <p className="text-lead leading-relaxed font-medium">{t("pruefstelleText")}</p>
              <p className="mt-4 leading-relaxed text-white/80">{t("pruefstelleWarum")}</p>
              <Link
                href={{ pathname: "/leistungen/[slug]", params: { slug: "pickerl" } }}
                className="group -my-1 mt-6 inline-flex items-center gap-1.5 py-1 text-sm font-medium text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
              >
                {t("pruefstelleLink")}
                <span aria-hidden="true" className="kw-pfeil-schacht">
                  <PfeilRechtsIcon className="kw-pfeil-quer size-4" />
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Section id="anfahrt" className="scroll-mt-20">
        <Container className="max-w-[62rem]">
          <AbschnittsLabel nummer="05">{t("anfahrtLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("anfahrtTitel")}</h2>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                {t("adresse")}
              </h3>
              <address className="mt-3 text-lead not-italic">
                {WERKSTATT.strasse}
                <br />
                {WERKSTATT.plz} {WERKSTATT.ort}
              </address>
              <TelefonKnopf variante="zweit" className="mt-4" />
            </div>
            <div>
              <h3 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                {t("oeffnungszeiten")}
              </h3>
              <dl className="mt-3 divide-y divide-linie border-y border-linie">
                {WERKSTATT.oeffnungszeiten.map((zeit) => (
                  <div key={zeit.tage} className="flex justify-between gap-4 py-2.5">
                    <dt>{zeit.tage}</dt>
                    <dd className="font-mono text-text-zweit">{zeit.zeit}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <ul className="mt-8 divide-y divide-linie border-y border-linie">
            {ANFAHRT.map((weg) => (
              <li key={weg.art} className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                  {weg.art}
                </p>
                <p className="max-w-[58ch] leading-relaxed">{weg.text}</p>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-[62ch] border-t border-linie pt-5 text-sm leading-relaxed text-text-zweit">
            {t("fiktionHinweis")}{" "}
            <Link
              href="/konzept"
              className="-my-1 inline-block py-1 underline decoration-linie-stark underline-offset-4 transition-colors hover:text-titel hover:decoration-instrument"
            >
              {t("zumKonzept")}
            </Link>
          </p>
        </Container>
      </Section>
    </article>
  );
}
