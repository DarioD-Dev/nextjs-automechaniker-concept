import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { buildAlternates } from "@/lib/seo";
import { ATTRAPPE, ECHT, ERFUNDEN } from "@/data/konzept";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";
import { HakenIcon, KreuzIcon } from "@/components/icons/UiIcons";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/konzept">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Konzept" });
  return {
    title: t("titel"),
    description: t("lead"),
    alternates: buildAlternates("/konzept", locale),
  };
}

/**
 * Die Offenlegung. Jede andere Seite verweist hierher, und sie ist der Grund,
 * warum die anderen Seiten überhaupt konkret sein dürfen: Wer sagt, was
 * erfunden ist, muss beim Rest nicht schwammig bleiben.
 */
export default async function KonzeptSeite({ params }: PageProps<"/[locale]/konzept">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("Konzept");

  return (
    <article>
      <Container className="max-w-[58rem] pt-10 pb-8 sm:pt-14">
        <h1 className="text-hero font-bold">{t("titel")}</h1>
        <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">{t("lead")}</p>
      </Container>

      <Section className="border-y border-linie bg-karte">
        <Container className="max-w-[58rem]">
          <AbschnittsLabel nummer="01">{t("wasLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("wasTitel")}</h2>
          <div className="mt-5 max-w-[64ch] space-y-4 leading-relaxed">
            <p>{t("wasText1")}</p>
            <p>{t("wasText2")}</p>
          </div>
        </Container>
      </Section>

      <Section className="border-b border-linie">
        <Container className="max-w-[58rem]">
          <AbschnittsLabel nummer="02">{t("erfundenLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("erfundenTitel")}</h2>
          <ul className="mt-6 space-y-2.5">
            {ERFUNDEN.map((eintrag) => (
              <li key={eintrag} className="flex gap-2.5 leading-relaxed">
                <KreuzIcon className="mt-1 size-4 shrink-0 text-text-zweit" />
                <span>{eintrag}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-linie pt-6">
            <h3 className="text-block font-semibold">{t("preiseTitel")}</h3>
            <p className="mt-3 max-w-[64ch] leading-relaxed text-text-zweit">{t("preiseText")}</p>
          </div>
        </Container>
      </Section>

      {/* Die Notrufnummern stehen hier oben, und das ist Absicht: Sie sind das
          Einzige auf dieser Seite, nach dem jemand im Ernstfall handeln soll. */}
      <Section className="border-b border-linie bg-karte">
        <Container className="max-w-[58rem]">
          <AbschnittsLabel nummer="03">{t("echtLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("echtTitel")}</h2>
          <ul className="mt-6 divide-y divide-linie border-y border-linie">
            {ECHT.map((eintrag) => (
              <li key={eintrag.titel} className="flex gap-3 py-5">
                <HakenIcon className="mt-1 size-4 shrink-0 text-text-zweit" />
                <div>
                  <p className="font-semibold">{eintrag.titel}</p>
                  <p className="mt-1 max-w-[60ch] leading-relaxed text-text-zweit">
                    {eintrag.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="border-b border-linie">
        <Container className="max-w-[58rem]">
          <AbschnittsLabel nummer="04">{t("funktioniertLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("funktioniertTitel")}</h2>
          <ul className="mt-6 divide-y divide-linie border-y border-linie">
            {ATTRAPPE.map((eintrag) => (
              <li key={eintrag.titel} className="grid gap-1 py-5 sm:grid-cols-[18rem_1fr] sm:gap-6">
                <p className="font-semibold">{eintrag.titel}</p>
                <p className="max-w-[58ch] leading-relaxed text-text-zweit">{eintrag.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-[58rem]">
          <div className="border border-instrument bg-karte p-6 sm:p-8">
            <h2 className="font-mono text-label tracking-[0.09em] uppercase">
              {t("keineBeratungTitel")}
            </h2>
            <p className="mt-3 max-w-[58ch] text-lead leading-relaxed font-medium">
              {t("keineBeratung")}
            </p>
          </div>
        </Container>
      </Section>
    </article>
  );
}
