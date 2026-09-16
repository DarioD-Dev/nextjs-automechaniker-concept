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
 * Stand: die vollständigen zwölf Karten des v1-Scopes — acht Warnleuchten und
 * vier Symptome. Die Reihenfolge hier bestimmt die Reihenfolge im Finder:
 * Warnleuchten werden nach Dringlichkeit sortiert (rot vor gelb), Symptome
 * stehen so, wie sie in diesem Feld stehen.
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
      "Der Öldruck im Motor ist unter den Wert gefallen, den die Steuerung noch als sicher ansieht. Ohne Öldruck laufen die Lager im Motor trocken — das ist einer der wenigen Fälle am Fahrzeug, in denen Sekunden zählen.",
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
      "Ob der Öldruck wirklich fehlt oder nur der Schalter falsch meldet, unterscheidet niemand am Telefon — die beiden Fälle fühlen sich beim Fahren gleich an. Dazwischen liegen 45 Euro und ein Motorschaden. Entschieden wird das mit einem Manometer am Motor, und erst danach reden wir über Geld.",
    leistung: { titel: "Fehlersuche & Diagnose", preis: "ab 30 €" },
    verwandt: ["motorkontrollleuchte", "kuehlmitteltemperatur"],
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
    // Dieselben drei Bedingungen wie oben, als Hauptsätze. Das „oder" der
    // Vorlage steckt in der Beschriftung der Liste.
    verschaerfungMerkmale: ["Die Leuchte blinkt", "Der Motor ruckelt", "Es fehlt spürbar Leistung"],
    verschaerfungGrund:
      "Eine blinkende Motorkontrollleuchte bedeutet Verbrennungsaussetzer — die schieben unverbrannten Kraftstoff in den Katalysator und können ihn innerhalb weniger Kilometer zerstören.",
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
    // Dieselben Angaben wie in pruefkostenHinweis und auf der Detailseite
    // „Fehlersuche & Diagnose", nur nebeneinander statt hintereinander.
    // 30 € = WERKSTATT.auslesen, 60 € = WERKSTATT.diagnosepauschale, also
    // genau eine halbe Stunde des Stundensatzes von 120 €.
    preisvergleich: {
      // Wörtlich aus pruefkostenHinweis; derselbe Satz steht als kernsatz auf
      // der Detailseite „Fehlersuche & Diagnose".
      kernsatz: "Auslesen ist noch keine Diagnose.",
      spalten: [
        { titel: "Auslesen", betrag: "30 €", zusatz: "fester Preis" },
        {
          titel: "Diagnose",
          betrag: "ab 60 €",
          zusatz: "Arbeitszeit zu 120 € je Stunde, ab einer halben Stunde",
        },
      ],
      zeilen: [
        {
          merkmal: "Was Sie danach wissen",
          werte: ["Welches System sich meldet.", "Welches Bauteil defekt ist."],
        },
        {
          merkmal: "Was enthalten ist",
          werte: [
            "Auslesen aller erreichbaren Steuergeräte, Erklärung der Einträge im Klartext statt als Zahlencode, ein Ausdruck zum Mitnehmen.",
            "Messwerte im Betrieb, Sichtprüfung, gezielte Bauteilprüfung. Dazu ein schriftlicher Befund und ein Kostenvoranschlag, bevor etwas repariert wird.",
          ],
        },
        {
          merkmal: "Anrechnung",
          werte: ["", "Beauftragen Sie die Reparatur bei uns, rechnen wir die Diagnose an."],
        },
      ],
      hinweis: "Was wir ansetzen, sagen wir Ihnen vorher.",
    },
    reparaturSpanne: { von: 0, bis: 480 },
    spannenHinweis:
      "Die Null ist ernst gemeint. War es der Tankdeckel, löschen wir den Fehler, zeigen Ihnen die Dichtung, und Sie zahlen nur die Diagnose.",
    grenze:
      "Ein undichter Tankdeckel und eine müde Lambdasonde erzeugen exakt dieselbe gelbe Leuchte. Zwischen null und 480 Euro entscheidet allein der Fehlerspeicher — und den kann man nur am Fahrzeug auslesen. Wer Ihnen am Telefon sagt, was es ist, rät.",
    leistung: { titel: "Fehlersuche & Diagnose", preis: "ab 30 €" },
    verwandt: ["motoroeldruck", "partikelfilter"],
  },
  {
    kennung: "kuehlmitteltemperatur",
    art: "warnleuchte",
    titel: "Kühlmitteltemperatur",
    volksmund: ["rotes Thermometer", "Temperaturanzeige", "Motor zu heiß"],
    leuchtfarbe: "rot",
    zone: "motorraum",
    klartext:
      "Das Kühlmittel im Motor ist wärmer geworden, als es sein darf. Überhitzung ist einer der wenigen Fälle, in denen aus einem Bauteil für 90 Euro binnen Minuten ein Schaden für ein Vielfaches wird.",
    dringlichkeit: "sofort",
    handlung:
      "Halten Sie an, sobald es sicher möglich ist, und stellen Sie den Motor ab. Öffnen Sie die Motorhaube, aber nicht den Verschluss des Kühlmittelbehälters — das System steht unter Druck, und heißes Kühlmittel spritzt beim Öffnen heraus.",
    verschaerfung:
      "Wenn Dampf unter der Haube hervorkommt oder es süßlich riecht, bleiben Sie im Fahrzeug sitzen, bis der Dampf nachlässt. Warten Sie mindestens dreißig Minuten, bevor Sie irgendetwas anfassen.",
    ursachen: [
      {
        titel: "Zu wenig Kühlmittel",
        haeufigkeit: "haeufig",
        erklaerung:
          "Der Kreislauf verliert über Jahre etwas Flüssigkeit, oder ein Schlauch ist porös geworden. Fehlt genug davon, transportiert das System die Wärme nicht mehr ab.",
      },
      {
        titel: "Kühlerlüfter läuft nicht",
        haeufigkeit: "haeufig",
        erklaerung:
          "Im Stau und beim Langsamfahren kühlt vor allem der Lüfter. Fällt er aus, fällt das meist zuerst im Stadtverkehr auf und bei zügiger Fahrt kaum, weil dann der Fahrtwind kühlt.",
      },
      {
        titel: "Thermostat klemmt",
        haeufigkeit: "gelegentlich",
        erklaerung:
          "Das Ventil, das den großen Kühlkreis freigibt, öffnet nicht mehr. Der Motor heizt sich auf, obwohl genug Kühlmittel da ist und der Kühler kalt bleibt.",
      },
      {
        titel: "Wasserpumpe oder Zylinderkopfdichtung",
        haeufigkeit: "selten",
        erklaerung:
          "Fördert die Pumpe nicht mehr oder drückt der Motor Abgas in den Kühlkreis, steigt die Temperatur, ohne dass äußerlich etwas zu sehen ist. Das sind die teuren Fälle.",
      },
    ],
    pruefschritte: [
      {
        schritt:
          "Kühlmittelstand und Zustand der Flüssigkeit prüfen, Sichtprüfung auf Undichtigkeiten",
        dauerMinuten: 10,
      },
      { schritt: "Kühlkreis abdrücken und Druckabfall messen", dauerMinuten: 20 },
      { schritt: "Lüfterlauf und Thermostatöffnung im Betrieb beobachten", dauerMinuten: 15 },
    ],
    pruefkosten: 60,
    pruefkostenHinweis:
      "Eine halbe Stunde Arbeitszeit. Der Kühlmittelstand allein ist in zwei Minuten angesehen und kostet nichts — wenn er stimmt, geht die Suche aber erst los.",
    reparaturSpanne: { von: 90, bis: 1400 },
    spannenHinweis:
      "Unten stehen Schlauch, Schelle und neues Kühlmittel. Oben steht die Zylinderkopfdichtung, und die ist nach oben offen: Ab dort hängt der Preis davon ab, wie lange der Motor heiß gelaufen ist.",
    grenze:
      "Ob nur Kühlmittel fehlt oder ob der Motor Abgas in den Kühlkreis drückt, zeigt ein Test an der Flüssigkeit — nicht das Thermometer im Cockpit. Für Sie sehen beide Fälle völlig gleich aus, und dazwischen liegt der Unterschied zwischen einem Schlauch und einem geöffneten Motor.",
    leistung: { titel: "Fehlersuche & Diagnose", preis: "ab 60 €" },
    verwandt: ["pfuetze-unter-dem-auto", "ladekontrolle"],
  },
  {
    kennung: "bremsanlage",
    art: "warnleuchte",
    titel: "Bremsanlage",
    volksmund: ["rotes Ausrufezeichen", "Bremswarnleuchte", "BRAKE"],
    leuchtfarbe: "rot",
    zone: "vorderachse",
    klartext:
      "Diese Leuchte meldet entweder eine angezogene Feststellbremse oder zu wenig Bremsflüssigkeit. Der erste Fall ist harmlos und in drei Sekunden erledigt, der zweite nicht.",
    dringlichkeit: "sofort",
    handlung:
      "Prüfen Sie zuerst, ob die Feststellbremse ganz gelöst ist. Geht die Leuchte danach aus, war es das. Bleibt sie an: anhalten und nicht weiterfahren. Achten Sie dabei darauf, ob sich das Bremspedal weicher anfühlt oder weiter durchtreten lässt als sonst.",
    verwechslung:
      "Manche Fahrzeuge zeigen dieselbe oder eine sehr ähnliche Leuchte auch für die elektrische Feststellbremse. Steht sie nur beim Anfahren kurz an und geht dann aus, war es die Feststellbremse — das ist Absicht und kein Fehler.",
    ursachen: [
      {
        titel: "Feststellbremse nicht vollständig gelöst",
        haeufigkeit: "haeufig",
        erklaerung:
          "Der häufigste Grund und der billigste. Bei Handhebeln reicht ein halber Zentimeter, damit der Schalter noch meldet.",
      },
      {
        titel: "Bremsflüssigkeit unter der Mindestmarke",
        haeufigkeit: "haeufig",
        erklaerung:
          "Der Stand sinkt ganz normal, wenn die Beläge dünner werden — dann ist nichts undicht, die Beläge sind schlicht verbraucht. Er sinkt aber auch, wenn irgendwo Flüssigkeit austritt.",
      },
      {
        titel: "Undichte Leitung oder Radbremszylinder",
        haeufigkeit: "gelegentlich",
        erklaerung:
          "Verliert das System Flüssigkeit, verliert es Druck. Das kündigt sich oft durch ein Pedal an, das sich weicher anfühlt und weiter nach unten geht.",
      },
      {
        titel: "Defekter Füllstandsgeber",
        haeufigkeit: "selten",
        erklaerung:
          "Der Schwimmer im Behälter meldet einen zu niedrigen Stand, den es nicht gibt. Der Unterschied zum Ernstfall ist am Pedal nicht zu spüren.",
      },
    ],
    pruefschritte: [
      { schritt: "Feststellbremse und Füllstand der Bremsflüssigkeit ansehen", dauerMinuten: 5 },
      {
        schritt: "Räder abnehmen, Belagstärke und Leitungen an allen vier Rädern prüfen",
        dauerMinuten: 30,
      },
      {
        schritt: "Bremsflüssigkeit auf Wassergehalt messen, Fehlerspeicher auslesen",
        dauerMinuten: 10,
      },
    ],
    pruefkosten: 60,
    pruefkostenHinweis:
      "Der erste Blick — Feststellbremse und Flüssigkeitsstand — kostet nichts und dauert fünf Minuten. Die 60 Euro fallen an, wenn wir dafür die Räder abnehmen müssen.",
    reparaturSpanne: { von: 0, bis: 520 },
    spannenHinweis:
      "Ganz unten steht bewusst die Null: War es die Feststellbremse, sagen wir Ihnen das an der Tür und Sie zahlen nichts dafür.",
    grenze:
      "Ob die Bremsflüssigkeit nur knapp unter der Marke steht oder irgendwo austritt, können wir online nicht sagen. Der Stand sinkt auch ohne Defekt, wenn die Beläge dünner werden. Welcher Fall vorliegt, entscheidet eine Sichtprüfung an allen vier Rädern — und die geht nur mit abgenommenen Rädern.",
    leistung: { titel: "Fehlersuche & Diagnose", preis: "ab 60 €" },
    verwandt: ["bremsen-quietschen", "abs"],
  },
  {
    kennung: "ladekontrolle",
    art: "warnleuchte",
    titel: "Ladekontrolle",
    volksmund: ["rote Batterie", "Batteriesymbol", "Batterielampe"],
    leuchtfarbe: "rot",
    zone: "motorraum",
    klartext:
      "Das Ladesystem meldet, dass die Batterie nicht mehr geladen wird. Ab jetzt läuft das Fahrzeug aus der Batterie. Wie lange das reicht, hängt an Alter, Temperatur und Verbrauchern — rechnen Sie nicht mit einer bestimmten Strecke.",
    dringlichkeit: "sofort",
    handlung:
      "Halten Sie an, sobald es sicher möglich ist. Schalten Sie vorher alles ab, was Strom zieht und nicht gebraucht wird — Klimaanlage, Sitzheizung, Radio, Gebläse. Fahrlicht bleibt an, solange Sie fahren.",
    verschaerfung:
      "Wenn zusätzlich die Lenkung schwerer wird, die Temperatur steigt oder es nach verbranntem Gummi riecht, ist vermutlich der Riemen gerissen. Dann bleibt es nicht bei einer leeren Batterie — anhalten.",
    ursachen: [
      {
        titel: "Keilrippenriemen gerissen oder abgesprungen",
        haeufigkeit: "haeufig",
        erklaerung:
          "Der Riemen treibt die Lichtmaschine an — je nach Motor zusätzlich Wasserpumpe und Servopumpe. Weil sich von außen nicht feststellen lässt, welche Bauart vor Ihnen steht, entscheidet dieser Fall über die Dringlichkeit.",
      },
      {
        titel: "Lichtmaschine oder Regler defekt",
        haeufigkeit: "haeufig",
        erklaerung:
          "Der Generator liefert keine oder eine zu niedrige Spannung. Der Motor läuft normal weiter, nur wird nichts mehr nachgeladen.",
      },
      {
        titel: "Kabel oder Masseverbindung korrodiert",
        haeufigkeit: "gelegentlich",
        erklaerung:
          "Eine schlechte Verbindung zwischen Lichtmaschine, Batterie und Karosserie kann dieselbe Meldung erzeugen, obwohl beide Bauteile in Ordnung sind.",
      },
      {
        titel: "Batterie am Ende",
        haeufigkeit: "selten",
        erklaerung:
          "Eine defekte Zelle kann sich nicht mehr laden lassen. Dann meldet das System zu Recht, dass nichts ankommt — nur liegt es nicht an der Lichtmaschine.",
      },
    ],
    pruefschritte: [
      { schritt: "Riemen und Riemenspanner ansehen", dauerMinuten: 5 },
      { schritt: "Ladespannung an der Batterie bei laufendem Motor messen", dauerMinuten: 10 },
      {
        schritt: "Batterie unter Last prüfen, Masseverbindungen und Ladeleitung durchmessen",
        dauerMinuten: 20,
      },
    ],
    pruefkosten: 60,
    pruefkostenHinweis:
      "Der Batterie- und Ladetest allein ist bei uns kostenlos. Die 60 Euro fallen an, wenn Riemen, Regler und Verkabelung dazukommen.",
    reparaturSpanne: { von: 80, bis: 850 },
    spannenHinweis:
      "Unten steht ein neuer Riemen, oben eine getauschte Lichtmaschine. Ein gerissener Riemen kann teurer werden als die Lichtmaschine, wenn er beim Reißen andere Bauteile beschädigt hat.",
    grenze:
      "Vom Cockpit aus ist nicht zu unterscheiden, ob die Lichtmaschine nicht mehr lädt oder der Riemen gerissen ist. Der Unterschied ist erheblich: Der Riemen treibt bei den meisten Motoren auch die Wasserpumpe an — dann steht nach wenigen Minuten auch die Kühlung. Deshalb raten wir hier zum Anhalten.",
    leistung: { titel: "Batterietest", preis: "kostenlos" },
    verwandt: ["springt-nicht-an", "kuehlmitteltemperatur"],
  },
  {
    kennung: "abs",
    art: "warnleuchte",
    titel: "ABS",
    volksmund: ["ABS-Leuchte", "ABS im Kreis"],
    leuchtfarbe: "gelb",
    zone: "vorderachse",
    klartext:
      "Das Antiblockiersystem hat sich abgeschaltet. Die hydraulische Bremse arbeitet weiter, das Fahrzeug bremst. Was fehlt, ist die Regelung, die bei einer Vollbremsung das Blockieren der Räder verhindert. Bei vielen Fahrzeugen fällt damit auch die Stabilitätsregelung ESP aus — ob bei Ihrem Modell, steht in der Betriebsanleitung.",
    dringlichkeit: "bald",
    handlung:
      "In der Regel können Sie weiterfahren — maßgeblich ist die Betriebsanleitung Ihres Fahrzeugs. Halten Sie mehr Abstand und rechnen Sie damit, dass die Räder bei einer Vollbremsung blockieren und das Fahrzeug dabei nicht mehr lenkbar ist. Fehlerspeicher in den nächsten Tagen auslesen lassen.",
    verschaerfung:
      "Wenn gleichzeitig die rote Bremswarnleuchte an ist, gilt etwas anderes: Dann meldet nicht nur die Regelung, sondern die Bremsanlage selbst. In dem Fall nicht weiterfahren.",
    ursachen: [
      {
        titel: "Raddrehzahlsensor verschmutzt oder defekt",
        haeufigkeit: "haeufig",
        erklaerung:
          "An jedem Rad sitzt ein Sensor, der die Drehzahl misst. Metallspäne, Feuchtigkeit oder ein gebrochenes Kabel reichen, damit einer davon ausfällt — und ohne alle vier Werte schaltet das System ab.",
      },
      {
        titel: "Sensorring beschädigt",
        haeufigkeit: "gelegentlich",
        erklaerung:
          "Der Ring, den der Sensor abliest, kann Rost ansetzen oder beschädigt werden. Die Werte werden dann unregelmäßig, obwohl der Sensor selbst in Ordnung ist.",
      },
      {
        titel: "Schwache Batterie",
        haeufigkeit: "gelegentlich",
        erklaerung:
          "Sackt die Bordspannung beim Starten zu weit ab, legen mehrere Steuergeräte einen Fehler ab. Das ABS ist dabei oft das erste, das sich meldet.",
      },
      {
        titel: "Hydraulikaggregat oder Steuergerät",
        haeufigkeit: "selten",
        erklaerung:
          "Der teure Fall. Von außen und am Fahrverhalten ist er von einem defekten Sensor nicht zu unterscheiden.",
      },
    ],
    pruefschritte: [
      { schritt: "Fehlerspeicher des ABS-Steuergeräts auslesen", dauerMinuten: 10 },
      {
        schritt: "Raddrehzahlwerte aller vier Räder während einer Probefahrt aufzeichnen",
        dauerMinuten: 15,
      },
      { schritt: "Betroffenen Sensor, Kabel und Sensorring ansehen", dauerMinuten: 15 },
    ],
    pruefkosten: 30,
    pruefkostenHinweis:
      "Das ist das Auslesen. Zeigt der Speicher einen einzelnen Sensor, ist die Sache damit oft schon klar. Muss die Ursache erst gesucht werden, rechnen wir ab der halben Stunde — 60 Euro, und das sagen wir vorher.",
    reparaturSpanne: { von: 90, bis: 1200 },
    spannenHinweis:
      "Unten steht ein einzelner Sensor, oben ein Hydraulikaggregat. Welches von beidem es ist, entscheidet der Fehlerspeicher — nicht das Fahrgefühl.",
    grenze:
      "Ob ein einzelner Raddrehzahlsensor meldet oder das Steuergerät selbst, steht im Fehlerspeicher, und die Preise dafür liegen weit auseinander. Am Fahrverhalten merken Sie den Unterschied nicht: Die Leuchte sieht in beiden Fällen gleich aus, und die Bremse fühlt sich gleich an.",
    leistung: { titel: "Fehlersuche & Diagnose", preis: "ab 30 €" },
    verwandt: ["bremsanlage", "reifendruck"],
  },
  {
    kennung: "reifendruck",
    art: "warnleuchte",
    titel: "Reifendruck",
    volksmund: ["gelbes Hufeisen", "RDKS", "Reifendruckkontrolle"],
    leuchtfarbe: "gelb",
    zone: "vorderachse",
    klartext:
      "Das System überwacht den Luftdruck aller vier Räder und meldet eine Abweichung. In den meisten Fällen fehlt tatsächlich Luft — und zwar an einem Rad, dem man das von außen nicht ansieht.",
    dringlichkeit: "bald",
    handlung:
      "Prüfen Sie den Luftdruck an der nächsten Tankstelle, bevor Sie einen Termin ausmachen. Der Sollwert steht je nach Fahrzeug im Türrahmen der Fahrerseite, im Tankdeckel oder in der Betriebsanleitung. Das kostet nichts und klärt die Sache oft schon.",
    verschaerfung:
      "Wenn das Fahrzeug zur Seite zieht, das Lenkrad schwammig wird oder es beim Fahren dumpf schlägt, halten Sie an und sehen Sie nach. Ein Reifen, der schnell Luft verliert, ist etwas anderes als einer, der über Wochen einen Zehntelbar abgibt.",
    verwechslung:
      "Im Herbst meldet dieses System besonders oft, ohne dass etwas defekt ist: Kalte Luft hat weniger Volumen. Zehn Grad Temperaturabfall senken den Druck um etwa ein Zehntel Bar, und das reicht bei manchen Fahrzeugen schon für die Warnung.",
    ursachen: [
      {
        titel: "Zu wenig Luft",
        haeufigkeit: "haeufig",
        erklaerung:
          "Jeder Reifen verliert mit der Zeit etwas Luft, auch ohne Defekt. Nachfüllen kostet an der Tankstelle nichts und ist in fünf Minuten erledigt.",
      },
      {
        titel: "Nagel oder Schraube im Reifen",
        haeufigkeit: "haeufig",
        erklaerung:
          "Ein eingefahrener Fremdkörper dichtet sich oft selbst ab und lässt den Reifen nur langsam Luft verlieren. Genau deshalb fällt er meist erst über das Warnsystem auf.",
      },
      {
        titel: "Sensorbatterie am Ende",
        haeufigkeit: "gelegentlich",
        erklaerung:
          "In jedem Rad sitzt ein kleiner Funksender mit fest verbauter Batterie. Sie hält üblicherweise fünf bis zehn Jahre; danach meldet das System, obwohl der Druck stimmt.",
      },
      {
        titel: "System nach Radwechsel nicht angelernt",
        haeufigkeit: "gelegentlich",
        erklaerung:
          "Nach einem Räderwechsel muss das System die neuen Sensoren übernehmen. Unterbleibt das, sucht es weiter nach den alten.",
      },
    ],
    pruefschritte: [
      {
        schritt: "Luftdruck aller vier Räder messen und auf Sollwert korrigieren",
        dauerMinuten: 10,
      },
      { schritt: "Reifen auf Fremdkörper und Beschädigungen absuchen", dauerMinuten: 10 },
      {
        schritt: "Sensorwerte und Fehlerspeicher auslesen, wenn der Druck stimmt",
        dauerMinuten: 10,
      },
    ],
    pruefkosten: 30,
    pruefkostenHinweis:
      "Luftdruck prüfen und korrigieren kostet bei uns nichts. Die 30 Euro fallen erst an, wenn der Druck stimmt und wir das System auslesen müssen.",
    reparaturSpanne: { von: 0, bis: 480 },
    spannenHinweis:
      "Null, wenn nur Luft gefehlt hat. Oben stehen vier neue Sensoren samt Montage — der Fall, der bei alten Sensoren irgendwann ansteht.",
    grenze:
      "Ob tatsächlich Luft fehlt oder nur ein Sensor müde ist, klärt ein Messgerät in zwei Minuten — aber nicht der Bildschirm. Prüfen Sie den Druck zuerst selbst. Das kostet nichts und beantwortet die Frage in den meisten Fällen bereits vollständig.",
    leistung: { titel: "Reifenkontrolle", preis: "kostenlos" },
    verwandt: ["abs"],
  },
  {
    kennung: "partikelfilter",
    art: "warnleuchte",
    titel: "Partikelfilter",
    volksmund: ["DPF-Leuchte", "Rußfilter", "Partikelfilter-Warnung"],
    leuchtfarbe: "gelb",
    zone: "abgasanlage",
    klartext:
      "Der Filter, der den Ruß aus dem Abgas holt, ist voll und hat sich nicht selbst freibrennen können. Die Leuchte ist zunächst eine Aufforderung, keine Fehlermeldung — sie sagt, dass das Fahrzeug jetzt eine bestimmte Art von Fahrt braucht.",
    dringlichkeit: "bald",
    handlung:
      "Fahren Sie zwanzig bis dreißig Minuten ohne Halt bei gleichmäßig höherer Drehzahl — Landstraße oder Autobahn, üblicherweise um 2.000 bis 3.000 Umdrehungen. Was Ihr Hersteller vorgibt, steht in der Betriebsanleitung und geht unseren Angaben vor. Geht die Leuchte danach nicht aus, machen Sie einen Termin aus.",
    verschaerfung:
      "Wenn zusätzlich die Motorkontrollleuchte angeht oder die Leistung spürbar nachlässt, hören Sie mit den Regenerationsversuchen auf. Ab da schaltet die Steuerung in ein Notprogramm, und weiteres Fahren macht den Filter nicht wieder frei.",
    ursachen: [
      {
        titel: "Zu viel Kurzstrecke",
        haeufigkeit: "haeufig",
        erklaerung:
          "Der Filter brennt sich nur frei, wenn das Abgas heiß genug wird. Wer überwiegend wenige Kilometer am Stück fährt, erreicht diese Temperatur nie — der Filter füllt sich langsam zu.",
      },
      {
        titel: "Regeneration wurde wiederholt abgebrochen",
        haeufigkeit: "haeufig",
        erklaerung:
          "Startet das Fahrzeug eine Reinigungsfahrt und der Motor wird vorher abgestellt, bricht der Vorgang ab. Passiert das mehrmals, meldet sich das System.",
      },
      {
        titel: "Differenzdrucksensor defekt",
        haeufigkeit: "gelegentlich",
        erklaerung:
          "Der Sensor misst, wie stark das Abgas gestaut wird. Meldet er falsch, hält die Steuerung einen freien Filter für voll — oder umgekehrt.",
      },
      {
        titel: "Filter am Ende seiner Lebensdauer",
        haeufigkeit: "selten",
        erklaerung:
          "Asche lässt sich nicht wegbrennen, sie bleibt. Nach genügend Kilometern ist der Filter zu, und dann hilft nur Reinigen oder Tauschen.",
      },
    ],
    pruefschritte: [
      {
        schritt: "Fehlerspeicher auslesen, Beladungswert und Aschemenge ablesen",
        dauerMinuten: 10,
      },
      { schritt: "Differenzdruck im Betrieb messen", dauerMinuten: 15 },
      {
        schritt: "Wenn möglich: Regeneration am Gerät anstoßen und den Verlauf mitschreiben",
        dauerMinuten: 30,
      },
    ],
    pruefkosten: 30,
    pruefkostenHinweis:
      "Das Auslesen zeigt den Beladungswert und damit meist schon, ob eine Fahrt genügt. Eine am Gerät angestoßene Regeneration dauert eine halbe bis dreiviertel Stunde und kostet ab 60 Euro — das besprechen wir vorher mit Ihnen.",
    reparaturSpanne: { von: 0, bis: 1800 },
    spannenHinweis:
      "Null, wenn eine ordentliche Fahrt reicht — dann kostet es Sie nur Sprit. Oben steht ein neuer Filter. Dazwischen liegen Zwangsregeneration und Reinigung.",
    grenze:
      "Ob der Filter nur voll ist oder am Ende, entscheidet der gemessene Gegendruck zusammen mit der Aschemenge. Zwischen diesen beiden Fällen liegen eine Autobahnfahrt und ein vierstelliger Betrag — und von außen sehen sie gleich aus.",
    leistung: { titel: "Fehlersuche & Diagnose", preis: "ab 30 €" },
    verwandt: ["motorkontrollleuchte"],
  },
  {
    kennung: "pfuetze-unter-dem-auto",
    art: "symptom",
    titel: "Süßlicher Geruch oder Pfütze unter dem Auto",
    volksmund: ["Pfütze unterm Auto", "süßlicher Geruch", "Kühlwasser verloren"],
    zone: "motorraum",
    klartext:
      "Ein süßlicher Geruch beim Aussteigen deutet auf Kühlmittel hin; es riecht deutlich anders als Benzin oder Öl. Zusammen mit einer Pfütze unter dem Motor oder einem fallenden Kühlmittelstand ist das ein ernstzunehmender Hinweis auf eine undichte Stelle im Kühlkreis.",
    dringlichkeit: "sofort",
    handlung:
      "Sehen Sie auf die Temperaturanzeige. Steht sie höher als sonst oder riecht es süßlich, fahren Sie nicht weiter. Prüfen Sie bei kaltem Motor den Kühlmittelstand — und öffnen Sie den Verschluss nicht, solange der Motor warm ist.",
    verwechslung:
      "Klares, geruchloses Wasser unter der Beifahrerseite ist im Sommer völlig normal: Das ist Kondenswasser der Klimaanlage und kein Defekt. Erst Farbe im Wasser, ein süßlicher Geruch oder eine Pfütze unter dem Motor sind ein Grund nachzusehen.",
    ursachen: [
      {
        titel: "Poröser Kühlmittelschlauch oder lose Schelle",
        haeufigkeit: "haeufig",
        erklaerung:
          "Gummi wird über die Jahre hart und reißt an den Krümmungen. Meist tropft es nur bei warmem Motor, weil der Kreis dann unter Druck steht.",
      },
      {
        titel: "Undichter Kühler oder Ausgleichsbehälter",
        haeufigkeit: "gelegentlich",
        erklaerung:
          "Der Kühler sitzt vorne im Fahrtwind und bekommt Steinschlag ab. Der Behälter daneben bekommt Risse, wenn er alt wird.",
      },
      {
        titel: "Wasserpumpe oder Zylinderkopfdichtung",
        haeufigkeit: "selten",
        erklaerung:
          "Beide verlieren Kühlmittel, ohne dass viel davon nach außen kommt. Genau deshalb fällt hier oft zuerst der Geruch auf und nicht die Pfütze.",
      },
    ],
    pruefschritte: [
      {
        schritt: "Flüssigkeit an der Austrittsstelle ansehen: Farbe, Geruch, Konsistenz",
        dauerMinuten: 5,
      },
      {
        schritt: "Kühlkreis bei kaltem Motor abdrücken und Druckabfall über Zeit messen",
        dauerMinuten: 20,
      },
      {
        schritt: "Motorraum und Unterboden mit Lampe absuchen, bei Bedarf Kontrastmittel einfüllen",
        dauerMinuten: 20,
      },
    ],
    pruefkosten: 60,
    pruefkostenHinweis:
      "Eine halbe Stunde Arbeitszeit. Wenn Sie ein Foto der Pfütze mitbringen, spart das oft den ersten Schritt — die Farbe sagt schon viel.",
    reparaturSpanne: { von: 90, bis: 1400 },
    spannenHinweis:
      "Unten stehen Schlauch und Schelle. Oben steht wieder die Zylinderkopfdichtung. Und wenn sich herausstellt, dass es Kondenswasser der Klimaanlage war, ist gar nichts kaputt — das sagen wir Ihnen, ohne etwas zu berechnen.",
    grenze:
      "Woher die Flüssigkeit kommt, sieht man nicht an der Pfütze, sondern an der Austrittsstelle — und die liegt meistens oben, nicht unten. Deshalb drücken wir den Kreis ab, statt zu raten. Aus der Ferne gar nicht zu beurteilen: ob überhaupt Kühlmittel fehlt oder ob Sie Kondenswasser vor sich haben.",
    leistung: { titel: "Fehlersuche & Diagnose", preis: "ab 60 €" },
    verwandt: ["kuehlmitteltemperatur", "klimaanlage-blaest-warm"],
  },
  {
    kennung: "bremsen-quietschen",
    art: "symptom",
    titel: "Quietschen oder Schleifen beim Bremsen",
    volksmund: ["Bremsen quietschen", "Schleifen beim Bremsen", "Bremsen pfeifen"],
    zone: "vorderachse",
    klartext:
      "Quietschen und Schleifen sind zwei verschiedene Geräusche mit sehr verschiedenen Folgen. Quietschen ist oft harmlos. Ein metallisches Schleifen oder Mahlen ist es nie.",
    dringlichkeit: "bald",
    handlung:
      "Wenn es nur quietscht: Sie können weiterfahren, lassen Sie die Bremsen in den nächsten Tagen ansehen. Achten Sie darauf, ob das Geräusch nach den ersten Bremsungen verschwindet — dann war es meist nur Flugrost.",
    verschaerfung:
      "Wenn es metallisch schleift oder mahlt, wenn das Pedal vibriert oder wenn der Bremsweg länger geworden ist, fahren Sie nicht weiter. Dann läuft möglicherweise das Trägerblech des Belags auf der Scheibe — und aus einem Belagwechsel werden Belag und Scheibe.",
    verwechslung:
      "Nach einer Nacht im Regen quietschen fast alle Bremsen bei den ersten Bremsungen. Das ist Flugrost auf der Scheibe, er wird beim Bremsen abgetragen, und nach zwei Minuten ist Ruhe. Bleibt das Geräusch dagegen den ganzen Tag, ist es etwas anderes.",
    ursachen: [
      {
        titel: "Flugrost oder Bremsstaub",
        haeufigkeit: "haeufig",
        erklaerung:
          "Feuchtigkeit über Nacht, Staub in der Sattelführung. Verschwindet nach den ersten Bremsungen von selbst und kostet nichts.",
      },
      {
        titel: "Verschleißanzeiger",
        haeufigkeit: "haeufig",
        erklaerung:
          "In viele Beläge ist ein Metallplättchen eingelassen, das absichtlich zu quietschen beginnt, wenn der Belag dünn wird. Es ist eine Ankündigung, kein Defekt — und sie kommt früh genug, um in Ruhe einen Termin zu machen.",
      },
      {
        titel: "Belag durchgefahren",
        haeufigkeit: "gelegentlich",
        erklaerung:
          "Ist der Belag ganz herunter, läuft Metall auf Metall. Das ist der Fall, der sich metallisch anhört und bei dem jeder weitere Kilometer teurer wird.",
      },
      {
        titel: "Fester Bremssattel",
        haeufigkeit: "selten",
        erklaerung:
          "Klemmt die Führung, schleift der Belag dauerhaft an der Scheibe. Das Rad wird dann auch ohne Bremsen heiß, und der Verbrauch steigt.",
      },
    ],
    pruefschritte: [
      {
        schritt: "Probefahrt, um das Geräusch einem Rad und einer Situation zuzuordnen",
        dauerMinuten: 10,
      },
      {
        schritt: "Räder abnehmen, Belagstärke messen und Scheiben auf Riefen prüfen",
        dauerMinuten: 25,
      },
      { schritt: "Sattelführung und Gängigkeit der Kolben prüfen", dauerMinuten: 15 },
    ],
    pruefkosten: 60,
    pruefkostenHinweis:
      "Belagstärke messen heißt Rad abnehmen — das ist Arbeitszeit, keine Sichtprüfung im Vorbeigehen. Wird gleich gearbeitet, rechnen wir die Prüfung an.",
    reparaturSpanne: { von: 40, bis: 600 },
    spannenHinweis:
      "Unten stehen Reinigen und Entrosten der Sattelführung. Oben stehen Beläge und Scheiben an einer Achse. Welcher Fall es ist, hängt an Millimetern.",
    grenze:
      "Wie viel Belag noch da ist, sieht man erst, wenn das Rad ab ist. Millimeter entscheiden hier darüber, ob wir nur reinigen oder ob Beläge und Scheiben fällig sind — und Millimeter kann Ihnen niemand am Telefon abschätzen.",
    leistung: { titel: "Bremsbeläge vorne", preis: "180–320 €" },
    verwandt: ["bremsanlage", "abs"],
  },
  {
    kennung: "springt-nicht-an",
    art: "symptom",
    titel: "Springt nicht an",
    volksmund: ["startet nicht", "macht nur klick", "Anlasser dreht langsam"],
    zone: "motorraum",
    klartext:
      "Wie es klingt, sagt viel darüber, wo es klemmt. Ein schnelles Klicken und dunkle Innenbeleuchtung deuten auf die Batterie. Ein normal drehender Anlasser, bei dem der Motor trotzdem nicht anspringt, deutet auf etwas anderes.",
    dringlichkeit: "bald",
    handlung:
      "Wenn der Motor nach einer Starthilfe läuft, fahren Sie direkt zu uns und stellen Sie ihn unterwegs nicht ab — nach dem Abstellen kann derselbe Zustand wieder da sein. Wenn gar nichts passiert und das Fahrzeug steht, hilft Ihnen die Pannenhilfe schneller als wir.",
    verwechslung:
      "Eine Batterie, die im Sommer noch problemlos startete, kann bei minus fünf Grad plötzlich zu schwach sein. Das ist kein plötzlicher Defekt, sondern eine alte Batterie, die bei Kälte weniger Strom abgeben kann.",
    ursachen: [
      {
        titel: "Batterie schwach oder am Ende",
        haeufigkeit: "haeufig",
        erklaerung:
          "Der häufigste Grund. Typisch ist ein schnelles Klicken, eine dunkler werdende Innenbeleuchtung und ein Anlasser, der hörbar müde dreht.",
      },
      {
        titel: "Verbraucher über Nacht angelassen",
        haeufigkeit: "haeufig",
        erklaerung:
          "Standlicht, Innenraumleuchte, eine nicht ganz geschlossene Tür. Die Batterie ist dann leer, aber nicht defekt — nach dem Laden ist alles in Ordnung.",
      },
      {
        titel: "Anlasser oder Magnetschalter",
        haeufigkeit: "gelegentlich",
        erklaerung:
          "Ein einzelnes lautes Klacken ohne Drehen, während Licht und Anzeigen normal hell bleiben, deutet eher hierhin als auf die Batterie.",
      },
      {
        titel: "Kraftstoff- oder Zündsystem",
        haeufigkeit: "selten",
        erklaerung:
          "Der Anlasser dreht kräftig, der Motor springt trotzdem nicht an. Dann fehlt nicht Strom, sondern Kraftstoff oder Zündung — und das ist ein anderer Suchweg.",
      },
    ],
    pruefschritte: [
      { schritt: "Batteriespannung messen, danach Test unter Last", dauerMinuten: 15 },
      { schritt: "Ladespannung bei laufendem Motor prüfen, Ruhestrom messen", dauerMinuten: 20 },
      {
        schritt: "Fehlerspeicher auslesen, Anlasserkreis prüfen, wenn die Batterie in Ordnung ist",
        dauerMinuten: 20,
      },
    ],
    pruefkosten: 60,
    pruefkostenHinweis:
      "Der Batterietest für sich ist bei uns kostenlos. Die 60 Euro fallen an, wenn die Batterie in Ordnung ist und wir weitersuchen müssen — dann hat die kostenlose Prüfung immerhin die häufigste Ursache ausgeschlossen.",
    reparaturSpanne: { von: 0, bis: 700 },
    spannenHinweis:
      "Null, wenn nur ein Verbraucher angelassen war und die Batterie beim kostenlosen Test ihre Werte hält. Oben steht ein getauschter Anlasser.",
    grenze:
      "Ob die Batterie schwach ist oder der Anlasser, klingt am Telefon ähnlich und ist technisch etwas ganz anderes. Das klärt eine Messung unter Last in wenigen Minuten. Was wir gar nicht sagen können: ob Ihre Batterie nach dem Laden noch ein halbes Jahr hält. Das hängt an ihrem Alter und daran, wie oft sie tief entladen war.",
    leistung: { titel: "Batterietest", preis: "kostenlos" },
    verwandt: ["ladekontrolle"],
  },
  {
    kennung: "klimaanlage-blaest-warm",
    art: "symptom",
    titel: "Klimaanlage bläst warm",
    volksmund: ["Klima kühlt nicht", "Klimaanlage kaputt", "Klima bläst nur Luft"],
    zone: "innenraum",
    klartext:
      "Die Anlage läuft, aber die Luft wird nicht mehr kalt. Meistens fehlt Kältemittel — und zwar nicht, weil es verbraucht wird, sondern weil es über die Jahre entwichen ist.",
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
      "Ob die Anlage nur leer ist oder ein Leck hat, zeigt sich erst beim Befüllen und Nachmessen. Deshalb sagen wir vorher nicht zu, dass die 99 Euro reichen. Nachfüllen ohne Lecksuche ist bei einer undichten Anlage weggeworfenes Geld — welcher Fall vorliegt, sagen wir Ihnen vor Ihrer Entscheidung.",
    leistung: { titel: "Klimaservice", preis: "ab 99 €" },
    verwandt: ["pfuetze-unter-dem-auto"],
  },
] as const satisfies readonly Problem[];

export type ProblemKennung = (typeof PROBLEME)[number]["kennung"];

export function findeProblem(kennung: string): Problem | undefined {
  return PROBLEME.find((p) => p.kennung === kennung);
}

export const WARNLEUCHTEN = PROBLEME.filter((p) => p.art === "warnleuchte");
export const SYMPTOME = PROBLEME.filter((p) => p.art === "symptom");
