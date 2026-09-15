"use server";

export type AnfrageZustand = {
  status: "leer" | "fehler" | "demo";
  fehler?: { anliegen?: boolean; kontakt?: boolean };
  /** Wird auf der Bestätigung gezeigt: Was wäre versendet worden. */
  zusammenfassung?: { anliegen: string; fahrzeug: string; wann: string; kontakt: string };
};

/**
 * Bewusst eine Serveraktion, obwohl nichts versendet wird.
 *
 * Grund: So funktioniert das Formular auch ohne JavaScript — abschicken,
 * prüfen, Antwort. Eine reine Client-Lösung wäre kürzer und würde bei
 * abgeschaltetem JavaScript ins Leere laufen.
 *
 * Und bewusst OHNE Mailversand. KLARWERK ist eine Konzeptstudie; ein
 * Formular, das echt aussieht und nichts tut, ist die unangenehmste Sorte
 * Attrappe. Also sagt die Bestätigung, was passiert ist: nichts.
 */
export async function anfrageSenden(
  _vorher: AnfrageZustand,
  formular: FormData,
): Promise<AnfrageZustand> {
  const anliegen = String(formular.get("anliegen") ?? "").trim();
  const kontakt = String(formular.get("kontakt") ?? "").trim();
  const name = String(formular.get("name") ?? "").trim();
  const marke = String(formular.get("marke") ?? "").trim();
  const modell = String(formular.get("modell") ?? "").trim();
  const baujahr = String(formular.get("baujahr") ?? "").trim();
  const wann = String(formular.get("wann") ?? "").trim();

  const fehler: NonNullable<AnfrageZustand["fehler"]> = {};
  if (anliegen.length < 5) fehler.anliegen = true;
  if (kontakt.length < 5) fehler.kontakt = true;

  if (Object.keys(fehler).length > 0) return { status: "fehler", fehler };

  return {
    status: "demo",
    zusammenfassung: {
      anliegen,
      fahrzeug: [marke, modell, baujahr].filter(Boolean).join(" ") || "—",
      wann: wann || "—",
      kontakt: [name, kontakt].filter(Boolean).join(", "),
    },
  };
}
