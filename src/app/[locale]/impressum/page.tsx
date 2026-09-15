import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { buildAlternates } from "@/lib/seo";
import { Rechtstext } from "@/components/ui/Rechtstext";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/impressum">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Impressum" });
  return {
    title: t("titel"),
    description: t("lead"),
    alternates: buildAlternates("/impressum", locale),
  };
}

export default async function ImpressumSeite({ params }: PageProps<"/[locale]/impressum">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("Impressum");

  return (
    <Rechtstext
      titel={t("titel")}
      lead={t("lead")}
      abschnitte={[
        { titel: t("verantwortlichTitel"), text: t("verantwortlichText") },
        { titel: t("keineFirmaTitel"), text: t("keineFirmaText") },
        { titel: t("echtbetriebTitel"), text: t("echtbetriebText") },
        { titel: t("inhalteTitel"), text: t("inhalteText") },
      ]}
    />
  );
}
