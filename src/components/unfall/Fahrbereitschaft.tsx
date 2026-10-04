import { getTranslations } from "next-intl/server";
import { FAHRBEREITSCHAFT } from "@/data/unfall";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";
import { StufenSymbol, STUFEN_STIL } from "@/components/problem/Stufe";
import { cn } from "@/lib/cn";

export async function Fahrbereitschaft() {
  const t = await getTranslations("Unfall");
  return (
    <>
      {/* ── 02 ── Dasselbe Dringlichkeits-Bauteil wie auf den Problemkarten:
          Kante links, Signalfläche, Symbol und Wort. Nur die Worte sind
          kontextabhängig. */}
      <Section id="fahren" className="scroll-mt-20 border-b border-linie">
        <Container className="max-w-[60rem]">
          <AbschnittsLabel nummer="02">{t("k02")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("t02")}</h2>
          <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">
            {t("lead02")}
          </p>

          <div className="mt-8 space-y-5">
            {FAHRBEREITSCHAFT.map((lage) => {
              const stil = STUFEN_STIL[lage.stufe];
              return (
                <div key={lage.wort} className={cn("border-l-4 p-5 sm:p-6", stil.feld, stil.rand)}>
                  <p className="flex flex-wrap items-center gap-2.5">
                    <StufenSymbol stufe={lage.stufe} className="size-3.5" />
                    <span className={cn("font-semibold tracking-tight uppercase", stil.text)}>
                      {lage.wort}
                    </span>
                    <span className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                      {lage.zusatz}
                    </span>
                  </p>
                  <p className="mt-3 text-sm text-text-zweit">{lage.einleitung}</p>
                  <ul className="mt-2 space-y-1.5">
                    {lage.kriterien.map((k) => (
                      <li key={k} className="flex gap-2.5 leading-relaxed">
                        <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-current" />
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 max-w-[60ch] border-t border-black/10 pt-4 leading-relaxed font-medium">
                    {lage.handlung}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-6 max-w-[62ch] leading-relaxed text-text-zweit">{t("hinweis02")}</p>
        </Container>
      </Section>
    </>
  );
}
