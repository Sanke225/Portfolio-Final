import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons/SocialIcons";

/**
 * Footer - Abidjan Kinetic Style
 * Brutalist footer avec icônes Lucide + Custom SVG
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { href: "/", label: "Accueil" },
    { href: "#about", label: "À Propos" },
    { href: "#projects", label: "Projets" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" },
  ];

  const socialLinks = [
    {
      href: "https://github.com/Sanke225",
      label: "GitHub",
      Icon: GithubIcon,
    },
    {
      href: "https://www.linkedin.com/in/issa-sankara-71124334a",
      label: "LinkedIn",
      Icon: LinkedinIcon,
    },
  ];

  return (
    <footer className="relative bg-shadow text-concrete overflow-hidden border-t-4 border-terracotta">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Grille 3 colonnes - Brutalist */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Colonne 1 : Branding */}
          <div className="space-y-4">
            <h3 className="font-mono text-base font-bold text-concrete border-l-4 border-terracotta pl-4">
              &lt;ISSA_SANKARA/&gt;
            </h3>
            <p className="font-sans text-sm text-dust pl-4">
              Développeur Fullstack & Designer Créatif
            </p>
            <p className="font-mono text-xs text-dust/70 pl-4 max-w-xs leading-relaxed">
              // Création d'expériences digitales modernes avec une touche ivoirienne
            </p>
          </div>

          {/* Colonne 2 : Navigation */}
          <div className="space-y-4">
            <h4 className="font-mono text-sm font-bold text-concrete uppercase border-b-2 border-dust/20 pb-2">
              Navigation
            </h4>
            <nav>
              <ul className="space-y-2">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-mono text-xs text-dust hover:text-terracotta transition-colors duration-300 inline-flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                      {link.label.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Colonne 3 : Réseaux Sociaux */}
          <div className="space-y-4">
            <h4 className="font-mono text-sm font-bold text-concrete uppercase border-b-2 border-dust/20 pb-2">
              Connect
            </h4>
            <p className="font-mono text-xs text-dust/70">
              // Follow me for updates
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border-2 border-concrete/30 hover:border-terracotta text-concrete hover:text-terracotta hover:bg-indigo-ink transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.Icon className="w-5 h-5" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t-2 border-dust/20 mt-12 pt-8">
          {/* Copyright - Brutalist */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-dust/70 text-center sm:text-left">
              © {currentYear} ISSA_SANKARA // Next.js + Framer Motion
            </p>

            {/* Badge Côte d'Ivoire - Lucide Icon */}
            <div className="flex items-center gap-2 border-2 border-forest/50 px-3 py-2">
              <MapPin className="w-4 h-4 text-forest" strokeWidth={2.5} />
              <span className="font-mono text-xs font-medium text-concrete">
                MADE_IN_CÔTE_D'IVOIRE
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
