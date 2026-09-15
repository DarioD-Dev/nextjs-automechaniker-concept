import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // `opengraph-image` trägt keine Dateiendung in der URL, die Regel "alles mit
  // einem Punkt überspringen" greift dort also nicht. Ohne die Ausnahme leitet
  // die Middleware /opengraph-image auf /de/opengraph-image um — eine Route,
  // die es nicht gibt. Steht hier, bevor die Route existiert, weil genau diese
  // Reihenfolge im Parfümerie-Projekt einmal eine bildlose Linkvorschau
  // erzeugt hat, die niemand bemerkte.
  matcher: ["/((?!api|trpc|_next|_vercel|opengraph-image|.*\\..*).*)"],
};
