import type messages from "../messages/de.json";
import type { routing } from "@/i18n/routing";

// Macht next-intl die eigenen Sprachen und die Nachrichtenstruktur bekannt:
// jeder Übersetzungsschlüssel wird beim Kompilieren gegen die deutsche
// Nachrichtendatei geprüft. Ohne das fällt ein vertippter Schlüssel erst zur
// Laufzeit als MISSING_MESSAGE auf — im Browser desjenigen, der die Seite
// zufällig aufruft, bei grünem Build.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
