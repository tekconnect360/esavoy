import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — Eric Savoy",
  description: "Conseil TI, automatisation industrielle PLC, formation et mandats à contrat.",
};

const services = [
  {
    icon: "🔧",
    title: "Conseil en automatisation industrielle",
    description:
      "Analyse de vos systèmes existants, recommandations d'amélioration, sélection d'équipements et accompagnement lors de l'implantation. Expertise sur les plateformes Allen-Bradley (Rockwell), Siemens et Schneider Electric.",
    points: [
      "Audit de systèmes PLC et SCADA",
      "Modernisation et migration de systèmes",
      "Sélection et spécification d'équipements",
      "Intégration de nouvelles lignes de production",
    ],
  },
  {
    icon: "🖥️",
    title: "TI industrielle & infrastructure",
    description:
      "Déploiement et sécurisation de réseaux industriels, mise en place d'infrastructure TI adaptée à l'environnement de production, interface entre l'équipe TI corporative et le plancher.",
    points: [
      "Réseaux industriels (EtherNet/IP, Profinet, Modbus)",
      "Architecture SCADA et HMI",
      "Intégration ERP / MES",
      "Cybersécurité des systèmes de contrôle",
    ],
  },
  {
    icon: "📋",
    title: "Mandats à contrat",
    description:
      "Disponible pour des mandats ponctuels ou récurrents : démarrage d'équipements, mise en route, dépannage avancé, ou support lors de projets d'expansion.",
    points: [
      "Mise en service et démarrage",
      "Dépannage et diagnostic",
      "Support projet (augmentation de capacité)",
      "Rédaction de documentation technique",
    ],
  },
  {
    icon: "🎓",
    title: "Formation & coaching technique",
    description:
      "Formation sur mesure pour vos techniciens et ingénieurs, adaptée à vos équipements et à votre niveau d'équipe. Transfert de connaissances structuré pour réduire la dépendance aux fournisseurs.",
    points: [
      "Formation PLC (débutant à avancé)",
      "Formation réseaux industriels",
      "Coaching individuel ou en groupe",
      "Création de matériel de formation interne",
    ],
  },
];

export default function Services() {
  return (
    <div className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Services offerts</h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Des services adaptés aux réalités de l&apos;industrie, basés sur plus de 20 ans
            d&apos;expérience terrain en automatisation et TI industrielle.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {services.map(({ icon, title, description, points }) => (
            <div
              key={title}
              className="bg-white rounded-xl border border-slate-100 shadow-sm p-8 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{icon}</span>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-slate-800 mb-2">{title}</h2>
                  <p className="text-slate-500 leading-relaxed mb-4">{description}</p>
                  <ul className="grid sm:grid-cols-2 gap-1.5">
                    {points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="text-blue-500">✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-4">
            Vous avez un besoin spécifique qui ne figure pas ici ?
          </p>
          <Link
            href="/contact"
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          >
            Discutons de votre projet
          </Link>
        </div>
      </div>
    </div>
  );
}
