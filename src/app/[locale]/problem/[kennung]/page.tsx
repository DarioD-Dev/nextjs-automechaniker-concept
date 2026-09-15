import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { routing } from "@/i18n/routing";
import { PROBLEME, findeProblem } from "@/data/probleme";
import { buildAlternates } from "@/lib/seo";
import { ProblemKarte } from "@/components/problem/ProblemKarte";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PROBLEME.map((problem) => ({ locale, kennung: problem.kennung })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/problem/[kennung]">): Promise<Metadata> {
  const { locale: rohLocale, kennung } = await params;
  const locale = assertLocale(rohLocale);
  const problem = findeProblem(kennung);
  if (!problem) return {};

  const t = await getTranslations({ locale, namespace: "Stufe" });
  const stufenwort =
    problem.dringlichkeit === "sofort"
      ? t("sofortWort")
      : problem.dringlichkeit === "bald"
        ? t("baldWort")
        : t("planbarWort");

  return {
    title: problem.titel,
    // Die Beschreibung beantwortet die Frage, mit der jemand sucht — "kann ich
    // noch fahren" —, statt den Firmennamen zu wiederholen.
    description: `${stufenwort}. ${problem.klartext}`,
    alternates: buildAlternates({ pathname: "/problem/[kennung]", params: { kennung } }, locale),
  };
}

export default async function ProblemSeite({ params }: PageProps<"/[locale]/problem/[kennung]">) {
  const { locale: rohLocale, kennung } = await params;
  const locale = assertLocale(rohLocale);
  setRequestLocale(locale);

  const problem = findeProblem(kennung);
  if (!problem) notFound();

  return <ProblemKarte problem={problem} />;
}
