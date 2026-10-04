import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/cn";
import type { LeistungsDetail } from "@/data/leistungen";

export async function DetailRechtliches({ detail }: { detail: LeistungsDetail }) {
  const t = await getTranslations("Leistungen");
  return (
    <>
      {detail.rechtliches && (
        <section>
          <h2 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
            {t("detailRechtliches")}
          </h2>
          {/* Gegenüberstellung statt drei Absätze: Die Frage ist immer
                  „was gilt bei mir", und die Antwort hängt an einem Datum.
                  Nebeneinander sieht man den Unterschied, ohne ihn selbst
                  aus dem Text herauszusuchen. Die beiden Intervallfolgen
                  sind die Anker — deshalb groß und einstellig lesbar. */}
          <div className="mt-5 border-t border-linie-stark">
            {/* Auf dem Telefon beschriftet jede Zelle sich selbst — ein Spaltenkopf
                    über einer einspaltigen Liste wäre dieselbe Angabe zweimal. */}
            <div className="hidden gap-x-8 border-b border-linie py-3 sm:grid sm:grid-cols-[9rem_1fr_1fr]">
              <p className="hidden sm:block" />
              {detail.rechtliches.spalten.map((spalte, i) => (
                <p
                  key={spalte}
                  className={cn(
                    "font-mono text-label tracking-[0.09em] uppercase",
                    i === 0 ? "text-text-zweit" : "font-bold text-titel",
                  )}
                >
                  {spalte}
                </p>
              ))}
            </div>

            {detail.rechtliches.zeilen.map((zeile) => (
              <div
                key={zeile.merkmal}
                className="grid gap-x-8 gap-y-3 border-b border-linie py-5 sm:grid-cols-[9rem_1fr_1fr]"
              >
                <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                  {zeile.merkmal}
                </p>
                {[0, 1].map((i) => (
                  <div key={i}>
                    {/* Auf dem Telefon stehen die beiden Regelwerke
                            untereinander; ohne Spaltenkopf daneben braucht
                            jede Zelle ihre eigene Beschriftung. */}
                    <p
                      className={cn(
                        "font-mono text-label tracking-[0.09em] uppercase sm:hidden",
                        i === 0 ? "text-text-zweit" : "font-bold text-titel",
                      )}
                    >
                      {detail.rechtliches!.spalten[i]}
                    </p>
                    {zeile.zahl && (
                      <p className="mt-1 font-mono text-[clamp(1.25rem,1.05rem+0.6vw,1.625rem)] leading-none font-bold whitespace-nowrap text-titel sm:mt-0">
                        {zeile.zahl[i]}
                      </p>
                    )}
                    {zeile.text[i] && (
                      <p className="mt-2 max-w-[42ch] leading-relaxed text-text-zweit">
                        {zeile.text[i]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="mt-5 max-w-[64ch] font-mono text-xs leading-relaxed text-text-zweit">
            {detail.rechtliches.stand}
          </p>
        </section>
      )}
    </>
  );
}
