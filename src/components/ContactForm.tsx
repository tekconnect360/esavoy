"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="name">
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Votre nom"
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
            Courriel
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="vous@exemple.com"
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="company">
          Entreprise <span className="text-slate-400 font-normal">(optionnel)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Nom de votre entreprise"
          className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="subject">
          Type de demande
        </label>
        <select
          id="subject"
          name="subject"
          required
          className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">Sélectionner...</option>
          <option value="conseil">Conseil en automatisation</option>
          <option value="ti">TI industrielle</option>
          <option value="contrat">Mandat à contrat</option>
          <option value="formation">Formation</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Décrivez votre projet ou votre besoin..."
          className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300 text-white font-medium py-3 px-6 rounded-lg transition-colors"
      >
        {status === "sending" ? "Envoi en cours..." : status === "sent" ? "Message envoyé ✓" : "Envoyer le message"}
      </button>

      {status === "sent" && (
        <p className="text-green-600 text-sm text-center">
          Merci ! Je vous répondrai dans les 24 à 48 heures.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-500 text-sm text-center">
          Une erreur s&apos;est produite. Veuillez réessayer.
        </p>
      )}
    </form>
  );
}
