import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Stufe } from "@/data/types";
import { cn } from "@/lib/cn";

/**
 * Dringlichkeit wird NIE nur über Farbe getragen.
 *
 * Jede Stufe trägt immer drei Signale gleichzeitig: Form, Wort und Farbe.
 * Rot-Grün-Sehschwäche betrifft rund acht Prozent der Männer — bei dieser
 * Zielgruppe ist das keine Randnotiz, sondern der Regelfall im Wartezimmer.
 */
/**
 * Alle Klassennamen stehen hier AUSGESCHRIEBEN — auch die, die sich rechnerisch
 * ableiten ließen.
 *
 * Grund: Tailwind erzeugt nur Utilities, die es als Zeichenkette im Quelltext
 * findet. Ein `rand.replace("border-", "bg-")` liefert zwar den richtigen
 * Namen, aber die Klasse existiert im Stylesheet nicht — das Ergebnis ist eine
 * transparente Fläche bei grünem Build. Genau so war die Dringlichkeitskante
 * beim ersten Versuch unsichtbar.
 */
export const STUFEN_STIL = {
  sofort: {
    text: "text-sofort",
    feld: "bg-sofort-feld",
    rand: "border-sofort",
    voll: "bg-sofort",
    kanteUnten: "border-b-sofort",
    band: "bg-sofort text-white",
  },
  bald: {
    text: "text-text",
    feld: "bg-bald-feld",
    rand: "border-bald",
    voll: "bg-bald",
    kanteUnten: "border-b-bald",
    /* Gelb trägt auf hellem Grund nur 2.04:1 — dunkler Text statt weißem. */
    band: "bg-bald text-text",
  },
  planbar: {
    text: "text-planbar",
    feld: "bg-planbar-feld",
    rand: "border-planbar",
    voll: "bg-planbar",
    kanteUnten: "border-b-planbar",
    band: "bg-planbar text-white",
  },
} as const;

/** Gelb erreicht auf Weiß nur 2.16:1 und ist deshalb niemals Textfarbe.
 *  Für die Symbolfläche ist es richtig — dort trägt es keine Buchstaben. */
export const STUFEN_SYMBOLFARBE = {
  sofort: "text-sofort",
  bald: "text-bald",
  planbar: "text-planbar",
} as const;

export function StufenSymbol({ stufe, className }: { stufe: Stufe; className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={cn("shrink-0", STUFEN_SYMBOLFARBE[stufe], className)}
      aria-hidden="true"
      focusable="false"
    >
      {stufe === "sofort" && <rect x="1" y="1" width="10" height="10" fill="currentColor" />}
      {stufe === "bald" && <path d="M6 1l5.2 9.5H0.8z" fill="currentColor" />}
      {stufe === "planbar" && <circle cx="6" cy="6" r="5" fill="currentColor" />}
    </svg>
  );
}

/** Dieselben Worte für asynchrone Serverkomponenten. `useTranslations` ist
 *  dort nicht aufrufbar — die Hook-Fassung bleibt für synchrone Komponenten. */
export async function getStufenWorte(stufe: Stufe) {
  const t = await getTranslations("Stufe");
  if (stufe === "sofort") return { wort: t("sofortWort"), weiterfahren: t("sofortWeiterfahren") };
  if (stufe === "bald") return { wort: t("baldWort"), weiterfahren: t("baldWeiterfahren") };
  return { wort: t("planbarWort"), weiterfahren: t("planbarWeiterfahren") };
}

export function useStufenWorte() {
  const t = useTranslations("Stufe");
  return (stufe: Stufe) => {
    if (stufe === "sofort") return { wort: t("sofortWort"), weiterfahren: t("sofortWeiterfahren") };
    if (stufe === "bald") return { wort: t("baldWort"), weiterfahren: t("baldWeiterfahren") };
    return { wort: t("planbarWort"), weiterfahren: t("planbarWeiterfahren") };
  };
}
