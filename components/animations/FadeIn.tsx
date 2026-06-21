'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

type FadeInDirection = 'up' | 'down' | 'left' | 'right';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: FadeInDirection;
  duration?: number;
  className?: string;
}

/**
 * Composant wrapper pour animer le contenu en fade-in au scroll
 *
 * @param children - Contenu à animer
 * @param delay - Délai avant l'animation en secondes (default: 0)
 * @param direction - Direction du mouvement (default: 'up')
 * @param duration - Durée de l'animation en secondes (default: 0.5)
 * @param className - Classes CSS additionnelles
 */
export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.5,
  className,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Calcul du décalage initial selon la direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 40 };
      case 'down':
        return { y: -40 };
      case 'left':
        return { x: 40 };
      case 'right':
        return { x: -40 };
      default:
        return { y: 40 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...getInitialPosition(),
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1], // Courbe d'accélération personnalisée
      }}
      // Respecte la préférence reduced-motion de l'utilisateur
      style={{
        willChange: 'opacity, transform',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
