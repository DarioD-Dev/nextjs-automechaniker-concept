/**
 * Der Leistungskatalog.
 *
 * Die zweite Informationswelt neben den Problemkarten: Was man bestellen kann,
 * mit Preis und Dauer. Genau hier schlägt KLARWERK die Referenzseiten aus dem
 * Marktabgleich — dort steht in der Übersicht nirgends ein Preis.
 *
 * Bewusst KEINE eigenen Typen in `types.ts`: Dieses Modul importiert nichts
 * aus dem Problem-Modell, dafür importiert `types.ts` von hier die Titel-Union.
 * So sind die Querverweise der zwölf Karten beim Kompilieren geprüft, ohne
 * dass ein Kreis entsteht.
 */

/** Die drei Ehrlichkeitsstufen aus dem Bauplan, plus „kostenlos". Sie sind
 *  der Grund, warum die Übersicht überhaupt Preise zeigen kann: Was nicht
 *  festpreisfähig ist, wird als das ausgewiesen, was es ist. */
export type Ehrlichkeitsstufe = "fest" | "spanne" | "nachBefund" | "kostenlos";

export type LeistungsEintrag = {
  slug: string;
  titel: string;
  preis: string;
  art: Ehrlichkeitsstufe;
  dauer?: string;
  satz: string;
  /** Hat eine eigene Detailseite unter /leistungen/[slug]. */
  detail?: boolean;
  /** Führt stattdessen auf eine andere Seite. */
  ziel?: "/unfall";
};

export type LeistungsGruppe = {
  titel: string;
  eintraege: readonly LeistungsEintrag[];
};

export const LEISTUNGEN = [
  {
    titel: "Pflicht & Vorsorge",
    eintraege: [
      {
        slug: "pickerl",
        titel: "§57a Pickerl",
        preis: "89 €",
        art: "fest",
        dauer: "ca. 45 Minuten",
        satz: "Die gesetzlich vorgeschriebene Begutachtung. Wir sind dafür ermächtigte Begutachtungsstelle.",
        detail: true,
      },
      {
        slug: "jahresservice",
        titel: "Jahresservice",
        preis: "ab 229 €",
        art: "spanne",
        dauer: "2 bis 3 Stunden",
        satz: "Wartung nach Herstellervorgabe. Was Ihr Fahrzeug braucht, hängt an Modell und Laufleistung — deshalb ein Ab-Preis.",
      },
      {
        slug: "oelservice",
        titel: "Ölservice",
        preis: "ab 129 €",
        art: "spanne",
        dauer: "ca. 60 Minuten",
        satz: "Motoröl bis fünf Liter, Ölfilter, Dichtring, Entsorgung. Longlife-Öl mancher Hersteller kostet Aufpreis.",
      },
    ],
  },
  {
    titel: "Reifen & Räder",
    eintraege: [
      {
        slug: "reifenwechsel",
        titel: "Reifenwechsel",
        preis: "49 €",
        art: "fest",
        dauer: "ca. 30 Minuten",
        satz: "Räder tauschen, wuchten, Drücke einstellen, Radbolzen mit Drehmoment anziehen.",
      },
      {
        slug: "reifeneinlagerung",
        titel: "Reifeneinlagerung",
        preis: "69 € je Saison",
        art: "fest",
        satz: "Gereinigt und gekennzeichnet eingelagert. Sie müssen die Räder nicht im Keller stapeln.",
      },
      {
        slug: "reifenkontrolle",
        titel: "Reifenkontrolle",
        preis: "kostenlos",
        art: "kostenlos",
        dauer: "ca. 10 Minuten",
        satz: "Druck, Profiltiefe, Zustand. Ohne Termin, solange jemand frei ist.",
      },
    ],
  },
  {
    titel: "Bremsen & Fahrwerk",
    eintraege: [
      {
        slug: "bremsbelaege-vorne",
        titel: "Bremsbeläge vorne",
        preis: "180–320 €",
        art: "spanne",
        dauer: "60 bis 90 Minuten",
        satz: "Die Spanne kommt vom Fahrzeug, nicht von uns: Teilepreise für Beläge unterscheiden sich um ein Vielfaches.",
      },
      {
        slug: "bremsfluessigkeit",
        titel: "Bremsflüssigkeit wechseln",
        preis: "69 €",
        art: "fest",
        dauer: "ca. 45 Minuten",
        satz: "Alle zwei Jahre fällig. Alte Flüssigkeit zieht Wasser und senkt den Siedepunkt.",
      },
    ],
  },
  {
    titel: "Diagnose & Elektrik",
    eintraege: [
      {
        slug: "diagnose",
        titel: "Fehlersuche & Diagnose",
        preis: "ab 30 €",
        art: "nachBefund",
        satz: "Auslesen kostet 30 €. Die Suche danach ist Arbeitszeit — was wir ansetzen, sagen wir vorher.",
        detail: true,
      },
      {
        slug: "batterietest",
        titel: "Batterietest",
        preis: "kostenlos",
        art: "kostenlos",
        dauer: "ca. 15 Minuten",
        satz: "Spannung, Test unter Last, Ladespannung im Betrieb. Schließt die häufigste Pannenursache aus.",
      },
    ],
  },
  {
    titel: "Klima",
    eintraege: [
      {
        slug: "klimaservice",
        titel: "Klimaservice",
        preis: "99 €",
        art: "fest",
        dauer: "ca. 60 Minuten",
        satz: "Kältemittel absaugen, prüfen, neu befüllen. Mit Desinfektion des Verdampfers 119 €.",
      },
    ],
  },
  {
    titel: "Unfall & Schaden",
    eintraege: [
      {
        slug: "unfallabwicklung",
        titel: "Unfallabwicklung",
        preis: "ohne Aufpreis",
        art: "kostenlos",
        satz: "Schadensaufnahme, Gutachter, Abschleppen, direkte Verrechnung. Karosserie und Lack über unseren Partnerbetrieb.",
        ziel: "/unfall",
      },
    ],
  },
] as const satisfies readonly LeistungsGruppe[];

