"use client";

import { motion } from "framer-motion";

/**
 * TechStackCarousel - Défilement horizontal infini des technologies
 *
 * Style Brutalist Abidjan :
 * - Badges carrés avec border-2 border-shadow
 * - Font mono bold
 * - Animation seamless avec duplication
 * - Pause au hover
 */

interface TechBadge {
  name: string;
  category: "frontend" | "backend" | "ai" | "tools";
}

const technologies: TechBadge[] = [
  // Frontend
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },

  // Backend
  { name: "Node.js", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "MongoDB", category: "backend" },

  // IA/ML
  { name: "OpenAI", category: "ai" },
  { name: "LangChain", category: "ai" },
  { name: "Anthropic Claude", category: "ai" },

  // Tools
  { name: "Git", category: "tools" },
  { name: "Vercel", category: "tools" },
  { name: "Firebase", category: "tools" },
];

export default function TechStackCarousel() {
  // Dupliquer les badges pour effet seamless
  const duplicatedTechs = [...technologies, ...technologies];

  return (
    <div className="relative w-full overflow-hidden border-y-2 border-shadow bg-concrete py-6">
      {/* Gradient Fade - Gauche */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-concrete to-transparent" />

      {/* Gradient Fade - Droite */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-concrete to-transparent" />

      {/* Conteneur animé */}
      <motion.div
        className="flex gap-4"
        animate={{
          x: [0, "-50%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        whileHover={{
          animationPlayState: "paused",
        }}
      >
        {duplicatedTechs.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="inline-flex shrink-0 items-center border-2 border-shadow bg-concrete px-4 py-2 font-mono text-xs font-bold text-shadow transition-colors hover:bg-dust"
          >
            {tech.name}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
