import type { Metadata } from "next";
import Link from "next/link";
import MainLayout from "@/components/MainLayout";

export const metadata: Metadata = {
  title: "À propos — Eric Savoy",
  description: "Technicien en automatisation avec plus de 20 ans d'expérience en TI industrielle et systèmes PLC.",
};

const expertise = [
  { label: "PLC / API", items: ["Allen-Bradley / Rockwell", "Siemens S7", "Schneider Modicon"] },
  { label: "SCADA & HMI", items: ["FactoryTalk View", "WinCC", "Ignition"] },
  { label: "Réseaux industriels", items: ["EtherNet/IP", "Profinet", "Modbus TCP/RTU", "DeviceNet"] },
  { label: "TI industrielle", items: ["Infrastructure réseau", "Cybersécurité OT", "Intégration ERP/MES"] },
];

export default function APropos() {
  return (
    <MainLayout>
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">À propos</h1>
            <div className="w-12 h-1 bg-blue-500 rounded" />
          </div>
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-8 mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Qui suis-je ?</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>Technicien en automatisation basé au Québec, j&apos;œuvre dans le domaine de l&apos;automatisation industrielle et des technologies de l&apos;information depuis plus de <strong className="text-slate-800">20 ans</strong>.</p>
              <p>Mon parcours m&apos;a amené à travailler dans divers secteurs industriels — de la fabrication à l&apos;agroalimentaire, en passant par les procédés continus — ce qui m&apos;a forgé une vision pratique et terrain des défis d&apos;automatisation réels.</p>
              <p>Je combine une maîtrise technique solide des systèmes de contrôle (PLC, SCADA, HMI) avec une compréhension des enjeux TI industrielle : sécurité, intégration avec les systèmes d&apos;entreprise, et fiabilité des réseaux de production.</p>
              <p>Ce qui me distingue : je traduis les besoins opérationnels en solutions techniques concrètes, et je suis autant à l&apos;aise sur le plancher que dans une salle de conférence.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-8 mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Domaines d&apos;expertise</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {expertise.map(({ label, items }) => (
                <div key={label}>
                  <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">{label}</h3>
                  <ul className="space-y-1">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 text-white rounded-xl p-8 mb-8">
            <h2 className="text-xl font-semibold mb-4">Mon approche</h2>
            <div className="grid sm:grid-cols-3 gap-6 text-sm">
              <div><div className="text-blue-400 font-semibold mb-1">Terrain d&apos;abord</div><p className="text-slate-300">Je commence par comprendre votre réalité opérationnelle avant de proposer une solution.</p></div>
              <div><div className="text-blue-400 font-semibold mb-1">Solutions durables</div><p className="text-slate-300">Je préconise des solutions maintenables par vos équipes, pas des dépendances externes.</p></div>
              <div><div className="text-blue-400 font-semibold mb-1">Communication claire</div><p className="text-slate-300">Je vulgarise les enjeux techniques pour faciliter les décisions à tous les niveaux.</p></div>
            </div>
          </div>
          <div className="text-center">
            <Link href="/contact" className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-8 rounded-lg transition-colors">Prendre contact</Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
