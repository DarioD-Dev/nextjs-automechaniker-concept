import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { GRENZEN } from "@/data/unfall";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";
import { knopf } from "@/components/ui/Knopf";
import { PfeilRechtsIcon } from "@/components/icons/UiIcons";
import { TelefonKnopf } from "@/components/layout/TelefonKnopf";
import { cn } from "@/lib/cn";

export async function Grenzen() {
  const t = await getTranslations("Unfall");
  return (
    <>
      {/* ── 06 ── Derselbe Kasten wie „Das können wir online nicht sagen"
          auf den Problemkarten. Hier ist er der wichtigste Abschnitt. */}
      <Section id="grenzen" className="scroll-mt-20">
        <Container className="max-w-[60rem]">
          <AbschnittsLabel nummer="06">{t("k06")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("t06")}</h2>
          <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">
            {t("lead06")}
          </p>

          <ul className="mt-8 border border-instrument bg-karte">
            {GRENZEN.map((grenze, i) => (
              <li key={grenze.titel} className={cn("p-5 sm:p-6", i > 0 && "border-t border-linie")}>
                <p className="font-semibold">{grenze.titel}</p>
                <p className="mt-2 max-w-[60ch] leading-relaxed text-text-zweit">{grenze.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-linie pt-6">
            <p className="text-sm">
              <span className="text-text-zweit">{t("leistung")}: </span>
              <span className="font-medium">{t("leistungTitel")}</span>{" "}
              <span className="font-mono">{t("leistungPreis")}</span>
            </p>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-text-zweit">{t("ctaLead")}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Link href="/termin" className={knopf("haupt", "group")}>
                {t("ctaTermin")}
                <span aria-hidden="true" className="kw-pfeil-schacht">
                  <PfeilRechtsIcon className="kw-pfeil-quer size-4" />
                </span>
              </Link>
              <TelefonKnopf variante="zweit" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
