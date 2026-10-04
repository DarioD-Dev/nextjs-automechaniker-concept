import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";
import { PERSONEN } from "@/data/werkstatt";
import { Link } from "@/i18n/navigation";
import { PfeilRechtsIcon } from "@/components/icons/UiIcons";

export async function Menschen() {
  const t = await getTranslations("Start");
  return (
    <>
      <Section className="border-t border-linie">
        <Container>
          <AbschnittsLabel nummer="05">{t("menschenLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("menschenTitel")}</h2>

          <ul className="kw-auf-reihe mt-8 grid gap-6 sm:grid-cols-3">
            {PERSONEN.map((person) => (
              <li key={person.name}>
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

          <Link
            href="/werkstatt"
            className="group mt-8 -my-1 inline-flex items-center gap-1.5 py-1 text-sm font-medium underline decoration-linie-stark underline-offset-4 transition-colors hover:decoration-instrument"
          >
            {t("zurWerkstatt")}
            <span aria-hidden="true" className="kw-pfeil-schacht">
              <PfeilRechtsIcon className="kw-pfeil-quer size-4" />
            </span>
          </Link>
        </Container>
      </Section>
    </>
  );
}
