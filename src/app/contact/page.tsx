import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Eric Savoy",
  description: "Envoyez un message pour discuter de votre projet d'automatisation ou de TI industrielle.",
};

export default function Contact() {
  return (
    <div className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Prenons contact</h1>
          <p className="text-slate-500">
            Décrivez votre projet ou votre besoin — je vous reviendrai dans les 24 à 48 heures.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-8">
          <ContactForm />
        </div>

        <p className="text-center text-slate-400 text-sm mt-6">
          Québec, Canada — disponible pour des mandats locaux et à distance.
        </p>
      </div>
    </div>
  );
}
