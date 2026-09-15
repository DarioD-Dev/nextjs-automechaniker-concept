import type { LeistungsTitel } from "./leistungen";

/** Die drei Dringlichkeitsstufen. Mehr gibt es nicht, und es kommen keine dazu. */
export type Stufe = "sofort" | "bald" | "planbar";

/** Reihenfolge der Stufen. Braucht der Vorbefund, um aus mehreren
 *  Beobachtungen die eine Handlung abzuleiten, die tatsächlich zählt. */
export const STUFEN_RANG = { sofort: 3, bald: 2, planbar: 1 } as const;

export type Haeufigkeit = "haeufig" | "gelegentlich" | "selten";

/** Bereiche der Fahrzeugkontur. Die Kontur erklärt, WO am Auto etwas sitzt —
 *  sie ist ausdrücklich keine Navigation. Niemand soll sein Symptom selbst
 *  einem Fahrzeugsystem zuordnen müssen, um Hilfe zu bekommen. */
export type Zone = "motorraum" | "vorderachse" | "hinterachse" | "abgasanlage" | "innenraum";

export type Art = "warnleuchte" | "symptom";
export type Leuchtfarbe = "rot" | "gelb";

export type Ursache = {
  titel: string;
  haeufigkeit: Haeufigkeit;
  erklaerung: string;
};

export type Pruefschritt = {
  schritt: string;
  dauerMinuten: number;
};

export type Problem = {
  kennung: string;
  art: Art;
  titel: string;
  /** Wie Kunden es nennen. Steht sichtbar auf der Kachel — das hilft der
   *  Wiedererkennung mehr als ein Suchfeld, das bei zwölf Einträgen ohnehin
   *  Beschäftigung ohne Nutzen wäre. */
  volksmund: readonly string[];
  /** Nur Warnleuchten: die echte Farbe der Leuchte im Fahrzeug. */
  leuchtfarbe?: Leuchtfarbe;
  zone: Zone;
  /** Zwei Sätze Klartext: welches System meldet sich, und was heißt das. */
  klartext: string;
  dringlichkeit: Stufe;
  /** Eine Handlungsanweisung im Imperativ. */
  handlung: string;
  /** Umstand, unter dem die Stufe strenger wird. Ausgeschrieben statt
   *  abgefragt — ein Satz ist ehrlicher als ein Entscheidungsbaum, der so
   *  tut, als könne er es wissen. */
  verschaerfung?: string;
  /** Leuchte oder Symptom, mit dem diese Meldung regelmäßig verwechselt wird. */
  verwechslung?: string;
  ursachen: readonly Ursache[];
  pruefschritte: readonly Pruefschritt[];
  pruefkosten: number;
  pruefkostenHinweis?: string;
  reparaturSpanne?: { von: number; bis: number };
  spannenHinweis?: string;
  /** Was sich online NICHT beurteilen lässt. Für jede Karte eigens geschrieben.
   *  Ein Textbaustein an dieser Stelle bricht das ganze Versprechen der Seite. */
  grenze: string;
  /** Die Brücke in die andere Informationswelt: Problem → Leistung.
   *  Der Titel ist gegen den Leistungskatalog getypt — ein Verweis auf eine
   *  Leistung, die es nicht gibt, bricht den Build, statt still ins Leere zu
   *  führen. */
  leistung: { titel: LeistungsTitel; preis: string };
  verwandt: readonly string[];
};
