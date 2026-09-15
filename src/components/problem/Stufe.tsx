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
    <div className={cn("border-l-4", stil.rand, stil.feld)}>
      {/* Das Urteil sitzt in einem kräftigen Band statt in einer großen
          blassen Fläche: kleinere Farbfläche, stärkeres Signal — und die
          Seite wirkt dadurch nicht mehr rosa. */}
      <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 px-5 py-3 sm:px-6", stil.band)}>
        <StufenSymbol stufe={stufe} className="size-3.5 text-current" />
        <span className="font-bold tracking-tight uppercase">{worte.wort}</span>
        <span className="font-mono text-label tracking-[0.09em] uppercase opacity-80">
          {worte.weiterfahren}
        </span>
      </p>
      <p className="max-w-[60ch] px-5 pt-4 pb-5 leading-relaxed sm:px-6 sm:pb-6">{handlung}</p>
      {verschaerfung && (
        <div className="mx-5 border-t border-black/10 pt-4 pb-5 sm:mx-6 sm:pb-6">
          <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
            {t("verschaerfung")}
          </p>
          <p className="mt-2 max-w-[60ch] leading-relaxed">{verschaerfung}</p>
        </div>
      )}
    </div>
  );
}
