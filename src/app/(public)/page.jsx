import Portada from "@/app/(public)/portada/page";
import Seccion1 from "@/app/(public)/seccion1/page";
import Seccion2 from "@/app/(public)/seccion2/page";
import Seccion3 from "@/app/(public)/seccion3/page";
import SeoLocalContent, { faqs } from "@/Componentes/SeoLocalContent";
import { professionalName, siteDescription, siteName, siteUrl, socialImage } from "@/lib/seo";

export const metadata = {
  title: "Psicología, Hipnosis y Neuropsicología en Curicó",
  description: siteDescription,
  alternates: { canonical: "/" },
};

const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "";
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
const contactAddress = process.env.NEXT_PUBLIC_CONTACT_ADDRESS || "";

const professionalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["MedicalBusiness", "ProfessionalService"],
      "@id": `${siteUrl}/#business`,
      name: siteName,
      url: siteUrl,
      image: `${siteUrl}${socialImage}`,
      description: siteDescription,
      areaServed: {
        "@type": "City",
        name: "Curicó",
        containedInPlace: { "@type": "AdministrativeArea", name: "Región del Maule, Chile" },
      },
      availableService: [
        { "@type": "MedicalTherapy", name: "Psicología clínica" },
        { "@type": "MedicalTherapy", name: "Hipnosis clínica" },
        { "@type": "DiagnosticProcedure", name: "Evaluación neuropsicológica" },
      ],
      ...(contactPhone ? { telephone: contactPhone } : {}),
      ...(contactEmail ? { email: contactEmail } : {}),
      ...(contactAddress
        ? {
            address: {
              "@type": "PostalAddress",
              streetAddress: contactAddress,
              addressLocality: "Curicó",
              addressRegion: "Maule",
              addressCountry: "CL",
            },
          }
        : {}),
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#professional`,
      name: professionalName,
      url: siteUrl,
      jobTitle: "Profesional de psicología",
      worksFor: { "@id": `${siteUrl}/#business` },
      knowsAbout: ["Psicología clínica", "Hipnosis clínica", "Neuropsicología"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      inLanguage: "es-CL",
      publisher: { "@id": `${siteUrl}/#business` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalSchema).replace(/</g, "\\u003c") }}
      />
      <Portada />
      <Seccion1 />
      <Seccion2 />
      <SeoLocalContent />
      <Seccion3 />
    </main>
  );
}
