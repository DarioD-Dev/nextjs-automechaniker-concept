import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Preis } from "@/components/ui/Preis";
import type { LeistungsDetail } from "@/data/leistungen";

export async function DetailKopf({ detail }: { detail: LeistungsDetail }) {
  const t = await getTranslations("Leistungen");
  return (
    <>
      <Link
        href="/leistungen"
        className="-my-1.5 inline-block py-1.5 font-mono text-label tracking-[0.09em] text-text-zweit uppercase underline decoration-linie-stark underline-offset-4 transition-colors hover:text-titel hover:decoration-instrument"
      >
        ← {t("detailZurueck")}
      </Link>

      <h1 className="mt-5 text-hero font-bold">{detail.titel}</h1>

      {/* Auf einer Detailseite gibt es genau einen Preis und genau eine
            Dauer. Hier ist die große Zahl richtig — anders als in der Tafel,
            wo zwölf davon untereinander stünden. */}
      <dl className="mt-6 flex flex-wrap gap-x-12 gap-y-4 border-y border-linie py-6">
        <div>
          <dt className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
            {t("detailPreis")}
          </dt>
          <dd className="mt-3 leading-none">
            <Preis preis={detail.preis} className="text-zahl" />
          </dd>
        </div>
        <div>
          <dt className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
            {t("detailDauer")}
          </dt>
          <dd className="mt-3 font-mono text-block text-text-zweit">{detail.dauer}</dd>
        </div>
      </dl>
    </>
  );
}
