import { siteDescription, siteName } from "@/lib/seo";

export default function manifest() {
  return {
    name: siteName,
    short_name: "Patricia Ávalos",
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    lang: "es-CL",
    icons: [
      {
        src: "/logofavcom.png",
        sizes: "1103x1093",
        type: "image/png",
      },
    ],
  };
}
