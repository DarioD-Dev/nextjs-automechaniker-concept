# KLARWERK — Kfz-Werkstatt (Konzeptstudie)

> **KLARWERK ist eine fiktive Werkstatt.** Adresse, Preise, Personen,
> Öffnungszeiten und Telefonnummer sind erfunden. Die Seite ist eine
> Konzeptstudie und steht auf `noindex`.

Fünftes der DarioDev-Branchenkonzepte, neben Parfümerie, Friseur und Restaurant.

## Die Idee

> „Wir erklären, bevor wir schrauben."

Wer ein Autoproblem hat, hat **kein System-Problem, sondern ein Symptom** — „da
leuchtet was Gelbes", nicht „ich habe ein Problem im Abgassystem". Die Seite
beginnt deshalb bei dem, was der Kunde tatsächlich hat, und beantwortet seine
dringendste Frage zuerst: **Kann ich noch fahren?**

Drei Dinge machen sie anders als der Branchendurchschnitt:

1. Die Dringlichkeitsfrage wird online und ohne Termin beantwortet.
2. Stundensatz und Diagnosepauschale stehen sichtbar da.
3. Die Seite sagt ausdrücklich, was sie **nicht** beurteilen kann.

## Der Vorbefund

Das Unterscheidungsmerkmal. Er sammelt Beobachtungen über mehrere Problemkarten
hinweg und leitet daraus die eine Aussage ab, die sonst niemand liefert:
**die höchste Dringlichkeit bestimmt die Handlung.** Echte Kunden haben selten
genau ein Symptom — sie haben eine gelbe Leuchte *und* ein Quietschen und
wissen nicht, was davon das Dringende ist.

Er ist druckbar und belegt die Terminanfrage vor. Er **diagnostiziert nicht**:
Er ordnet die Angaben des Kunden und nennt die üblichen Prüfschritte. Der
Haftungssatz steht auf dem Dokument, nicht im Kleingedruckten.

## Stand

Vertikaler Schnitt: Gerüst, Designsystem, Finder, Datenmodell, **drei
vollständig ausgearbeitete Problemkarten** (je eine pro Dringlichkeitsstufe),
Vorbefund, Übergabe an die Terminanfrage.

Offen: die restlichen neun Problemkarten, `/leistungen`, `/werkstatt`,
`/konzept`, Rechtstexte, OG-Bilder je Karte.

## Entwickeln

```bash
npm install
npm run dev        # http://localhost:3000/de
npm run typecheck
npm run lint
npm run build
```

## Entscheidungen, die man kennen sollte

- **Einsprachig deutsch.** Der Kunde ist ein Wiener Autofahrer, §57a ist
  österreichisches Recht, und die inhaltliche Tiefe der Problemkarten ist hier
  der eigentliche USP — eine zweite Sprache würde sie halbieren. Die
  next-intl-Routenschicht steht trotzdem.
- **Keine Scroll-Reveal-Animationen.** Informationsseite. Sichtbar ist der
  Standard.
- **Kein `tel:`-Link.** Österreich hat keinen für Fiktion reservierten
  Rufnummernbereich; ein wählbarer Link würde einen echten Anschluss
  anklingeln lassen. Der Knopf zeigt stattdessen, was passieren würde.
- **Das Formular versendet nichts** und sagt das auf der Bestätigung.
- **Farbe ist Information.** Rot, Gelb und Blau erscheinen ausschließlich in
  Dringlichkeitszusammenhängen — deshalb sind Links unbunt und der Hauptknopf
  trägt die Markenfarbe.
