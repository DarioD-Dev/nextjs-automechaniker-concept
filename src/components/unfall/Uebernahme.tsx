import { getTranslations } from "next-intl/server";
import { UEBERNEHMEN } from "@/data/unfall";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";

export async function Uebernahme() {
  const t = await getTranslations("Unfall");
  return (
    <>
      {/* ── 05 ── */}
      <Section id="leistung" className="scroll-mt-20 border-b border-linie bg-karte">
        <Container className="max-w-[60rem]">
          <AbschnittsLabel nummer="05">{t("k05")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("t05")}</h2>
          <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">
            {t("lead05")}
          </p>

          <ol className="mt-8 divide-y divide-linie border-y border-linie">
            {UEBERNEHMEN.map((leistung, i) => (
              <li key={leistung.titel} className="flex gap-4 py-5">
                <span className="font-mono text-sm text-text-zweit">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-semibold">{leistung.titel}</p>
                  <p className="mt-1 max-w-[58ch] leading-relaxed text-text-zweit">
                    {leistung.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
