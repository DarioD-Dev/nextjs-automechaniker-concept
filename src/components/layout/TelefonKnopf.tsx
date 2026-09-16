"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { WERKSTATT } from "@/data/werkstatt";
import { TelefonIcon, KreuzIcon } from "@/components/icons/UiIcons";
import { knopf } from "@/components/ui/Knopf";
import { cn } from "@/lib/cn";

/**
 * Bewusst kein tel:-Link.
 *
 * Österreich hat keinen für Fiktion reservierten Rufnummernbereich. Ein
 * wählbarer Link auf einer erfundenen Nummer würde also irgendeinen echten
 * Anschluss anklingeln lassen — von jedem Besucher dieser Arbeitsprobe.
 * Stattdessen zeigt der Knopf, was passieren würde. Dieselbe Regel wie beim
 * Anfrageformular: die Interaktion vorführen, ohne sie vorzutäuschen.
 */
export function TelefonKnopf({
  variante = "still",
  kompakt = false,
  className,
}: {
  variante?: "still" | "zweit" | "instrument";
  /** Auf schmalen Geräten nur das Symbol zeigen. Die Nummer bleibt dabei im
   *  Baum und wird vorgelesen — sie verschwindet nur optisch, nicht für
   *  Hilfsmittel. */
  kompakt?: boolean;
  className?: string;
}) {
  const t = useTranslations("Telefon");
  const dialog = useRef<HTMLDialogElement>(null);

  const stil =
    variante === "instrument"
      ? "-my-1.5 inline-flex items-center gap-2 py-1.5 text-sm font-semibold text-text-auf-instrument underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
      : knopf(variante);

  return (
    <>
      <button
        type="button"
        /* In der Kopfzeile bleibt am Telefon nur das Symbol sichtbar — 16×16
           Trefferfläche für die Nummer, die man im Notfall trifft. Die
           negativen Außenabstände halten die Leiste dabei auf ihrer Höhe. */
        className={cn(
          "group",
          stil,
          kompakt && "max-sm:-m-2.5 max-sm:size-11 max-sm:justify-center",
          className,
        )}
        onClick={() => dialog.current?.showModal()}
      >
        <TelefonIcon className="kw-hoerer size-4 shrink-0" />
        <span className={cn("font-mono tracking-tight", kompakt && "max-sm:sr-only")}>
          {WERKSTATT.telefonAnzeige}
        </span>
      </button>

      {/* Natives <dialog> mit showModal(): Fokusfalle und Escape kommen vom
          Browser, nicht aus nachgebautem JavaScript. */}
      <dialog
        ref={dialog}
        className="m-auto max-w-[26rem] rounded-sm border border-linie bg-karte p-6 text-text backdrop:bg-black/40"
      >
        <h2 className="text-block font-semibold">{t("titel")}</h2>
        <p className="mt-3 text-sm leading-relaxed text-text-zweit">{t("text")}</p>
        <p className="mt-4 font-mono text-lg">{WERKSTATT.telefonAnzeige}</p>
        <button
          type="button"
          className={cn(knopf("zweit"), "mt-5")}
          onClick={() => dialog.current?.close()}
        >
          <KreuzIcon className="size-4" />
          {t("schliessen")}
        </button>
      </dialog>
    </>
  );
}
