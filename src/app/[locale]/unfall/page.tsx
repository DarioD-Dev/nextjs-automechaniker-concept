import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { assertLocale } from "@/i18n/locale";
import { buildAlternates } from "@/lib/seo";
import {
  DATEN,
  FAHRBEREITSCHAFT,
  FOTOS,
  GRENZEN,
  NOTRUF,
  POLIZEI,
  RECHTSSTAND,
  UEBERNEHMEN,
  VERSICHERUNG,
} from "@/data/unfall";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";
import { knopf } from "@/components/ui/Knopf";
import { StufenSymbol, STUFEN_STIL } from "@/components/problem/Stufe";
import { PfeilRechtsIcon } from "@/components/icons/UiIcons";
import { TelefonKnopf } from "@/components/layout/TelefonKnopf";
import { cn } from "@/lib/cn";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/unfall">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Unfall" });
  return {
    title: t("titel"),
    description: t("lead"),
    alternates: buildAlternates("/unfall", locale),
  };
}

/**
 * Der dritte Einstieg neben Warnleuchten und Symptomen — und bewusst keine
 * Problemkarte: Bei einem Unfall ist die Ursache bekannt und im Idealfall
 * zahlt der Kunde gar nichts, womit zwei der sieben Kartenfelder brechen.
 *
 * Was die Seite mit den Karten teilt, sind die Prinzipien: Dringlichkeit vor
 * allem anderen, die Handlung richtet sich nach der Lage, und die Grenze wird
 * benannt statt verschwiegen. Das Dringlichkeits-Bauteil ist dasselbe — nur
 * die Worte sind hier andere, weil „Sofort anhalten" bei einem Fahrzeug, das
 * ohnehin steht, keine Anweisung wäre.
 */
