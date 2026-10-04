import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { WERKSTATT } from "@/data/werkstatt";
import Image from "next/image";
import { PfeilRechtsIcon } from "@/components/icons/UiIcons";

export async function Einstieg() {
  const t = await getTranslations("Start");
  return (
    <>
      {/* Der Einstieg ist bewusst ruhig: eine Frage, ein Satz, eine Handlung.
          Die Informationsdichte beginnt erst darunter mit dem Finder — der
          Besucher soll erst ankommen und dann arbeiten.

          Keine Dringlichkeitsfarben hier: Rot, Gelb und Blau bedeuten den
          Zustand eines Fahrzeugs. Über ein Fahrzeug, das wir nicht kennen,
          sagen wir im Einstieg nichts. */}
      {/* ── Der Hero ──────────────────────────────────────────────────────
          Drei gestalterische Entscheidungen, mehr nicht:

          1. DAS FOTO LIEGT UNTER DEM PAPIER. Es läuft über die volle Höhe und
             randlos nach rechts, und seine linke Kante löst sich über eine
             Maske in den Off-White-Grund auf. Dadurch endet es nicht als
             Bildhälfte, sondern taucht aus der Fläche auf. Kein Verlauf über
             dem Bild — maskiert wird das Bild selbst, sonst entstünde ein
             grauer Schleier statt eines Übergangs.

          2. DER FIKTIONSHINWEIS STEHT IM MARKENBAND, waagerecht, neben dem
             Claim. Das Band schließt den ersten Bildschirm ab und ist die
             einzige Stelle, an der beide Sätze hingehören: was wir tun und
             woran man hier ist.

          Die Maße sind gerechnet, nicht geschätzt: Bei 50 vw Breite über die
          volle Höhe zeigt `object-cover` 58 % der Bildbreite. Genau dort endet
          die Karosserie. Säule (62 %) und Absaugschlauch (74 %) bleiben
          draußen — die beiden unruhigsten Stellen des Originals. */}
      <section className="relative flex min-h-[calc(100svh-3.75rem)] flex-col overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[50vw] lg:block"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 26%, rgba(0,0,0,0.85) 54%, #000 72%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 26%, rgba(0,0,0,0.85) 54%, #000 72%)",
          }}
        >
          <Image
            src="/bilder/werkstatt-hebebuehne.jpg"
            alt={t("bildAlt")}
            fill
            priority
            /* Unterhalb von 1024px ist dieses Bild display:none — ohne die
               Medienbedingung lädt der Browser trotzdem eine 50vw-Variante
               und legt einen Preload dafür an, der nie gebraucht wird. */
            sizes="(min-width: 64rem) 50vw, 1px"
            className="object-cover object-left"
          />
        </div>

        <Container className="relative flex flex-1 flex-col justify-center py-16 sm:py-24">
          <p className="font-mono text-label tracking-[0.09em] text-titel uppercase">
            {t("ortLabel")} {WERKSTATT.plz} {WERKSTATT.ort}
          </p>

          {/* hyphens-none: Die globale Trennregel ist für Fachkomposita gedacht
              („Motorkontrollleuchte"). Hier trennte sie „Ih-rem" — im
              Markenmoment ist das der teuerste mögliche Umbruch.

              Die Überschrift darf jetzt in die Maskenzone hineinlaufen: Das
              Bild liegt dahinter und ist dort noch fast vollständig Papier. */}
          <h1 className="mt-6 max-w-[13ch] text-marke font-bold text-titel hyphens-none lg:max-w-[11ch]">
            {t("titel")}
          </h1>

          <p className="mt-8 max-w-[44ch] text-lead leading-relaxed text-text-zweit lg:max-w-[38ch]">
            {t("lead")}
          </p>

          {/* Genau eine Handlung. Sie führt nicht weg, sondern weiter: in den
              Finder direkt darunter. Die Linie darunter zieht den Blick dorthin. */}
          <a
            href="#finder"
            className="group mt-10 inline-flex w-fit items-center gap-3 rounded-sm bg-akzent px-6 py-4 text-base font-bold text-text transition-[background-color,color,transform] hover:-translate-y-px hover:bg-instrument hover:text-text-auf-instrument active:translate-y-0"
          >
            {t("heroCta")}
            {/* Der Pfeil zeigt nach unten, weil die Handlung nach unten führt
                — in den Finder direkt darunter. Beim Überfahren läuft er
                einmal durch: unten hinaus, oben wieder herein. */}
            <span aria-hidden="true" className="kw-pfeil-schacht">
              <PfeilRechtsIcon className="kw-pfeil-ab size-5 rotate-90" />
            </span>
          </a>
        </Container>

        {/* Mobil dasselbe Prinzip um 90 Grad gedreht: Das Bild sitzt unten und
            löst sich nach oben ins Papier auf. */}
        <div
          className="pointer-events-none relative mt-auto h-64 w-full sm:h-72 lg:hidden"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 30%, #000 62%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 30%, #000 62%)",
          }}
        >
          <Image
            src="/bilder/werkstatt-hebebuehne.jpg"
            alt={t("bildAlt")}
            fill
            priority
            sizes="(min-width: 64rem) 1px, 100vw"
            className="object-cover object-[16%_center]"
          />
        </div>

        {/* Der Markensatz schließt den ersten Bildschirm ab und trennt ihn von
            der Informationsebene darunter. */}
        <div className="relative bg-instrument">
          <Container className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
            <p className="font-mono text-label tracking-[0.09em] text-text-auf-instrument uppercase">
              {WERKSTATT.zeile}
            </p>
            {/* Waagerecht und auf jeder Breite: Senkrecht an der Bildkante war
                der Hinweis zwar die Zeitschriftenkonvention, aber ausgerechnet
                die Fiktionsangabe soll man nicht mit gedrehtem Kopf lesen
                müssen. Im Markenband steht sie neben dem Claim — beide sagen,
                woran man hier ist. */}
            <p className="font-mono text-[0.6875rem] tracking-[0.06em] text-white/70">
              {t("bildCaption")}
            </p>
          </Container>
        </div>
      </section>
    </>
  );
}
