import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Section({ className, ...props }: ComponentPropsWithoutRef<"section">) {
  return <section className={cn("py-abschnitt sm:py-abschnitt-lg", className)} {...props} />;
}

/** Kleines Versalien-Label mit Nummer, im Stil eines Prüfprotokolls.
 *  Die eine bewusste Anleihe an die Referenzseite — ein Nummernsystem, das
 *  Methodik signalisiert statt Betriebsamkeit. */
export function AbschnittsLabel({
  nummer,
  className,
  children,
}: {
  nummer: string;
  /** Für dunkle Flächen: Der Vorgabewert text-text-zweit erreicht auf der
   *  Instrumentfläche nur 1,85:1 und ist dort praktisch unlesbar. */
  className?: string;
  children: string;
}) {
  return (
    <p
      className={cn("font-mono text-label tracking-[0.09em] text-text-zweit uppercase", className)}
    >
      {children} / {nummer}
    </p>
  );
}
