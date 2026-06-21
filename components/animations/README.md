# Composants d'Animation

Ce dossier contient tous les composants d'animation réutilisables basés sur Framer Motion.

## Composants disponibles

### FadeIn
Animation de fade-in au scroll avec déplacement directionnel.

**Props:**
- `children` (ReactNode) - Contenu à animer
- `delay` (number, optionnel) - Délai avant l'animation en secondes (default: 0)
- `direction` ('up' | 'down' | 'left' | 'right', optionnel) - Direction du mouvement (default: 'up')
- `duration` (number, optionnel) - Durée de l'animation en secondes (default: 0.5)
- `className` (string, optionnel) - Classes CSS additionnelles

**Exemple:**
```tsx
<FadeIn delay={0.2} direction="up">
  <h1>Titre animé</h1>
</FadeIn>
```

### StaggerContainer
Container pour animer les enfants en décalé (effet stagger).

**Props:**
- `children` (ReactNode) - Éléments enfants à animer
- `staggerDelay` (number, optionnel) - Délai entre chaque enfant en secondes (default: 0.1)
- `className` (string, optionnel) - Classes CSS additionnelles

**Exemple:**
```tsx
<StaggerContainer staggerDelay={0.15}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggerContainer>
```

### ScaleOnHover
Wrapper pour animer un élément au survol avec un effet de scale.

**Props:**
- `children` (ReactNode) - Contenu à animer
- `scale` (number, optionnel) - Facteur de scale au hover (default: 1.05)
- `duration` (number, optionnel) - Durée de la transition en secondes (default: 0.15)
- `className` (string, optionnel) - Classes CSS additionnelles

**Exemple:**
```tsx
<ScaleOnHover scale={1.1}>
  <button>Bouton animé</button>
</ScaleOnHover>
```

### PageTransition
Transition fluide entre pages/sections.

**Props:**
- `children` (ReactNode) - Contenu de la page
- `className` (string, optionnel) - Classes CSS additionnelles

**Exemple:**
```tsx
<PageTransition>
  <div>Contenu de la page</div>
</PageTransition>
```

## Bonnes pratiques

### Performance
- Toutes les animations utilisent uniquement `transform` et `opacity` pour des performances optimales
- Évitez d'animer des propriétés comme `width`, `height`, ou `margin`

### Accessibilité
- Les animations respectent automatiquement la préférence `prefers-reduced-motion`
- Les utilisateurs ayant activé cette option verront les animations désactivées

### Délais
- Utilisez des délais courts (0.1-0.3s) pour une expérience fluide
- Pour les animations séquentielles, espacez les délais de 0.1-0.2s

### Directions
- `up` (défaut) : élément monte depuis le bas
- `down` : élément descend depuis le haut
- `left` : élément vient de la droite
- `right` : élément vient de la gauche

## Import
```tsx
import { FadeIn, StaggerContainer, ScaleOnHover, PageTransition } from '@/components/animations';
```
