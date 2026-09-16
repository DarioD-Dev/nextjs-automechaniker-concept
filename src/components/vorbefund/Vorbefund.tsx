"use client";

import { useEffect, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { hoechsteStufe, massgeblichesProblem, pruefungAb } from "@/lib/vorbefund";
import { StufenSymbol, useStufenWorte } from "@/components/problem/Stufe";
import { ChevronIcon, DruckenIcon, PfeilRechtsIcon } from "@/components/icons/UiIcons";
import { cn } from "@/lib/cn";
import { useVorbefund } from "./VorbefundProvider";

/**
 * Der Vorbefund ordnet — er diagnostiziert nicht.
 *
 * Das Unterscheidungsmerkmal der Seite, und zwar nicht wegen der Optik,
 * sondern weil er eine Frage beantwortet, die sonst niemand beantwortet:
 * Wer zwei Beobachtungen hat, weiß nicht, welche davon die wichtige ist.
 * "Die höchste Stufe bestimmt die Handlung" ist die ganze Logik — drei Zeilen,
 * und der klügste Moment der Seite. Sie ordnet Angaben des Kunden, sie
 * behauptet nichts über sein Fahrzeug.
 *
 * Der Haftungssatz steht AUF dem Dokument, nicht im Kleingedruckten. Das
 * Bauteil trägt seine eigene Grenze mit sich, auch im Ausdruck.
 */
export function Vorbefund() {
  const t = useTranslations("Vorbefund");
  const format = useFormatter();
  const worte = useStufenWorte();
  const { bereit, probleme, leeren } = useVorbefund();
  const [offen, setOffen] = useState(false);

  // Escape klappt zu. Der Vorbefund ist bewusst KEIN modaler Dialog — die
  // Seite bleibt darunter benutzbar, man soll weiterlesen können, während er
  // offen steht. Deshalb auch keine Fokusfalle.
  useEffect(() => {
    if (!offen) return;
    const bei = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOffen(false);
    };
    window.addEventListener("keydown", bei);
    return () => window.removeEventListener("keydown", bei);
  }, [offen]);

  if (!bereit || probleme.length === 0) return null;

  const stufe = hoechsteStufe(probleme);
  const massgeblich = massgeblichesProblem(probleme);
  const abBetrag = pruefungAb(probleme);
  if (!stufe || !massgeblich || abBetrag === null) return null;

  const ableitung =
    stufe === "sofort"
      ? t("ableitungSofort")
      : stufe === "bald"
        ? t("ableitungBald")
        : t("ableitungPlanbar");

  return (
    <section
      aria-label={t("titel")}
      className="kw-vorbefund-wurzel fixed inset-x-0 bottom-0 z-30 px-0 sm:px-4 sm:pb-4 lg:inset-x-auto lg:right-6 lg:bottom-6 lg:w-[23rem] lg:px-0"
    >
      <div className="border border-linie bg-karte shadow-[0_-4px_24px_rgba(16,20,24,0.12)] sm:rounded-sm">
        <button
          type="button"
          onClick={() => setOffen((o) => !o)}
          aria-expanded={offen}
          aria-controls="vorbefund-inhalt"
          className="kw-nicht-drucken flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-grund"
        >
          <StufenSymbol stufe={stufe} className="size-3.5" />
          <span className="flex-1 font-mono text-label tracking-[0.09em] uppercase">
            {t("titel")} ·{" "}
            {probleme.length === 1
              ? t("beobachtungEine")
              : t("beobachtungViele", { anzahl: probleme.length })}
          </span>
          <ChevronIcon
            className={cn("size-4 text-text-zweit transition-transform", offen && "rotate-180")}
          />
          <span className="sr-only">{offen ? t("schliessen") : t("oeffnen")}</span>
        </button>

        {/* Immer im Baum, am Bildschirm per Klasse versteckt: der Ausdruck muss
            den vollen Inhalt zeigen, auch wenn der Kasten eingeklappt ist.
            Warum keine `hidden`-Eigenschaft: siehe globals.css. */}
        <div
          id="vorbefund-inhalt"
          data-offen={offen}
          className="kw-vorbefund-inhalt max-h-[70vh] overflow-y-auto border-t border-linie"
        >
          <header className="flex items-baseline justify-between bg-instrument px-4 py-2.5 font-mono text-label tracking-[0.09em] text-text-auf-instrument uppercase">
            <span>KLARWERK · {t("titel")}</span>
            <span>
              {t("nummer")} {belegnummer(probleme.map((p) => p.kennung))}
            </span>
          </header>

          <ol className="divide-y divide-linie">
            {probleme.map((p) => (
              <li key={p.kennung} className="flex gap-3 px-4 py-3">
                <StufenSymbol stufe={p.dringlichkeit} className="mt-1.5 size-3" />
                <div className="min-w-0">
                  <p className="font-medium">{p.titel}</p>
                  <p className="mt-0.5 font-mono text-xs text-text-zweit">
                    {p.pruefschritte[0]?.schritt} · {gesamtdauer(p.pruefschritte)} Min ·{" "}
                    {p.pruefkosten} €
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="border-t border-linie bg-grund px-4 py-4">
            <p className="flex items-center gap-2 font-mono text-label tracking-[0.09em] uppercase">
              <StufenSymbol stufe={stufe} className="size-3" />
              {t("wasJetztZaehlt")}
            </p>
            <p className="mt-2 text-sm leading-relaxed">{ableitung}</p>
            <p className="mt-2 text-sm leading-relaxed font-medium">{massgeblich.handlung}</p>
            <p className="mt-3 font-mono text-sm">{t("pruefungAb", { betrag: abBetrag })}</p>
            {probleme.length > 1 && (
              <p className="mt-1 text-xs leading-relaxed text-text-zweit">
                {t("pruefungAbHinweis")}
              </p>
            )}
          </div>

          <p className="border-t border-linie px-4 py-3 text-xs leading-relaxed text-text-zweit">
            {t("haftung")}
          </p>

          <p className="hidden px-4 pb-3 font-mono text-xs text-text-zweit print:block">
            {t("erstellt")}: {format.dateTime(new Date(), { dateStyle: "medium" })} ·{" "}
            {worte(stufe).wort}
          </p>

          <div className="kw-nicht-drucken flex flex-wrap items-center gap-3 border-t border-linie px-4 py-3">
            <Link
              href="/termin"
              className="group inline-flex items-center gap-1.5 rounded-sm bg-instrument px-4 py-2.5 text-sm font-semibold text-text-auf-instrument transition-[background-color,transform] hover:-translate-y-px hover:bg-instrument-hell"
            >
              {t("weiter")}
              <span aria-hidden="true" className="kw-pfeil-schacht">
                <PfeilRechtsIcon className="kw-pfeil-quer size-4" />
              </span>
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="-my-1 inline-flex items-center gap-1.5 py-1 text-sm font-medium underline decoration-linie-stark underline-offset-4 hover:decoration-instrument"
            >
              <DruckenIcon className="size-4" />
              {t("drucken")}
            </button>
            <button
              type="button"
              onClick={leeren}
              className="text-sm font-medium text-text-zweit underline decoration-linie-stark underline-offset-4 hover:decoration-instrument"
            >
              {t("leeren")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function gesamtdauer(schritte: readonly { dauerMinuten: number }[]): number {
  return schritte.reduce((s, x) => s + x.dauerMinuten, 0);
}

/** Sieht aus wie eine Auftragsnummer und ist es nicht — abgeleitet aus den
 *  Kennungen, damit dieselbe Zusammenstellung immer dieselbe Nummer trägt.
 *  Eine Zufallszahl würde bei jedem Rendern springen und im Ausdruck lügen. */
function belegnummer(kennungen: readonly string[]): string {
  const summe = kennungen
    .join("|")
    .split("")
    .reduce((s, z) => s + z.charCodeAt(0), 0);
  return `${(summe % 9000) + 1000}-${String.fromCharCode(65 + (kennungen.length % 26))}`;
}
