import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { routing } from "@/i18n/routing";
import { DETAILS, findeDetail } from "@/data/leistungen";
import { buildAlternates } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Umfang } from "@/components/leistungen/Umfang";
import { DetailKopf } from "@/components/leistungen/DetailKopf";
import { DetailAblauf } from "@/components/leistungen/DetailAblauf";
import { DetailRechtliches } from "@/components/leistungen/DetailRechtliches";
import { DetailAbschluss } from "@/components/leistungen/DetailAbschluss";

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
        <DetailKopf detail={detail} />

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

          <DetailAblauf detail={detail} />

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

          <DetailRechtliches detail={detail} />

          <DetailAbschluss detail={detail} />
        </div>
      </Container>
    </article>
  );
}
