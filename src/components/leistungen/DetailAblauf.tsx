import { getTranslations } from "next-intl/server";
import type { LeistungsDetail } from "@/data/leistungen";

export async function DetailAblauf({ detail }: { detail: LeistungsDetail }) {
  const t = await getTranslations("Leistungen");
  return (
    <>
      <section>
        <h2 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
          {detail.slug === "pickerl" ? t("detailAblaufPickerl") : t("detailAblaufDiagnose")}
        </h2>
        <ol className="mt-4 divide-y divide-linie border-y border-linie">
          {detail.ablauf.map((schritt, i) => (
            <li key={schritt.titel} className="flex gap-4 py-4">
              <span className="font-mono text-sm text-text-zweit">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-semibold">{schritt.titel}</p>
                <p className="mt-1 max-w-[58ch] leading-relaxed text-text-zweit">{schritt.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
