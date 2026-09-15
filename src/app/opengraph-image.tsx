import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { WERKSTATT } from "@/data/werkstatt";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "KLARWERK — Kfz-Werkstatt in Wien";

/**
 * Eine statische Karte, keine dynamische Architektur.
 *
 * `next/og` kann die über `next/font` geladenen Schriften nicht mitbenutzen —
 * es braucht die Dateien selbst und unterstützt kein woff2. Deshalb liegen
 * zwei Schnitte in `assets/`; `next.config.ts` trägt sie über
 * `outputFileTracingIncludes` ins Serverbündel nach. Ohne diesen Eintrag ist
 * die Route lokal einwandfrei und erst in der Produktion kaputt — sichtbar
 * dann, wenn jemand den Link teilt.
 *
 * Auf Modulebene gelesen, nicht pro Anfrage: Die Dateien hängen von keinem
 * Anfragewert ab.
 */
const interBold = await readFile(join(process.cwd(), "assets/Inter-Bold.woff"));
const interRegular = await readFile(join(process.cwd(), "assets/Inter-Regular.woff"));
const mono = await readFile(join(process.cwd(), "assets/JetBrainsMono-Medium.woff"));

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "#fafaf8",
        color: "#101418",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
        <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: 2 }}>KLARWERK</span>
        <span
          style={{ fontFamily: "JetBrains Mono", fontSize: 20, fontWeight: 500, color: "#4a5259" }}
        >
          {WERKSTATT.plz} {WERKSTATT.ort}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 86,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          Was ist mit Ihrem Auto?
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 30,
            fontWeight: 400,
            color: "#4a5259",
            maxWidth: 900,
          }}
        >
          Wir sagen Ihnen, wie dringend es ist, was es sein kann und was die Prüfung kostet.
        </div>
      </div>

      {/* Die drei Dringlichkeitsfarben als Kante — dieselbe Sprache wie auf
            der Seite, ohne ein einziges zusätzliches Bild. */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ display: "flex", height: 10, width: 300 }}>
          <div style={{ flex: 1, background: "#c4262e" }} />
          <div style={{ flex: 1, background: "#e0a200" }} />
          <div style={{ flex: 1, background: "#2c6e9b" }} />
        </div>
        <span
          style={{ fontFamily: "JetBrains Mono", fontSize: 20, fontWeight: 500, color: "#4a5259" }}
        >
          Wir erklären, bevor wir schrauben.
        </span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter", data: interBold, style: "normal", weight: 700 },
        { name: "Inter", data: interRegular, style: "normal", weight: 400 },
        { name: "JetBrains Mono", data: mono, style: "normal", weight: 500 },
      ],
    },
  );
}
