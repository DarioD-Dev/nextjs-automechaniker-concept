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
    default:
      return <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.7" />;
  }
}
