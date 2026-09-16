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

export type Preisspalte = {
  titel: string;
  betrag: string;
  /** Wie der Betrag zustande kommt — klein neben der Zahl, nie so groß wie sie. */
  zusatz: string;
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
  /**
   * Dieselbe Verschärfung, zerlegt: die einzelnen Merkmale, die jemand am
   * Fahrzeug selbst sehen kann, und die Begründung der Folge.
   *
   * Kein neuer Inhalt — dieselben Teilsätze wie in `verschaerfung`, nur
   * getrennt. Als ein Satz von 300 Zeichen ist der wichtigste
   * Sicherheitshinweis der Karte eine Textwand; als Liste von Merkmalen ist
   * er in zwei Sekunden abgeglichen. `verschaerfung` bleibt erhalten, weil
   * die übrigen Karten weiterhin damit gesetzt werden.
   */
  verschaerfungMerkmale?: readonly string[];
  verschaerfungGrund?: string;
  /** Leuchte oder Symptom, mit dem diese Meldung regelmäßig verwechselt wird. */
  verwechslung?: string;
  ursachen: readonly Ursache[];
  pruefschritte: readonly Pruefschritt[];
  pruefkosten: number;
  pruefkostenHinweis?: string;
  /**
   * Nur dort, wo zwei Arbeiten verwechselt werden, die verschieden viel
   * kosten. Bei der Motorkontrollleuchte entsteht der meiste Preisstreit
   * genau hier: „Fehler auslesen" ist nicht „Fehler finden".
   *
   * Kein neuer Preis und keine neue Zusage — dieselben Angaben, die schon in
   * `pruefkostenHinweis`, im Katalogeintrag „Fehlersuche & Diagnose" und in
   * WERKSTATT stehen, nur als Gegenüberstellung statt als Satz. Wo das Feld
   * fehlt, bleibt es bei `pruefkostenHinweis`.
   */
  preisvergleich?: {
    /** Der eine Satz, der den Unterschied behauptet. Die Tabelle belegt ihn. */
    kernsatz: string;
    spalten: readonly [Preisspalte, Preisspalte];
    zeilen: readonly { merkmal: string; werte: readonly [string, string] }[];
    hinweis?: string;
  };
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
