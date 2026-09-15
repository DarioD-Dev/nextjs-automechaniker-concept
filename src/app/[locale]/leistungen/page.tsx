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
      <Section className="border-y border-linie bg-karte">
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

          <div className="mt-8 space-y-12">
            {LEISTUNGEN.map((gruppe) => (
              <section key={gruppe.titel}>
                <h2 className="text-abschnitt font-semibold">{gruppe.titel}</h2>
                <ul className="mt-4 divide-y divide-linie border-y border-linie">
                  {gruppe.eintraege.map((eintrag) => (
                    <li key={eintrag.slug} id={eintrag.slug} className="scroll-mt-20">
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

          <p className="mt-10 max-w-[62ch] leading-relaxed text-text-zweit">{t("fehlt")}</p>
        </Container>
      </Section>

      <Section className="border-t border-linie bg-karte">
        <Container className="max-w-[62rem]">
          <AbschnittsLabel nummer="03">{t("zahlenLabel")}</AbschnittsLabel>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <ZahlenKarte
              titel={t("stundensatz")}
              betrag={`${WERKSTATT.stundensatz} €`}
              text={t("stundensatzText")}
            />
            <ZahlenKarte
              titel={t("diagnose")}
              betrag={`${WERKSTATT.diagnosepauschale} €`}
              text={t("diagnoseText")}
            />
          </div>

          <ul className="mt-10 divide-y divide-linie border-y border-linie">
            {[tStart("zusage1"), tStart("zusage2"), tStart("zusage3")].map((zusage, i) => (
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
    </article>
  );
}

function Eintrag({
  eintrag,
  mehr,
  unfall,
}: {
  eintrag: LeistungsEintrag;
  mehr: string;
  unfall: string;
}) {
  const inhalt = (
    <>
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-2 font-semibold">
          {eintrag.titel}
          <StufenMarke art={eintrag.art} />
        </p>
        <p className="mt-1 max-w-[58ch] leading-relaxed text-text-zweit">{eintrag.satz}</p>
      </div>
      <div className="sm:text-right">
        <p className="font-mono text-lg whitespace-nowrap">{eintrag.preis}</p>
        {eintrag.dauer && (
          <p className="mt-0.5 font-mono text-xs whitespace-nowrap text-text-zweit">
            {eintrag.dauer}
          </p>
        )}
      </div>
    </>
  );

  const raster = "grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8";

  if (eintrag.ziel) {
    return (
      <Link href={eintrag.ziel} className={`group ${raster} transition-colors hover:bg-karte`}>
        {inhalt}
        <p className="flex items-center gap-1.5 text-sm underline decoration-linie-stark underline-offset-4 sm:col-span-2">
          {unfall}
          <PfeilRechtsIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        </p>
      </Link>
    );
  }

  if (eintrag.detail) {
    return (
      <Link
        href={{ pathname: "/leistungen/[slug]", params: { slug: eintrag.slug } }}
        className={`group ${raster} transition-colors hover:bg-karte`}
      >
        {inhalt}
        <p className="flex items-center gap-1.5 text-sm underline decoration-linie-stark underline-offset-4 sm:col-span-2">
          {mehr}
          <PfeilRechtsIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        </p>
      </Link>
    );
  }

  return <div className={raster}>{inhalt}</div>;
}

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

function ZahlenKarte({ titel, betrag, text }: { titel: string; betrag: string; text: string }) {
  return (
    <div className="border border-linie bg-grund p-6">
      <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">{titel}</p>
      <p className="mt-2 font-mono text-4xl font-bold">{betrag}</p>
      <p className="mt-3 leading-relaxed text-text-zweit">{text}</p>
    </div>
  );
}
