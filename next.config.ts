import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// `src/app/opengraph-image.tsx` liest die Schriftdateien über
// readFile(join(process.cwd(), "assets/...")). Der Pfad entsteht zur Laufzeit,
// die Dateiverfolgung des Builds erkennt ihn nicht zuverlässig und packt
// `assets/` dann nicht ins Serverbündel.
//
// Die Folge wäre besonders unangenehm, weil sie lokal unsichtbar ist: Beim
// `next start` liegt das Projektverzeichnis ohnehin richtig. Erst in der
// Produktion fehlte die Datei — sichtbar dann, wenn jemand den Link teilt.
const nextConfig: NextConfig = {
  images: {
    // AVIF zuerst: Das Hero-Bild ist das Seitengewicht der Startseite und
    // landet damit deutlich unter WebP bei gleicher Qualität.
    formats: ["image/avif", "image/webp"],
  },
  outputFileTracingIncludes: {
    "/opengraph-image": ["./assets/**/*.woff"],
  },
};

export default withNextIntl(nextConfig);
