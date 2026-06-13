import Link from "next/link";

const services = [
  {
    title: "Psicología clínica en Curicó",
    description:
      "Evaluación y acompañamiento psicológico profesional para comprender lo que estás viviendo, desarrollar recursos y avanzar hacia un mayor bienestar emocional.",
  },
  {
    title: "Hipnosis clínica en Curicó",
    description:
      "La hipnosis clínica se utiliza como una herramienta terapéutica complementaria dentro de un proceso psicológico responsable, personalizado y orientado a objetivos.",
  },
  {
    title: "Neuropsicología en Curicó",
    description:
      "Evaluación de procesos cognitivos como atención, memoria, lenguaje y funciones ejecutivas para orientar necesidades de apoyo y próximos pasos.",
  },
];

const faqs = [
  {
    question: "¿Dónde encontrar atención psicológica en Curicó?",
    answer:
      "Patricia Ávalos ofrece atención psicológica para personas que buscan evaluación, orientación y acompañamiento profesional en Curicó. Puedes revisar la disponibilidad y reservar en línea.",
  },
  {
    question: "¿Qué es la hipnosis clínica?",
    answer:
      "Es una herramienta que puede integrarse a un proceso terapéutico para facilitar concentración, relajación y trabajo con objetivos definidos. No reemplaza una evaluación psicológica profesional.",
  },
  {
    question: "¿Para qué sirve una evaluación neuropsicológica?",
    answer:
      "Permite explorar el funcionamiento de capacidades cognitivas como memoria, atención, lenguaje y planificación, aportando información para orientar apoyos o derivaciones.",
  },
];

export { faqs };

export default function SeoLocalContent() {
  return (
    <section aria-labelledby="servicios-psicologia-curico" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Atención profesional en Curicó
          </p>
          <h2
            id="servicios-psicologia-curico"
            className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
          >
            Psicología, hipnosis clínica y neuropsicología
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Atención centrada en cada persona, con un espacio confidencial y una mirada clínica para
            acompañar necesidades emocionales y cognitivas en Curicó.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Preguntas frecuentes
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              Antes de reservar tu consulta
            </h2>
            <Link
              href="/agendaProfesionales"
              className="mt-7 inline-flex rounded-full bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
            >
              Agendar atención psicológica
            </Link>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white p-6">
                <summary className="cursor-pointer list-none font-bold text-slate-900">
                  {faq.question}
                </summary>
                <p className="mt-4 leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
