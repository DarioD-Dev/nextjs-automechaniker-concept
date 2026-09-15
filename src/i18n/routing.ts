import { defineRouting } from "next-intl/routing";

/**
 * Eine Sprache — und trotzdem die volle next-intl-Routenschicht.
 *
 * Begründung steht im Bauplan: Der Kunde ist ein Wiener Autofahrer, §57a ist
 * österreichisches Recht, und die inhaltliche Tiefe der Problemkarten ist bei
 * diesem Projekt der eigentliche Unterschied zum Wettbewerb. Eine zweite
 * Sprache würde diese Tiefe halbieren, nicht verdoppeln.
 *
 * Was hier trotzdem schon steht, kostet fast nichts und spart später den
 * Umbau: Präfix, Pfadtabelle, Middleware. Ehrlich dazugesagt — die Inhalte in
 * `src/data/` sind einsprachig getippt. Eine zweite Sprache wäre also kein
 * Routen-Umbau mehr, aber sehr wohl eine Änderung an der Datenform.
 */
export const routing = defineRouting({
  locales: ["de"],
  defaultLocale: "de",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/problem": "/problem",
    "/problem/[kennung]": "/problem/[kennung]",
    "/leistungen": "/leistungen",
    "/leistungen/[slug]": "/leistungen/[slug]",
    "/unfall": "/unfall",
    "/termin": "/termin",
  },
});

export type Locale = (typeof routing.locales)[number];
