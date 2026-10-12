"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { knopf } from "@/components/ui/Knopf";

/**
 * Reiner Browser-Zustand, kein Backend — derselbe Aufbau wie das
 * Anfrageformular unter /termin, nur ohne Serveraktion: Hier geht es nicht
 * um eine konkrete Anfrage, sondern um eine Erinnerung, die es technisch
 * noch nicht gibt. Der "Zeigen, wie die Erinnerung aussähe"-Knopf macht das
 * ausdrücklich: Die Nachricht käme eigentlich erst zu Saisonbeginn, nicht
 * sofort.
 */
export function SaisonErinnerung() {
  const t = useTranslations("Leistungen");
  const [angemeldet, setAngemeldet] = useState(false);
  const [vorschau, setVorschau] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAngemeldet(true);
  }

  return (
    <Section>
      <Container className="max-w-[62rem]">
        <div className="border border-linie-stark bg-karte p-6 sm:p-8">
          <h2 className="text-abschnitt font-semibold">{t("saisonTitel")}</h2>
          <p className="mt-2 max-w-[56ch] leading-relaxed text-text-zweit">{t("saisonText")}</p>

          {angemeldet ? (
            <p role="status" className="mt-5 leading-relaxed">
              {t("saisonSuccess")}
              <span className="mt-1 block font-mono text-xs text-text-zweit">
                {t("saisonDemoNote")}
              </span>
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 flex flex-wrap gap-2">
              <input
                type="email"
                required
                placeholder={t("saisonPlaceholder")}
                className="min-w-0 flex-1 border border-linie-stark bg-grund px-3 py-2.5 transition-colors hover:border-instrument"
              />
              <button type="submit" className={knopf("zweit")}>
                {t("saisonSubmit")}
              </button>
            </form>
          )}

          <div className="mt-6 border-t border-linie pt-5">
            {vorschau ? (
              <div className="border-l-4 border-linie-stark pl-4">
                <p className="leading-relaxed">{t("saisonVorschauText")}</p>
                <p className="mt-2 font-mono text-xs text-text-zweit">
                  {t("saisonVorschauHinweis")}
                </p>
              </div>
            ) : (
              <button type="button" onClick={() => setVorschau(true)} className={knopf("still")}>
                {t("saisonVorschauButton")}
              </button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
