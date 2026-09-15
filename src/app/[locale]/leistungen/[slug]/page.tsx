import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { assertLocale } from "@/i18n/locale";
import { routing } from "@/i18n/routing";
import { DETAILS, findeDetail } from "@/data/leistungen";
import { findeProblem } from "@/data/probleme";
import { buildAlternates } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { knopf } from "@/components/ui/Knopf";
import { PfeilRechtsIcon, HakenIcon, KreuzIcon } from "@/components/icons/UiIcons";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    DETAILS.map((detail) => ({ locale, slug: detail.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/leistungen/[slug]">): Promise<Metadata> {
  const { locale: rohLocale, slug } = await params;
  const locale = assertLocale(rohLocale);
  const detail = findeDetail(slug);
  if (!detail) return {};
  return {
    title: `${detail.titel} — ${detail.preis}`,
    description: detail.kernsatz,
    alternates: buildAlternates({ pathname: "/leistungen/[slug]", params: { slug } }, locale),
  };
}

/**
 * Dieselbe Informationsqualität wie eine Problemkarte, aber nicht deren Form:
 * Eine Leistung hat keine Dringlichkeit und keine möglichen Ursachen. Was sie
 * mit der Karte teilt, ist der Aufbau aus Klartext, Umfang, Kosten und einer
 * benannten Grenze — und den Kasten, in dem diese Grenze steht.
 */
export default async function LeistungsDetailSeite({
  params,
}: PageProps<"/[locale]/leistungen/[slug]">) {
  const { locale: rohLocale, slug } = await params;
  const locale = assertLocale(rohLocale);
  setRequestLocale(locale);
  const t = await getTranslations("Leistungen");

  const detail = findeDetail(slug);
  if (!detail) notFound();

  return (
    <article>
      <Container className="max-w-[56rem] pt-8 pb-8 sm:pt-12">
        <Link
          href="/leistungen"
          className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase underline decoration-linie-stark underline-offset-4 hover:decoration-instrument"
        >
          ← {t("detailZurueck")}
        </Link>

        <h1 className="mt-5 text-hero font-bold">{detail.titel}</h1>

        <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 border-y border-linie py-4">
          <div>
            <dt className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {t("detailPreis")}
            </dt>
            <dd className="mt-1 font-mono text-2xl font-bold">{detail.preis}</dd>
          </div>
          <div>
            <dt className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {t("detailDauer")}
            </dt>
            <dd className="mt-1 font-mono text-2xl">{detail.dauer}</dd>
          </div>
        </dl>

        <div className="mt-8 space-y-10">
          <section>
            <h2 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {t("detailWasEs")}
            </h2>
            <p className="mt-4 max-w-[64ch] leading-relaxed">{detail.klartext}</p>
          </section>

          {/* Der Satz, der auf dieser Seite am meisten Ärger verhindert —
              deshalb im gerahmten Kasten und nicht im Fließtext. */}
          <p className="max-w-[64ch] border-l-4 border-instrument bg-karte p-5 text-lead leading-relaxed font-medium sm:p-6">
            {detail.kernsatz}
          </p>

          <section>
            <h2 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {detail.slug === "pickerl" ? t("detailAblaufPickerl") : t("detailAblaufDiagnose")}
            </h2>
            <ol className="mt-4 divide-y divide-linie border-y border-linie">
              {detail.ablauf.map((schritt, i) => (
                <li key={schritt.titel} className="flex gap-4 py-4">
                  <span className="font-mono text-sm text-text-zweit">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-semibold">{schritt.titel}</p>
                    <p className="mt-1 max-w-[58ch] leading-relaxed text-text-zweit">
                      {schritt.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Die Ausschlussspalte ist die wichtigere von beiden: Wer freiwillig
              sagt, was NICHT enthalten ist, beweist mehr als jeder Preis. */}
          <div className="grid gap-8 sm:grid-cols-2">
            <Umfang titel={t("detailEnthalten")} eintraege={detail.enthalten} zeichen="haken" />
            <Umfang
              titel={t("detailNichtEnthalten")}
              eintraege={detail.nichtEnthalten}
              zeichen="kreuz"
            />
          </div>

          <section>
            <h2 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {t("detailDanach")}
            </h2>
            <ul className="mt-4 divide-y divide-linie border-y border-linie">
              {detail.danach.map((fall) => (
                <li key={fall.titel} className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                  <p className="font-semibold">{fall.titel}</p>
                  <p className="max-w-[58ch] leading-relaxed text-text-zweit">{fall.text}</p>
                </li>
              ))}
            </ul>
          </section>

          {detail.rechtliches && (
            <section>
              <h2 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                {t("detailRechtliches")}
              </h2>
              <div className="mt-4 max-w-[64ch] space-y-3 leading-relaxed">
                {detail.rechtliches.absaetze.map((absatz) => (
                  <p key={absatz}>{absatz}</p>
                ))}
              </div>
              <p className="mt-5 max-w-[64ch] border-t border-linie pt-4 font-mono text-xs leading-relaxed text-text-zweit">
                {detail.rechtliches.stand}
              </p>
            </section>
          )}

          <section className="border border-instrument bg-karte p-5 sm:p-6">
            <h2 className="font-mono text-label tracking-[0.09em] uppercase">
              {t("detailGrenze")}
            </h2>
            <p className="mt-3 max-w-[60ch] leading-relaxed">{detail.grenze}</p>
          </section>

          <div className="border-t border-linie pt-6">
            <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {t("detailVerwandt")}
            </p>
            <p className="mt-2 text-sm">
              {detail.verwandteProbleme.map((kennung, i) => {
                const problem = findeProblem(kennung);
                if (!problem) return null;
                return (
                  <span key={kennung}>
                    {i > 0 && " · "}
                    <Link
                      href={{ pathname: "/problem/[kennung]", params: { kennung } }}
                      className="underline decoration-linie-stark underline-offset-4 hover:decoration-instrument"
                    >
                      {problem.titel}
                    </Link>
                  </span>
                );
              })}
            </p>
            <Link href="/termin" className={knopf("haupt", "mt-6")}>
              {t("detailTermin")}
              <PfeilRechtsIcon className="size-4" />
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
}

function Umfang({
  titel,
  eintraege,
  zeichen,
}: {
  titel: string;
  eintraege: readonly string[];
  zeichen: "haken" | "kreuz";
}) {
  const Zeichen = zeichen === "haken" ? HakenIcon : KreuzIcon;
  return (
    <section>
      <h2 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">{titel}</h2>
      <ul className="mt-3 space-y-2.5">
        {eintraege.map((e) => (
          <li key={e} className="flex gap-2.5 leading-relaxed">
            <Zeichen className="mt-1 size-4 shrink-0 text-text-zweit" />
            <span>{e}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
