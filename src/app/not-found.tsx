import Link from "next/link";

// Greift nur für Adressen außerhalb von /[locale] — dort gibt es keine
// Sprache, also auch keine Übersetzungen und kein Layout mit Kopf und Fuß.
export default function WurzelNichtGefunden() {
  return (
    <html lang="de">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "#fafaf8",
          color: "#101418",
          padding: "4rem 1.25rem",
          margin: 0,
        }}
      >
        <h1 style={{ fontSize: "1.75rem", margin: 0 }}>Diese Seite gibt es nicht</h1>
        <p style={{ marginTop: "1rem" }}>
          <Link href="/de" style={{ color: "#101418" }}>
            Zur Startseite von KLARWERK
          </Link>
        </p>
      </body>
    </html>
  );
}
