import { notFound } from "next/navigation";

// Fängt alles unterhalb von /[locale] ab, wofür es keine Route gibt, und
// lässt die lokalisierte 404-Seite greifen — sonst rendert Next die
// sprachlose Standardseite ohne Kopf und ohne Rückweg.
export default function Auffang() {
  notFound();
}
