import { Container } from "./Container";

/**
 * Impressum und Datenschutz teilen sich eine Form: Titel, Lead, nummerierte
 * Abschnitte aus Überschrift und Absatz. Zwei fast gleiche Seiten mit
 * getrenntem Markup wären nur Gelegenheit, sie auseinanderlaufen zu lassen.
 */
export function Rechtstext({
  titel,
  lead,
  abschnitte,
}: {
  titel: string;
  lead: string;
  abschnitte: readonly { titel: string; text: string }[];
}) {
  return (
    <Container className="max-w-[48rem] py-12 sm:py-16">
      <h1 className="text-hero font-bold">{titel}</h1>
      <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">{lead}</p>

      <div className="mt-10 divide-y divide-linie border-y border-linie">
        {abschnitte.map((abschnitt, i) => (
          <section
            key={abschnitt.titel}
            className="grid gap-2 py-6 sm:grid-cols-[3rem_1fr] sm:gap-4"
          >
            <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {String(i + 1).padStart(2, "0")}
            </p>
            <div>
              <h2 className="text-block font-semibold">{abschnitt.titel}</h2>
              <p className="mt-2 max-w-[60ch] leading-relaxed text-text-zweit">{abschnitt.text}</p>
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
