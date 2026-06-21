/**
 * Page de démonstration des sections Compétences et Services
 * Permet de visualiser les composants avant leur intégration finale
 */

import React from 'react';
import { SkillsSection, ServicesSection } from '@/components/sections';

export default function DemoSectionsPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation de démo */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-neutral-dark">
              Démo Portfolio - Sections
            </h1>
            <div className="flex gap-4">
              <a
                href="#competences"
                className="text-neutral-medium hover:text-primary transition-colors">
                Compétences
              </a>
              <a
                href="#services"
                className="text-neutral-medium hover:text-primary transition-colors">
                Services
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Sections */}
      <SkillsSection />
      <ServicesSection />

      {/* Footer de démo */}
      <footer className="bg-neutral-dark text-white py-8 text-center">
        <p className="text-neutral-light">
          Démonstration des sections - Portfolio de Cheick Issa San Kara
        </p>
      </footer>
    </div>
  );
}
