/**
 * Configuration globale pour les animations Framer Motion
 * Gère les préférences reduced-motion pour l'accessibilité
 */

/**
 * Variants de transition par défaut
 * Utilisent uniquement transform et opacity pour des performances optimales
 */
export const defaultTransition = {
  type: 'tween',
  ease: [0.25, 0.4, 0.25, 1], // Courbe d'accélération personnalisée
  duration: 0.5,
};

/**
 * Configuration pour respecter les préférences reduced-motion
 * Si l'utilisateur a activé reduced-motion, les animations sont désactivées
 */
export const motionConfig = {
  reducedMotion: 'user', // Respecte la préférence système
  transition: defaultTransition,
};

/**
 * Vérifie si l'utilisateur préfère les animations réduites
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
