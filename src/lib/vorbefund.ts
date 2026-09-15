import { PROBLEME, findeProblem } from "@/data/probleme";
import { STUFEN_RANG, type Problem, type Stufe } from "@/data/types";

/**
 * Der Vorbefund ordnet, er diagnostiziert nicht.
 *
 * Gespeichert werden ausschließlich Kennungen — alles Weitere wird aus
 * `PROBLEME` abgeleitet. So kann eine Beobachtung im Speicher des Browsers
 * niemals inhaltlich veralten, wenn eine Karte überarbeitet wird.
 */
export const SPEICHER_SCHLUESSEL = "klarwerk.vorbefund.v1";

/** Mehr als das trägt kein Mensch am Telefon vor, und mehr braucht die
 *  Werkstatt für die Annahme auch nicht. */
export const MAX_BEOBACHTUNGEN = 5;

export function liesKennungen(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const roh = window.sessionStorage.getItem(SPEICHER_SCHLUESSEL);
    if (!roh) return [];
    const wert: unknown = JSON.parse(roh);
    if (!Array.isArray(wert)) return [];
    // Gegen alles gefiltert, was es heute wirklich gibt: ein alter Eintrag aus
    // einer früheren Fassung darf keine leere Karte in den Vorbefund holen.
    return wert.filter((k): k is string => typeof k === "string" && !!findeProblem(k));
  } catch {
    // Privater Modus, gesperrte Website-Daten, voller Speicher: der Vorbefund
    // ist eine Zugabe, nicht die Voraussetzung. Die Seite funktioniert ohne ihn.
    return [];
  }
}

export function schreibeKennungen(kennungen: readonly string[]): void {
  try {
    window.sessionStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify(kennungen));
  } catch {
    /* siehe oben */
  }
}

export function zuProblemen(kennungen: readonly string[]): Problem[] {
  return kennungen.map(findeProblem).filter((p): p is Problem => p !== undefined);
}

/**
 * Die eine Ableitung, die kein anderes Element der Seite leisten kann:
 * Wer zwei Beobachtungen hat, weiß nicht, welche davon die wichtige ist.
 * Die höchste Stufe bestimmt, was jetzt zu tun ist.
 */
export function hoechsteStufe(probleme: readonly Problem[]): Stufe | null {
  let hoechste: Stufe | null = null;
  for (const p of probleme) {
    if (hoechste === null || STUFEN_RANG[p.dringlichkeit] > STUFEN_RANG[hoechste]) {
      hoechste = p.dringlichkeit;
    }
  }
  return hoechste;
}

/** Das Problem, dessen Handlungsanweisung gilt. */
export function massgeblichesProblem(probleme: readonly Problem[]): Problem | null {
  const stufe = hoechsteStufe(probleme);
  if (stufe === null) return null;
  return probleme.find((p) => p.dringlichkeit === stufe) ?? null;
}

/** Die Diagnose deckt mehrere Beobachtungen ab — deshalb das Minimum und
 *  nicht die Summe. Alles andere wäre Rechnen zu unseren Gunsten. */
export function pruefungAb(probleme: readonly Problem[]): number | null {
  if (probleme.length === 0) return null;
  return Math.min(...probleme.map((p) => p.pruefkosten));
}

/**
 * Der Text, der in das Anfrageformular übernommen wird. Ausformuliert, damit
 * der Kunde ihn auch am Telefon vorlesen könnte — genau dafür ist er da.
 */
export function alsAnliegen(probleme: readonly Problem[]): string {
  if (probleme.length === 0) return "";
  const zeilen = probleme.map((p) => `- ${p.titel} (${stufenWort(p.dringlichkeit)})`);
  return [
    probleme.length === 1 ? "Meine Beobachtung:" : "Meine Beobachtungen:",
    ...zeilen,
    "",
    "Zusammengestellt über den Vorbefund auf klarwerk.at.",
  ].join("\n");
}

function stufenWort(stufe: Stufe): string {
  return stufe === "sofort" ? "sofort" : stufe === "bald" ? "bald" : "planbar";
}

/** Nur für die Laufzeitprüfung im Entwicklungsmodus interessant. */
export const ALLE_KENNUNGEN: readonly string[] = PROBLEME.map((p) => p.kennung);
