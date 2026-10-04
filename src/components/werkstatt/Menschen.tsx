import { getTranslations } from "next-intl/server";
import { PERSONEN } from "@/data/werkstatt";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";

export async function Menschen() {
  const t = await getTranslations("Werkstatt");
  return (
    <>
      <Section className="border-b border-linie">
        <Container className="max-w-[62rem]">
          <AbschnittsLabel nummer="02">{t("menschenLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("menschenTitel")}</h2>
          <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">
            {t("menschenLead")}
          </p>

          <ul className="kw-auf-reihe mt-8 grid gap-6 sm:grid-cols-3">
            {PERSONEN.map((person) => (
              <li key={person.name} className="border border-linie bg-karte p-5">
                {/* Initialen statt Stockfoto — Begründung im Datenmodell. */}
                <p
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-full bg-instrument font-mono text-sm font-bold text-text-auf-instrument"
                >
                  {person.initialen}
                </p>
                <p className="mt-4 font-semibold">{person.name}</p>
                <p className="mt-0.5 font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                  {person.rolle}
                </p>
                <p className="mt-3 leading-relaxed text-text-zweit">{person.satz}</p>
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-text-zweit">
            {t("menschenFiktion")}
          </p>
        </Container>
      </Section>
    </>
  );
}
