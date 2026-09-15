import { redirect } from "next/navigation";
import { assertLocale } from "@/i18n/locale";

/**
 * /de/problem hat keine eigene Seite.
 *
 * Bei zwölf Karten passt der vollständige Finder in den ersten Bildschirm der
 * Startseite — eine zweite Seite mit demselben Raster wäre Dopplung. Die Route
 * existiert trotzdem, damit niemand auf einer 404 landet, der die Adresse von
 * Hand kürzt.
 */
export default async function ProblemWeiterleitung({ params }: PageProps<"/[locale]/problem">) {
  const locale = assertLocale((await params).locale);
  redirect(`/${locale}#finder`);
}
