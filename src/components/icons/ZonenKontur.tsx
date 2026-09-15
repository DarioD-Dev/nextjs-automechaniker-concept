import type { Zone } from "@/data/types";
import { cn } from "@/lib/cn";

/**
 * Hier kommt die ursprüngliche Idee der Fahrzeuggrafik zurück — in der Rolle,
 * in der sie taugt: als ERKLÄRUNG, nicht als Navigation.
 *
 * Der Kunde hat sein Symptom bereits gewählt. Er erfährt jetzt, wo am Auto das
 * sitzt. Er muss nichts anklicken und nichts selbst zuordnen. Eine Kontur,
 * fünf Bereiche — statt einer detaillierten Schnittzeichnung mit Masken, die
 * einen Tag kostet und nichts zusätzlich erklärt.
 */
const BEREICHE: Record<Zone, { form: React.ReactElement; name: string }> = {
  motorraum: {
    form: <rect x="79" y="8" width="37" height="26" rx="6" />,
    name: "Motorraum",
  },
  vorderachse: {
    form: <ellipse cx="92" cy="32" rx="15" ry="12" />,
    name: "Vorderachse",
  },
  hinterachse: {
    form: <ellipse cx="30" cy="32" rx="15" ry="12" />,
    name: "Hinterachse",
  },
  abgasanlage: {
    form: <rect x="6" y="25" width="72" height="12" rx="6" />,
    name: "Abgasanlage",
  },
  innenraum: {
    form: <rect x="40" y="6" width="40" height="27" rx="6" />,
    name: "Innenraum",
  },
};

export function ZonenKontur({ zone, className }: { zone: Zone; className?: string }) {
  const bereich = BEREICHE[zone];

  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 120 44"
        className={cn("w-full max-w-[18rem]", className)}
        role="img"
        aria-label={`Fahrzeugkontur, hervorgehoben: ${bereich.name}`}
      >
        {/* Hervorhebung zuerst, damit die Kontur darüber liegt und lesbar bleibt */}
        {/* Unbunt, und das ist wichtig: Rot, Gelb und Blau tragen auf dieser
            Seite Dringlichkeit. Eine blau hervorgehobene Zone auf einer roten
            Karte hätte "alles in Ordnung" signalisiert — genau gegen die
            Kopfzeile darüber. Die Kontur zeigt einen Ort, keine Bewertung. */}
        <g
          fill="var(--zone)"
          fillOpacity="0.45"
          stroke="var(--flaeche-instrument)"
          strokeWidth="1.4"
        >
          {bereich.form}
        </g>
        <g fill="none" stroke="var(--linie-stark)" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M5 32v-5q0-3 4-4l21-3 14-9q3-2 7-2h21q4 0 7 2l13 9 16 3q6 1 6 6v3" />
          <circle cx="30" cy="32" r="6.5" />
          <circle cx="92" cy="32" r="6.5" />
          <path d="M11.5 32h12M36.5 32h49M98.5 32h13" />
        </g>
      </svg>
      <figcaption className="mt-2 font-mono text-label tracking-[0.09em] text-titel uppercase">
        {bereich.name}
      </figcaption>
    </figure>
  );
}
