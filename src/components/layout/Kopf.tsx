import { getLocale, getTranslations } from "next-intl/server";
import { Link, getPathname } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "./Wordmark";
import { TelefonKnopf } from "./TelefonKnopf";
import { cn } from "@/lib/cn";

/**
 * Dunkle Leiste auf hellem Grund — die Instrumententafel über dem Papier.
 *
 * Nur zwei Navigationspunkte, und beide führen auf etwas, das es gibt. Die
 * Seiten "Leistungen & Preise" und "Werkstatt" stehen im Bauplan, aber noch
 * nicht im Projekt; sie kommen in die Navigation, wenn sie existieren. Ein
 * Link auf eine leere Seite ist schlechter als ein fehlender Link.
 */
/**
 * Die Unterstreichung wächst von links, statt beim Überfahren zu erscheinen.
 * Erscheinen lässt die Zeile springen und sagt nur „hier ist ein Link";
 * wachsen zeigt zusätzlich, welcher gerade gemeint ist. Als ::after, damit
 * kein Textdekor das Layout anfasst. Der Tastaturfokus löst dasselbe aus —
 * sonst bekäme nur die Maus die Orientierung.
 */
const NAV_LINK =
  "relative -my-3 py-3 text-sm font-medium after:absolute after:bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform hover:after:scale-x-100 focus-visible:after:scale-x-100";

export async function Kopf() {
  const locale = await getLocale();
  const t = await getTranslations("Kopf");
  const start = getPathname({ href: "/", locale });
  const finder = `${start}#finder`;

  return (
    <header className="sticky top-0 z-40 bg-instrument text-text-auf-instrument">
      <Container className="flex items-center justify-between gap-4 py-3">
        {/* Nur die Wortmarke. Der Claim stand hier und drei Zeilen tiefer noch
            einmal im Markenband des Heros — zweimal derselbe Satz auf einem
            Bildschirm entwertet ihn. Er gehört an die Stelle, an der er den
            ersten Bildschirm abschließt, nicht in die Leiste darüber. */}
        {/* -my/py: Die Trefferfläche wird auf Daumengröße gebracht, ohne die
            Leiste höher zu machen — negative Außenabstände nehmen zurück, was
            der Innenabstand dem Layout hinzufügen würde. Gemessen am Telefon
            waren Wortmarke und Navigation vorher 28 bzw. 20px hoch. */}
        {/* Bewusst ein echter Seitenaufruf und kein Client-Wechsel: Die
            Wortmarke soll die Startseite so zeigen, wie man sie beim ersten
            Besuch sieht — ganz oben, mit dem Selbsttest der Warnleuchten.
            Ein <Link> auf dieselbe Route behält die Scrollposition und
            montiert nichts neu; man landet dort, wo man gerade war. */}
        <a href={start} className="-my-2 flex items-center py-2 leading-none">
          <Wordmark className="text-lg sm:text-xl" />
        </a>

        <nav aria-label="Hauptnavigation" className="flex items-center gap-3 sm:gap-6">
          <a href={finder} className={NAV_LINK}>
            {t("navProblem")}
          </a>
          <Link href="/leistungen" className={cn(NAV_LINK, "hidden sm:inline")}>
            {t("navLeistungen")}
          </Link>
          <Link href="/werkstatt" className={cn(NAV_LINK, "hidden lg:inline")}>
            {t("navWerkstatt")}
          </Link>
          {/* Immer sichtbar, auch auf dem Telefon: Bei echter Dringlichkeit
              schlägt ein Anruf jedes Formular — und wer ein Problem hat, steht
              mit genau diesem Gerät neben dem Auto. */}
          <TelefonKnopf variante="instrument" kompakt />
          <Link
            href="/termin"
            /* Dieser Knopf sitzt in der klebenden Leiste und steht auf jeder
               Seite an derselben Stelle. Er soll dort ruhig bleiben: Ein Knopf,
               der beim Überfahren wandert, macht die Leiste unruhig, an der
               sich das Auge orientiert. Statt Bewegung ein Flächenwechsel auf
               den Akzent — dieselbe Farbe, die überall sonst die Haupthandlung
               trägt. Dunkler Text darauf misst 7,3:1. */
            className="rounded-sm bg-white px-3 py-2 text-sm font-semibold whitespace-nowrap text-instrument transition-colors hover:bg-akzent hover:text-text sm:px-4"
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
