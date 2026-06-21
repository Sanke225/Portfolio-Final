# Portfolio - Cheick Issa San Kara

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**Développeur Fullstack | Designer Créatif | Côte d'Ivoire**

---

## 🎯 À propos

Portfolio personnel de **Cheick Issa San Kara**, développeur fullstack junior et designer créatif basé à Abidjan, Côte d'Ivoire. Ce site présente mes compétences, projets et services en développement web moderne, automatisation et intelligence artificielle.

Passionné par la création d'expériences digitales innovantes, je combine expertise technique et sensibilité design pour transformer des idées en solutions concrètes et performantes.

---

## ✨ Fonctionnalités

- **Hero Section moderne** : Introduction captivante avec animations fluides et badge dynamique
- **Section À propos** : Timeline interactive présentant mon parcours et mes valeurs
- **Compétences techniques** : 
  - Frontend (Next.js, React, TypeScript, Tailwind CSS)
  - Backend (Node.js, Firebase, API RESTful)
  - Intelligence Artificielle (Automatisation n8n, Intégrations IA)
- **Projets** : Galerie de projets avec descriptions et technologies utilisées
- **Services** : Présentation des prestations proposées
- **Formulaire de contact** : Communication directe (à venir)
- **Design responsive** : Mobile-first, optimisé pour tous les écrans
- **Animations Framer Motion** : Micro-interactions et transitions élégantes
- **SEO optimisé** : Metadata complètes, sitemap.xml, robots.txt
- **Performance optimale** : Score Lighthouse élevé, images optimisées

---

## 🛠️ Technologies utilisées

