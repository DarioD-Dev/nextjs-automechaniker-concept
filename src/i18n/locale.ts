import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "./routing";

/**
 * Verengt den `[locale]`-Routenparameter auf eine Sprache, die es hier
 * tatsächlich gibt.
 *
 * Next erzeugt den Parameter als `string`. Ihn stattdessen von Hand als
 * `Locale` zu deklarieren wäre eine Behauptung, keine Prüfung — genau der
 * Fehler, der in den Geschwisterprojekten aufgeräumt wurde.
 */
export function assertLocale(value: string): Locale {
  if (!hasLocale(routing.locales, value)) notFound();
  return value;
}
