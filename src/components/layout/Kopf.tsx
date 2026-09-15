import { getLocale, getTranslations } from "next-intl/server";
import { Link, getPathname } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "./Wordmark";
import { TelefonKnopf } from "./TelefonKnopf";
import { WERKSTATT } from "@/data/werkstatt";

/**
 * Dunkle Leiste auf hellem Grund — die Instrumententafel über dem Papier.
 *
 * Nur zwei Navigationspunkte, und beide führen auf etwas, das es gibt. Die
 * Seiten "Leistungen & Preise" und "Werkstatt" stehen im Bauplan, aber noch
 * nicht im Projekt; sie kommen in die Navigation, wenn sie existieren. Ein
 * Link auf eine leere Seite ist schlechter als ein fehlender Link.
 */
export async function Kopf() {
  const locale = await getLocale();
  const t = await getTranslations("Kopf");
  const finder = `${getPathname({ href: "/", locale })}#finder`;

  return (
    <header className="sticky top-0 z-40 bg-instrument text-text-auf-instrument">
      <Container className="flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex flex-col leading-tight">
          <Wordmark className="text-lg sm:text-xl" />
          <span className="hidden text-xs text-white/60 sm:block">{WERKSTATT.zeile}</span>
        </Link>

        <nav aria-label="Hauptnavigation" className="flex items-center gap-3 sm:gap-6">
          <a href={finder} className="text-sm font-medium hover:underline underline-offset-4">
            {t("navProblem")}
          </a>
          <Link
            href="/leistungen"
            className="hidden text-sm font-medium underline-offset-4 hover:underline sm:inline"
          >
            {t("navLeistungen")}
          </Link>
          {/* Immer sichtbar, auch auf dem Telefon: Bei echter Dringlichkeit
              schlägt ein Anruf jedes Formular — und wer ein Problem hat, steht
              mit genau diesem Gerät neben dem Auto. */}
          <TelefonKnopf variante="instrument" kompakt />
          <Link
            href="/termin"
            className="rounded-sm bg-white px-3 py-2 text-sm font-semibold whitespace-nowrap text-instrument transition-colors hover:bg-white/85 sm:px-4"
          >
            {/* Auf 390px stünde "Termin anfragen" neben Wortmarke, Navigation
                und Telefon zweizeilig im Kopf. Kurzform statt Umbruch. */}
            <span className="sm:hidden">{t("ctaKurz")}</span>
            <span className="hidden sm:inline">{t("cta")}</span>
          </Link>
        </nav>
      </Container>
    </header>
  );
}
