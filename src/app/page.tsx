import Link from "next/link";

const highlights = [
  {
    icon: "⚙️",
    title: "Automatisation industrielle",
    desc: "Programmation et intégration de systèmes PLC (Allen-Bradley, Siemens, Schneider) pour des environnements de production exigeants.",
  },
  {
    icon: "🖥️",
    title: "TI industrielle",
    desc: "Réseaux industriels, SCADA, HMI et infrastructure TI adaptée aux contraintes du plancher de production.",
  },
  {
    icon: "🎓",
    title: "Formation & transfert de connaissances",
    desc: "Accompagnement d'équipes techniques, formation sur mesure et documentation pour consolider les acquis.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Technicien en automatisation
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
            20 ans d&apos;expertise au service de votre industrie
          </h1>
          <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
            Conseil, intégration et formation en automatisation industrielle et TI —
            des solutions concrètes adaptées à vos opérations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-7 rounded-lg transition-colors"
            >
              Voir les services
            </Link>
            <Link
              href="/contact"
              className="border border-slate-500 hover:border-blue-400 text-slate-200 hover:text-blue-300 font-medium py-3 px-7 rounded-lg transition-colors"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-10">
            Ce que j&apos;apporte à vos projets
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-semibold text-slate-800 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-blue-700 text-white py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Prêt à discuter de votre projet ?</h2>
          <p className="text-blue-100 mb-6">
            Que ce soit pour un mandat ponctuel, une intégration ou de la formation, prenez contact — sans engagement.
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-700 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Envoyer un message
          </Link>
        </div>
      </section>
    </>
  );
}
