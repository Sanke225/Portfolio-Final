"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * ScrollIndicator Component - Brutalist Abidjan Style
 *
 * Indicateur de scroll minimaliste avec animation bounce verticale
 * Style : Texte mono + icône terracotta
 * Animation : Framer Motion avec easing custom [0.16, 1, 0.3, 1]
 */
export default function ScrollIndicator() {
  const handleClick = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="fixed bottom-12 left-1/2 z-20 -translate-x-1/2 cursor-pointer"
      onClick={handleClick}
    >
      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center gap-2"
      >
        {/* Texte EXPLORER */}
        <span className="font-mono text-xs font-bold tracking-wider text-dust">
          EXPLORER
        </span>

        {/* Flèche vers le bas - Accent Terracotta */}
        <ChevronDown
          className="h-6 w-6 text-terracotta"
          strokeWidth={3}
        />
      </motion.div>
    </motion.div>
  );
}
