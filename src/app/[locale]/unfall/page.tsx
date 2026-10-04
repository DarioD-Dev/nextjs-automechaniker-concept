import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { buildAlternates } from "@/lib/seo";
import { UnfallKopf } from "@/components/unfall/UnfallKopf";
import { Notruf } from "@/components/unfall/Notruf";
import { Fahrbereitschaft } from "@/components/unfall/Fahrbereitschaft";
import { Unterlagen } from "@/components/unfall/Unterlagen";
import { Kosten } from "@/components/unfall/Kosten";
import { Uebernahme } from "@/components/unfall/Uebernahme";
import { Grenzen } from "@/components/unfall/Grenzen";

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
  return (
    <article>
      <UnfallKopf />

      <Notruf />

      <Fahrbereitschaft />

      <Unterlagen />

      <Kosten />

      <Uebernahme />

      <Grenzen />
    </article>
  );
}
