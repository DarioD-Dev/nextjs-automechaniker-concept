/**
 * Inhalte der Unfallseite.
 *
 * Getrennt von `probleme.ts`, weil der Unfall bewusst KEINE Problemkarte ist:
 * Zwei der sieben Kartenfelder brechen hier — die Ursache ist bekannt (es hat
 * gekracht), und im Idealfall zahlt der Kunde gar nichts. Begründung im
 * Bauplan unter „Unfall / Schaden".
 *
 * Rechtsangaben stützen sich auf § 4 StVO 1960 (Verhalten bei Verkehrsunfällen)
 * und die Darstellung auf oesterreich.gv.at. Wo die Rechtslage vom Einzelfall
 * abhängt, steht hier eine Grenze und keine Auskunft.
 */

export const RECHTSSTAND = "September 2026";

/** Notrufnummern. Echt und richtig — ein Notruf wird nicht fiktionalisiert. */
export const NOTRUF = [
  { nummer: "144", wofuer: "Rettung" },
  { nummer: "133", wofuer: "Polizei" },
  { nummer: "112", wofuer: "Euronotruf" },
] as const;

/**
 * Block 02. Kriterien statt Ferndiagnose: Die Seite beurteilt kein Fahrzeug,
 * sie nennt die Merkmale, die eine Werkstatt zuerst abfragt.
 */
export const FAHRBEREITSCHAFT = [
  {
    stufe: "sofort",
    wort: "Nicht weiterfahren",
    zusatz: "Fahrzeug stehen lassen",
    einleitung: "Eines dieser Merkmale genügt:",
    kriterien: [
      "Ein Airbag ist ausgelöst",
      "Unter dem Fahrzeug sammelt sich Flüssigkeit",
      "Ein Rad oder Reifen schleift, steht schief oder ist beschädigt",
      "Licht, Blinker oder Bremslicht funktionieren nicht mehr",
      "Die Windschutzscheibe ist im Sichtfeld beschädigt",
      "Etwas hängt lose herunter oder die Motorhaube schließt nicht",
      "Lenkung oder Bremse fühlen sich anders an als vorher",
    ],
    handlung:
      "Rufen Sie die Pannenhilfe oder uns an. Ein Fahrzeug, auf das eines dieser Merkmale zutrifft, gehört abgeschleppt und nicht gefahren.",
  },
  {
    stufe: "bald",
    wort: "Fahren Sie nur das Nötigste",
    zusatz: "Fristen laufen",
    einleitung: "Das Fahrzeug wirkt fahrbereit, hat aber sichtbaren Schaden:",
    kriterien: [
      "Blech verformt, Stoßstange lose, Scheinwerferglas gesprungen",
      "Das Fahrzeug fährt und bremst unauffällig",
      "Alle Leuchten funktionieren",
    ],
    handlung:
      "Fahren Sie auf direktem Weg nach Hause oder in die Werkstatt. Melden Sie den Schaden Ihrer Versicherung und vereinbaren Sie einen Termin zur Schadensaufnahme.",
  },
  {
    stufe: "planbar",
    wort: "Kein Notfall",
    zusatz: "Fahrzeug unverändert fahrbereit",
    einleitung: "Reiner Blechschaden ohne Einfluss auf die Technik:",
    kriterien: [
      "Parkschaden, Kratzer, Delle",
      "Hagelschaden ohne beschädigte Scheiben",
      "Nichts davon berührt Licht, Bremsen, Räder oder Sicht",
    ],
    handlung:
      "Das lässt sich planen. Fotografieren Sie den Schaden, melden Sie ihn Ihrer Versicherung und suchen Sie sich in Ruhe einen Termin.",
  },
] as const;

/** Block 03 — was mitgenommen werden muss. Der gesetzliche Kern ist der
 *  Nachweis von Name und Anschrift (§ 4 Abs. 5 StVO), der Rest ist das,
 *  was die Schadensregulierung hinterher tatsächlich braucht. */
/**
 * Block 03, Polizeifrage. Vorher standen hier drei Absätze Fließtext — und die
 * Frage, die jemand am Unfallort tatsächlich hat, ist eine Ja/Nein-Frage mit
 * drei Fällen. Als Fallunterscheidung findet man seinen Fall in Sekunden
 * statt ihn aus einem Absatz herauszulesen.
 *
 * Wortlaut und Rechtsgrundlage unverändert (§ 4 StVO 1960), nur aufgeteilt in
 * Fall und Folge. Die Pflicht steht als Wort da, nicht als Farbe: Rot und Gelb
 * tragen auf dieser Seite Fahrbereitschaft.
 */
