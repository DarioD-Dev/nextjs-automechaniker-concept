import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { buildAlternates } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Ehrlichkeitsstufen } from "@/components/leistungen/Ehrlichkeitsstufen";
import { Preistafel } from "@/components/leistungen/Preistafel";
import { Zahlen } from "@/components/leistungen/Zahlen";
import { Zusagen } from "@/components/leistungen/Zusagen";

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

  return (
    <article>
      <Container className="max-w-[62rem] pt-10 pb-8 sm:pt-14">
        <h1 className="text-hero font-bold">{t("titel")}</h1>
        <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">{t("lead")}</p>
      </Container>

      <Ehrlichkeitsstufen />

      <Preistafel />

      <Zahlen />

      <Zusagen />
    </article>
  );
}
