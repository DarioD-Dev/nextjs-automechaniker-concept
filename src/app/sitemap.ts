import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { PROBLEME } from "@/data/probleme";
import { DETAILS } from "@/data/leistungen";
import { absoluteUrl } from "@/lib/seo";

// Aus der Datenquelle gebaut, nicht von Hand gepflegt: Eine neue Problemkarte
// kann so nicht still aus der Sitemap fallen.
export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) => [
    { url: absoluteUrl("/", locale), priority: 1 },
    { url: absoluteUrl("/leistungen", locale), priority: 0.9 },
    ...DETAILS.map((detail) => ({
      url: absoluteUrl({ pathname: "/leistungen/[slug]", params: { slug: detail.slug } }, locale),
      priority: 0.7,
    })),
    { url: absoluteUrl("/unfall", locale), priority: 0.9 },
    { url: absoluteUrl("/termin", locale), priority: 0.8 },
    ...PROBLEME.map((problem) => ({
      url: absoluteUrl(
        { pathname: "/problem/[kennung]", params: { kennung: problem.kennung } },
        locale,
      ),
      priority: 0.9,
    })),
  ]);
}
