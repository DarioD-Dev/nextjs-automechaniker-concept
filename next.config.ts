import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// Bewusst leer, solange nichts gebraucht wird. Die Geschwisterprojekte tragen
// hier `outputFileTracingIncludes` für die Schriftdateien der OG-Karte — das
// kommt erst dazu, wenn `src/app/opengraph-image.tsx` existiert. Konfiguration
// auf Verdacht ist die Art von Altlast, die niemand mehr zu entfernen wagt.
const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
