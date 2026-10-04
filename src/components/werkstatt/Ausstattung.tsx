import { getTranslations } from "next-intl/server";
import { AUSSTATTUNG, NICHT_IM_HAUS } from "@/data/werkstatt";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";

export async function Ausstattung() {
  const t = await getTranslations("Werkstatt");
  return (
    <>
      <Section className="border-b border-linie bg-karte">
        <Container className="max-w-[62rem]">
          <AbschnittsLabel nummer="03">{t("ausstattungLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("ausstattungTitel")}</h2>
          <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">
            {t("ausstattungLead")}
          </p>

          <ul className="mt-8 divide-y divide-linie border-y border-linie">
            {AUSSTATTUNG.map((geraet) => (
              <li key={geraet.titel} className="grid gap-1 py-5 sm:grid-cols-[20rem_1fr] sm:gap-6">
                <p className="font-semibold">{geraet.titel}</p>
                <p className="max-w-[58ch] leading-relaxed text-text-zweit">{geraet.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-l-4 border-linie-stark pl-5">
            <h3 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {t("nichtImHausTitel")}
            </h3>
            <p className="mt-2 max-w-[60ch] leading-relaxed">{NICHT_IM_HAUS}</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
