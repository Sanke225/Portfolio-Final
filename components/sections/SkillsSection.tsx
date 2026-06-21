/**
 * Skills Section - Abidjan Kinetic
 * Brutalist cards with geometric icons (NO emoji)
 * Heavy shadows, sharp edges, terracotta accents
 */

'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Server, Brain, Palette } from 'lucide-react';
import DiagonalSlash from '../DiagonalSlash';
import type { LucideIcon } from 'lucide-react';

interface Skill {
  name: string;
}

interface SkillCategory {
  title: string;
  Icon: LucideIcon;
  skills: Skill[];
}

const SkillsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend',
      Icon: Code,
      skills: [
        { name: 'HTML5 & CSS3' },
        { name: 'JavaScript ES6+' },
        { name: 'TypeScript' },
        { name: 'React.js' },
        { name: 'Next.js 15' },
        { name: 'Tailwind CSS' },
        { name: 'Shadcn/ui' },
        { name: 'DaisyUI' },
        { name: 'Framer Motion' },
      ],
    },
    {
      title: 'Backend & BaaS',
      Icon: Server,
      skills: [
        { name: 'Node.js' },
        { name: 'Firebase' },
        { name: 'Firestore' },
        { name: 'Supabase' },
        { name: 'MongoDB Atlas' },
        { name: 'APIs REST' },
        { name: 'Webhooks' },
        { name: 'Intégrations Paiement' },
      ],
    },
    {
      title: 'IA & Automatisation',
      Icon: Brain,
      skills: [
        { name: 'Agents IA Conversationnels' },
        { name: 'APIs IA (GPT, Claude, Gemini, Grok)' },
        { name: 'N8N Workflows' },
        { name: 'Prompt Engineering' },
        { name: 'Automatisation Métier' },
        { name: 'Design IA Génératif' },
      ],
    },
    {
      title: 'Outils & Design',
      Icon: Palette,
      skills: [
        { name: 'Git & GitHub' },
        { name: 'Figma' },
        { name: 'UI/UX Design' },
        { name: 'Design Systems' },
        { name: 'Responsive Design' },
        { name: 'Claude Code & Cursor' },
      ],
    },
  ];

  return (
    <section
      id="competences"
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
            <span className="font-mono text-sm text-dust pt-2">02</span>
            <div>
              <h2 className="font-serif text-6xl md:text-7xl font-black text-shadow mb-4 leading-tight">
                Compétences
              </h2>
              <p className="font-sans text-lg text-dust max-w-xl">
                Stack technique moderne combinant développement fullstack, intelligence artificielle et automatisation
              </p>
            </div>
          </div>
        </motion.div>

        {/* Skills Grid - Brutalist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.15 * categoryIndex,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group relative bg-concrete border-4 border-shadow p-8 shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-500"
            >
              {/* Terracotta Accent on Hover */}
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
                className="absolute top-0 left-0 h-1 bg-terracotta origin-left"
              />

              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center w-16 h-16 border-4 border-shadow bg-clay/20">
                  <category.Icon className="w-8 h-8 text-shadow" strokeWidth={2.5} />
                </div>
                <h3 className="font-serif text-3xl font-black text-shadow">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="inline-block border-2 border-shadow bg-concrete px-4 py-2 font-mono text-xs font-medium text-shadow hover:bg-shadow hover:text-concrete transition-all duration-300"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 border-l-4 border-terracotta pl-6"
        >
          <p className="font-mono text-sm text-dust">
            APPRENTISSAGE_CONTINU = true; // Toujours à la pointe
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