export default async function UnfallSeite({ params }: PageProps<"/[locale]/unfall">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("Unfall");

  const abschnitte = [
    { id: "verletzt", titel: t("t01") },
    { id: "fahren", titel: t("t02") },
    { id: "unterlagen", titel: t("t03") },
    { id: "kosten", titel: t("t04") },
    { id: "leistung", titel: t("t05") },
    { id: "grenzen", titel: t("t06") },
  ];

  return (
    <article>
      <Container className="max-w-[60rem] pt-10 pb-8 sm:pt-14">
        <h1 className="text-hero font-bold">{t("titel")}</h1>
        <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">{t("lead")}</p>

        <nav aria-label={t("inhalt")} className="mt-8 border-t border-linie pt-4">
          <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
            {t("inhalt")}
          </p>
          <ol className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
            {abschnitte.map((a, i) => (
              <li key={a.id}>
                <a
                  href={`#${a.id}`}
                  className="-my-1 inline-block py-1 text-sm underline decoration-linie-stark underline-offset-4 transition-colors hover:text-titel hover:decoration-instrument"
                >
                  <span className="font-mono text-text-zweit">
                    {String(i + 1).padStart(2, "0")}
                  </span>{" "}
                  {a.titel}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Container>

      {/* ── 01 ── Auf der Instrumentfläche statt in Rot: Die Signalfarben
          tragen auf dieser Seite Fahrbereitschaft, nicht Dringlichkeit im
          Allgemeinen. Der Notruf braucht Ernst, nicht den Signalkanal. */}
      <section id="verletzt" className="scroll-mt-20 bg-instrument text-text-auf-instrument">
        <Container className="max-w-[60rem] py-10 sm:py-12">
          <AbschnittsLabel nummer="01" className="text-white/60">
            {t("k01")}
          </AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("t01")}</h2>

          <ul className="mt-6 flex flex-wrap gap-3">
            {NOTRUF.map((n) => (
              <li
                key={n.nummer}
                className="flex min-w-[8.5rem] flex-1 items-baseline gap-3 border border-white/25 px-5 py-4"
              >
                <span className="font-mono text-3xl font-bold">{n.nummer}</span>
                <span className="text-sm text-white/75">{n.wofuer}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-[62ch] leading-relaxed">{t("notrufLead")}</p>
          <p className="mt-1 font-mono text-label tracking-[0.09em] text-white/50 uppercase">
            {t("notrufRecht")}
          </p>
          <p className="mt-5 max-w-[62ch] leading-relaxed">{t("absichern")}</p>
          <p className="mt-5 max-w-[62ch] border-t border-white/15 pt-4 text-sm leading-relaxed text-white/70">
            {t("keineNotfallhilfe")}
          </p>
        </Container>
      </section>

      {/* ── 02 ── Dasselbe Dringlichkeits-Bauteil wie auf den Problemkarten:
          Kante links, Signalfläche, Symbol und Wort. Nur die Worte sind
          kontextabhängig. */}
      <Section id="fahren" className="scroll-mt-20 border-b border-linie">
        <Container className="max-w-[60rem]">
          <AbschnittsLabel nummer="02">{t("k02")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("t02")}</h2>
          <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">
            {t("lead02")}
          </p>

          <div className="mt-8 space-y-5">
            {FAHRBEREITSCHAFT.map((lage) => {
              const stil = STUFEN_STIL[lage.stufe];
              return (
                <div key={lage.wort} className={cn("border-l-4 p-5 sm:p-6", stil.feld, stil.rand)}>
                  <p className="flex flex-wrap items-center gap-2.5">
                    <StufenSymbol stufe={lage.stufe} className="size-3.5" />
                    <span className={cn("font-semibold tracking-tight uppercase", stil.text)}>
                      {lage.wort}
                    </span>
                    <span className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                      {lage.zusatz}
                    </span>
                  </p>
                  <p className="mt-3 text-sm text-text-zweit">{lage.einleitung}</p>
                  <ul className="mt-2 space-y-1.5">
                    {lage.kriterien.map((k) => (
                      <li key={k} className="flex gap-2.5 leading-relaxed">
                        <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-current" />
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 max-w-[60ch] border-t border-black/10 pt-4 leading-relaxed font-medium">
                    {lage.handlung}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-6 max-w-[62ch] leading-relaxed text-text-zweit">{t("hinweis02")}</p>
        </Container>
      </Section>

      {/* ── 03 ── */}
      <Section id="unterlagen" className="scroll-mt-20 border-b border-linie bg-karte">
        <Container className="max-w-[60rem]">
          <AbschnittsLabel nummer="03">{t("k03")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("t03")}</h2>
          <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">
            {t("lead03")}
          </p>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <Liste titel={t("datenTitel")} eintraege={DATEN} />
            <Liste titel={t("fotosTitel")} eintraege={FOTOS} />
          </div>

          {/* Fünf gleich aussehende Absätze standen hier untereinander und
              beantworteten fünf verschiedene Fragen. Die erste davon ist eine
              Fallunterscheidung — muss die Polizei kommen? —, und die liest
              man als Tabelle in Sekunden statt als Fließtext in einer Minute.

              Fall links, Pflicht und Folge rechts: dieselbe Leserichtung wie
              in der Preistafel. Das Urteil steht als Wort da, nicht als
              Farbe — Rot und Gelb tragen auf dieser Seite Fahrbereitschaft. */}
          <div className="mt-10 border-t border-linie pt-6">
            <h3 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {t("polizeiTitel")}
            </h3>

            <dl className="mt-4 divide-y divide-linie border-y border-linie">
              {POLIZEI.map((f) => (
                <div key={f.fall} className="grid gap-x-10 gap-y-2 py-5 sm:grid-cols-[1fr_1.05fr]">
                  <dt className="leading-relaxed font-medium">{f.fall}</dt>
                  <dd>
                    <p
                      className={cn(
                        "font-mono text-label tracking-[0.09em] uppercase",
                        f.pflicht === "muss" ? "font-bold text-titel" : "text-text-zweit",
                      )}
                    >
                      {f.pflicht === "muss" ? t("polizeiPflicht") : t("polizeiErmessen")}
                    </p>
                    <p className="mt-1.5 leading-relaxed text-text-zweit">{f.folge}</p>
                  </dd>
                </div>
              ))}
            </dl>

            {/* Dasselbe Raster wie die Tabelle darüber — mit eigener
                Maximalbreite wäre die rechte Spalte schmaler und die Kante
                zwischen Fall und Folge liefe nicht durch. */}
            <div className="mt-5 grid gap-x-10 gap-y-1 sm:grid-cols-[1fr_1.05fr]">
              <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                {t("gebuehrTitel")}
              </p>
              <p className="max-w-[62ch] leading-relaxed text-text-zweit">{t("polizeiGebuehr")}</p>
            </div>
          </div>

          <div className="mt-10 border-t border-linie pt-6">
            <h3 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {t("versicherungTitel")}
            </h3>
            <dl className="mt-4 divide-y divide-linie border-y border-linie">
              {VERSICHERUNG.map((v) => (
                <div key={v.frist} className="grid gap-x-10 gap-y-1 py-4 sm:grid-cols-[1fr_1.05fr]">
                  <dt className="font-medium">{v.frist}</dt>
                  <dd className="leading-relaxed text-text-zweit">{v.text}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 max-w-[68ch] font-mono text-xs leading-relaxed text-text-zweit">
              {t("standHinweis", { stand: RECHTSSTAND })}
            </p>
          </div>
        </Container>
      </Section>

      {/* ── 04 ── */}
      <Section id="kosten" className="scroll-mt-20 border-b border-linie">
        <Container className="max-w-[60rem]">
          <AbschnittsLabel nummer="04">{t("k04")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("t04")}</h2>
          <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">
            {t("lead04")}
          </p>

          <ul className="mt-8 divide-y divide-linie border-y border-linie">
            {(
              [
                [t("fall1Titel"), t("fall1Text")],
                [t("fall2Titel"), t("fall2Text")],
                [t("fall3Titel"), t("fall3Text")],
              ] as const
            ).map(([titel, text]) => (
              <li key={titel} className="grid gap-1 py-5 sm:grid-cols-[16rem_1fr] sm:gap-6">
                <p className="font-semibold">{titel}</p>
                <p className="leading-relaxed text-text-zweit">{text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 border border-instrument bg-karte p-5 sm:p-6">
            <h3 className="text-block font-semibold">{t("werkstattwahlTitel")}</h3>
            <p className="mt-3 max-w-[60ch] leading-relaxed">{t("werkstattwahlText")}</p>
          </div>

          <p className="mt-6 max-w-[62ch] leading-relaxed text-text-zweit">{t("kostenGrenze")}</p>
        </Container>
      </Section>

      {/* ── 05 ── */}
      <Section id="leistung" className="scroll-mt-20 border-b border-linie bg-karte">
        <Container className="max-w-[60rem]">
          <AbschnittsLabel nummer="05">{t("k05")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("t05")}</h2>
          <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">
            {t("lead05")}
          </p>

          <ol className="mt-8 divide-y divide-linie border-y border-linie">
            {UEBERNEHMEN.map((leistung, i) => (
              <li key={leistung.titel} className="flex gap-4 py-5">
                <span className="font-mono text-sm text-text-zweit">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-semibold">{leistung.titel}</p>
                  <p className="mt-1 max-w-[58ch] leading-relaxed text-text-zweit">
                    {leistung.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── 06 ── Derselbe Kasten wie „Das können wir online nicht sagen"
          auf den Problemkarten. Hier ist er der wichtigste Abschnitt. */}
      <Section id="grenzen" className="scroll-mt-20">
        <Container className="max-w-[60rem]">
          <AbschnittsLabel nummer="06">{t("k06")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("t06")}</h2>
          <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">
            {t("lead06")}
          </p>

          <ul className="mt-8 border border-instrument bg-karte">
            {GRENZEN.map((grenze, i) => (
              <li key={grenze.titel} className={cn("p-5 sm:p-6", i > 0 && "border-t border-linie")}>
                <p className="font-semibold">{grenze.titel}</p>
                <p className="mt-2 max-w-[60ch] leading-relaxed text-text-zweit">{grenze.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-linie pt-6">
            <p className="text-sm">
              <span className="text-text-zweit">{t("leistung")}: </span>
              <span className="font-medium">{t("leistungTitel")}</span>{" "}
              <span className="font-mono">{t("leistungPreis")}</span>
            </p>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-text-zweit">{t("ctaLead")}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Link href="/termin" className={knopf("haupt", "group")}>
                {t("ctaTermin")}
                <span aria-hidden="true" className="kw-pfeil-schacht">
                  <PfeilRechtsIcon className="kw-pfeil-quer size-4" />
                </span>
              </Link>
              <TelefonKnopf variante="zweit" />
            </div>
          </div>
        </Container>
      </Section>
    </article>
  );
}

function Liste({ titel, eintraege }: { titel: string; eintraege: readonly string[] }) {
  return (
    <div>
      <h3 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">{titel}</h3>
      <ul className="mt-3 space-y-2">
        {eintraege.map((e) => (
          <li key={e} className="flex gap-2.5 leading-relaxed">
            <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-linie-stark" />
            <span>{e}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
