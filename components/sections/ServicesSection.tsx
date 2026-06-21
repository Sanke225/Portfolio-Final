/**
 * Services Section - Abidjan Kinetic
 * Cartes brutales uniformes avec symboles géométriques
 * Grid 2x3 avec tailles identiques
 */

'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Layers, Brain, Zap, Palette, Smartphone, ArrowRight } from 'lucide-react';
import DiagonalSlash from '../DiagonalSlash';
import type { LucideIcon } from 'lucide-react';

interface Service {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const ServicesSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const services: Service[] = [
    {
      Icon: Globe,
      title: 'Sites Vitrines & Landing Pages',
      description:
        'Sites ultra-performants (Next.js 15, TypeScript) avec animations fluides (Framer Motion), optimisation SEO avancée et temps de chargement < 2s. Design responsive et accessible (WCAG).',
    },
    {
      Icon: Layers,
      title: 'Applications Web Fullstack',
      description:
        'Apps React/Next.js avec authentification sécurisée (Firebase Auth), bases de données temps réel (Firestore, Supabase), intégrations paiement (Stripe) et déploiement automatisé.',
    },
    {
      Icon: Brain,
      title: 'Agents IA Conversationnels',
      description:
        'Assistants IA personnalisés (GPT-4, Claude, Gemini) pour automatiser service client, génération de contenu, analyse de données. Intégration APIs IA et traitement du langage naturel.',
    },
    {
      Icon: Zap,
      title: 'Automatisation & Workflows N8N',
      description:
        'Automatisation de processus métier complexes : workflows N8N, intégrations multi-APIs, webhooks, triggers personnalisés. Gain de temps et réduction d\'erreurs humaines.',
    },
    {
      Icon: Palette,
      title: 'Design UI/UX & Prototypage',
      description:
        'Interfaces modernes et intuitives conçues sur Figma. Design systems cohérents (Shadcn/ui, DaisyUI, Tailwind), prototypes interactifs et tests utilisateurs.',
    },
    {
      Icon: Smartphone,
      title: 'Applications Mobiles (APK)',
      description:
        'Développement d\'applications Android natives et cross-platform (React Native). Interface fluide, optimisation performances et intégration services backend (Firebase, API REST).',
    },
  ];


  return (
    <section
      id="services"
      ref={ref}
      className="relative py-32 px-6 bg-concrete"
    >
      <DiagonalSlash className="mb-20" thickness={4} />

      <div className="max-w-7xl mx-auto">
        {/* Section Header - Brutalist */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="flex items-start gap-6">
            <span className="font-mono text-sm text-dust pt-2">03</span>
            <div>
              <h2 className="font-serif text-6xl md:text-7xl font-black text-shadow mb-4 leading-tight">
                Services
              </h2>
              <p className="font-sans text-lg text-dust max-w-xl">
                Solutions techniques sur mesure alliant développement web moderne, IA générative et automatisation intelligente
              </p>
            </div>
          </div>
        </motion.div>

        {/* Services Grid - 2x3 avec tailles uniformes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1 + (index * 0.1),
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group relative bg-concrete border-4 border-shadow h-full flex flex-col shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-500"
            >
              {/* Terracotta Accent on Hover */}
              <motion.div
                initial={{ height: 0 }}
                whileHover={{ height: '100%' }}
                transition={{ duration: 0.4 }}
                className="absolute top-0 left-0 w-1 bg-terracotta origin-top"
              />

              {/* Card Content - Fixed height structure */}
              <div className="p-8 flex flex-col h-full">
                {/* Icon - Lucide React */}
                <div className="mb-6">
                  <div className="flex items-center justify-center w-20 h-20 border-4 border-shadow bg-clay/20">
                    <service.Icon className="w-10 h-10 text-shadow" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Title - Fixed 2 lines max */}
                <h3 className="font-serif text-2xl font-black text-shadow mb-4 leading-tight min-h-[3.5rem]">
                  {service.title}
                </h3>

                {/* Description - Flex grow to fill space */}
                <p className="text-dust text-sm leading-relaxed flex-grow">
                  {service.description}
                </p>

                {/* Hover Indicator - Always at bottom */}
                <div className="mt-6 pt-4 border-t-2 border-dust/20">
                  <div className="flex items-center gap-2 text-terracotta opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-mono text-xs font-bold">VOIR_PLUS</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={3} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action - Brutalist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="font-mono text-sm text-dust mb-8">
            Discutons-en !
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 border-4 border-shadow bg-terracotta px-10 py-5 font-sans text-base font-bold text-concrete shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-500"
          >
            <span>DÉMARRER UN PROJET</span>
            <ArrowRight className="w-5 h-5" strokeWidth={3} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
