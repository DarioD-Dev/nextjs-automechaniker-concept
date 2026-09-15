import { useTranslations } from "next-intl";
import type { Stufe } from "@/data/types";
import { cn } from "@/lib/cn";

/**
 * Dringlichkeit wird NIE nur über Farbe getragen.
 *
 * Jede Stufe trägt immer drei Signale gleichzeitig: Form, Wort und Farbe.
 * Rot-Grün-Sehschwäche betrifft rund acht Prozent der Männer — bei dieser
 * Zielgruppe ist das keine Randnotiz, sondern der Regelfall im Wartezimmer.
 */
export const STUFEN_STIL = {
  sofort: { text: "text-sofort", feld: "bg-sofort-feld", rand: "border-sofort" },
  bald: { text: "text-text", feld: "bg-bald-feld", rand: "border-bald" },
  planbar: { text: "text-planbar", feld: "bg-planbar-feld", rand: "border-planbar" },
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

export function useStufenWorte() {
  const t = useTranslations("Stufe");
  return (stufe: Stufe) => {
    if (stufe === "sofort") return { wort: t("sofortWort"), weiterfahren: t("sofortWeiterfahren") };
    if (stufe === "bald") return { wort: t("baldWort"), weiterfahren: t("baldWeiterfahren") };
    return { wort: t("planbarWort"), weiterfahren: t("planbarWeiterfahren") };
  };
}

/** Der Block, der auf jeder Problemkarte an derselben Stelle steht: direkt
 *  unter dem Titel, immer VOR den Ursachen. Wer Angst hat, liest keine
 *  Ursachenliste — er will zuerst wissen, ob es brennt. */
export function StufenBlock({
  stufe,
  handlung,
  verschaerfung,
}: {
  stufe: Stufe;
  handlung: string;
  verschaerfung?: string;
}) {
  const t = useTranslations("Problem");
  const worte = useStufenWorte()(stufe);
  const stil = STUFEN_STIL[stufe];

  return (
    <div className={cn("border-l-4 p-5 sm:p-6", stil.feld, stil.rand)}>
      <p className="flex items-center gap-2.5">
        <StufenSymbol stufe={stufe} className="size-3.5" />
        <span className={cn("font-semibold tracking-tight uppercase", stil.text)}>
          {worte.wort}
        </span>
        <span className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
          {worte.weiterfahren}
        </span>
      </p>
      <p className="mt-3 max-w-[60ch] leading-relaxed">{handlung}</p>
      {verschaerfung && (
        <div className="mt-4 border-t border-black/10 pt-4">
          <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
            {t("verschaerfung")}
          </p>
          <p className="mt-2 max-w-[60ch] leading-relaxed">{verschaerfung}</p>
        </div>
      )}
    </div>
  );
}
