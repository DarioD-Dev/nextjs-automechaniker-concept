import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { knopf } from "@/components/ui/Knopf";

export default async function NichtGefunden() {
  const t = await getTranslations("NichtGefunden");

  return (
    <Container className="py-20 sm:py-28">
      <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
        Fehler / 404
      </p>
      <h1 className="mt-3 text-hero font-bold">{t("titel")}</h1>
      <p className="mt-4 max-w-[52ch] text-lead leading-relaxed text-text-zweit">{t("text")}</p>
      <Link href="/" className={knopf("haupt", "mt-8")}>
        {t("zurStartseite")}
      </Link>
    </Container>
  );
}
