import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";
import { StufenMarke } from "@/components/leistungen/StufenMarke";

export async function Ehrlichkeitsstufen() {
  const t = await getTranslations("Leistungen");

  const stufen = [
    { art: "fest", name: t("stufeFest"), text: t("stufeFestText") },
    { art: "spanne", name: t("stufeSpanne"), text: t("stufeSpanneText") },
    { art: "nachBefund", name: t("stufeNachBefund"), text: t("stufeNachBefundText") },
    { art: "kostenlos", name: t("stufeKostenlos"), text: t("stufeKostenlosText") },
  ] as const;

  return (
    <>
      {/* Die Ehrlichkeitsstufen stehen VOR dem Katalog. Sie sind der Grund,
          warum dort überhaupt Preise stehen können: Was nicht festpreisfähig
          ist, wird als das ausgewiesen, was es ist — statt wegzubleiben. */}
      <Section className="border-y border-linie">
        <Container className="max-w-[62rem]">
          <AbschnittsLabel nummer="01">{t("stufenLabel")}</AbschnittsLabel>
          <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {stufen.map((s) => (
              <div key={s.art} className="flex gap-3">
                <StufenMarke art={s.art} />
                <div>
                  <dt className="font-semibold">{s.name}</dt>
                  <dd className="mt-1 leading-relaxed text-text-zweit">{s.text}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </Section>
    </>
  );
}
