import { getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";
import { Finder } from "@/components/finder/Finder";
import { WERKSTATT } from "@/data/werkstatt";

export default async function Startseite({ params }: PageProps<"/[locale]">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("Start");

  return (
    <>
      {/* Die Überschrift ist eine Frage, kein Werbeversprechen. Der Claim
          ("Wir erklären, bevor wir schrauben.") steht im Kopf und im Fuß —
          hier gehört der Platz der Frage, die der Besucher mitbringt.
          Kein großes Autofoto: Er hat ein Auto, das weiß er. */}
      <Container className="pt-12 pb-4 sm:pt-20">
        <h1 className="max-w-[16ch] text-hero font-bold">{t("titel")}</h1>
        <p className="mt-5 max-w-[56ch] text-lead text-text-zweit">{t("lead")}</p>
      </Container>

      <Container className="pb-abschnitt sm:pb-abschnitt-lg">
        <div className="mt-10">
          <Finder />
        </div>
      </Container>

      <Section className="border-t border-linie bg-karte">
        <Container>
          <AbschnittsLabel nummer="01">{t("grenzeLabel")}</AbschnittsLabel>
          <h2 className="mt-3 max-w-[20ch] text-abschnitt font-semibold">{t("grenzeTitel")}</h2>
          <div className="mt-5 max-w-[62ch] space-y-4 text-lead leading-relaxed">
            <p>{t("grenzeAbsatz1")}</p>
            <p>{t("grenzeAbsatz2")}</p>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-linie">
        <Container>
          <AbschnittsLabel nummer="02">{t("preiseLabel")}</AbschnittsLabel>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <ZahlenKarte
              titel={t("diagnoseTitel")}
              betrag={`${WERKSTATT.diagnosepauschale} €`}
              text={t("diagnoseText")}
            />
            <ZahlenKarte
              titel={t("stundensatzTitel")}
              betrag={`${WERKSTATT.stundensatz} €`}
              text={t("stundensatzText")}
            />
          </div>

          <h3 className="mt-12 font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
            {t("zusagenTitel")}
          </h3>
          <ul className="mt-4 divide-y divide-linie border-y border-linie">
            {[t("zusage1"), t("zusage2"), t("zusage3")].map((zusage, i) => (
              <li key={zusage} className="flex gap-4 py-4">
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

function ZahlenKarte({ titel, betrag, text }: { titel: string; betrag: string; text: string }) {
  return (
    <div className="border border-linie bg-karte p-6">
      <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">{titel}</p>
      <p className="mt-2 font-mono text-4xl font-bold">{betrag}</p>
      <p className="mt-3 leading-relaxed text-text-zweit">{text}</p>
    </div>
  );
}
