# Sections du Portfolio

Ce dossier contient les sections principales du portfolio de Cheick Issa San Kara.

## Sections disponibles

### 1. SkillsSection (Section Compétences)

Section présentant les compétences techniques organisées en 4 catégories avec effet glassmorphism.

**Catégories :**
- Frontend (HTML5, CSS3, Tailwind, React, Next.js, TypeScript)
- Backend (Node.js, Firebase, APIs REST, PostgreSQL, MongoDB)
- Outils & IA (Git, n8n, ChatGPT, Claude, Agents IA)
- Design (Figma, UI/UX, Prototypage, Design System)

**Caractéristiques :**
- Design glassmorphism avec fond semi-transparent et blur
- Grille responsive (3 colonnes desktop / 1 colonne mobile)
- Animation hover avec élévation et bordure gradient
- Icônes émojis pour chaque compétence
- Badges interactifs pour chaque technologie

### 2. ServicesSection (Section Services)

Section présentant les 5 services offerts avec des cartes interactives.

**Services :**
1. Sites Vitrines & Landing Pages
2. Applications Web Fullstack
3. Intégration Intelligence Artificielle
4. Automatisation & Workflows
5. UI/UX Design

**Caractéristiques :**
- Cartes blanches sur fond gris clair
- Icônes grandes avec gradient de couleur
- Grille responsive (3 colonnes desktop / 1 colonne mobile)
- Animation hover avec bordure violette
- Call-to-action intégré

## Utilisation

### Import individuel

```tsx
import SkillsSection from '@/components/sections/SkillsSection';
import ServicesSection from '@/components/sections/ServicesSection';
```

### Import groupé

```tsx
import { SkillsSection, ServicesSection } from '@/components/sections';
```

### Exemple d'intégration

```tsx
export default function Home() {
  return (
    <>
      <SkillsSection />
      <ServicesSection />
    </>
  );
}
```

## Démo

Une page de démonstration est disponible pour visualiser les sections :

```bash
npm run dev
```

Puis accéder à : http://localhost:3000/demo-sections

## Design System

### Couleurs utilisées

- Violet principal : `#8B5CF6` (var `--primary`)
- Gris foncé : `#1F2937` (var `--neutral-dark`)
- Gris clair : `#F3F4F6` (var `--neutral-light`)
- Blanc : `#FFFFFF`

### Effets

**Glassmorphism (Compétences) :**
- `backdrop-blur-md` : Flou d'arrière-plan
- `bg-white/40` : Fond blanc semi-transparent
- `border-white/20` : Bordure blanche subtile

**Hover animations :**
- Élévation : `-translate-y-2`
- Ombre : `shadow-lg` → `shadow-2xl`
- Transitions : `duration-300`

## TypeScript

Tous les composants sont typés avec TypeScript strict :
- Types d'interface pour les données
- Props typées avec `React.FC`
- Types explicites pour les tableaux

## Responsive

Les sections utilisent une approche mobile-first :
- Base : 1 colonne (mobile)
- `md:` : 2 colonnes (tablette)
- `lg:` : 3 colonnes (desktop)

## Accessibilité

- Utilisation de balises sémantiques (`<section>`)
- IDs pour la navigation par ancre
- Contraste de couleurs respecté
- Hover states visibles
