import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Problem } from "@/data/types";
import { findeProblem } from "@/data/probleme";
import { findeLeistung } from "@/data/leistungen";
import { ProblemSymbol } from "@/components/icons/ProblemSymbol";
import { ZonenKontur } from "@/components/icons/ZonenKontur";
import { PfeilRechtsIcon } from "@/components/icons/UiIcons";
import { VorbefundKnopf } from "@/components/vorbefund/VorbefundKnopf";
import { TelefonKnopf } from "@/components/layout/TelefonKnopf";
import { PANNENHILFE } from "@/data/werkstatt";
import { Container } from "@/components/ui/Container";
import { Section, AbschnittsLabel } from "@/components/ui/Section";
import { Preis } from "@/components/ui/Preis";
import { StufenSymbol, STUFEN_STIL, getStufenWorte } from "./Stufe";
import { cn } from "@/lib/cn";

/**
 * DESIGN-REFERENZ — vorerst nur für eine einzige Karte.
 *
 * Die Problemkarte war ein Stapel gerahmter Felder: sieben Kästen
 * untereinander, jeder mit derselben Form, dazu eine schwebende Tafel am
 * rechten Rand. Das las sich wie eine Info-App, nicht wie ein Befund.
 *
 * Dieselbe Information, neu geordnet nach dem, was die übrige Website
 * inzwischen kann:
 *
 *   Protokollkopf  — Urteil, Prüfpreis und Dauer stehen über dem ersten
 *                    Absatz, nicht in einer Tafel daneben.
 *   Möglichkeiten  — die Zeilenform der Preistafel: Einordnung links,
 *                    Sache rechts. Kein Balken, der eine Häufigkeit misst,
 *                    die niemand gemessen hat.
 *   Verschärfung   — der wichtigste Satz der Seite, zerlegt in Merkmale,
 *                    Urteil und Begründung statt in 300 Zeichen Fließtext.
 *   Prüfung        — die Prozesskette von der Werkstattseite: drei Schritte
 *                    auf einer Linie, die Minuten als Zahl.
 *   Grenze         — Form A, das dunkle Statement, einmal pro Seite.
 *
 * Die Form trägt inzwischen alle zwölf Karten; die alte `ProblemKarte` ist
 * entfallen. Was bei einer Karte fehlt, fällt zurück statt zu brechen: ohne
 * `verschaerfungMerkmale` steht die Verschärfung als Satz, ohne
 * `preisvergleich` der bisherige Hinweis unter dem einen Betrag.
 */
/**
 * Ein Befund hat einen engeren Takt als eine Übersichtsseite. Mit dem
 * Standardabstand der Abschnitte stünden auf dieser Seite 1040px reine
 * Polsterung — mehr als die Hälfte des Inhalts. Die Farbwechsel zwischen den
 * Kapiteln tragen die Gliederung hier ohnehin; der Abstand muss es nicht
 * zusätzlich tun.
 */
const BERICHT_TAKT = "py-10 sm:py-14";