/** Alle Titel als Union. `types.ts` verwendet sie für das Feld `leistung.titel`
 *  der Problemkarten — ein Querverweis auf eine Leistung, die es nicht gibt,
 *  bricht damit den Build statt still ins Leere zu führen. */
export type LeistungsTitel = (typeof LEISTUNGEN)[number]["eintraege"][number]["titel"];

const ALLE: readonly LeistungsEintrag[] = LEISTUNGEN.flatMap((g) => [...g.eintraege]);

/** Findet immer etwas — der Parametertyp lässt nichts anderes zu. */
export function findeLeistung(titel: LeistungsTitel): LeistungsEintrag {
  const treffer = ALLE.find((e) => e.titel === titel);
  if (!treffer) throw new Error(`Leistung ohne Eintrag: ${titel}`);
  return treffer;
}

export function findeDetail(slug: string): LeistungsDetail | undefined {
  return DETAILS.find((d) => d.slug === slug);
}

export type LeistungsDetail = {
  slug: string;
  titel: string;
  preis: string;
  dauer: string;
  klartext: string;
  /** Der eine Satz, der auf dieser Seite am meisten Ärger verhindert. */
  kernsatz: string;
  ablauf: readonly { titel: string; text: string }[];
  enthalten: readonly string[];
  nichtEnthalten: readonly string[];
  danach: readonly { titel: string; text: string }[];
  grenze: string;
  /** Nur wo Rechtsangaben vorkommen: Absätze plus Stand. */
  rechtliches?: { absaetze: readonly string[]; stand: string };
  verwandteProbleme: readonly string[];
};

/**
 * Die zwei Detailseiten aus dem v1-Scope.
 *
 * Ausgewählt, weil sie etwas erklären, das man sonst nicht weiß: Beim Pickerl
 * die Trennung zwischen Prüfung und Reparatur — dort entsteht der meiste
 * Ärger. Bei der Diagnose die Trennung zwischen Auslesen und Suchen — dort
 * entsteht der meiste Preisstreit.
 */
