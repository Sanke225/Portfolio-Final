import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

/**
 * Page d'accueil du portfolio
 *
 * Structure :
 * - Hero Section : Présentation et CTAs
 * - About Section : Parcours et timeline
 * - Skills Section : Compétences techniques
 * - Services Section : Services offerts
 * - Projects Section : Projets réalisés
 * - Contact Section : Formulaire de contact
 */
export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
