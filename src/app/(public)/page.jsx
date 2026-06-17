import Portada from "@/app/(public)/portada/page";
import Seccion1 from "@/app/(public)/seccion1/page";
import Seccion2 from "@/app/(public)/seccion2/page";
import Seccion3 from "@/app/(public)/seccion3/page";
import SeoLocalContent, { faqs } from "@/Componentes/SeoLocalContent";
import { professionalName, tatianaName, siteDescription, siteName, siteUrl, socialImage } from "@/lib/seo";

export const metadata = {
  title: "Psicología, Hipnosis, Neuropsicología y Podología en Curicó",
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Psicología, Hipnosis, Neuropsicología y Podología en Curicó",
    description: siteDescription,
    url: "/",
  },
  twitter: {
    title: "Psicología, Hipnosis, Neuropsicología y Podología en Curicó",
    description: siteDescription,
  },
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
        // Patricia — psicología
        { "@type": "MedicalTherapy", name: "Evaluación psicológica paciente Fonasa" },
        { "@type": "MedicalTherapy", name: "Evaluación psicológica paciente Isapre y particular" },
        { "@type": "MedicalTherapy", name: "Psicoterapia paciente Fonasa" },
        { "@type": "MedicalTherapy", name: "Psicoterapia paciente Isapre y particular" },
        { "@type": "MedicalTherapy", name: "Hipnosis clínica" },
        { "@type": "MedicalTherapy", name: "Regresiones a vidas pasadas" },
        { "@type": "DiagnosticProcedure", name: "Evaluación neuropsicológica" },
        { "@type": "MedicalTherapy", name: "Rehabilitación neuropsicológica" },
        { "@type": "MedicalTherapy", name: "Primera sesión neuropsicológica" },
        { "@type": "MedicalTherapy", name: "Terapia de familia" },
        { "@type": "MedicalTherapy", name: "Terapia de parejas" },
        { "@type": "MedicalTherapy", name: "Terapia de adicciones" },
        { "@type": "MedicalTherapy", name: "Terapia de alcohol" },
        { "@type": "MedicalTherapy", name: "Terapia para dejar de fumar" },
        { "@type": "MedicalTherapy", name: "Psicoterapia especializada en disfunciones sexuales" },
        { "@type": "MedicalTherapy", name: "Terapia online paciente Fonasa" },
        { "@type": "MedicalTherapy", name: "Terapia online paciente Isapre y particular" },
        { "@type": "DiagnosticProcedure", name: "Evaluación infantil paciente Fonasa" },
        { "@type": "DiagnosticProcedure", name: "Evaluación infantil paciente Isapre y particular" },
        { "@type": "DiagnosticProcedure", name: "Evaluación adolescente paciente Fonasa" },
        { "@type": "DiagnosticProcedure", name: "Evaluación adolescente paciente Isapre y particular" },
        // Tatiana — podología
        { "@type": "MedicalProcedure", name: "Atención podología básica" },
        { "@type": "MedicalProcedure", name: "Atención podología helomas y hongos" },
        { "@type": "MedicalProcedure", name: "Tratamiento de uña encarnada" },
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
      "@id": `${siteUrl}/#patricia`,
      name: "Patricia Merida Ávalos Ávalos",
      alternateName: professionalName,
      url: siteUrl,
      jobTitle: "Psicóloga Clínica",
      worksFor: { "@id": `${siteUrl}/#business` },
      knowsAbout: [
        "Psicología clínica",
        "Hipnosis clínica",
        "Neuropsicología",
        "Rehabilitación neuropsicológica",
        "Terapia de parejas",
        "Terapia familiar",
        "Terapia de adicciones",
        "Psicoterapia",
        "Regresiones a vidas pasadas",
      ],
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#tatiana`,
      name: tatianaName,
      url: siteUrl,
      jobTitle: "Podóloga",
      worksFor: { "@id": `${siteUrl}/#business` },
      knowsAbout: ["Podología", "Tratamiento de uña encarnada", "Helomas", "Hongos en uñas"],
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
