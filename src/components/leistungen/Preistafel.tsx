import { getTranslations } from "next-intl/server";
import { LEISTUNGEN } from "@/data/leistungen";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";
import { Eintrag } from "@/components/leistungen/Eintrag";

export async function Preistafel() {
  const t = await getTranslations("Leistungen");
  return (
    <>
      <Section>
        <Container className="max-w-[62rem]">
          <AbschnittsLabel nummer="02">{t("katalogLabel")}</AbschnittsLabel>

          {/* FORM B — DIE PREISTAFEL
              Ein Katalog besteht aus vergleichbaren Posten. Vorher stand der
              Betrag klein rechts als Randnotiz — dabei ist er das, wonach
              gesucht wird. Jetzt trägt er die zweitgrößte Schriftgröße der
              Seite und behält eine harte rechte Kante: Man kann die Tafel am
              Rand entlanglesen, ohne einen einzigen Namen zu lesen.

              Betrag rechts, Name links — nicht umgekehrt wie im Prototyp. Die
              Positionsspalte links kostete eine eigene Spalte, einen Abstand
              und ein 85px-Loch vor kurzen Beträgen, und die Nummern begannen
              in jeder Gruppe wieder bei 01. Eine Ordnungszahl, die nichts
              ordnet, ist Dekoration.

              Name und Betrag teilen sich eine Zeile auf gemeinsamer
              Grundlinie. Dadurch ist die Zeile trotz der großen Zahl so hoch
              wie vorher — bei zwölf Einträgen ist das der Unterschied
              zwischen einer Tafel und einer Kette von Preisboxen.

              Weiße Fläche gegen den warmen Grund: Die Tafel ist ein eigenes
              Objekt, keine Sammlung gerahmter Karten. */}
          <div className="mt-8 -mx-5 bg-karte px-5 py-8 sm:-mx-8 sm:px-8 sm:py-10">
            <div className="space-y-10">
              {LEISTUNGEN.map((gruppe) => (
                <section key={gruppe.titel}>
                  <h2 className="text-abschnitt font-semibold text-titel">{gruppe.titel}</h2>
                  {/* Starke Oberkante, feine Trennlinien: der Gruppenkopf
                      einer Tafel, nicht der Rahmen einer Karte. */}
                  <ul className="mt-5 border-t border-linie-stark">
                    {gruppe.eintraege.map((eintrag) => (
                      <li
                        key={eintrag.slug}
                        id={eintrag.slug}
                        className="scroll-mt-20 border-b border-linie"
                      >
                        <Eintrag
                          eintrag={eintrag}
                          mehr={t("mehrDazu")}
                          unfall={t("zurUnfallseite")}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>

          <p className="mt-10 max-w-[62ch] leading-relaxed text-text-zweit">{t("fehlt")}</p>
        </Container>
      </Section>
    </>
  );
}
