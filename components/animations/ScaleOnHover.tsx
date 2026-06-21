'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScaleOnHoverProps {
  children: ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
}

/**
 * Wrapper pour animer un élément au survol avec un effet de scale
 *
 * @param children - Contenu à animer
 * @param scale - Facteur de scale au hover (default: 1.05)
 * @param duration - Durée de la transition en secondes (default: 0.15)
 * @param className - Classes CSS additionnelles
 */
export function ScaleOnHover({
  children,
  scale = 1.05,
  duration = 0.15,
  className,
}: ScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{
        scale,
        transition: {
          duration,
          ease: 'easeInOut',
        },
      }}
      whileTap={{
        scale: 0.98, // Légère réduction au clic
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
