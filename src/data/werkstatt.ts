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
