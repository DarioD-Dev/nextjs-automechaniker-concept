import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";

export async function Kosten() {
  const t = await getTranslations("Unfall");
  return (
    <>
      {/* ── 04 ── */}
      <Section id="kosten" className="scroll-mt-20 border-b border-linie">
        <Container className="max-w-[60rem]">
          <AbschnittsLabel nummer="04">{t("k04")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("t04")}</h2>
          <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">
            {t("lead04")}
          </p>

          <ul className="mt-8 divide-y divide-linie border-y border-linie">
            {(
              [
                [t("fall1Titel"), t("fall1Text")],
                [t("fall2Titel"), t("fall2Text")],
                [t("fall3Titel"), t("fall3Text")],
              ] as const
            ).map(([titel, text]) => (
              <li key={titel} className="grid gap-1 py-5 sm:grid-cols-[16rem_1fr] sm:gap-6">
                <p className="font-semibold">{titel}</p>
                <p className="leading-relaxed text-text-zweit">{text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 border border-instrument bg-karte p-5 sm:p-6">
            <h3 className="text-block font-semibold">{t("werkstattwahlTitel")}</h3>
            <p className="mt-3 max-w-[60ch] leading-relaxed">{t("werkstattwahlText")}</p>
          </div>

          <p className="mt-6 max-w-[62ch] leading-relaxed text-text-zweit">{t("kostenGrenze")}</p>
        </Container>
      </Section>
    </>
  );
}
