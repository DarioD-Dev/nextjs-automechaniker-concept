import { cn } from "@/lib/cn";

/**
 * Der Hauptknopf ist Instrumentfarbe, nie rot und nie gelb.
 * Rot, Gelb und Blau tragen auf dieser Seite Bedeutung — sie stehen für
 * Dringlichkeit. Ein roter Knopf würde diesen Kanal zerstören.
 */
export const knopfStil = {
  /* Der Akzent der Marke sitzt genau hier: auf der Haupthandlung. Dunkler
     Text auf Orange, nicht weißer — Weiß läge bei 2.57:1. */
  /* Beim Überfahren wird die Haupthandlung KRÄFTIGER, nicht blasser. Der
     vorherige Zustand ging auf --akzent-feld und damit auf ein sehr helles
     Creme: Auf dem Papiergrund verschwand der wichtigste Knopf der Seite
     genau in dem Moment, in dem der Zeiger darauf stand.
     Jetzt wechselt er auf die Markenfläche — dieselbe Farbe wie Kopf, Fuß
     und die dunklen Statements, keine neue. Heller Text darauf misst 9,4:1.
     Dazu ein Pixel nach oben und beim Klick wieder zurück. */
  haupt:
    "inline-flex items-center justify-center gap-2 rounded-sm bg-akzent px-5 py-3 text-sm font-bold text-text transition-[background-color,color,transform] hover:-translate-y-px hover:bg-instrument hover:text-text-auf-instrument active:translate-y-0",
  zweit:
    "inline-flex items-center justify-center gap-2 rounded-sm border border-linie-stark bg-karte px-5 py-3 text-sm font-semibold text-text transition-[border-color,transform] hover:-translate-y-px hover:border-instrument active:translate-y-0",
  still:
    "-my-1 inline-flex items-center gap-1.5 py-1 text-sm font-medium text-text underline decoration-linie-stark underline-offset-4 transition-colors hover:text-titel hover:decoration-instrument",
} as const;

export function knopf(variante: keyof typeof knopfStil, className?: string) {
  return cn(knopfStil[variante], className);
}
