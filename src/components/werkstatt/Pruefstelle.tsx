import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { PfeilRechtsIcon } from "@/components/icons/UiIcons";

export async function Pruefstelle() {
  const t = await getTranslations("Werkstatt");
  return (
    <>
      <section className="bg-instrument text-text-auf-instrument">
        <Container className="max-w-[62rem] py-16 sm:py-20 lg:py-24">
          <p className="font-mono text-label tracking-[0.09em] text-white/70 uppercase">
            {t("pruefstelleLabel")} / 04
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
            <h2 className="max-w-[18ch] text-[clamp(1.75rem,1.1rem+2.6vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.02em] hyphens-none">
              {t("pruefstelleTitel")}
            </h2>
            <div className="max-w-[48ch]">
              <p className="text-lead leading-relaxed font-medium">{t("pruefstelleText")}</p>
              <p className="mt-4 leading-relaxed text-white/80">{t("pruefstelleWarum")}</p>
              <Link
                href={{ pathname: "/leistungen/[slug]", params: { slug: "pickerl" } }}
                className="group -my-1 mt-6 inline-flex items-center gap-1.5 py-1 text-sm font-medium text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
              >
                {t("pruefstelleLink")}
                <span aria-hidden="true" className="kw-pfeil-schacht">
                  <PfeilRechtsIcon className="kw-pfeil-quer size-4" />
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
