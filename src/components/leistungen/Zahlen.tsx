import { getTranslations } from "next-intl/server";
import { WERKSTATT } from "@/data/werkstatt";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";
import { Konstante } from "@/components/ui/Konstante";

export async function Zahlen() {
  const t = await getTranslations("Leistungen");
  return (
    <>
      {/* Zwei Zahlen — die beiden Beträge, die für jede Position auf jeder
          Rechnung gelten. Ohne Rahmen: Zwei Karten nebeneinander sähen aus
          wie zwei Angebote, dabei sind es zwei Konstanten. Die Fuge zwischen
          ihnen ist eine Linie, kein Abstand. */}
      <Section className="border-t border-linie">
        <Container className="max-w-[62rem]">
          <AbschnittsLabel nummer="03">{t("zahlenLabel")}</AbschnittsLabel>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-0">
            <Konstante
              titel={t("stundensatz")}
              betrag={`${WERKSTATT.stundensatz} €`}
              text={t("stundensatzText")}
            />
            <Konstante
              titel={t("diagnose")}
              betrag={`${WERKSTATT.diagnosepauschale} €`}
              text={t("diagnoseText")}
              className="border-linie sm:border-l sm:pl-8"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
