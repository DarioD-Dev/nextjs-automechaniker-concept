"use client";

import { useTranslations } from "next-intl";
import { MAX_BEOBACHTUNGEN } from "@/lib/vorbefund";
import { HakenIcon, KreuzIcon } from "@/components/icons/UiIcons";
import { knopf } from "@/components/ui/Knopf";
import { useVorbefund } from "./VorbefundProvider";

export function VorbefundKnopf({ kennung }: { kennung: string }) {
  const t = useTranslations("Vorbefund");
  const { enthaelt, umschalten, voll } = useVorbefund();
  const drin = enthaelt(kennung);
  const gesperrt = voll && !drin;

  return (
    <div>
      <button
        type="button"
        onClick={() => umschalten(kennung)}
        disabled={gesperrt}
        aria-pressed={drin}
        className={knopf(drin ? "zweit" : "haupt", gesperrt ? "opacity-50" : undefined)}
      >
        {drin ? <KreuzIcon className="size-4" /> : <HakenIcon className="size-4" />}
        {drin ? t("entfernen") : t("hinzufuegen")}
      </button>
      {gesperrt && (
        <p className="mt-2 text-sm text-text-zweit">{t("voll", { max: MAX_BEOBACHTUNGEN })}</p>
      )}
    </div>
  );
}
