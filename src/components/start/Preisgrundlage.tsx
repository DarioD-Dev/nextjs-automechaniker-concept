import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";
import { WERKSTATT } from "@/data/werkstatt";
import { Konstante } from "@/components/ui/Konstante";

export async function Preisgrundlage() {
  const t = await getTranslations("Start");
  return (
    <>
      {/* Zwei Zahlen ohne Rahmen. Zwei gerahmte Karten nebeneinander sähen
          aus wie zwei Angebote — es sind aber zwei Konstanten, die für jede
          Position auf jeder Rechnung gelten. Die Fuge dazwischen ist eine
          Linie, kein Abstand. */}
      <Section className="border-t border-linie">
        <Container>
          <AbschnittsLabel nummer="03">{t("preiseLabel")}</AbschnittsLabel>

          <div className="kw-auf-reihe mt-8 grid gap-8 sm:grid-cols-2 sm:gap-0">
            <Konstante
              titel={t("diagnoseTitel")}
              betrag={`${WERKSTATT.diagnosepauschale} €`}
              text={t("diagnoseText")}
            />
            <Konstante
              titel={t("stundensatzTitel")}
              betrag={`${WERKSTATT.stundensatz} €`}
              text={t("stundensatzText")}
              className="border-linie sm:border-l sm:pl-8"
            />
          </div>

          <h3 className="mt-14 font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
            {t("zusagenTitel")}
          </h3>
          <ul className="mt-4 divide-y divide-linie border-y border-linie">
            {[t("zusage1"), t("zusage2"), t("zusage3")].map((zusage, i) => (
              <li key={zusage} className="flex items-baseline gap-4 py-4">
                <span className="font-mono text-sm text-text-zweit">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lead font-medium">{zusage}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
