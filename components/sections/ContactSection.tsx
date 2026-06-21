"use client";

import { useState } from "react";
import { FadeIn, ScaleOnHover } from "@/components/animations";

/* Données du formulaire de contact */
interface FormData {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}

/** Erreurs de validation du formulaire */
interface FormErrors {
  nom?: string;
  email?: string;
  sujet?: string;
  message?: string;
}

/* Section Contact - Formulaire et coordonnées -Présente un formulaire de contact avec validation côté client et une sidebar avec les coordonnées professionnelles. Fonctionnalités : - Validation en temps réel au blur - Messages d'erreur personnalisés - État de chargement pendant la soumission - Message de succès après envoi - Reset automatique du formulaire - Responsive : 2 colonnes desktop, 1 colonne mobile */
export default function ContactSection() {
  // État du formulaire
  const [formData, setFormData] = useState<FormData>({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });

  // État des erreurs de validation
  const [errors, setErrors] = useState<FormErrors>({});

  // État de soumission (loading)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // État de succès
  const [isSuccess, setIsSuccess] = useState(false);

  /**  Validation d'un champ individuel */
  const validateField = (
    name: keyof FormData,
    value: string
  ): string | undefined => {
    switch (name) {
      case "nom":
        if (!value.trim()) {
          return "Le nom complet est requis";
        }
        if (value.trim().length < 2) {
          return "Le nom doit contenir au moins 2 caractères";
        }
        break;

      case "email":
        if (!value.trim()) {
          return "L'email est requis";
        }
        // Regex simple pour validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return "Veuillez entrer un email valide";
        }
        break;

      case "sujet":
        if (!value.trim()) {
          return "Le sujet est requis";
        }
        if (value.trim().length < 3) {
          return "Le sujet doit contenir au moins 3 caractères";
        }
        break;

      case "message":
        if (!value.trim()) {
          return "Le message est requis";
        }
        if (value.trim().length < 10) {
          return "Le message doit contenir au moins 10 caractères";
        }
        break;
    }
    return undefined;
  };

  /**
   * Validation complète du formulaire
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Valider tous les champs
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Gestion du changement de valeur d'un champ
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Effacer l'erreur du champ modifié
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  /**
   * Gestion de la perte de focus (validation au blur)
   */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormData, value);

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  /**
   * Soumission du formulaire
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Valider le formulaire complet
    if (!validateForm()) {
      return;
    }

    // Activer l'état de chargement
    setIsSubmitting(true);

    try {
      // Simuler un envoi (délai de 2 secondes)
      // TODO: Remplacer par un appel API réel plus tard
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Log des données pour démo
      console.log("Formulaire soumis avec succès :", formData);

      // Afficher le message de succès
      setIsSuccess(true);

      // Réinitialiser le formulaire
      setFormData({
        nom: "",
        email: "",
        sujet: "",
        message: "",
      });
      setErrors({});

      // Masquer le message de succès après 5 secondes
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full bg-gradient-to-b from-white to-neutral-light/30 px-6 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* En-tête de section */}
        <FadeIn delay={0} direction="up">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-neutral-dark lg:text-5xl">
              Contactez-moi
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-medium">
              Une question, un projet ou une opportunité ? Je serais ravi d'en
              discuter avec vous.
            </p>
          </div>
        </FadeIn>

        {/* Message de succès */}
        {isSuccess && (
          <div className="mx-auto mb-8 max-w-4xl animate-fade-in rounded-lg bg-accent-green/10 px-6 py-4 ring-1 ring-accent-green/20">
            <div className="flex items-center gap-3">
              <svg
                className="h-6 w-6 flex-shrink-0 text-accent-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-accent-green">
                  Message envoyé avec succès !
                </h3>
                <p className="text-sm text-neutral-dark">
                  Je vous répondrai dans les plus brefs délais.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Grille : Formulaire + Sidebar */}
        <div className="mx-auto max-w-7xl gap-8 lg:grid lg:grid-cols-[65%_35%]">
          {/* Formulaire */}
          <FadeIn delay={0.1} direction="up" className="order-2 lg:order-1">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl bg-white p-8 shadow-lg ring-1 ring-neutral-border"
              noValidate
            >
              {/* Champ Nom complet */}
              <div>
                <label
                  htmlFor="nom"
                  className="mb-2 block text-sm font-semibold text-neutral-dark"
                >
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-neutral-dark transition-colors focus:outline-none focus:ring-2 ${
                    errors.nom
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-neutral-border focus:border-primary focus:ring-primary/20"
                  }`}
                  placeholder="Ex: Cheick Issa San Kara"
                  aria-required="true"
                  aria-invalid={!!errors.nom}
                  aria-describedby={errors.nom ? "nom-error" : undefined}
                />
                {errors.nom && (
                  <p id="nom-error" className="mt-2 text-sm text-red-500">
                    {errors.nom}
                  </p>
                )}
              </div>

              {/* Champ Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-neutral-dark"
                >
                  Adresse email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-neutral-dark transition-colors focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-neutral-border focus:border-primary focus:ring-primary/20"
                  }`}
                  placeholder="Ex: email@example.com"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-sm text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Champ Sujet */}
              <div>
                <label
                  htmlFor="sujet"
                  className="mb-2 block text-sm font-semibold text-neutral-dark"
                >
                  Sujet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="sujet"
                  name="sujet"
                  value={formData.sujet}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-neutral-dark transition-colors focus:outline-none focus:ring-2 ${
                    errors.sujet
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-neutral-border focus:border-primary focus:ring-primary/20"
                  }`}
                  placeholder="Ex: Demande de collaboration"
                  aria-required="true"
                  aria-invalid={!!errors.sujet}
                  aria-describedby={errors.sujet ? "sujet-error" : undefined}
                />
                {errors.sujet && (
                  <p id="sujet-error" className="mt-2 text-sm text-red-500">
                    {errors.sujet}
                  </p>
                )}
              </div>

              {/* Champ Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-neutral-dark"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={6}
                  className={`min-h-[150px] w-full resize-y rounded-lg border bg-white px-4 py-3 text-neutral-dark transition-colors focus:outline-none focus:ring-2 ${
                    errors.message
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-neutral-border focus:border-primary focus:ring-primary/20"
                  }`}
                  placeholder="Décrivez votre projet ou votre demande..."
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 text-sm text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Bouton de soumission */}
              <ScaleOnHover>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex w-full text-white items-center justify-center gap-2 rounded-xl bg-neutral-800 px-8 py-4 text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 disabled:cursor-not-allowed disabled:bg-neutral-medium disabled:shadow-none"
                >
                {isSubmitting ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75 "
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer le message
                    <svg
                      className="h-5 w-5 text-white transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
                </button>
              </ScaleOnHover>
            </form>
          </FadeIn>

          {/* Sidebar - Coordonnées */}
          <FadeIn delay={0.2} direction="up" className="order-1 mb-8 lg:order-2 lg:mb-0">
            <div className="sticky top-8 space-y-6 rounded-2xl bg-primary/5 p-8 ring-1 ring-primary/20">
              <h3 className="text-2xl font-bold text-neutral-dark">
                Mes coordonnées
              </h3>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-neutral-dark">
                    Email
                  </h4>
                  <a
                    href="mailto:admin@syntarasoft.net"
                    className="text-primary transition-colors hover:text-primary-dark hover:underline"
                  >
                    admin@syntarasoft.net
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-neutral-dark">
                    LinkedIn
                  </h4>
                  <a
                    href="https://www.linkedin.com/in/issa-sankara-71124334a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary transition-colors hover:text-primary-dark hover:underline"
                  >
                    Voir mon profil
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-neutral-dark">
                    GitHub
                  </h4>
                  <a
                    href="https://github.com/Sanke225"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary transition-colors hover:text-primary-dark hover:underline"
                  >
                    Voir mes projets
                  </a>
                </div>
              </div>

              {/* Localisation */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-neutral-dark">
                    Localisation
                  </h4>
                  <p className="text-neutral-medium">
                    Abidjan Koumassi, Côte d'Ivoire 🇨🇮
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-neutral-dark">
                    WhatsApp
                  </h4>
                  <a
                    href="https://wa.me/2250709551744"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary transition-colors hover:text-primary-dark hover:underline"
                  >
                    +225 07 09 55 17 44
                  </a>
                </div>
              </div>

              {/* Disponibilité */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-neutral-dark">
                    Disponibilité
                  </h4>
                  <p className="text-neutral-medium">
                    Ouvert aux missions freelance
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