### Frontend
- **[Next.js 16.2](https://nextjs.org/)** - Framework React avec App Router
- **[React 19.2](https://react.dev/)** - Bibliothèque UI avec composants modernes
- **[TypeScript 5.x](https://www.typescriptlang.org/)** - Typage statique pour plus de robustesse
- **[Tailwind CSS 4.x](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Framer Motion 12.40](https://www.framer.com/motion/)** - Animations et micro-interactions

### Backend (à venir)
- **Node.js** - Runtime JavaScript
- **Firebase** - Backend as a Service (authentification, Firestore, Storage)

### Outils de développement
- **ESLint** - Linting et qualité de code
- **Prettier** - Formatage automatique
- **Git** - Contrôle de version

---

## 📦 Installation

### Prérequis
- Node.js 20.x ou supérieur
- npm, yarn, pnpm ou bun

### Étapes d'installation

```bash
# Cloner le repository
git clone https://github.com/Sanke225/portfolio.git
cd portfolio-issa

# Installer les dépendances
npm install
# ou
yarn install
# ou
pnpm install

# Configurer les variables d'environnement (optionnel)
cp .env.example .env.local
# Éditer .env.local avec vos valeurs

# Lancer le serveur de développement
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

### Scripts disponibles

```bash
npm run dev      # Lancer en mode développement (port 3000)
npm run build    # Build de production
npm start        # Démarrer le serveur de production
npm run lint     # Vérifier le code avec ESLint
```

---

## 🚀 Déploiement

### Déploiement sur Vercel (Recommandé)

Le moyen le plus simple de déployer ce portfolio est d'utiliser la [plateforme Vercel](https://vercel.com/new), créée par les auteurs de Next.js.

1. **Connectez votre repository GitHub à Vercel**
2. **Configurez les variables d'environnement** (si nécessaire)
3. **Déployez** - Vercel détecte automatiquement Next.js et configure le build

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Sanke225/portfolio)

### Autres plateformes

Ce projet peut également être déployé sur :
- **Netlify**
- **Railway**
- **Render**
- **DigitalOcean App Platform**

Consultez la [documentation Next.js sur le déploiement](https://nextjs.org/docs/app/building-your-application/deploying) pour plus de détails.

---

## 📁 Structure du projet

```
portfolio-issa/
├── app/
│   ├── layout.tsx              # Layout racine avec metadata SEO
│   ├── page.tsx                # Page d'accueil (sections)
│   ├── globals.css             # Styles globaux et variables CSS
│   ├── sitemap.ts              # Génération automatique du sitemap
│   └── favicon.ico             # Icône du site
│
├── components/
│   ├── Header.tsx              # En-tête de navigation
│   ├── Footer.tsx              # Pied de page
│   ├── sections/
│   │   ├── HeroSection.tsx     # Section hero avec animations
│   │   ├── AboutSection.tsx    # Section à propos avec timeline
│   │   ├── SkillsSection.tsx   # Compétences techniques
│   │   ├── ProjectsSection.tsx # Galerie de projets
│   │   ├── ServicesSection.tsx # Services proposés
│   │   └── ContactSection.tsx  # Formulaire de contact (à venir)
│   └── animations/             # Composants d'animations réutilisables
│
├── public/
│   ├── robots.txt              # Configuration robots SEO
│   ├── og-image.jpg            # Image Open Graph (à créer)
│   └── *.svg                   # Icônes et illustrations
│
├── .env.example                # Template variables d'environnement
├── package.json                # Dépendances et scripts
├── tailwind.config.ts          # Configuration Tailwind CSS
├── tsconfig.json               # Configuration TypeScript
└── README.md                   # Documentation (ce fichier)
```

---

## 🎨 Design System

### Palette de couleurs

```css
/* Couleurs principales */
--primary: #FF6B35;          /* Orange vibrant */
--primary-dark: #E55A2B;     /* Orange foncé */
--primary-light: #FFB4A2;    /* Orange clair */

/* Couleurs d'accent */
--accent-orange: #F97316;    /* Orange accent */
--accent-green: #22C55E;     /* Vert succès */
--accent-purple: #A855F7;    /* Violet créatif */

/* Couleurs neutres */
--neutral-dark: #1E293B;     /* Texte principal */
--neutral-medium: #64748B;   /* Texte secondaire */
--neutral-light: #F1F5F9;    /* Backgrounds clairs */
```

### Typographie

- **Police principale** : [Inter](https://fonts.google.com/specimen/Inter) (400, 500, 700, 800)
- **Police monospace** : [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (pour le code)

### Conventions de design

- **Mobile-first** : Design pensé d'abord pour mobile, puis desktop
- **Spacing** : Échelle basée sur Tailwind (4px, 8px, 16px, 24px, 32px...)
- **Animations** : Subtiles et significatives (Framer Motion)
- **Accessibilité** : Contrastes WCAG AA, navigation clavier, ARIA labels

---

## 🔧 Personnalisation

### Modifier les informations personnelles

1. **Metadata SEO** : `app/layout.tsx`
2. **Contenu des sections** : `components/sections/*.tsx`
3. **Styles globaux** : `app/globals.css`
4. **Couleurs** : `tailwind.config.ts`

### Ajouter une nouvelle section

```tsx
// components/sections/MaSection.tsx
"use client";

export default function MaSection() {
  return (
    <section id="ma-section" className="py-20">
      {/* Votre contenu */}
    </section>
  );
}
```

Puis importer dans `app/page.tsx`.

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Si vous souhaitez améliorer ce portfolio :

1. Fork le projet
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements (`git commit -m 'Ajout d'une amélioration'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

---

## 📧 Contact

**Cheick Issa San Kara**

- **Email** : [admin@syntarasoft.net](mailto:admin@syntarasoft.net)
- **LinkedIn** : [linkedin.com/in/cheick-issa-san-kara](https://www.linkedin.com/in/cheick-issa-san-kara)
- **GitHub** : [github.com/Sanke225](https://github.com/Sanke225)
- **Localisation** : Abidjan, Côte d'Ivoire 🇨🇮

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

Vous êtes libre de :
- ✅ Utiliser ce code pour vos projets personnels
- ✅ Modifier et adapter le code
- ✅ Distribuer des copies
- ⚠️ Mentionner l'auteur original (apprécié mais non obligatoire)

---

## 🙏 Remerciements

- **[Next.js](https://nextjs.org/)** - Framework incroyable
- **[Vercel](https://vercel.com/)** - Hébergement et déploiement
- **[Tailwind CSS](https://tailwindcss.com/)** - Design utility-first
- **[Framer Motion](https://www.framer.com/motion/)** - Animations fluides
- Inspiration design de la communauté Dribbble et Behance

---

## 🇨🇮 Made with ❤️ in Côte d'Ivoire

Portfolio conçu et développé avec passion à Abidjan, Côte d'Ivoire.

**Version** : 0.1.0  
**Dernière mise à jour** : Juin 2026

---

### 📊 Statistiques du projet

- **Composants** : 11+
- **Sections** : 6 (Hero, À propos, Compétences, Projets, Services, Contact)
- **Technologies** : 5+ (Next.js, React, TypeScript, Tailwind, Framer Motion)
- **Performance** : Optimisé pour Lighthouse 90+

---

**⭐ Si ce projet vous plaît, n'hésitez pas à le star sur GitHub !**
