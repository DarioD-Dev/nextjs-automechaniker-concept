# Schriften für das OG-Bild

Nur für `src/app/opengraph-image.tsx`. `next/og` kann die von `next/font`
geladenen Schriften nicht mitbenutzen — es braucht die Datei selbst — und es
unterstützt **kein woff2**, genau das Format, das `next/font` ablegt.

Es sind dieselben Schriften wie auf der Seite: **Inter** (Regular und Bold)
und **JetBrains Mono** (Medium), alle unter der **SIL Open Font License 1.1**.
Drei Schnitte, zusammen rund 330 KB — gemessen, nicht geschätzt, und damit
innerhalb des Limits. Bezogen über die
Google-Fonts-CSS-API mit einer alten User-Agent-Kennung, weil die API
modernen Browsern woff2 ausliefert.

Das Bundle-Limit von `ImageResponse` liegt bei 500 KB und umfasst JSX, CSS,
Schriften und Bilder — deshalb nur drei Schnitte und keine Bilder.

Damit die Dateien in der Produktion überhaupt vorhanden sind, trägt
`next.config.ts` sie über `outputFileTracingIncludes` nach. Ohne diesen
Eintrag ist die Route lokal einwandfrei und erst in der Produktion kaputt.
