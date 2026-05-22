import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Configuration manquante" }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const body = await req.json();
  const { name, email, company, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  const subjectLabels: Record<string, string> = {
    conseil: "Conseil en automatisation",
    ti: "TI industrielle",
    contrat: "Mandat à contrat",
    formation: "Formation",
    autre: "Autre",
  };

  const { data, error } = await resend.emails.send({
    from: "Site web <contact_esavoy@igss.ca>",
    to: "eric@esavoy.ca",
    replyTo: email,
    subject: `[esavoy.ca] ${subjectLabels[subject] ?? subject} — ${name}`,
    html: `
      <h2>Nouveau message de contact — esavoy.ca</h2>
      <p><strong>Nom :</strong> ${name}</p>
      ${company ? `<p><strong>Entreprise :</strong> ${company}</p>` : ""}
      <p><strong>Courriel :</strong> ${email}</p>
      <p><strong>Type de demande :</strong> ${subjectLabels[subject] ?? subject}</p>
      <hr />
      <p><strong>Message :</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    console.error("Resend error:", JSON.stringify(error));
    return NextResponse.json({ error: "Erreur d'envoi" }, { status: 500 });
  }

  console.log("Email sent:", data?.id);
  return NextResponse.json({ ok: true });
}
