import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

export async function Grenze() {
  const t = await getTranslations("Start");
  return (
    <>
      {/* FORM A — DAS DUNKLE STATEMENT
          Dieser Abschnitt ist keine Information, die man nachschlägt, sondern
          eine Aussage. Er hat als einziger Abschnitt der Startseite keine
          Liste, keine Zahl und keine Karte: eine große Fläche, ein Satz.

          Deshalb randlos in der Markenfarbe — der eine dunkle Moment der
          Seite. Und deshalb asymmetrisch: Die Aussage steht groß links, die
          Erklärung schmal rechts. Ein zentrierter Block wäre eine Anzeige;
          so ist es eine Aussage mit Begründung daneben. Beide Spalten
          beginnen auf derselben Oberkante — unten ausgerichtet schwebte die
          Erklärung über der Aussage und ließ links ein Loch stehen.

          Kein orangenes Quadrat vor dem Label: Es markierte hier nichts,
          sondern saß nur davor. Orange bleibt den Stellen vorbehalten, an
          denen es etwas bezeichnet — den Stationen der Prozesskette, der
          Haupthandlung und der Kante, die beim Überfahren wächst. */}
      <section className="bg-instrument text-text-auf-instrument">
        <Container className="py-20 sm:py-28 lg:py-36">
          <p className="font-mono text-label tracking-[0.09em] text-white/70 uppercase">
            {t("grenzeLabel")} / 02
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-20">
            <h2 className="max-w-[16ch] text-[clamp(2rem,1.2rem+3.2vw,3.5rem)] leading-[1.08] font-bold tracking-[-0.03em] hyphens-none">
              {t("grenzeTitel")}
            </h2>
            <div className="max-w-[46ch] space-y-4 leading-relaxed text-white/80">
              <p>{t("grenzeAbsatz1")}</p>
              <p>{t("grenzeAbsatz2")}</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
