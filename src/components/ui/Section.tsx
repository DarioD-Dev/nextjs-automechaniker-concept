import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Section({ className, ...props }: ComponentPropsWithoutRef<"section">) {
  return <section className={cn("py-abschnitt sm:py-abschnitt-lg", className)} {...props} />;
}

/** Kleines Versalien-Label mit Nummer, im Stil eines Prüfprotokolls.
 *  Die eine bewusste Anleihe an die Referenzseite — ein Nummernsystem, das
 *  Methodik signalisiert statt Betriebsamkeit. */
export function AbschnittsLabel({ nummer, children }: { nummer: string; children: string }) {
  return (
    <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
      {children} / {nummer}
    </p>
  );
}
