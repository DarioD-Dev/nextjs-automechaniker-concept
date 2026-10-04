import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";
import { ABLAUF } from "@/data/werkstatt";
import { Link } from "@/i18n/navigation";
import { PfeilRechtsIcon } from "@/components/icons/UiIcons";

export async function AblaufKurz() {
  const t = await getTranslations("Start");
  return (
    <>
      {/* FORM C — DIE PROZESSKETTE, KURZFASSUNG
          Dieselbe Form wie auf der Werkstattseite, aber mit den kurzen
          Sätzen: Der volle Wortlaut stand vorher hier und dort wortgleich.
          Wer mehr wissen will, geht auf die Werkstattseite — dafür steht der
          Verweis darunter. */}
      <Section className="border-t border-linie bg-karte">
        <Container>
          <AbschnittsLabel nummer="04">{t("ablaufLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("ablaufTitel")}</h2>

          <ol className="kw-kette mt-10 grid md:grid-cols-2 md:gap-y-12 lg:grid-cols-4 lg:gap-y-0">
            {ABLAUF.map((schritt) => (
              <li
                key={schritt.nummer}
                className="pb-10 pl-6 last:pb-0 md:pt-8 md:pr-8 md:pb-0 md:pl-0"
              >
                <span aria-hidden="true" className="kw-marke bg-akzent" />
                <p className="font-mono text-label tracking-[0.09em] text-titel uppercase">
                  {schritt.label}
                </p>
                <p className="mt-3 font-mono text-[clamp(2.25rem,1.6rem+2vw,3rem)] leading-none font-bold text-titel/60">
                  {schritt.nummer}
                </p>
                <p className="mt-4 max-w-[42ch] leading-relaxed">{schritt.kurz}</p>
              </li>
            ))}
          </ol>

          <Link
            href="/werkstatt"
            className="group mt-10 -my-1 inline-flex items-center gap-1.5 py-1 text-sm font-medium underline decoration-linie-stark underline-offset-4 transition-colors hover:decoration-instrument"
          >
            {t("ablaufMehr")}
            <span aria-hidden="true" className="kw-pfeil-schacht">
              <PfeilRechtsIcon className="kw-pfeil-quer size-4" />
            </span>
          </Link>
        </Container>
      </Section>
    </>
  );
}
