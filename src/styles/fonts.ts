import { Inter, JetBrains_Mono } from "next/font/google";

// Nur die Schnitte, die das Design wirklich benutzt. next/font liefert die
// Dateien selbst aus und bettet die @font-face-Regeln zur Bauzeit ein — kein
// blockierender Aufruf an ein Schrift-CDN, keine Einwilligungsfrage.
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
  display: "swap",
});