export const DETAILS = [
  {
    slug: "pickerl",
    titel: "§57a Pickerl",
    preis: "89 €",
    dauer: "ca. 45 Minuten",
    klartext:
      "Die wiederkehrende Begutachtung nach § 57a KFG ist gesetzlich vorgeschrieben. Geprüft wird, ob Ihr Fahrzeug verkehrs- und betriebssicher ist und die Vorschriften zu Abgas und Geräusch einhält. KLARWERK ist dafür ermächtigte Begutachtungsstelle.",
    kernsatz:
      "Die Begutachtung ist eine Prüfung, keine Reparatur. Was dabei auffällt, beheben wir nur, wenn Sie uns damit beauftragen — und Sie sind frei, das woanders machen zu lassen.",
    ablauf: [
      {
        titel: "Bremsen",
        text: "Wirkung und Gleichmäßigkeit am Rollenprüfstand, Leitungen, Zustand der Bremsflüssigkeit.",
      },
      {
        titel: "Beleuchtung und Elektrik",
        text: "Alle Leuchten, Einstellung der Scheinwerfer, Warn- und Sicherheitseinrichtungen.",
      },
      {
        titel: "Fahrwerk und Aufbau",
        text: "Achsen, Lenkung, Stoßdämpfer, Aufhängung und die tragenden Teile der Karosserie.",
      },
      {
        titel: "Reifen und Räder",
        text: "Profiltiefe, Zustand, Befestigung, Freigängigkeit.",
      },
      {
        titel: "Motor, Abgas und Geräusch",
        text: "Abgasmessung, Dichtheit, auffällige Geräuschentwicklung.",
      },
      {
        titel: "Sicht und Rückhaltesysteme",
        text: "Scheiben, Wischer, Spiegel, Gurte und ihre Befestigung.",
      },
    ],
    enthalten: [
      "Begutachtung nach dem gesetzlichen Mängelkatalog",
      "Bremsprüfung am Rollenprüfstand",
      "Abgasmessung",
      "Das Gutachten nach § 57a in Papierform",
      "Die Begutachtungsplakette, wenn Ihr Fahrzeug sie bekommt",
    ],
    nichtEnthalten: [
      "Die Reparatur der Mängel, die dabei auffallen — hier entsteht der meiste Ärger, deshalb steht es an erster Stelle",
      "Ersatzteile jeder Art, auch Glühlampen und Wischerblätter",
      "Service, Ölwechsel oder Wartung — das sind eigene Leistungen",
      "Die Nachbegutachtung nach der Behebung schwerer Mängel",
    ],
    danach: [
      {
        titel: "Ohne Mangel",
        text: "Sie bekommen Plakette und Gutachten und fahren wieder. Das ist der häufigste Ausgang bei gepflegten Fahrzeugen.",
      },
      {
        titel: "Leichter Mangel",
        text: "Die Plakette bekommen Sie trotzdem. Der Mangel steht im Gutachten und gehört behoben — wann und bei wem, entscheiden Sie.",
      },
      {
        titel: "Schwerer Mangel",
        text: "Dann gibt es keine Plakette. Der Mangel muss behoben und das Fahrzeug nachbegutachtet werden. Was das für die weitere Verwendung Ihres Fahrzeugs bedeutet, hängt vom Mangel ab, steht in Ihrem Gutachten und wird bei der Übergabe mit Ihnen besprochen.",
      },
    ],
    grenze:
      "Ob Ihr Fahrzeug die Plakette bekommt, sagen wir Ihnen nicht vorab und schätzen es auch nicht. Wir haben es nicht gesehen — und eine Begutachtung, deren Ergebnis vorher feststeht, wäre keine.",
    rechtliches: {
      absaetze: [
        "Für Personenkraftwagen gilt derzeit die 3-2-1-Regel: erstmals drei Jahre nach der ersten Zulassung, dann nach zwei weiteren Jahren, danach jährlich.",
        "Begutachtet werden kann vom Beginn des Monats vor dem gelochten Monat bis zum Ende des vierten Monats danach.",
        "Das ändert sich: Mit 19. Mai 2027 gelten für PKW die Intervalle 4-2-2-2-1, und die Toleranzfrist nach dem Lochungsmonat entfällt — begutachtet werden kann dann bis zu vier Monate vorher.",
      ],
      stand:
        "Angaben nach § 57a KFG und der 42. KFG-Novelle, Stand September 2026. Verbindlich sind Ihr Zulassungsschein und Ihre Plakette, nicht diese Seite.",
    },
    verwandteProbleme: ["bremsen-quietschen", "bremsanlage", "reifendruck"],
  },
  {
    slug: "diagnose",
    titel: "Fehlersuche & Diagnose",
    preis: "ab 30 €",
    dauer: "ab 15 Minuten",
    klartext:
      "Auslesen und Diagnose sind zwei verschiedene Arbeiten und kosten unterschiedlich viel. Der Fehlerspeicher sagt, welches System sich gemeldet hat. Welches Bauteil dahintersteckt, sagt er nicht.",
    kernsatz:
      "Auslesen ist noch keine Diagnose. Wer Ihnen für 30 Euro eine Diagnose verspricht, verkauft Ihnen das Ablesen eines Codes.",
    ablauf: [
      {
        titel: "Fehlerspeicher auslesen — 30 €, etwa 15 Minuten",
        text: "Wir lesen die Speicher aller erreichbaren Steuergeräte aus, erklären Ihnen die Einträge im Klartext statt als Zahlencode und geben Ihnen den Ausdruck mit. Manchmal ist die Sache damit bereits klar.",
      },
      {
        titel: "Diagnose — ab 60 €, ab einer halben Stunde",
        text: "Lässt der Eintrag mehrere Bauteile zu, wird gemessen: Werte im Betrieb aufzeichnen, Sichtprüfung, gezielte Bauteilprüfung. Abgerechnet nach Arbeitszeit zu 120 € je Stunde. Was wir ansetzen, sagen wir Ihnen vorher.",
      },
    ],
    enthalten: [
      "Auslesen aller erreichbaren Steuergeräte",
      "Erklärung der Einträge im Klartext, nicht als Zahlencode",
      "Ein Ausdruck zum Mitnehmen",
      "Bei beauftragter Diagnose: ein schriftlicher Befund und ein Kostenvoranschlag, bevor etwas repariert wird",
      "Anrechnung: Beauftragen Sie die Reparatur bei uns, rechnen wir die Diagnose an",
    ],
    nichtEnthalten: [
      "Die Reparatur selbst und die Ersatzteile",
      "Das Löschen eines Eintrags, ohne ihn gelesen und mit Ihnen besprochen zu haben",
      "Kodierungen, Freischaltungen und Software-Updates — das ist andere Arbeit",
      "Eine Zusage, dass sich jeder Fehler beim ersten Termin finden lässt",
    ],
    danach: [
      {
        titel: "Sie bekommen einen Befund",
        text: "Was gefunden wurde, was geprüft wurde und was wir daraus schließen. Auf Papier, nicht als mündliche Zusammenfassung zwischen Tür und Angel.",
      },
      {
        titel: "Sie bekommen einen Kostenvoranschlag",
        text: "Bevor wir etwas reparieren. Keine Arbeit ohne Ihre Freigabe — das gilt hier wie überall bei uns.",
      },
      {
        titel: "Sie können damit gehen",
        text: "Der Ausdruck gehört Ihnen. Wenn Sie woanders reparieren lassen wollen, nehmen Sie ihn mit. Das ist ausdrücklich in Ordnung.",
      },
    ],
    grenze:
      "Ein Fehler, der gerade nicht auftritt, steht nicht zwingend im Speicher. Sporadische Aussetzer und Probleme, die nur bei Kälte oder erst nach einer Stunde Fahrt auftreten, brauchen manchmal mehr als einen Termin — im ungünstigen Fall einen Messschreiber über mehrere Tage. Wir sagen Ihnen das, bevor wir anfangen, und nicht danach.",
    verwandteProbleme: ["motorkontrollleuchte", "abs", "partikelfilter"],
  },
] as const satisfies readonly LeistungsDetail[];
