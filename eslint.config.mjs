import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/link",
              message:
                "Use { Link } from '@/i18n/navigation' — preserves locale prefix and localised pathnames.",
            },
          ],
        },
      ],
      // Fängt den zweiten Weg an der sprachbewussten Navigation vorbei: ein
      // rohes <a href="/..."> statt <Link> aus @/i18n/navigation. Auf
      // JSXOpeningElement mit dem Namen "a" eingeschränkt (das native Tag,
      // klein geschrieben), damit eigene Komponenten mit einer href-Prop
      // nicht mitgemeldet werden. Externe, mailto-, tel- und Ankerlinks sind
      // nicht betroffen — es greift nur bei Zeichenketten, die mit genau
      // einem "/" beginnen.
      "no-restricted-syntax": [
        "error",
        {
          selector:
            'JSXOpeningElement[name.name="a"] > JSXAttribute[name.name="href"] > Literal[value=/^\\/(?!\\/)/]',
          message:
            "Use { Link } from '@/i18n/navigation' for internal routes instead of a raw <a href=\"/...\"> — preserves locale prefix and localised pathnames.",
        },
      ],
    },
  },
  {
    // Außerhalb von [locale] gibt es weder Sprache noch Pfadtabelle: Diese
    // beiden Dateien rendern ohne das Locale-Layout — die eine, wenn eine
    // Adresse gar keine Sprache enthält, die andere, wenn das Wurzel-Layout
    // selbst scheitert. Dort ist next/link beziehungsweise ein rohes
    // <a href="/"> nicht der Fehler, sondern die einzige richtige Antwort:
    // "/" lässt die Middleware die Sprache verhandeln, sobald sie wieder läuft.
    files: ["src/app/not-found.tsx", "src/app/global-error.tsx"],
    rules: {
      "no-restricted-imports": "off",
      "no-restricted-syntax": "off",
      // Und hier ist der harte Seitenaufruf ausdrücklich gewollt, nicht
      // geduldet: global-error.tsx greift, wenn das Wurzel-Layout beim
      // Rendern gescheitert ist. Ein <Link> würde weich navigieren und dabei
      // genau den Router benutzen, der womöglich das Problem ist. Ein echter
      // Seitenaufruf lädt alles neu — Middleware, Layout, Sprache.
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
