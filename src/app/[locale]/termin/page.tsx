import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { buildAlternates } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { AnfrageFormular } from "@/components/termin/AnfrageFormular";
import { TelefonKnopf } from "@/components/layout/TelefonKnopf";
import { WERKSTATT } from "@/data/werkstatt";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/termin">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Termin" });
  return { title: t("titel"), alternates: buildAlternates("/termin", locale) };
}

export default async function TerminSeite({ params }: PageProps<"/[locale]/termin">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("Termin");

  return (
    <Container className="max-w-[46rem] py-12 sm:py-16">
      <h1 className="text-hero font-bold">{t("titel")}</h1>
      <p className="mt-4 text-lead leading-relaxed text-text-zweit">
        {t("lead", { antwortzeit: WERKSTATT.antwortzeit })}
      </p>

      {/* Steht ÜBER dem Formular, nicht darunter: Bei echter Dringlichkeit
          schlägt das Telefon jedes Eingabefeld. */}
      <div className="mt-8 border-l-4 border-linie-stark bg-karte p-5">
        <p className="font-semibold">{t("eiligTitel")}</p>
        <p className="mt-1 text-text-zweit">{t("eiligText")}</p>
        <TelefonKnopf variante="zweit" className="mt-3" />
      </div>

      <div className="mt-10">
        <AnfrageFormular />
      </div>
    </Container>
  );
}
