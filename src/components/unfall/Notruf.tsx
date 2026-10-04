import { getTranslations } from "next-intl/server";
import { NOTRUF } from "@/data/unfall";
import { Container } from "@/components/ui/Container";
import { AbschnittsLabel } from "@/components/ui/Section";

export async function Notruf() {
  const t = await getTranslations("Unfall");
  return (
    <>
      {/* ── 01 ── Auf der Instrumentfläche statt in Rot: Die Signalfarben
          tragen auf dieser Seite Fahrbereitschaft, nicht Dringlichkeit im
          Allgemeinen. Der Notruf braucht Ernst, nicht den Signalkanal. */}
      <section id="verletzt" className="scroll-mt-20 bg-instrument text-text-auf-instrument">
        <Container className="max-w-[60rem] py-10 sm:py-12">
          <AbschnittsLabel nummer="01" className="text-white/60">
            {t("k01")}
          </AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("t01")}</h2>

          <ul className="mt-6 flex flex-wrap gap-3">
            {NOTRUF.map((n) => (
              <li
                key={n.nummer}
                className="flex min-w-[8.5rem] flex-1 items-baseline gap-3 border border-white/25 px-5 py-4"
              >
                <span className="font-mono text-3xl font-bold">{n.nummer}</span>
                <span className="text-sm text-white/75">{n.wofuer}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-[62ch] leading-relaxed">{t("notrufLead")}</p>
          <p className="mt-1 font-mono text-label tracking-[0.09em] text-white/50 uppercase">
            {t("notrufRecht")}
          </p>
          <p className="mt-5 max-w-[62ch] leading-relaxed">{t("absichern")}</p>
          <p className="mt-5 max-w-[62ch] border-t border-white/15 pt-4 text-sm leading-relaxed text-white/70">
            {t("keineNotfallhilfe")}
          </p>
        </Container>
      </section>
    </>
  );
}
