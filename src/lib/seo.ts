import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/**
 * Der Alternativtext des Vorschaubilds — an einer Stelle, weil ihn zwei
 * Module brauchen: `app/opengraph-image.tsx` exportiert ihn als `alt`, und
 * das `images`-Objekt der Linkvorschau muss ihn am Bild mitgeben. Next
 * ergänzt das Datei-Metadatum nämlich NUR, solange keine eigene
 * `openGraph.images`-Angabe existiert — und die steht hier aus gutem Grund.
 * Ohne diese Zusammenführung bleibt der Export wirkungslos und og:image:alt
 * leer.
 */
export const OG_IMAGE_ALT = "KLARWERK — Kfz-Werkstatt in Wien";

// Einzige Stelle, an der der absolute Ursprung herkommt. Ohne ihn rendert Next
// canonical- und OpenGraph-Adressen relativ, was sie für Crawler und
// Linkvorschauen wertlos macht.
//
// Nach dem Repository benannt, nicht nach der erfundenen Werkstatt: Das hier
// ist eine Konzeptstudie, und ein frei erfundener Firmenname in der Adresse
// läse sich wie die echte Seite eines echten Betriebs.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nextjs-automechaniker-concept.vercel.app";

type Href = Parameters<typeof getPathname>[0]["href"];

export function absoluteUrl(href: Href, locale: string): string {
  return new URL(getPathname({ href, locale: locale as "de" }), SITE_URL).toString();
}

export function buildAlternates(href: Href, locale: string) {
  return {
    canonical: absoluteUrl(href, locale),
    languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(href, l)])),
  };
}
