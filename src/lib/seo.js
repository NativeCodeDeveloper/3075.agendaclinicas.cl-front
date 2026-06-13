const fallbackSiteUrl = "https://3075.agendaclinicas.cl";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl).replace(/\/$/, "");
export const siteName = "Patricia Ávalos Psicología";
export const professionalName = "Patricia Ávalos";
export const siteDescription =
  "Atención psicológica en Curicó con servicios de psicología clínica, hipnosis clínica y neuropsicología. Agenda una evaluación profesional presencial u online.";

export const localSeoKeywords = [
  "psicología Curicó",
  "psicóloga Curicó",
  "psicólogo Curicó",
  "hipnosis Curicó",
  "hipnosis clínica Curicó",
  "terapia con hipnosis Curicó",
  "neuropsicología Curicó",
  "evaluación neuropsicológica Curicó",
  "terapia psicológica Curicó",
  "salud mental Curicó",
  "psicología clínica Curicó",
  "consulta psicológica Curicó",
];

export const socialImage = "/opengraph-image";
