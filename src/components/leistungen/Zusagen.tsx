import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

export async function Zusagen() {
  // Die drei Zusagen stehen im Start-Namensraum. Sie hier zu wiederholen wäre
  // eine zweite Wahrheit — also werden sie von dort gelesen.
  const tStart = await getTranslations("Start");
  return (
    <>
      {/* FORM A — DAS DUNKLE STATEMENT
          Die drei Zusagen sind das einzige auf dieser Seite, das keine Zahl,
          keine Dauer und keinen Umfang hat. Sie sind Aussagen — und stehen
          deshalb als einziger Abschnitt der Seite auf der Markenfläche.
          Einmal pro Seite: Der Katalog darüber lebt davon, dass diese Fläche
          nicht noch einmal vorkommt. */}
      <section className="bg-instrument text-text-auf-instrument">
        <Container className="max-w-[62rem] py-14 sm:py-16 lg:py-20">
          <p className="font-mono text-label tracking-[0.09em] text-white/70 uppercase">
            {tStart("zusagenTitel")} / 04
          </p>
          <ol className="mt-8 divide-y divide-white/15 border-y border-white/15">
            {[tStart("zusage1"), tStart("zusage2"), tStart("zusage3")].map((zusage, i) => (
              <li key={zusage} className="flex items-baseline gap-5 py-5 sm:gap-8">
                {/* Weiß/45 misst 3,6:1 auf der Markenfläche — schwächer und
                    die Zahl wäre unter der Schwelle für Großtext. */}
                <span className="font-mono text-2xl font-bold text-white/45 sm:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[clamp(1.125rem,1rem+0.7vw,1.5rem)] leading-snug font-medium">
                  {zusage}
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
