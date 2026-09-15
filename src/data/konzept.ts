/**
 * Die Offenlegung. Sie ist die einzige Seite, auf der KLARWERK über sich
 * selbst spricht — und die Stelle, an der jede andere Seite ihren Halt hat.
 *
 * Die Trennung ist streng: Was erfunden ist, steht links; was echt ist,
 * rechts. Besonders die Notrufnummern: Sie sind das Einzige auf dieser Seite,
 * nach dem jemand im Ernstfall handeln soll.
 */
export const ERFUNDEN = [
  "Der Name KLARWERK und die Marke dahinter",
  "Die Adresse in der Achsengasse und alles an der Anfahrt",
  "Die Telefonnummer",
  "Die Öffnungszeiten",
  "Alle drei Personen samt Namen, Zuständigkeiten und Initialen",
  "Sämtliche Preise, Dauern und Preisspannen",
  "Die Ermächtigung als Begutachtungsstelle nach § 57a",
  "Die Ausstattung der Werkstatt und der Partnerbetrieb für Lackierarbeiten",
] as const;

export const ECHT = [
  {
    titel: "Die Notrufnummern",
    text: "144 für die Rettung, 133 für die Polizei, 112 als Euronotruf. Dazu ÖAMTC 120 und ARBÖ 123 für Pannen. Ein Notruf wird nicht fiktionalisiert — das ist die einzige Ausnahme von der Regel, dass hier alles erfunden ist.",
  },
  {
    titel: "Die Rechtsangaben",
    text: "§ 4 StVO 1960 zum Verhalten nach einem Verkehrsunfall und § 57a KFG samt der Änderung durch die 42. KFG-Novelle. Beides ist an den Gesetzestexten und an oesterreich.gv.at geprüft und mit einem Stand-Hinweis versehen.",
  },
  {
    titel: "Die technischen Erklärungen",
    text: "Was eine Warnleuchte meldet, wie eine Regeneration abläuft, warum ein Riemenriss mehr als die Batterie betrifft. Recherchiert und bewusst zurückhaltend formuliert: Wo eine Aussage vom Fahrzeug abhängt, steht das dabei.",
  },
  {
    titel: "Die Grenzen",
    text: "Jeder Satz, der sagt, was sich online nicht beurteilen lässt, meint genau das. Diese Sätze sind der eigentliche Punkt des Projekts und nicht die Absicherung dahinter.",
  },
] as const;

export const ATTRAPPE = [
  {
    titel: "Die Telefonnummer wählt nicht",
    text: "Österreich hat keinen für Fiktion reservierten Rufnummernbereich. Ein wählbarer Link würde irgendeinen echten Anschluss anklingeln lassen — von jedem Besucher dieser Demo. Deshalb zeigt der Knopf stattdessen, was passieren würde.",
  },
  {
    titel: "Das Formular sendet nichts",
    text: "Es prüft Ihre Eingaben wie ein echtes Formular und funktioniert auch ohne JavaScript. Danach verwirft es alles und sagt Ihnen das. Ein Formular, das echt aussieht und nichts tut, ist die unangenehmste Sorte Attrappe.",
  },
  {
    titel: "Es gibt keine Bewertungen",
    text: "Wo auf anderen Seiten Sterne und Gesichter stehen, steht hier nichts. Erfundene Bewertungen mit erfundenen Namen wären eine Behauptung über Menschen, die es nicht gibt.",
  },
  {
    titel: "Die Seite steht nicht im Index",
    text: "robots.txt und die Metadaten halten Suchmaschinen fern, damit diese Demo keiner echten Werkstatt den Rang abläuft.",
  },
] as const;
