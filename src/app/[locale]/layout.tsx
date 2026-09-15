import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { routing } from "@/i18n/routing";
import { buildAlternates, SITE_URL } from "@/lib/seo";
import { inter, jetbrains } from "@/styles/fonts";
import { SkipLink } from "@/components/layout/SkipLink";
import { Kopf } from "@/components/layout/Kopf";
import { Fuss } from "@/components/layout/Fuss";
import { VorbefundProvider } from "@/components/vorbefund/VorbefundProvider";
import { Vorbefund } from "@/components/vorbefund/Vorbefund";
import "@/styles/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: `%s — KLARWERK` },
    description: t("description"),
    // Konzeptstudie: darf in der Suche mit keiner echten Werkstatt konkurrieren.
    robots: { index: false, follow: false },
    alternates: buildAlternates("/", locale),
    openGraph: {
      type: "website",
      siteName: "KLARWERK",
      title: t("title"),
      description: t("description"),
      locale: "de_AT",
      url: SITE_URL,
      // Ausdrücklich gesetzt und nicht der automatischen Ergänzung überlassen:
      // Next führt `openGraph` NICHT zusammen, sondern ersetzt es ganz. Jede
      // Seite mit eigenem openGraph würde die Bildangabe sonst überschreiben.
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrains.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          {/* Der Provider erzeugt kein eigenes DOM-Element. Damit bleiben
              Kopf, Inhalt, Fuß und Vorbefund direkte Kinder von <body> — die
              Voraussetzung dafür, dass die Druckregel in globals.css alles
              außer dem Vorbefund ausblenden kann. */}
          <VorbefundProvider>
            <SkipLink />
            <Kopf />
            <main id="inhalt" className="flex-1">
              {children}
            </main>
            <Fuss />
            <Vorbefund />
          </VorbefundProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
