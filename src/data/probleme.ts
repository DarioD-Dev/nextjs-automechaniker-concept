import type { Problem } from "./types";

/**
 * Die Problemkarten sind das Produkt dieser Seite. Alles andere ist Rahmen.
 *
 * Drei Regeln, die beim Schreiben weiterer Karten gelten:
 *
 * 1. Die billige Ursache wird genannt, wenn es sie gibt. Eine Werkstatt, die
 *    freiwillig auf den 15-Euro-Fall hinweist, beweist mehr als jedes Siegel.
 * 2. `grenze` wird für jede Karte eigens geschrieben. Wenn ein Satz auch auf
 *    einer anderen Karte stehen könnte, ist die Karte nicht fertig.
 * 3. Möglichkeiten bleiben Möglichkeiten. Keine Karte behauptet zu wissen,
 *    was defekt ist. Das weiß erst das Fahrzeug.
 *
 * Stand: drei ausgearbeitete Karten. Sie decken bewusst alle drei
 * Dringlichkeitsstufen ab — die Aufgabe dieses Ausschnitts ist, das System zu
 * beweisen, nicht den Katalog zu füllen.
 */
export const PROBLEME = [
  {
    kennung: "motoroeldruck",
    art: "warnleuchte",
    titel: "Motoröldruck",
    volksmund: ["rote Ölkanne", "Öllampe", "Ölwarnung"],
    leuchtfarbe: "rot",
    zone: "motorraum",
    klartext:
      "Der Öldruck im Motor ist unter den Wert gefallen, den die Steuerung noch als sicher ansieht. Ohne Öldruck laufen die Lager im Motor trocken — das ist der eine Fall am ganzen Fahrzeug, in dem Sekunden zählen.",
    dringlichkeit: "sofort",
    handlung:
      "Halten Sie an, sobald es sicher möglich ist, und stellen Sie den Motor ab. Nicht weiterfahren, auch nicht die letzten zwei Kilometer nach Hause.",
    verwechslung:
      "Nicht zu verwechseln mit der gelben Ölstandsanzeige. Die meldet zu wenig Öl im Behälter, ist ärgerlich und kann bis morgen warten. Die rote Ölkanne meldet fehlenden Druck und kann nicht warten.",
    ursachen: [
      {
        titel: "Ölstand zu niedrig",
        haeufigkeit: "haeufig",
        erklaerung:
          "Der Motor hat über die Zeit Öl verbraucht oder verliert welches. Fällt der Stand weit genug, saugt die Pumpe Luft mit an und der Druck bricht ein.",
      },
      {
        titel: "Defekter Öldruckschalter",
        haeufigkeit: "gelegentlich",
        erklaerung:
          "Der Sensor meldet einen Druckabfall, den es gar nicht gibt. Der Motor ist in Ordnung, nur die Meldung nicht. Am Symptom allein ist dieser Fall nicht vom Ernstfall zu unterscheiden.",
      },
      {
        titel: "Ölpumpe oder zugesetzter Ölfilter",
        haeufigkeit: "gelegentlich",
        erklaerung:
          "Fördert die Pumpe zu wenig oder ist der Filter zu, fällt der Druck im ganzen Kreislauf ab — unabhängig davon, wie viel Öl im Motor ist.",
      },
      {
        titel: "Lagerschaden",
        haeufigkeit: "selten",
        erklaerung:
          "Sind die Lagerspalte im Motor ausgeschlagen, lässt sich kein Druck mehr aufbauen. Das ist der teure Fall — und der Grund, warum man bei dieser Leuchte nicht weiterfährt.",
      },
    ],
    pruefschritte: [
      {
        schritt: "Ölstand am Peilstab messen, Motor von unten auf Undichtigkeiten prüfen",
        dauerMinuten: 10,
      },
      { schritt: "Öldruck mit Prüfmanometer direkt am Motor messen", dauerMinuten: 20 },
      { schritt: "Fehlerspeicher auslesen, Öldruckschalter elektrisch prüfen", dauerMinuten: 15 },
    ],
    pruefkosten: 60,
    pruefkostenHinweis:
      "Eine halbe Stunde Arbeitszeit. Hier wird gemessen, nicht ausgelesen — ein Fehlerspeicher sagt beim Öldruck nichts Verwertbares.",
    reparaturSpanne: { von: 45, bis: 1200 },
    spannenHinweis:
      "Nach oben offen: Ein Lagerschaden bedeutet Motorinstandsetzung und liegt deutlich über dieser Spanne. Ob es so weit kommt, hängt fast immer davon ab, wie lange der Motor nach dem Aufleuchten noch gelaufen ist.",
    grenze:
      "Ob der Öldruck wirklich fehlt oder nur der Schalter falsch meldet, unterscheidet niemand am Telefon und kein Ratgeber im Internet — die beiden Fälle fühlen sich beim Fahren völlig gleich an. Dazwischen liegen 45 Euro und ein Motorschaden. Entschieden wird das mit einem Manometer am Motor, und erst danach reden wir über Geld.",
    leistung: { titel: "Fehlersuche & Diagnose", preis: "ab 30 €" },
    verwandt: ["motorkontrollleuchte"],
  },
  {
    kennung: "motorkontrollleuchte",
    art: "warnleuchte",
    titel: "Motorkontrollleuchte",
    volksmund: ["Motorlampe", "gelber Motor", "Motorsymbol", "MKL"],
    leuchtfarbe: "gelb",
    zone: "motorraum",
    klartext:
      "Die Motorsteuerung hat einen Messwert außerhalb ihres Sollbereichs gefunden und im Fehlerspeicher abgelegt. Die Leuchte sagt, dass etwas nicht stimmt — nicht, was.",
    dringlichkeit: "bald",
    handlung:
      "Sie können kurz und vorsichtig weiterfahren. Lassen Sie den Fehlerspeicher in den nächsten Tagen auslesen, bevor aus einem gespeicherten Wert ein Bauteil wird.",
    verschaerfung:
      "Wenn die Leuchte blinkt, wenn der Motor ruckelt oder wenn spürbar Leistung fehlt, gilt etwas anderes: nicht weiterfahren. Eine blinkende Motorkontrollleuchte bedeutet Verbrennungsaussetzer — die schieben unverbrannten Kraftstoff in den Katalysator und können ihn innerhalb weniger Kilometer zerstören.",
    ursachen: [
      {
        titel: "Tankdeckel nicht richtig geschlossen",
        haeufigkeit: "haeufig",
        erklaerung:
          "Das Tanksystem wird regelmäßig auf Dichtheit geprüft. Ein lose aufgesetzter oder verschlissener Deckel reicht, um die Leuchte auszulösen. Das ist die billigste aller Ursachen, und sie kommt öfter vor, als die meisten glauben.",
      },
      {
        titel: "Lambdasonde gealtert",
        haeufigkeit: "haeufig",
        erklaerung:
          "Sie misst den Restsauerstoff im Abgas. Mit den Jahren wird sie träge, ihre Werte driften, und die Steuerung bemerkt die Abweichung, lange bevor Sie etwas spüren.",
      },
      {
        titel: "Zündspule oder Zündkerze",
        haeufigkeit: "gelegentlich",
        erklaerung:
          "Fällt ein Zylinder zeitweise aus, erkennt die Steuerung das an winzigen Drehzahlschwankungen. Begleitet wird das meist von Ruckeln im Leerlauf.",
      },
      {
        titel: "Abgasrückführung verrußt",
        haeufigkeit: "selten",
        erklaerung:
          "Das Ventil, das einen Teil des Abgases zurück in den Motor führt, setzt sich mit der Zeit zu. Typisch für Dieselfahrzeuge mit viel Kurzstrecke.",
      },
    ],
    pruefschritte: [
      { schritt: "Fehlerspeicher aller Steuergeräte auslesen", dauerMinuten: 10 },
      {
        schritt: "Messwerte im Betrieb aufzeichnen: Lambdawerte, Zündaussetzer je Zylinder",
        dauerMinuten: 15,
      },
      {
        schritt: "Sichtprüfung der betroffenen Bauteile, Leitungen und des Tankdeckels",
        dauerMinuten: 5,
      },
    ],
    pruefkosten: 30,
    pruefkostenHinweis:
      "Das ist das Auslesen des Fehlerspeichers. Auslesen ist noch keine Diagnose: Der Code sagt, welches System sich meldet, nicht welches Bauteil defekt ist. Wenn wir danach suchen müssen, rechnen wir ab der halben Stunde — 60 €, und das sagen wir vorher.",
    reparaturSpanne: { von: 0, bis: 480 },
    spannenHinweis:
      "Die Null ist ernst gemeint. War es der Tankdeckel, löschen wir den Fehler, zeigen Ihnen die Dichtung, und Sie zahlen nur die Diagnose.",
    grenze:
      "Ein undichter Tankdeckel und eine müde Lambdasonde erzeugen exakt dieselbe gelbe Leuchte. Zwischen null und 480 Euro entscheidet allein der Fehlerspeicher — und den kann man nur am Fahrzeug auslesen. Wer Ihnen am Telefon sagt, was es ist, rät.",
    leistung: { titel: "Fehlersuche & Diagnose", preis: "ab 30 €" },
    verwandt: ["motoroeldruck"],
  },
  {
    kennung: "klimaanlage-blaest-warm",
    art: "symptom",
    titel: "Klimaanlage bläst warm",
    volksmund: ["Klima kühlt nicht", "Klimaanlage kaputt", "Klima bläst nur Luft"],
    zone: "innenraum",
    klartext:
      "Die Anlage läuft, aber die Luft wird nicht mehr kalt. In den allermeisten Fällen fehlt Kältemittel — und zwar nicht, weil es verbraucht wird, sondern weil es über die Jahre entwichen ist.",
    dringlichkeit: "planbar",
    handlung:
      "Kein Notfall. Am besten zusammen mit dem nächsten Service erledigen. Wenn Sie es einrichten können: vor dem Frühjahr, dann sind die Termine entspannter.",
    ursachen: [
      {
        titel: "Kältemittel entwichen",
        haeufigkeit: "haeufig",
        erklaerung:
          "Jede Klimaanlage verliert bauartbedingt etwas Kältemittel pro Jahr, auch wenn sie dicht ist. Nach drei bis fünf Jahren reicht die Füllmenge oft nicht mehr aus, um zu kühlen.",
      },
      {
        titel: "Innenraumfilter zugesetzt",
        haeufigkeit: "gelegentlich",
        erklaerung:
          "Kommt kaum noch Luft an, ist nicht die Kühlung das Problem, sondern der Filter. Die Luft ist dann durchaus kalt — es kommt nur zu wenig davon bei Ihnen an.",
      },
      {
        titel: "Undichte Stelle im Kreislauf",
        haeufigkeit: "gelegentlich",
        erklaerung:
          "Verliert die Anlage deutlich schneller als üblich, hat sie ein Leck. Meist an einem O-Ring oder am Kondensator, der vorne im Fahrtwind sitzt und Steinschlag abbekommt.",
      },
      {
        titel: "Kompressor oder Magnetkupplung",
        haeufigkeit: "selten",
        erklaerung:
          "Der Kompressor schaltet nicht mehr zu, obwohl Druck und Elektrik stimmen. Das ist der teure Fall.",
      },
    ],
    pruefschritte: [
      { schritt: "Druck auf Hoch- und Niederdruckseite messen", dauerMinuten: 15 },
      {
        schritt: "Ausblastemperatur an der mittleren Düse messen, Innenraumfilter ansehen",
        dauerMinuten: 5,
      },
      {
        schritt:
          "Bei Verdacht auf ein Leck: Kontrastmittel einfüllen und später mit UV-Lampe suchen",
        dauerMinuten: 20,
      },
    ],
    pruefkosten: 60,
    pruefkostenHinweis:
      "Entfällt, wenn Sie den Klimaservice gleich mitbeauftragen — die Messung ist dort enthalten.",
    reparaturSpanne: { von: 99, bis: 950 },
    spannenHinweis:
      "99 Euro ist der Klimaservice mit neuem Kältemittel, 119 Euro mit Desinfektion des Verdampfers. Alles darüber ist eine echte Reparatur: Kondensator, Leitung oder Kompressor.",
    grenze:
      "Ob die Anlage nur leer ist oder ein Leck hat, zeigt sich erst beim Befüllen und Nachmessen. Deshalb sagen wir Ihnen vorher nicht zu, dass die 99 Euro reichen. Was wir Ihnen zusagen: Kältemittel nachfüllen ohne Lecksuche ist bei einer undichten Anlage weggeworfenes Geld, und wir sagen Ihnen, welcher der beiden Fälle vorliegt, bevor Sie sich entscheiden.",
    leistung: { titel: "Klimaservice", preis: "ab 99 €" },
    verwandt: [],
  },
] as const satisfies readonly Problem[];

export type ProblemKennung = (typeof PROBLEME)[number]["kennung"];

export function findeProblem(kennung: string): Problem | undefined {
  return PROBLEME.find((p) => p.kennung === kennung);
}

export const WARNLEUCHTEN = PROBLEME.filter((p) => p.art === "warnleuchte");
export const SYMPTOME = PROBLEME.filter((p) => p.art === "symptom");
