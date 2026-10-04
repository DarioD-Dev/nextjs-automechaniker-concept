import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ANFAHRT, WERKSTATT } from "@/data/werkstatt";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";
import { TelefonKnopf } from "@/components/layout/TelefonKnopf";

export async function Anfahrt() {
  const t = await getTranslations("Werkstatt");
  return (
    <>
      <Section id="anfahrt" className="scroll-mt-20">
        <Container className="max-w-[62rem]">
          <AbschnittsLabel nummer="05">{t("anfahrtLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("anfahrtTitel")}</h2>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                {t("adresse")}
              </h3>
              <address className="mt-3 text-lead not-italic">
                {WERKSTATT.strasse}
                <br />
                {WERKSTATT.plz} {WERKSTATT.ort}
              </address>
              <TelefonKnopf variante="zweit" className="mt-4" />
            </div>
            <div>
              <h3 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                {t("oeffnungszeiten")}
              </h3>
              <dl className="mt-3 divide-y divide-linie border-y border-linie">
                {WERKSTATT.oeffnungszeiten.map((zeit) => (
                  <div key={zeit.tage} className="flex justify-between gap-4 py-2.5">
                    <dt>{zeit.tage}</dt>
                    <dd className="font-mono text-text-zweit">{zeit.zeit}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <ul className="mt-8 divide-y divide-linie border-y border-linie">
            {ANFAHRT.map((weg) => (
              <li key={weg.art} className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                  {weg.art}
                </p>
                <p className="max-w-[58ch] leading-relaxed">{weg.text}</p>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-[62ch] border-t border-linie pt-5 text-sm leading-relaxed text-text-zweit">
            {t("fiktionHinweis")}{" "}
            <Link
              href="/konzept"
              className="-my-1 inline-block py-1 underline decoration-linie-stark underline-offset-4 transition-colors hover:text-titel hover:decoration-instrument"
            >
              {t("zumKonzept")}
            </Link>
          </p>
        </Container>
      </Section>
    </>
  );
}
