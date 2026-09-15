import type { SVGProps } from "react";

/**
 * Die Fachsymbole sind selbst gezeichnet, nicht aus einem Icon-Paket geholt.
 *
 * Zwei Gründe: Automotive-Symbolsets sind häufig restriktiv lizenziert, und
 * die Symbole selbst sind geometrisch einfach genug, dass eigene Fassungen
 * schneller sind als die Lizenzprüfung. Alle auf 24×24, alle in currentColor,
 * damit die Kachel die echte Leuchtenfarbe setzen kann.
 */
type Props = SVGProps<SVGSVGElement> & { kennung: string };

export function ProblemSymbol({ kennung, ...props }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      {inhalt(kennung)}
    </svg>
  );
}

function inhalt(kennung: string) {
  switch (kennung) {
    case "motoroeldruck":
      // Ölkanne mit fallendem Tropfen — das ISO-Symbol für Öldruck.
      return (
        <g fill="currentColor">
          <path d="M5 8.5h3.2v3H5z" />
          <path d="M2.4 11.5h11.4v4.2a3.3 3.3 0 0 1-3.3 3.3H5.7a3.3 3.3 0 0 1-3.3-3.3z" />
          <path d="M13.2 12.1 20 7.7l1.3 2-7.4 4.3z" />
          <path d="M18.6 14.6s-2 2.7-2 3.9a2 2 0 1 0 4 0c0-1.2-2-3.9-2-3.9z" />
        </g>
      );
    case "motorkontrollleuchte":
      // Motorblock mit Riemenscheibe rechts.
      return (
        <path
          fill="currentColor"
          d="M2 14v-3h2V9h3V7h6v2h2l4-2.5v4h2v4h-2v4l-4-2.5h-2v2H7v-2H4v-2z"
        />
      );
    case "klimaanlage-blaest-warm":
      // Schneeflocke plus zwei Luftströme: kalt UND Gebläse, denn genau die
      // beiden Fälle werden hier verwechselt.
      return (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 3.5v11M10.2 6.2l9.6 5.6M19.8 6.2l-9.6 5.6" />
          <path d="M13.1 5.2 15 7.1l1.9-1.9M13.1 12.8 15 10.9l1.9 1.9" />
          <path d="M2.5 17.5h6.8a2.2 2.2 0 1 0-2.2-2.2" />
          <path d="M2.5 21h8.8a2.2 2.2 0 1 1-2.2 2.2" />
        </g>
      );
    case "kuehlmitteltemperatur":
      // Thermometer über Wellenlinien — das ISO-Symbol für Kühlmitteltemperatur.
      return (
        <>
          <g fill="currentColor">
            <rect x="10.4" y="2.2" width="3.2" height="10" rx="1.6" />
            <circle cx="12" cy="14.2" r="3.4" />
          </g>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            d="M2 20.3q1.7-1.8 3.4 0t3.4 0 3.4 0 3.4 0 3.4 0"
          />
        </>
      );
    case "bremsanlage":
      // Ausrufezeichen im Kreis, flankiert von den beiden Bögen der Bremsanlage.
      return (
        <>
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="6" />
            <path d="M12 8.6v4.2" />
            <path d="M3.2 7.4a9.2 9.2 0 0 0 0 9.2" />
            <path d="M20.8 7.4a9.2 9.2 0 0 1 0 9.2" />
          </g>
          <circle cx="12" cy="15.7" r="1.05" fill="currentColor" />
        </>
      );
    case "ladekontrolle":
      // Batterie mit Plus- und Minuspol.
      return (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2.6" y="6.6" width="18.8" height="11" rx="1.8" />
          <path d="M6.4 6.6V4.4h3.2v2.2M14.4 6.6V4.4h3.2v2.2" />
          <path d="M6.3 12.1h3.6M8.1 10.3v3.6M14.1 12.1h3.6" />
        </g>
      );
    case "abs":
      // Die Buchstaben gehören zum Symbol — ohne sie wäre es die Bremsleuchte.
      // textLength erzwingt, dass der Schriftzug in den Kreis passt, egal
      // welche Schrift gerade geladen ist.
      return (
        <>
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="6.3" />
            <path d="M3 7.2a9.4 9.4 0 0 0 0 9.6" />
            <path d="M21 7.2a9.4 9.4 0 0 1 0 9.6" />
          </g>
          <text
            x="12"
            y="14.1"
            textAnchor="middle"
            textLength="9.6"
            lengthAdjust="spacingAndGlyphs"
            fontSize="6"
            fontWeight="700"
            fill="currentColor"
          >
            ABS
          </text>
        </>
      );
    case "reifendruck":
      // Reifenquerschnitt mit Profil und Ausrufezeichen.
      return (
        <>
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3.6 19.4v-5.6a8.4 8.4 0 0 1 16.8 0v5.6" />
            <path d="m3.6 19.4 2.1-1.7 2.1 1.7 2.1-1.7 2.1 1.7 2.1-1.7 2.1 1.7 2.1-1.7 2.1 1.7" />
            <path d="M12 8.6v3.8" />
          </g>
          <circle cx="12" cy="15.3" r="1.05" fill="currentColor" />
        </>
      );
    case "partikelfilter":
      // Filtergehäuse im Abgasstrang, die Punkte sind der Ruß.
      return (
        <>
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <rect x="4.2" y="7.4" width="15.6" height="9.2" rx="2" />
            <path d="M1.4 12h2.8M19.8 12h2.8" />
          </g>
          <g fill="currentColor">
            <circle cx="8.4" cy="10.4" r="1" />
            <circle cx="12" cy="10.4" r="1" />
            <circle cx="15.6" cy="10.4" r="1" />
            <circle cx="10.2" cy="13.6" r="1" />
            <circle cx="13.8" cy="13.6" r="1" />
          </g>
        </>
      );
    case "pfuetze-unter-dem-auto":
      // Tropfen über einer Pfütze.
      return (
        <>
          <path
            fill="currentColor"
            d="M12 2.6s-3.6 4.7-3.6 6.9a3.6 3.6 0 0 0 7.2 0C15.6 7.3 12 2.6 12 2.6z"
          />
          <ellipse
            cx="12"
            cy="18.4"
            rx="8.6"
            ry="2.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </>
      );
    case "bremsen-quietschen":
      // Bremsscheibe mit Schallwellen — Geräusch UND Ort in einem Bild.
      return (
        <>
          <g fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="9.4" cy="12" r="7" />
            <circle cx="9.4" cy="12" r="2.4" />
          </g>
          <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M18.4 8.6a5.2 5.2 0 0 1 0 6.8" />
            <path d="M20.8 6.2a9 9 0 0 1 0 11.6" />
          </g>
        </>
      );
    case "springt-nicht-an":
      // Zündschlüssel.
      return (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="7.2" cy="12" r="4.4" />
          <circle cx="7.2" cy="12" r="1.5" />
          <path d="M11.6 12h9.6" />
          <path d="M17.4 12v3.2M20.6 12v2.4" />
        </g>
      );
    default:
      return <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.7" />;
  }
}
