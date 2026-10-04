import { type Ehrlichkeitsstufe } from "@/data/leistungen";

/** Vier Formen statt vier Farben: Rot, Gelb und Blau tragen auf dieser Seite
 *  Dringlichkeit und dürfen hier nichts bedeuten. */
export function StufenMarke({ art }: { art: Ehrlichkeitsstufe }) {
  return (
    <svg viewBox="0 0 12 12" className="size-2.5 shrink-0 text-text-zweit" aria-hidden="true">
      {art === "fest" && <rect x="1" y="1" width="10" height="10" fill="currentColor" />}
      {art === "spanne" && (
        <rect
          x="1"
          y="1"
          width="10"
          height="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      )}
      {art === "nachBefund" && (
        <circle
          cx="6"
          cy="6"
          r="4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="2.4 2"
        />
      )}
      {art === "kostenlos" && <circle cx="6" cy="6" r="5" fill="currentColor" />}
    </svg>
  );
}
