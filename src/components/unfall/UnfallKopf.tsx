import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

export async function UnfallKopf() {
  const t = await getTranslations("Unfall");

  const abschnitte = [
    { id: "verletzt", titel: t("t01") },
    { id: "fahren", titel: t("t02") },
    { id: "unterlagen", titel: t("t03") },
    { id: "kosten", titel: t("t04") },
    { id: "leistung", titel: t("t05") },
    { id: "grenzen", titel: t("t06") },
  ];

  return (
    <>
      <Container className="max-w-[60rem] pt-10 pb-8 sm:pt-14">
        <h1 className="text-hero font-bold">{t("titel")}</h1>
        <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-text-zweit">{t("lead")}</p>

        <nav aria-label={t("inhalt")} className="mt-8 border-t border-linie pt-4">
          <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
            {t("inhalt")}
          </p>
          <ol className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
            {abschnitte.map((a, i) => (
              <li key={a.id}>
                <a
                  href={`#${a.id}`}
                  className="-my-1 inline-block py-1 text-sm underline decoration-linie-stark underline-offset-4 transition-colors hover:text-titel hover:decoration-instrument"
                >
                  <span className="font-mono text-text-zweit">
                    {String(i + 1).padStart(2, "0")}
                  </span>{" "}
                  {a.titel}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </>
  );
}
