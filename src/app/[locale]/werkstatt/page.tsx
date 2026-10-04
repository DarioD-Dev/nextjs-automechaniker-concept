import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { buildAlternates } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Ablauf } from "@/components/werkstatt/Ablauf";
import { Menschen } from "@/components/werkstatt/Menschen";
import { Ausstattung } from "@/components/werkstatt/Ausstattung";
import { Pruefstelle } from "@/components/werkstatt/Pruefstelle";
import { Anfahrt } from "@/components/werkstatt/Anfahrt";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/werkstatt">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Werkstatt" });
  return {
    title: t("titel"),
    description: t("lead"),
    alternates: buildAlternates("/werkstatt", locale),
  };
}

export default async function WerkstattSeite({ params }: PageProps<"/[locale]/werkstatt">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("Werkstatt");

  return (
    <article>
      <Container className="max-w-[62rem] pt-10 pb-8 sm:pt-14">
        <h1 className="text-hero font-bold">{t("titel")}</h1>
        <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">{t("lead")}</p>
      </Container>

      {/* Der Ablauf steht zuerst: Die meiste Unsicherheit in einer Werkstatt
          kommt nicht aus der Technik, sondern daraus, dass niemand sagt, was
          als Nächstes passiert. */}
      <Ablauf />

      <Menschen />

      <Ausstattung />

      {/* FORM A — DAS DUNKLE STATEMENT
          Die Ermächtigung ist keine Leistung und keine Zahl, sondern die eine
          überprüfbare Aussage dieser Seite. Sie stand als gerahmte Karte
          zwischen zwei Listen und sah aus wie ein weiterer Eintrag.

          Aussage groß links, Begründung schmal rechts, beide auf einer
          Oberkante. Einmal pro Seite — die Listen darüber und darunter leben
          davon, dass diese Fläche nicht wiederkehrt. */}
      <Pruefstelle />

      <Anfahrt />
    </article>
  );
}
