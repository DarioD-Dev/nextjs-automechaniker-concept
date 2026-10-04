import { getTranslations } from "next-intl/server";
import { DATEN, FOTOS, POLIZEI, RECHTSSTAND, VERSICHERUNG } from "@/data/unfall";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { Liste } from "@/components/unfall/Liste";

export async function Unterlagen() {
  const t = await getTranslations("Unfall");
  return (
    <>
      {/* ── 03 ── */}
      <Section id="unterlagen" className="scroll-mt-20 border-b border-linie bg-karte">
        <Container className="max-w-[60rem]">
          <AbschnittsLabel nummer="03">{t("k03")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("t03")}</h2>
          <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">
            {t("lead03")}
          </p>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <Liste titel={t("datenTitel")} eintraege={DATEN} />
            <Liste titel={t("fotosTitel")} eintraege={FOTOS} />
          </div>

          {/* Fünf gleich aussehende Absätze standen hier untereinander und
              beantworteten fünf verschiedene Fragen. Die erste davon ist eine
              Fallunterscheidung — muss die Polizei kommen? —, und die liest
              man als Tabelle in Sekunden statt als Fließtext in einer Minute.

              Fall links, Pflicht und Folge rechts: dieselbe Leserichtung wie
              in der Preistafel. Das Urteil steht als Wort da, nicht als
              Farbe — Rot und Gelb tragen auf dieser Seite Fahrbereitschaft. */}
          <div className="mt-10 border-t border-linie pt-6">
            <h3 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {t("polizeiTitel")}
            </h3>

            <dl className="mt-4 divide-y divide-linie border-y border-linie">
              {POLIZEI.map((f) => (
                <div key={f.fall} className="grid gap-x-10 gap-y-2 py-5 sm:grid-cols-[1fr_1.05fr]">
                  <dt className="leading-relaxed font-medium">{f.fall}</dt>
                  <dd>
                    <p
                      className={cn(
                        "font-mono text-label tracking-[0.09em] uppercase",
                        f.pflicht === "muss" ? "font-bold text-titel" : "text-text-zweit",
                      )}
                    >
                      {f.pflicht === "muss" ? t("polizeiPflicht") : t("polizeiErmessen")}
                    </p>
                    <p className="mt-1.5 leading-relaxed text-text-zweit">{f.folge}</p>
                  </dd>
                </div>
              ))}
            </dl>

            {/* Dasselbe Raster wie die Tabelle darüber — mit eigener
                Maximalbreite wäre die rechte Spalte schmaler und die Kante
                zwischen Fall und Folge liefe nicht durch. */}
            <div className="mt-5 grid gap-x-10 gap-y-1 sm:grid-cols-[1fr_1.05fr]">
              <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                {t("gebuehrTitel")}
              </p>
              <p className="max-w-[62ch] leading-relaxed text-text-zweit">{t("polizeiGebuehr")}</p>
            </div>
          </div>

          <div className="mt-10 border-t border-linie pt-6">
            <h3 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {t("versicherungTitel")}
            </h3>
            <dl className="mt-4 divide-y divide-linie border-y border-linie">
              {VERSICHERUNG.map((v) => (
                <div key={v.frist} className="grid gap-x-10 gap-y-1 py-4 sm:grid-cols-[1fr_1.05fr]">
                  <dt className="font-medium">{v.frist}</dt>
                  <dd className="leading-relaxed text-text-zweit">{v.text}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 max-w-[68ch] font-mono text-xs leading-relaxed text-text-zweit">
              {t("standHinweis", { stand: RECHTSSTAND })}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
