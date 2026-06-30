import type { Metadata } from "next";
import { Instrument_Serif, Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme";
import { LanguageProvider } from "@/lib/i18n";
import { SiteContentProvider } from "@/lib/site-content/context";
import { getSiteContent } from "@/lib/site-content/server";


// Display Font - Instrument Serif (Ultra-bold for headings)
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// Body Font - Schibsted Grotesk (Quirky, readable, NOT Inter)
const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

// Mono Font - Martian Mono (Modern coding font)
const martianMono = Martian_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

/**
 * Métadonnées du site pour SEO et Open Graph
 * Optimisées pour le référencement local (Côte d'Ivoire) et international
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://issasankara.com"),
  title: {
    default: "Cheick Issa San Kara | Développeur Fullstack & Designer Créatif",
    template: "%s | Cheick Issa San Kara",
  },
  description:
    "Développeur fullstack junior et designer créatif basé en Côte d'Ivoire. Spécialisé en Next.js, React, Firebase et solutions d'intelligence artificielle.",
  keywords: [
    "Next.js",
    "React",
    "Firebase",
    "IA",
    "Intelligence Artificielle",
    "Automatisation",
    "n8n",
    "Développeur Fullstack",
    "Designer UI/UX",
    "Abidjan",
    "Côte d'Ivoire",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Portfolio développeur",
    "Web moderne",
  ],
  authors: [{ name: "Cheick Issa SanKara", url: "https://issasankara.com" }],
  creator: "Cheick Issa SanKara",
  publisher: "Cheick Issa SanKara",
  openGraph: {
    type: "website",
    locale: "fr_CI",
    alternateLocale: ["fr_FR"],
    url: "https://issasankara.com",
    title: "Cheick Issa SanKara | Développeur Fullstack & Designer Créatif",
    description:
      "DÉVELOPPEUR FULL-STACK ORIENTÉ IA & AUTOMATISATION",
    siteName: "Portfolio Cheick Issa San Kara",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cheick Issa SanKara - Développeur Fullstack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheick Issa SanKara | Développeur Fullstack ORIENTÉ IA & AUTOMATISATION",
    description:
      "DÉVELOPPEUR FULL-STACK ORIENTÉ IA & AUTOMATISATION.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://issasankara.com",
  },
  category: "technology",
};

/**
 * Layout racine de l'application
 * - Intégration du Header et Footer
 * - Configuration des polices Inter et JetBrains Mono
 * - Structure flex pour sticky footer
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteContent = await getSiteContent();

  return (
    <html
      lang="fr"
      className={`${instrumentSerif.variable} ${schibstedGrotesk.variable} ${martianMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <LanguageProvider>
            <SiteContentProvider initialContent={siteContent}>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </SiteContentProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