export const POLIZEI = [
  {
    fall: "Jemand ist verletzt",
    pflicht: "muss",
    folge: "Die nächste Polizeidienststelle sofort verständigen. Das ist keine Ermessensfrage.",
  },
  {
    fall: "Nur Sachschaden, und die Beteiligten haben einander Name und Anschrift nachgewiesen",
    pflicht: "kann",
    folge: "Die Verständigung kann entfallen.",
  },
  {
    fall: "Nur Sachschaden, aber der Nachweis ist nicht möglich — etwa beim Parkschaden ohne Verursacher",
    pflicht: "muss",
    folge: "Den Unfall ohne unnötigen Aufschub der nächsten Polizeidienststelle melden.",
  },
] as const;

/** Was nach dem Unfallort zu tun ist. Zwei Fristen, keine zwei Absätze. */
export const VERSICHERUNG = [
  {
    frist: "Innerhalb einer Woche",
    text: "Melden Sie den Schaden Ihrer Versicherung unverzüglich, spätestens innerhalb einer Woche.",
  },
  {
    frist: "Europäischer Unfallbericht",
    text: "Er ist dafür gemacht und liegt oft im Handschuhfach. Er ersetzt keine Schuldanerkennung — und Sie müssen keine unterschreiben.",
  },
] as const;

export const DATEN = [
  "Name und Anschrift aller Beteiligten — das ist der gesetzliche Kern",
  "Kennzeichen und Fahrzeugtyp aller beteiligten Fahrzeuge",
  "Versicherung und, wenn möglich, Polizzennummer des Unfallgegners",
  "Name und Anschrift von Zeugen, nicht nur deren Telefonnummer",
  "Zeitpunkt und genauer Ort, inklusive Fahrtrichtung",
] as const;

export const FOTOS = [
  "Gesamtansicht mit der Endstellung beider Fahrzeuge, aus mehreren Richtungen",
  "Der Schaden aus der Nähe, möglichst mit einem Größenvergleich im Bild",
  "Beide Kennzeichen, lesbar",
  "Straßenverlauf, Verkehrszeichen, Ampeln, Bodenmarkierungen",
  "Brems- und Schleifspuren, Splitter, Fahrzeugteile auf der Fahrbahn",
] as const;

/** Block 05 — KLARWERK-eigene Demo-Leistungen, keine allgemeinen Aussagen. */
export const UEBERNEHMEN = [
  {
    titel: "Schadensaufnahme",
    text: "Wir fotografieren und vermessen den Schaden so, wie eine Versicherung ihn dokumentiert haben will.",
  },
  {
    titel: "Gutachter organisieren",
    text: "Wir beauftragen einen Sachverständigen und stimmen den Termin mit Ihnen ab.",
  },
  {
    titel: "Abschleppen organisieren",
    text: "Wir schleppen nicht selbst, wir rufen jemanden, der es tut, und nehmen das Fahrzeug an.",
  },
  {
    titel: "Direkte Verrechnung",
    text: "Soweit die Versicherung zustimmt, rechnen wir direkt mit ihr ab. Dann gehen Sie nicht in Vorleistung.",
  },
  {
    titel: "Ersatzfahrzeug nach Verfügbarkeit",
    text: "Wir haben eine kleine Zahl davon. Ob eines frei ist, sagen wir Ihnen bei der Terminvereinbarung — vorher können wir es nicht zusagen.",
  },
  {
    titel: "Lackierung beim Partnerbetrieb",
    text: "Karosserie und Lack machen wir nicht im Haus. Wir geben das an einen Betrieb weiter, mit dem wir arbeiten, und bleiben Ihr Ansprechpartner.",
  },
] as const;

/** Block 06 — die Grenzen. Auf dieser Seite wichtiger als überall sonst. */
export const GRENZEN = [
  {
    titel: "Wer schuld ist",
    text: "Das beurteilen Versicherungen, Sachverständige und notfalls ein Gericht. Nicht wir, und nicht nach Ihrer Schilderung am Telefon.",
  },
  {
    titel: "Ob Ihre Versicherung zahlt",
    text: "Das entscheidet die Versicherung anhand Ihres Vertrags und des Sachverhalts. Wir können Ihnen keine Deckung zusagen.",
  },
  {
    titel: "Was das mit Prämie, Bonus oder Selbstbehalt macht",
    text: "Das steht in Ihrem Vertrag und ist von Gesellschaft zu Gesellschaft verschieden. Fragen Sie dort nach, bevor Sie einen Schaden melden.",
  },
  {
    titel: "Rechtsberatung im Einzelfall",
    text: "Wir erklären den üblichen Ablauf. Eine Auskunft zu Ihrem konkreten Fall ist etwas anderes — dafür gibt es Rechtsanwälte und, wenn Sie eine haben, Ihre Rechtsschutzversicherung.",
  },
  {
    titel: "Was Ihr Fahrzeug noch aushält",
    text: "Ob nach einem Aufprall etwas an Achse, Rahmen oder Sicherheitssystemen gelitten hat, zeigt erst die Vermessung. Aus der Ferne ist das nicht zu beurteilen.",
  },
] as const;
