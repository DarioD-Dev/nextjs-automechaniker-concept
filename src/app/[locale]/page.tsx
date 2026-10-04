import { setRequestLocale } from "next-intl/server";
import { assertLocale } from "@/i18n/locale";
import { Container } from "@/components/ui/Container";
import { Finder } from "@/components/finder/Finder";
import { Einstieg } from "@/components/start/Einstieg";
import { Festpreise } from "@/components/start/Festpreise";
import { Grenze } from "@/components/start/Grenze";
import { Preisgrundlage } from "@/components/start/Preisgrundlage";
import { AblaufKurz } from "@/components/start/AblaufKurz";
import { Menschen } from "@/components/start/Menschen";

export default async function Startseite({ params }: PageProps<"/[locale]">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);

  return (
    <>
      <Einstieg />

      <Container className="pb-abschnitt sm:pb-abschnitt-lg">
        <div className="mt-10">
          <Finder />
        </div>
      </Container>

      <Festpreise />

      <Grenze />

      <Preisgrundlage />

      <AblaufKurz />

      <Menschen />
    </>
  );
}
