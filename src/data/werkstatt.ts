/**
 * Alle Angaben erfunden. KLARWERK ist eine Konzeptstudie, kein Betrieb.
 *
 * Die Telefonnummer ist bewusst KEIN tel:-Link. In Österreich gibt es keinen
 * für Fiktion reservierten Rufnummernbereich — ein wählbarer Link würde also
 * irgendwen anklingeln lassen. Stattdessen öffnet die Nummer einen ehrlichen
 * Hinweis. Dieselbe Regel wie beim Formular: die Interaktion zeigen, ohne sie
 * vorzutäuschen.
 */
export const WERKSTATT = {
  name: "KLARWERK",
  zeile: "Wir erklären, bevor wir schrauben.",
  strasse: "Achsengasse 12",
  plz: "1120",
  ort: "Wien",
  telefonAnzeige: "01 234 56 78",
  oeffnungszeiten: [
    { tage: "Montag – Freitag", zeit: "07:30 – 17:30" },
    { tage: "Samstag", zeit: "08:00 – 12:00" },
    { tage: "Sonntag & Feiertag", zeit: "geschlossen" },
  ],
  // An der veröffentlichten Preisliste von V & D Automotive (Wien) geeicht,
  // damit die Demo für einen echten Betrieb nicht sofort unglaubwürdig wirkt:
  // Arbeitszeit Mechanik 120 €/h, Fehler auslesen 30 €. Die Diagnosepauschale
  // ist genau eine halbe Stunde Arbeitszeit — keine Fantasiezahl.
  stundensatz: 120,
  auslesen: 30,
  diagnosepauschale: 60,
  antwortzeit: "innerhalb von 4 Stunden an Werktagen",
} as const;

/** Echt und richtig — und das bleibt so. Ein Notruf wird nicht fiktionalisiert. */
export const PANNENHILFE = [
  { name: "ÖAMTC", nummer: "120" },
  { name: "ARBÖ", nummer: "123" },
] as const;

/**
 * Die Menschen. Namen und Zuständigkeiten sind erfunden — wie alles andere an
 * KLARWERK auch, siehe /de/konzept.
 *
 * Bewusst KEINE Porträtfotos: Ein Stockfoto mit erfundenem Namen und
 * erfundener Zuständigkeit wäre eine Behauptung über eine reale Person.
 * Stattdessen Initialen. Das ist ehrlicher und nebenbei auch ruhiger.
 */
export const PERSONEN = [
  {
    name: "Marko D.",
    initialen: "MD",
    rolle: "Werkstattleitung und Annahme",
    satz: "Nimmt die Fahrzeuge an und ruft Sie an, bevor irgendetwas repariert wird.",
  },
  {
    name: "Elif K.",
    initialen: "EK",
    rolle: "Diagnose und Elektrik",
    satz: "Liest aus, misst nach und schreibt den Befund, den Sie mitbekommen.",
  },
  {
    name: "Thomas R.",
    initialen: "TR",
    rolle: "Begutachtung und Bremsen",
    satz: "Macht die §57a-Begutachtung und geht jeden Punkt im Gutachten mit Ihnen durch.",
  },
] as const;

/**
 * Der Ablauf. Er ist zugleich die Stelle, an der die drei Zusagen von der
 * Startseite konkret werden — eine Zusage, die im Prozess keinen Ort hat,
 * ist keine.
 *
 * `kurz` ist die Fassung für die Startseite. Vorher stand derselbe volle Text
 * auf /de und auf /de/werkstatt — viermal wortgleich, direkt untereinander im
 * selben Besuch. Die Kurzfassung ist keine neue Aussage, sondern dieselbe
 * gekürzt; der vollständige Wortlaut steht weiterhin auf der Werkstattseite.
 */
export const ABLAUF = [
  {
    nummer: "01",
    label: "Annahme",
    kurz: "Wir sagen vorher, was wir prüfen, wie lange es dauert und was es kostet.",
    text: "Sie beschreiben, was Ihnen aufgefallen ist. Wir sehen uns das Fahrzeug an und sagen Ihnen, was wir prüfen wollen, wie lange das dauert und was es kostet — bevor wir anfangen.",
  },
  {
    nummer: "02",
    label: "Befund",
    kurz: "Befund auf Papier: was geprüft wurde, was gefunden wurde, was wir daraus schließen.",
    text: "Wir prüfen. Danach bekommen Sie einen Befund: was geprüft wurde, was gefunden wurde und was wir daraus schließen. Auf Papier, nicht zwischen Tür und Angel.",
  },
  {
    nummer: "03",
    label: "Freigabe",
    kurz: "Keine Arbeit ohne Ihre Freigabe. Wird es teurer als besprochen, rufen wir vorher an.",
    text: "Sie entscheiden. Keine Arbeit ohne Ihre Freigabe. Stellt sich unterwegs heraus, dass es teurer wird als besprochen, rufen wir an — vorher, nicht mit der Rechnung.",
  },
  {
    nummer: "04",
    label: "Abholung",
    kurz: "Rechnung Position für Position. Alte Teile auf Wunsch zurück.",
    text: "Wir gehen die Rechnung mit Ihnen durch, Position für Position. Alte Teile bekommen Sie auf Wunsch zurück.",
  },
] as const;

/** Was tatsächlich in der Halle steht, ohne Superlative. Drei Geräte, die
 *  einen Unterschied für den Kunden machen — und ein Satz darüber, was hier
 *  NICHT steht. */
export const AUSSTATTUNG = [
  {
    titel: "Mehrmarken-Diagnosegerät",
    text: "Zugriff auf die Steuergeräte der gängigen Hersteller. Deshalb müssen Sie für das Auslesen nicht zur Markenvertretung.",
  },
  {
    titel: "Rollenprüfstand für die Bremsprüfung",
    text: "Misst Bremswirkung und Gleichmäßigkeit je Rad. Voraussetzung dafür, dass wir die §57a-Begutachtung überhaupt machen dürfen.",
  },
  {
    titel: "Klimaservicegerät für R134a und R1234yf",
    text: "Ältere und neuere Anlagen brauchen verschiedene Kältemittel und getrennte Geräte. Wir haben beide.",
  },
] as const;

/** Was hier nicht steht. Eine Werkstatt, die Grenzen zugibt, wirkt
 *  kompetenter, nicht schwächer. */
export const NICHT_IM_HAUS =
  "Karosserie und Lack machen wir nicht selbst — dafür arbeiten wir mit einem Partnerbetrieb zusammen und bleiben Ihr Ansprechpartner. Oldtimer und Tuning machen wir gar nicht.";

/** Anfahrt. Ebenfalls erfunden. */
export const ANFAHRT = [
  {
    art: "Öffentlich",
    text: "U6 Niederhofstraße, sechs Minuten zu Fuß. Buslinie 63A hält direkt vor der Tür.",
  },
  {
    art: "Mit dem Auto",
    text: "Kurzparkzone. Für die Dauer eines Termins haben wir Plätze im Hof.",
  },
  {
    art: "Schlüsselübergabe",
    text: "Wenn es früher sein muss als 07:30: Briefkasten neben dem Tor, Formular liegt daneben.",
  },
] as const;
