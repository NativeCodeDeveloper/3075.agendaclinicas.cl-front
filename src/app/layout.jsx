import "./globals.css";
import { AnimatedLayout } from "@/Componentes/AnimatedLayout";
import AgendaProvider from "@/ContextosGlobales/AgendaContext";
import { Inter, Outfit, Lora } from "next/font/google";
import {
  localSeoKeywords,
  professionalName,
  siteDescription,
  siteName,
  siteUrl,
  socialImage,
} from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadataBase = new URL(siteUrl);

export const metadata = {
  metadataBase,
  title: {
    default: "Psicología, Hipnosis y Neuropsicología en Curicó | Patricia Ávalos",
    template: `%s | ${professionalName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: localSeoKeywords,
  authors: [{ name: professionalName, url: metadataBase.href }],
  creator: professionalName,
  publisher: professionalName,
  category: "Salud mental y psicología",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-CL": "/",
    },
  },
  icons: {
    icon: "/logofavcom.png",
    shortcut: "/logofavcom.png",
    apple: "/logofavcom.png",
  },
  openGraph: {
    title: "Psicología, Hipnosis y Neuropsicología en Curicó",
    description: siteDescription,
    url: "/",
    siteName,
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Patricia Ávalos - Psicología, hipnosis clínica y neuropsicología en Curicó",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Psicología, Hipnosis y Neuropsicología en Curicó",
    description: siteDescription,
    images: [socialImage],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-CL" className={`${inter.variable} ${outfit.variable} ${lora.variable}`}>
      <body className="min-h-screen bg-white">
        {/*
          AgendaProvider DEBE envolver AnimatedLayout (no estar dentro).
          AnimatedLayout desmonta/remonta sus hijos en cada navegación
          (usa key={pathname} + AnimatePresence). Si AgendaProvider
          estuviera adentro, su estado (fecha, hora, servicio) se reiniciaría
          en cada cambio de ruta, perdiendo los datos entre el calendario y el formulario.
        */}
        <AgendaProvider>
          <AnimatedLayout>
            {children}
          </AnimatedLayout>
        </AgendaProvider>
      </body>
    </html>
  );
}