export async function Befundbericht({ problem }: { problem: Problem }) {
  const t = await getTranslations("Problem");
  const worte = await getStufenWorte(problem.dringlichkeit);
  const stil = STUFEN_STIL[problem.dringlichkeit];
  const leistung = findeLeistung(problem.leistung.titel);
  const gesamt = problem.pruefschritte.reduce((s, p) => s + p.dauerMinuten, 0);
  const sofort = problem.dringlichkeit === "sofort";

  /* Die Abschnittsnummern zählen, was tatsächlich da ist. Fünf feste Nummern
     würden auf den Karten ohne Verschärfung eine Lücke lassen — und ein
     Prüfprotokoll, das von 02 auf 04 springt, sieht aus, als fehle eine
     Seite. */
  const abschnitte = [
    "urteil",
    "moeglichkeiten",
    ...(problem.verschaerfung ? ["verschaerfung"] : []),
    "pruefung",
    "grenze",
  ];
  const nr = (schluessel: string) => String(abschnitte.indexOf(schluessel) + 1).padStart(2, "0");

  const symbolfarbe =
    problem.leuchtfarbe === "rot"
      ? "text-sofort"
      : problem.leuchtfarbe === "gelb"
        ? "text-bald"
        : "text-text-zweit";

  return (
    <article>
      {/* ── Der Befundkopf ───────────────────────────────────────────────
          Alles, was in den ersten fünf Sekunden zählt, steht über der Falz:
          welche Leuchte, wie dringend, ob man fahren darf, was die Prüfung
          kostet, wie lange sie dauert. Vorher stand davon nur die Stufe hier
          und der Rest verteilt auf vier Kästen weiter unten. */}
      <Container className="max-w-[64rem] pt-6 pb-8 sm:pt-8 sm:pb-10">
        <Link
          href="/"
          className="group -my-1.5 inline-flex items-center gap-1.5 py-1.5 font-mono text-label tracking-[0.09em] text-text-zweit uppercase transition-colors hover:text-titel"
        >
          <span aria-hidden="true" className="kw-pfeil-schacht">
            <PfeilRechtsIcon className="kw-pfeil-zurueck size-3.5 rotate-180" />
          </span>
          {t("zurueck")}
        </Link>

        <header className="mt-6 flex items-start gap-5 sm:gap-8">
          {/* Das Symbol ist das beste Material des Projekts: Der Kunde
              erkennt die Form aus seinem Cockpit wieder, bevor er ein Wort
              gelesen hat. */}
          <ProblemSymbol
            kennung={problem.kennung}
            className={cn("size-20 shrink-0 sm:size-28", symbolfarbe)}
          />
          <div className="min-w-0">
            <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {problem.art === "warnleuchte" ? t("warnleuchte") : t("symptom")}
            </p>
            <h1 className="mt-1 text-hero font-bold text-titel">{problem.titel}</h1>
            <p className="mt-2 font-mono text-sm text-text-zweit">
              {t("auchGenannt")} {problem.volksmund.join(", ")}
            </p>
          </div>
        </header>

        {/* Der Kopf eines Prüfprotokolls: drei Felder auf einer starken
            Oberkante. Die Farbe trägt hier ausschließlich das Symbol —
            Gelb misst auf Weiß 2,16:1 und ist als Schrift nirgends
            zulässig. */}
        <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-linie-stark pt-5 sm:grid-cols-[1.4fr_1fr_1fr] sm:gap-x-10">
          <div className="col-span-2 sm:col-span-1">
            <dt className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {t("befund")}
            </dt>
            <dd className="mt-2 flex items-center gap-2.5">
              <StufenSymbol stufe={problem.dringlichkeit} className="size-4" />
              <span className={cn("text-block font-bold tracking-tight", stil.text)}>
                {worte.wort}
              </span>
            </dd>
            <dd className="mt-1 font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {worte.weiterfahren}
            </dd>
          </div>

          <div>
            <dt className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {/* Wo die Karte zwei Arbeiten unterscheidet, heißt der Betrag
                  im Kopf wie die Spalte, aus der er stammt. „Prüfung" wäre
                  hier genau die Verwechslung, die die Seite ausräumen soll. */}
              {problem.preisvergleich?.spalten[0].titel ?? t("wasWirPruefenKurz")}
            </dt>
            <dd className="mt-2 leading-none">
              <Preis
                preis={problem.preisvergleich?.spalten[0].betrag ?? `${problem.pruefkosten} €`}
                className="text-zahl-klein"
              />
            </dd>
          </div>

          <div>
            <dt className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
              {t("zusammen")}
            </dt>
            <dd className="mt-2 font-mono text-zahl-klein leading-none font-bold text-titel">
              {gesamt}{" "}
              <span className="text-label tracking-[0.09em] text-text-zweit uppercase">
                {t("minuten")}
              </span>
            </dd>
          </div>
        </dl>
      </Container>

      {/* ── 01 Urteil ─────────────────────────────────────────────────── */}
      <Section className={BERICHT_TAKT + " border-t border-linie"}>
        <Container className="max-w-[64rem]">
          <AbschnittsLabel nummer={nr("urteil")}>{t("bedeutung")}</AbschnittsLabel>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            {/* Der Klartext ist die Antwort auf „was heißt das" und stand
                bisher in derselben Schriftgröße wie jede Ursachenerklärung. */}
            <p className="max-w-[46ch] text-[clamp(1.25rem,1.05rem+0.9vw,1.75rem)] leading-[1.35] font-medium text-titel hyphens-none">
              {problem.klartext}
            </p>

            <div>
              {/* Die Handlung trägt die Kante der Stufe — die einzige Farbe
                  in diesem Abschnitt, und sie bedeutet etwas. */}
              <div className={cn("border-l-4 pl-5", stil.rand)}>
                <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                  {t("zurHandlung")}
                </p>
                <p className="mt-2 max-w-[52ch] leading-relaxed">{problem.handlung}</p>

                {/* Auf einer roten Karte steht der Anruf hier und nicht am
                    Seitenende: Wer sein Fahrzeug gerade abgestellt hat, soll
                    nicht erst durch Ursachen und Preise scrollen, um die
                    Nummer zu finden. Ein Terminformular gibt es hier
                    bewusst nicht. */}
                {sofort && (
                  <div className="mt-5">
                    <p className="font-semibold">{t("rufenSieAn")}</p>
                    <TelefonKnopf variante="zweit" className="mt-3" />
                    <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-text-zweit">
                      {t("pannenhilfe")}{" "}
                      {PANNENHILFE.map((p) => `${p.name} ${p.nummer}`).join(" · ")}
                    </p>
                  </div>
                )}

                {/* Die Reihenfolge der Seite stellt die Möglichkeiten vor die
                    Verschärfung. Wessen Leuchte gerade blinkt, darf aber nicht
                    erst vier Ursachen lesen müssen, um zu erfahren, dass für
                    ihn etwas anderes gilt. Deshalb hier der Sprung dorthin —
                    ein Verweis, kein zweiter Hinweistext. */}
                {problem.verschaerfung && (
                  <a
                    href="#verschaerfung"
                    className="group mt-4 -my-1 inline-flex items-center gap-1.5 py-1 text-sm font-medium underline decoration-linie-stark underline-offset-4 transition-colors hover:decoration-sofort"
                  >
                    {t("verschaerfung")}
                    <PfeilRechtsIcon className="size-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
                  </a>
                )}
              </div>

              {problem.verwechslung && (
                <div className="mt-6 border-l-4 border-linie-stark pl-5">
                  <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                    {t("verwechslung")}
                  </p>
                  <p className="mt-2 max-w-[52ch] leading-relaxed text-text-zweit">
                    {problem.verwechslung}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 02 Möglichkeiten ──────────────────────────────────────────────
          Die Zeilenform der Preistafel, auf Ursachen angewendet: die
          Einordnung links als Spalte, die man abfährt, die Sache rechts.

          Der Balken der alten Häufigkeitsskala ist weg. Ein Balken behauptet
          eine gemessene Menge; gemessen ist hier nichts, es steht ein Wort in
          den Daten. Das Wort bleibt, die Messung geht. */}
      <Section className={BERICHT_TAKT + " border-t border-linie bg-karte"}>
        <Container className="max-w-[64rem]">
          <AbschnittsLabel nummer={nr("moeglichkeiten")}>{t("ursachen")}</AbschnittsLabel>
          <p className="mt-2 font-mono text-xs text-text-zweit">{t("ursachenHinweis")}</p>

          <ol className="mt-6 border-t border-linie-stark">
            {problem.ursachen.map((u) => (
              <li
                key={u.titel}
                className="grid gap-x-10 gap-y-1.5 border-b border-linie py-5 sm:grid-cols-[9rem_1fr]"
              >
                <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                  {t(u.haeufigkeit)}
                </p>
                <div>
                  <p className="text-block font-semibold text-titel">{u.titel}</p>
                  <p className="mt-2 max-w-[62ch] leading-relaxed text-text-zweit">
                    {u.erklaerung}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── 03 Verschärfung ──────────────────────────────────────────────
          Der wichtigste Abschnitt der Seite. Er stand bisher als
          300-Zeichen-Absatz unter der Handlung — also genau dort, wo man
          bereits gelesen hat, dass man weiterfahren darf.

          Jetzt ein eigener Abschnitt mit drei Ebenen: was man sieht, was
          dann gilt, warum. Rot ist hier richtig, weil es hier tatsächlich um
          Dringlichkeit geht — es ist derselbe Kanal wie auf den Kacheln. */}
      {problem.verschaerfung && (
        <Section
          id="verschaerfung"
          className={BERICHT_TAKT + " scroll-mt-20 border-t border-linie"}
        >
          <Container className="max-w-[64rem]">
            <AbschnittsLabel nummer={nr("verschaerfung")}>{t("verschaerfung")}</AbschnittsLabel>

            {/* Wo die Verschärfung an abzählbaren Merkmalen hängt, steht sie
                zerlegt. Wo sie eine Anweisung ist — „bleiben Sie im Fahrzeug
                sitzen, bis der Dampf nachlässt" —, wäre eine Merkmalsliste
                eine Erfindung; dort steht der Satz, in derselben roten
                Fassung. */}
            {problem.verschaerfungMerkmale && problem.verschaerfungGrund ? (
              <div className="mt-6 border-l-4 border-sofort bg-karte">
                <div className="grid gap-y-6 p-5 sm:p-6 lg:grid-cols-[1fr_1.1fr] lg:gap-x-12">
                  <div>
                    <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                      {t("selbstSehen")}
                    </p>
                    {/* Die Regel steht über der Liste, nicht darunter: Wer erst
                      nach dem dritten Punkt erfährt, dass eines davon genügt,
                      hat die Liste einmal falsch gelesen. */}
                    <p className="mt-1.5 font-mono text-xs text-text-zweit">{t("merkmaleLabel")}</p>
                    <ul className="mt-4 space-y-2">
                      {problem.verschaerfungMerkmale.map((m) => (
                        <li key={m} className="flex items-baseline gap-3 text-lead font-medium">
                          <span aria-hidden="true" className="size-2 shrink-0 bg-sofort" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-linie pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
                    <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                      {t("dannGilt")}
                    </p>
                    <p
                      className={cn(
                        "mt-3 inline-flex items-center gap-2.5 px-4 py-2 font-bold tracking-tight uppercase",
                        STUFEN_STIL.sofort.band,
                      )}
                    >
                      <StufenSymbol stufe="sofort" className="size-3.5 text-current" />
                      {t("nichtWeiterfahren")}
                    </p>
                    <p className="mt-4 max-w-[54ch] leading-relaxed">
                      {problem.verschaerfungGrund}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 border-l-4 border-sofort bg-karte p-5 sm:p-6">
                <p className="max-w-[68ch] text-lead leading-relaxed">{problem.verschaerfung}</p>
              </div>
            )}
          </Container>
        </Section>
      )}

      {/* ── 04 Prüfung und Kosten ─────────────────────────────────────────
          Die Prozesskette der Werkstattseite, hier mit den Minuten als Zahl:
          Prüfschritte sind eine Reihenfolge, und die Linie sagt das ohne ein
          Wort. Daneben die Fahrzeugkontur — sie beantwortet genau hier, wo am
          Auto das passiert.

          Darunter die beiden Beträge im Satz der Preistafel. Der Hinweis
          „Auslesen ist noch keine Diagnose" steht direkt unter dem Betrag,
          auf den er sich bezieht, und nicht drei Absätze weiter. */}
      <Section className={BERICHT_TAKT + " border-t border-linie bg-karte"}>
        <Container className="max-w-[64rem]">
          <AbschnittsLabel nummer={nr("pruefung")}>{t("pruefung")}</AbschnittsLabel>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_15rem] lg:gap-14">
            <ol className="kw-kette grid sm:grid-cols-3">
              {problem.pruefschritte.map((schritt, i) => (
                <li
                  key={schritt.schritt}
                  className="pb-8 pl-6 last:pb-0 sm:pt-8 sm:pr-8 sm:pb-0 sm:pl-0"
                >
                  <span aria-hidden="true" className="kw-marke bg-akzent" />
                  <p className="font-mono text-label tracking-[0.09em] text-titel uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 font-mono text-[clamp(2rem,1.5rem+1.6vw,2.75rem)] leading-none font-bold text-titel/60">
                    {schritt.dauerMinuten}
                    <span className="ml-1.5 text-label tracking-[0.09em]">{t("minuten")}</span>
                  </p>
                  <p className="mt-4 max-w-[36ch] leading-relaxed">{schritt.schritt}</p>
                </li>
              ))}
            </ol>

            <div className="lg:pt-8">
              <ZonenKontur zone={problem.zone} className="max-w-[15rem]" />
            </div>
          </div>

          {/* Auslesen gegen Diagnose.

              Der Preisstreit dieser Karte entsteht an genau einer Stelle:
              „Fehler auslesen" ist nicht „Fehler finden". Als Satz stand das
              in 250 Zeichen unter einem einzigen Betrag — man musste den
              ganzen Satz lesen, um zu erfahren, dass es zwei Preise gibt.
              Nebeneinander sieht man in zwei Sekunden, dass es zwei Arbeiten
              sind, was jede kostet, wie sie gerechnet wird und was sie
              beantwortet. Dieselbe Tabellenform wie die Fristen beim Pickerl.

              Wo das Feld fehlt — auf allen anderen Karten —, bleibt es beim
              bisherigen Hinweissatz unter dem einen Betrag. */}
          {problem.preisvergleich ? (
            <div className="mt-12">
              {/* Die Behauptung steht über der Tabelle, die sie belegt. Als
                  Teil eines 250-Zeichen-Hinweises unter einem einzigen Betrag
                  war sie der vierte Halbsatz einer grauen Zeile. */}
              <p className="max-w-[34ch] text-[clamp(1.25rem,1.05rem+0.9vw,1.75rem)] leading-[1.25] font-bold text-titel hyphens-none">
                {problem.preisvergleich.kernsatz}
              </p>

              <div className="mt-6 border-t border-linie-stark" />

              {/* Kopfzeile: Merkmalsspalte bleibt leer, darüber stehen die
                  beiden Beträge. Exakt das Raster der Fristentabelle beim
                  Pickerl — dadurch braucht es keine Trennlinie zwischen den
                  Spalten, die ohnehin nur in Stücken laufen würde. */}
              <div className="grid gap-x-8 gap-y-8 border-b border-linie py-6 sm:grid-cols-[9rem_1fr_1fr]">
                <p className="hidden sm:block" />
                {problem.preisvergleich.spalten.map((spalte) => (
                  <div key={spalte.titel}>
                    <p className="font-mono text-label tracking-[0.09em] font-bold text-titel uppercase">
                      {spalte.titel}
                    </p>
                    <p className="mt-3 leading-none">
                      <Preis preis={spalte.betrag} className="text-zahl" />
                    </p>
                    <p className="mt-2 max-w-[30ch] font-mono text-xs leading-relaxed text-text-zweit">
                      {spalte.zusatz}
                    </p>
                  </div>
                ))}
              </div>

              {problem.preisvergleich.zeilen.map((zeile) => (
                <div
                  key={zeile.merkmal}
                  className="grid gap-x-8 gap-y-3 border-b border-linie py-5 sm:grid-cols-[9rem_1fr_1fr]"
                >
                  <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                    {zeile.merkmal}
                  </p>
                  {zeile.werte.map((wert, i) =>
                    wert ? (
                      <div key={i}>
                        {/* Auf dem Telefon stehen die beiden Spalten
                            untereinander — ohne Kopf daneben braucht jede
                            Zelle ihre eigene Beschriftung. */}
                        <p className="font-mono text-label tracking-[0.09em] font-bold text-titel uppercase sm:hidden">
                          {problem.preisvergleich!.spalten[i].titel}
                        </p>
                        <p className="mt-1 max-w-[42ch] leading-relaxed sm:mt-0">{wert}</p>
                      </div>
                    ) : (
                      <div key={i} className="hidden sm:block" />
                    ),
                  )}
                </div>
              ))}

              {problem.preisvergleich.hinweis && (
                <p className="mt-5 border-l-4 border-instrument pl-4 leading-relaxed font-medium">
                  {problem.preisvergleich.hinweis}
                </p>
              )}
            </div>
          ) : (
            <div className="mt-12 border-t border-linie pt-8">
              <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                {t("kostenPruefung")}
              </p>
              <p className="mt-3 leading-none">
                <Preis preis={`${problem.pruefkosten} €`} className="text-zahl" />
              </p>
              <p className="mt-4 max-w-[46ch] border-l-4 border-instrument pl-4 leading-relaxed">
                {problem.pruefkostenHinweis ?? t("kostenPruefungHinweis")}
              </p>
            </div>
          )}

          {/* Die Reparatur steht getrennt darunter: Sie ist keine dritte
              Spalte derselben Arbeit, sondern das, was danach kommen kann. */}
          {problem.reparaturSpanne && (
            <div className="mt-10 grid gap-x-10 gap-y-3 border-t border-linie pt-6 sm:grid-cols-[auto_1fr] sm:items-baseline">
              <div>
                <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">
                  {t("kostenReparatur")}
                </p>
                <p className="mt-3 leading-none">
                  <Preis
                    preis={`${problem.reparaturSpanne.von}–${problem.reparaturSpanne.bis} €`}
                    className="text-zahl"
                  />
                </p>
                <p className="mt-2 font-mono text-xs text-text-zweit">
                  {t("kostenReparaturHinweis")}
                </p>
              </div>
              {problem.spannenHinweis && (
                <p className="max-w-[52ch] leading-relaxed text-text-zweit sm:pt-9">
                  {problem.spannenHinweis}
                </p>
              )}
            </div>
          )}
        </Container>
      </Section>

      {/* ── 05 Grenze ────────────────────────────────────────────────────
          FORM A. Der Abschnitt hat keine Zahl, keine Liste und keine Karte —
          er ist eine Aussage, und zwar die, auf der das ganze Projekt steht.
          Einmal pro Seite. */}
      <section className="bg-instrument text-text-auf-instrument">
        <Container className="max-w-[64rem] py-12 sm:py-14 lg:py-16">
          <p className="font-mono text-label tracking-[0.09em] text-white/70 uppercase">
            {t("grenze")} / {nr("grenze")}
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
            <h2 className="max-w-[16ch] text-[clamp(1.75rem,1.1rem+2.6vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.02em] hyphens-none">
              {t("grenze")}
            </h2>
            <p className="max-w-[48ch] leading-relaxed text-white/80">{problem.grenze}</p>
          </div>
        </Container>
      </section>

      {/* ── Handlung und Querverweise ──────────────────────────────────── */}
      <Section id="handlung" className="scroll-mt-20 border-t border-linie py-10">
        <Container className="max-w-[64rem]">
          <div className="flex flex-wrap items-center gap-4">
            <VorbefundKnopf kennung={problem.kennung} />
            {/* Kein Terminlink unter einem roten Befund. Wer nicht weiterfahren
                darf, braucht ein Telefon und keinen Kalender — der Anruf steht
                oben, wo die Handlung steht. */}
            {!sofort && (
              <Link
                href="/termin"
                className="group -my-1 inline-flex items-center gap-1.5 py-1 text-sm font-medium underline decoration-linie-stark underline-offset-4 transition-colors hover:decoration-instrument"
              >
                {t("terminAnfragen")}
                <span aria-hidden="true" className="kw-pfeil-schacht">
                  <PfeilRechtsIcon className="kw-pfeil-quer size-4" />
                </span>
              </Link>
            )}
          </div>

          <div className="mt-8 space-y-2 border-t border-linie pt-6 text-sm">
            <p>
              <span className="text-text-zweit">{t("leistung")}: </span>
              <Link
                href={{ pathname: "/leistungen", hash: leistung.slug }}
                className="font-medium underline decoration-linie-stark underline-offset-4 transition-colors hover:decoration-instrument"
              >
                {problem.leistung.titel}
              </Link>{" "}
              <span className="font-mono">{problem.leistung.preis}</span>
            </p>
            {problem.verwandt.length > 0 && (
              <p>
                <span className="text-text-zweit">{t("verwandt")}: </span>
                {problem.verwandt.map((kennung, i) => {
                  const ziel = findeProblem(kennung);
                  if (!ziel) return null;
                  return (
                    <span key={kennung}>
                      {i > 0 && ", "}
                      <Link
                        href={{ pathname: "/problem/[kennung]", params: { kennung } }}
                        className="underline decoration-linie-stark underline-offset-4 transition-colors hover:decoration-instrument"
                      >
                        {ziel.titel}
                      </Link>
                    </span>
                  );
                })}
              </p>
            )}
          </div>
        </Container>
      </Section>
    </article>
  );
}
