import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Validation de la présence de la clé API AVANT l'instanciation
if (!process.env.RESEND_API_KEY) {
  console.error('RESEND_API_KEY is missing from environment variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  // Vérifier la configuration de l'API au runtime
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'Service de messagerie non configuré. Veuillez contacter l\'administrateur.' },
      { status: 503 }
    );
  }
  try {
    const body = await request.json();
    const { nom, email, sujet, message } = body;

    // Validation basique
    if (!nom || !email || !sujet || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Fonction pour échapper les caractères HTML (protection XSS)
    const escapeHtml = (text: string): string => {
      const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return text.replace(/[&<>"']/g, (m) => map[m]);
    };

    // Sanitize des données utilisateur
    const sanitizedNom = escapeHtml(nom);
    const sanitizedEmail = escapeHtml(email);
    const sanitizedSujet = escapeHtml(sujet);
    const sanitizedMessage = escapeHtml(message);

    // Envoi de l'email
    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev',
      to: [process.env.CONTACT_EMAIL || 'scheickissa@gmail.com'],
      replyTo: email,
      subject: `[Portfolio] ${sujet}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #4a90e2; padding-bottom: 10px;">
            Nouveau message depuis votre portfolio
          </h2>
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>De :</strong> ${sanitizedNom}</p>
            <p style="margin: 10px 0;"><strong>Email :</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
            <p style="margin: 10px 0;"><strong>Sujet :</strong> ${sanitizedSujet}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <h3 style="color: #333;">Message :</h3>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; border-left: 4px solid #4a90e2;">
            <p style="line-height: 1.6; color: #555;">${sanitizedMessage.replace(/\n/g, '<br />')}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
