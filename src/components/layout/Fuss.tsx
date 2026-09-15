import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "./Wordmark";
import { TelefonKnopf } from "./TelefonKnopf";
import { WERKSTATT, PANNENHILFE } from "@/data/werkstatt";

export async function Fuss() {
  const t = await getTranslations("Fuss");

  return (
    <footer className="mt-auto bg-instrument text-text-auf-instrument">
      <Container className="grid gap-10 py-12 sm:grid-cols-3">
        <div>
          <Wordmark className="text-lg" />
          <p className="mt-2 text-sm text-white/70">{WERKSTATT.zeile}</p>
          <TelefonKnopf variante="instrument" className="mt-4" />
        </div>

        <div>
          <h2 className="font-mono text-label tracking-[0.09em] text-white/50 uppercase">
            {t("adresse")}
          </h2>
          <address className="mt-3 text-sm not-italic text-white/85">
            {WERKSTATT.strasse}
            <br />
            {WERKSTATT.plz} {WERKSTATT.ort}
          </address>
        </div>

        <div>
          <h2 className="font-mono text-label tracking-[0.09em] text-white/50 uppercase">
            {t("oeffnungszeiten")}
          </h2>
          <dl className="mt-3 space-y-1 text-sm text-white/85">
            {WERKSTATT.oeffnungszeiten.map((z) => (
              <div key={z.tage} className="flex justify-between gap-4">
                <dt>{z.tage}</dt>
                <dd className="font-mono">{z.zeit}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <div className="border-t border-white/15">
        <Container className="py-6">
          <h2 className="font-mono text-label tracking-[0.09em] text-white/50 uppercase">
            {t("fiktionTitel")}
          </h2>
          <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-white/70">{t("fiktion")}</p>
          <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-white/70">
            {t("pannenhilfeHinweis")} {PANNENHILFE.map((p) => `${p.name} ${p.nummer}`).join(", ")}.
          </p>
        </Container>
      </div>
    </footer>
  );
}
