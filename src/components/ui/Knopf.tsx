import { cn } from "@/lib/cn";

/**
 * Der Hauptknopf ist Instrumentfarbe, nie rot und nie gelb.
 * Rot, Gelb und Blau tragen auf dieser Seite Bedeutung — sie stehen für
 * Dringlichkeit. Ein roter Knopf würde diesen Kanal zerstören.
 */
export const knopfStil = {
  haupt:
    "inline-flex items-center justify-center gap-2 rounded-sm bg-instrument px-5 py-3 text-sm font-semibold text-text-auf-instrument transition-colors hover:bg-instrument-hell",
  zweit:
    "inline-flex items-center justify-center gap-2 rounded-sm border border-linie-stark bg-karte px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-instrument",
  still:
    "inline-flex items-center gap-1.5 text-sm font-medium text-text underline decoration-linie-stark underline-offset-4 transition-colors hover:decoration-instrument",
} as const;

export function knopf(variante: keyof typeof knopfStil, className?: string) {
  return cn(knopfStil[variante], className);
}
