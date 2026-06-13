import { siteUrl } from "@/lib/seo";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard/",
        "/sign-in/",
        "/sign-up/",
        "/carrito/",
        "/comprobantePago/",
        "/pagoAprobado/",
        "/pagoEnProceso/",
        "/pagoRechazado/",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
