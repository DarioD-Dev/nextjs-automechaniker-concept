import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Konzeptstudie ohne echten Auftrag: bleibt aus dem Index, damit die Demo
// keiner echten Werkstatt den Rang abläuft. Spiegelt das `robots: index:false`
// im Layout — ein Crawler, der eine Seite nie abruft, sähe das Meta-Tag nie.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
