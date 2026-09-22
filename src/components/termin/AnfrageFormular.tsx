"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { anfrageSenden, type AnfrageZustand } from "@/lib/actions/anfrage";
import { alsAnliegen } from "@/lib/vorbefund";
import { useVorbefund } from "@/components/vorbefund/VorbefundProvider";
import { WERKSTATT } from "@/data/werkstatt";
import { knopf } from "@/components/ui/Knopf";
import { HakenIcon } from "@/components/icons/UiIcons";
import { cn } from "@/lib/cn";

const START: AnfrageZustand = { status: "leer" };

export function AnfrageFormular() {
  const t = useTranslations("Termin");
  const { bereit, probleme } = useVorbefund();
  const [zustand, absenden, laeuft] = useActionState(anfrageSenden, START);
  const bestaetigungRef = useRef<HTMLDivElement>(null);

  // Die Bestätigung ersetzt das Formular. Ohne diese Zeile bliebe der Fokus
  // auf einem Absendeknopf, den es nicht mehr gibt — er fiele auf <body>, und
  // der nächste Tabulator begänne wieder ganz oben auf der Seite. Dieselbe
  // Behandlung wie in den vier Geschwisterprojekten.
  useEffect(() => {
    if (zustand.status === "demo") bestaetigungRef.current?.focus();
  }, [zustand.status]);

  // Die Übergabe aus dem Vorbefund, beim Rendern abgeleitet statt per Effekt
  // nachgereicht: `null` heißt "der Besucher hat das Feld noch nicht angefasst",
  // dann gilt der Vorschlag. Sobald er tippt, gewinnt sein Text — auch wenn er
  // das Feld absichtlich leert. Ein Effekt, der den Wert später hineinschreibt,
  // würde genau diesen Fall überschreiben.
  const [eingabe, setEingabe] = useState<string | null>(null);
  const vorschlag = bereit && probleme.length > 0 ? alsAnliegen(probleme) : "";
  const anliegen = eingabe ?? vorschlag;
  const uebernommen = eingabe === null && vorschlag !== "";

  if (zustand.status === "demo" && zustand.zusammenfassung) {
    return (
      <div
        ref={bestaetigungRef}
        tabIndex={-1}
        role="status"
        className="border border-instrument bg-karte p-6 outline-none"
      >
        <h2 className="flex items-center gap-2 text-block font-semibold">
          <HakenIcon className="size-5" />
          {t("demoTitel")}
        </h2>
        <p className="mt-3 leading-relaxed text-text-zweit">{t("demoText")}</p>
        <p className="mt-4 border-l-4 border-linie-stark pl-4 leading-relaxed">
          {t("demoBestaetigung", { antwortzeit: WERKSTATT.antwortzeit })}
        </p>
        <dl className="mt-6 divide-y divide-linie border-t border-linie font-mono text-sm">
          {(
            [
              [t("anliegen"), zustand.zusammenfassung.anliegen],
              [t("fahrzeug"), zustand.zusammenfassung.fahrzeug],
              [t("wann"), zustand.zusammenfassung.wann],
              [t("kontakt"), zustand.zusammenfassung.kontakt],
            ] as const
          ).map(([bezeichnung, wert]) => (
            <div key={bezeichnung} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-text-zweit">{bezeichnung}</dt>
              <dd className="whitespace-pre-line">{wert}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  return (
    <form action={absenden} className="space-y-8">
      <div>
        <label htmlFor="anliegen" className="block font-semibold">
          {t("anliegen")}
        </label>
        {uebernommen && (
          <p className="mt-1 font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
            {t("ausVorbefund")} — {t("ausVorbefundHinweis")}
          </p>
        )}
        <textarea
          id="anliegen"
          name="anliegen"
          rows={6}
          value={anliegen}
          onChange={(e) => setEingabe(e.target.value)}
          placeholder={t("anliegenPlatzhalter")}
          aria-invalid={zustand.fehler?.anliegen ? true : undefined}
          aria-describedby={zustand.fehler?.anliegen ? "anliegen-fehler" : undefined}
          className={cn(
            "mt-2 w-full border bg-karte px-3 py-2.5 leading-relaxed transition-colors hover:border-instrument",
            zustand.fehler?.anliegen ? "border-sofort" : "border-linie-stark",
          )}
        />
        {zustand.fehler?.anliegen && (
          <p id="anliegen-fehler" className="mt-1.5 text-sm text-sofort">
            {t("fehlerAnliegen")}
          </p>
        )}
      </div>

      <fieldset>
        <legend className="font-semibold">{t("fahrzeug")}</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-3">
          <Feld name="marke" label={t("marke")} autoComplete="off" />
          <Feld name="modell" label={t("modell")} autoComplete="off" />
          <Feld name="baujahr" label={t("baujahr")} inputMode="numeric" autoComplete="off" />
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-semibold">{t("wann")}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {[t("wannDieseWoche"), t("wannNaechsteWoche"), t("wannFlexibel")].map((wahl, i) => (
            <label
              key={wahl}
              className="inline-flex items-center gap-2 border border-linie-stark bg-karte px-4 py-2.5 text-sm transition-colors hover:border-instrument has-checked:border-instrument has-checked:bg-grund"
            >
              <input type="radio" name="wann" value={wahl} defaultChecked={i === 2} />
              {wahl}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-semibold">{t("kontakt")}</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <Feld name="name" label={t("name")} autoComplete="name" />
          <Feld
            name="kontakt"
            label={t("telefonOderMail")}
            autoComplete="tel"
            fehler={zustand.fehler?.kontakt}
            fehlertext={t("fehlerKontakt")}
          />
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={laeuft}
        className={knopf("haupt", laeuft ? "opacity-60" : undefined)}
      >
        {t("absenden")}
      </button>
    </form>
  );
}

function Feld({
  name,
  label,
  fehler,
  fehlertext,
  ...props
}: {
  name: string;
  label: string;
  fehler?: boolean;
  fehlertext?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-text-zweit">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        aria-invalid={fehler ? true : undefined}
        aria-describedby={fehler ? `${name}-fehler` : undefined}
        className={cn(
          "mt-1 w-full border bg-karte px-3 py-2.5 transition-colors hover:border-instrument",
          fehler ? "border-sofort" : "border-linie-stark",
        )}
        {...props}
      />
      {fehler && fehlertext && (
        <p id={`${name}-fehler`} className="mt-1.5 text-sm text-sofort">
          {fehlertext}
        </p>
      )}
    </div>
  );
}
