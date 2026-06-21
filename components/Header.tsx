"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons/SocialIcons";

/**
 * Composant Header avec navigation principale
 * - Sticky header brutalist avec border terracotta
 * - Menu mobile responsive
 * - Liens sociaux avec icônes custom SVG
 */

interface SocialLink {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Détection du scroll pour animation du header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu mobile lors du redimensionnement vers desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Désactiver le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "#about", label: "À Propos" },
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projets" },
    { href: "#contact", label: "Contact" },
  ];

  const socialLinks: SocialLink[] = [
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-soft-black border-b-4 border-violet-soft py-3"
          : "bg-soft-black/95 py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo - Brutalist */}
          <Link
            href="/"
            className="font-mono text-base sm:text-lg font-bold text-soft-white hover:text-violet-soft transition-colors duration-300 tracking-tight"
          >
            &lt;ISSA_SANKARA/&gt;
          </Link>

          {/* Navigation Desktop - Brutalist */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-soft-white hover:text-violet-soft hover:bg-soft-black/80 transition-all duration-300 font-mono text-xs px-4 py-2 relative group border-r border-gray-soft/20 last:border-r-0"
                  >
                    {link.label.toUpperCase()}
                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-violet-soft group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Liens Sociaux Desktop */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l-2 border-gray-soft/30">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border-2 border-soft-white/30 hover:border-violet-soft text-soft-white hover:text-violet-soft hover:bg-soft-black/80 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.Icon className="w-5 h-5" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Bouton Menu Mobile - Brutalist */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 border-2 border-soft-white text-soft-white hover:bg-violet-soft hover:border-violet-soft transition-all duration-300"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" strokeWidth={3} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={3} />
            )}
          </button>
        </nav>
      </div>

      {/* Menu Mobile - Brutalist */}
      <div
        className={`md:hidden fixed inset-0 top-[60px] bg-shadow transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="container mx-auto px-4 py-8">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-mono font-bold text-concrete hover:text-terracotta hover:bg-indigo-ink transition-all duration-300 block py-4 px-4 border-b-2 border-dust/20"
                >
                  <span className="text-dust mr-3">{String(i + 1).padStart(2, '0')}</span>
                  {link.label.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>

          {/* Liens Sociaux Mobile */}
          <div className="flex items-center gap-4 mt-12 pt-8 border-t-4 border-terracotta">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border-2 border-concrete/30 text-concrete hover:border-terracotta hover:text-terracotta hover:bg-indigo-ink transition-all duration-300"
                aria-label={social.label}
              >
                <social.Icon className="w-5 h-5" strokeWidth={2} />
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
