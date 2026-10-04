import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { findeProblem } from "@/data/probleme";
import { knopf } from "@/components/ui/Knopf";
import { PfeilRechtsIcon } from "@/components/icons/UiIcons";
import type { LeistungsDetail } from "@/data/leistungen";

export async function DetailAbschluss({ detail }: { detail: LeistungsDetail }) {
  const t = await getTranslations("Leistungen");
  return (
    <>
      <section className="border border-instrument bg-karte p-5 sm:p-6">
        <h2 className="font-mono text-label tracking-[0.09em] uppercase">{t("detailGrenze")}</h2>
        <p className="mt-3 max-w-[60ch] leading-relaxed">{detail.grenze}</p>
      </section>

      <div className="border-t border-linie pt-6">
        <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
          {t("detailVerwandt")}
        </p>
        <p className="mt-2 text-sm">
          {detail.verwandteProbleme.map((kennung, i) => {
            const problem = findeProblem(kennung);
            if (!problem) return null;
            return (
              <span key={kennung}>
                {i > 0 && " · "}
                <Link
                  href={{ pathname: "/problem/[kennung]", params: { kennung } }}
                  className="underline decoration-linie-stark underline-offset-4 hover:decoration-instrument"
                >
                  {problem.titel}
                </Link>
              </span>
            );
          })}
        </p>
        <Link href="/termin" className={knopf("haupt", "group mt-6")}>
          {t("detailTermin")}
          <span aria-hidden="true" className="kw-pfeil-schacht">
            <PfeilRechtsIcon className="kw-pfeil-quer size-4" />
          </span>
        </Link>
      </div>
    </>
  );
}
