/**
 * Structured Data (JSON-LD) pour SEO
 * Aide les moteurs de recherche à comprendre le contenu du site
 */

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Cheick Issa SanKara",
    alternateName: "Issa Sankara",
    url: "https://www.san-kara.site",
    image: "https://www.san-kara.site/og-image.jpg",
    sameAs: [
      "https://github.com/Sanke225",
      "https://www.linkedin.com/in/issa-sankara-71124334a",
    ],
    jobTitle: "Développeur Fullstack & Designer Créatif",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "CI",
      addressLocality: "Abidjan",
      addressRegion: "Côte d'Ivoire",
    },
    description:
      "Développeur fullstack junior et designer créatif basé en Côte d'Ivoire. Spécialisé en Next.js, React, Firebase et solutions d'intelligence artificielle.",
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Firebase",
      "Intelligence Artificielle",
      "Automatisation",
      "n8n",
      "Tailwind CSS",
      "Framer Motion",
      "UI/UX Design",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
