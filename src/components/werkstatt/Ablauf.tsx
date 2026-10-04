import { getTranslations } from "next-intl/server";
import { ABLAUF } from "@/data/werkstatt";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";

export async function Ablauf() {
  const t = await getTranslations("Werkstatt");
  return (
    <>
      <Section className="border-y border-linie bg-karte">
        <Container className="max-w-[62rem]">
          <AbschnittsLabel nummer="01">{t("ablaufLabel")}</AbschnittsLabel>
          <h2 className="mt-3 text-abschnitt font-semibold">{t("ablaufTitel")}</h2>
          <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">
            {t("ablaufLead")}
          </p>

          {/* FORM C — DIE PROZESSKETTE
              Vier untereinander gesetzte Zeilen sind eine Liste. Ein Ablauf
              ist aber keine Liste, sondern eine Kette: Die Reihenfolge ist die
              Information. Deshalb liegen die vier Stationen auf einer
              durchgehenden Linie, jede mit einer Marke darauf.

              Zwischen den Spalten steht kein Gap, sondern Innenabstand: Mit
              Gap zerfiele die Linie in vier Striche, und genau das wäre
              wieder eine Liste. Auf schmalen Geräten kippt die Kette in die
              Senkrechte und die Linie läuft links durch; die Aussage bleibt
              dieselbe. Dazwischen — Tablet — zwei mal zwei: Vier Spalten
              wären dort zu schmal, eine einzige ließe die halbe Breite leer.

              Linie und Marke liegen in globals.css (.kw-kette), weil die
              Linie sich beim Hereinscrollen aufbauen soll. Als Rahmen der
              Zelle ginge das nicht, ohne dass der Text mitspringt. */}
          <ol className="kw-kette mt-10 grid md:grid-cols-2 md:gap-y-12 lg:grid-cols-4 lg:gap-y-0">
            {ABLAUF.map((schritt) => (
              <li
                key={schritt.nummer}
                className="pb-10 pl-6 last:pb-0 md:pt-8 md:pr-8 md:pb-0 md:pl-0"
              >
                <span aria-hidden="true" className="kw-marke bg-akzent" />
                <p className="font-mono text-label tracking-[0.09em] text-titel uppercase">
                  {schritt.label}
                </p>
                <p className="mt-3 font-mono text-[clamp(2.25rem,1.6rem+2vw,3rem)] leading-none font-bold text-titel/60">
                  {schritt.nummer}
                </p>
                <p className="mt-4 max-w-[46ch] leading-relaxed">{schritt.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
