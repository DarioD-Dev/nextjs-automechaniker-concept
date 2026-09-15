import { getTranslations } from "next-intl/server";

// Sichtbar nur bei Tastaturfokus. Ohne ihn muss jeder Tastaturnutzer auf
// jeder Seite erst durch Wortmarke, Navigation, Telefon und Termin-Knopf.
export async function SkipLink() {
  const t = await getTranslations("Kopf");

  return (
    <a
      href="#inhalt"
      className="absolute top-3 left-3 z-50 -translate-y-24 rounded-sm bg-instrument px-5 py-3 text-sm font-semibold text-text-auf-instrument transition-transform focus:translate-y-0"
    >
      {t("zumInhalt")}
    </a>
  );
}
