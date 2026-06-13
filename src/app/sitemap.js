import { siteUrl } from "@/lib/seo";

export default function sitemap() {
  const routes = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/agendaProfesionales", priority: 0.9, changeFrequency: "daily" },
    { path: "/contacto", priority: 0.8, changeFrequency: "monthly" },
  ];

  return routes.map(({ path, ...entry }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    ...entry,
  }));
}
