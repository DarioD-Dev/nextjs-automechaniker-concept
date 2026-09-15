import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { buildAlternates } from "@/lib/seo";
import { Rechtstext } from "@/components/ui/Rechtstext";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/datenschutz">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Datenschutz" });
  return {
    title: t("titel"),
    description: t("lead"),
    alternates: buildAlternates("/datenschutz", locale),
  };
}

export default async function DatenschutzSeite({ params }: PageProps<"/[locale]/datenschutz">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("Datenschutz");

  return (
    <Rechtstext
      titel={t("titel")}
      lead={t("lead")}
      abschnitte={[
        { titel: t("vorbefundTitel"), text: t("vorbefundText") },
        { titel: t("formularTitel"), text: t("formularText") },
        { titel: t("hostingTitel"), text: t("hostingText") },
        { titel: t("schriftenTitel"), text: t("schriftenText") },
        { titel: t("rechteTitel"), text: t("rechteText") },
        { titel: t("echtbetriebTitel"), text: t("echtbetriebText") },
      ]}
    />
  );
}
