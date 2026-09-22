"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { knopf } from "@/components/ui/Knopf";
import { TelefonKnopf } from "@/components/layout/TelefonKnopf";

/**
 * Was `not-found.tsx` für falsche Adressen ist, ist diese Seite für Fehler
 * beim Rendern.
 *
 * Der Telefonknopf steht hier aus demselben Grund wie auf einer roten
 * Problemkarte: Wer mit einem Auto danebensteht, das nicht mehr fährt, ist
 * nicht dafür zuständig, unsere Seite zu reparieren. Bei echter Dringlichkeit
 * schlägt ein Anruf jede Schaltfläche.
 */
export default function Fehlerseite({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Fehler");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-20 sm:py-28">
      <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
        Fehler / 500
      </p>
      <h1 className="mt-3 text-hero font-bold">{t("titel")}</h1>
      <p className="mt-4 max-w-[52ch] text-lead leading-relaxed text-text-zweit">{t("text")}</p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button type="button" onClick={reset} className={knopf("haupt")}>
          {t("nochmal")}
        </button>
        <Link href="/" className={knopf("zweit")}>
          {t("zurStartseite")}
        </Link>
        <TelefonKnopf />
      </div>
    </Container>
  );
}
