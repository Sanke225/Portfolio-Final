'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FadeIn, StaggerContainer, ScaleOnHover } from '@/components/animations';
import { useSiteContent } from '@/lib/site-content/context';
import type { ProjectItem } from '@/lib/site-content/types';

/**
 * Composant ProjectCard - Carte individuelle de projet
 */
function ProjectCard({ project }: { project: ProjectItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ScaleOnHover>
      <article
        className="group relative bg-white rounded-xl border border-neutral-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/30"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Image du projet avec overlay au hover */}
      <div className="relative w-full aspect-video overflow-hidden bg-neutral-light">
        {/* Placeholder avec gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.image.gradient} opacity-20`} />

        {/* Image avec zoom au hover */}
        <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Overlay violet semi-transparent au hover */}
        <div
          className={`absolute inset-0 bg-primary/40 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Boutons d'action apparaissant au hover */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {project.inDevelopment ? (
            <button
              disabled
              className="px-5 py-2.5 bg-neutral-medium/80 text-white rounded-lg font-medium text-sm cursor-not-allowed backdrop-blur-sm"
              aria-label="Projet en développement"
            >
              Bientôt disponible
            </button>
          ) : (
            <a
              href={project.links.demo || project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white text-primary hover:bg-primary hover:text-white rounded-lg font-medium text-sm transition-colors duration-200 backdrop-blur-sm shadow-lg"
              aria-label={`Voir le code source de ${project.title}`}
            >
              Code source
            </a>
          )}

          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-neutral-dark/90 text-white hover:bg-neutral-dark rounded-lg font-medium text-sm transition-colors duration-200 backdrop-blur-sm shadow-lg"
            aria-label={`Voir le GitHub de ${project.title}`}
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Contenu de la carte */}
      <div className="p-6">
        {/* Titre du projet */}
        <h3 className="text-xl font-bold text-neutral-dark mb-3 group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-neutral-medium text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tags technologiques */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary-light/10 text-primary text-xs font-medium rounded-full border border-primary-light/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      </article>
    </ScaleOnHover>
  );
}

/**
 * Composant principal ProjectsSection
 * Section présentant tous les projets du portfolio
 */
export default function ProjectsSection() {
  const { content } = useSiteContent();
  const projects = content.projects.items;

  return (
    <section
      id="projects"
      className="py-20 px-4 bg-neutral-light/30"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* En-tête de la section */}
        <FadeIn delay={0} direction="up">
          <div className="text-center mb-16">
            <h2
              id="projects-heading"
              className="text-4xl md:text-5xl font-bold text-neutral-dark mb-4"
            >
              {content.projects.title} <span className="text-primary">{content.projects.titleAccent}</span>
            </h2>
            <p className="text-neutral-medium text-lg max-w-2xl mx-auto">
              {content.projects.subtitle}
            </p>
          </div>
        </FadeIn>

        {/* Grille de projets - 2 colonnes desktop, 1 colonne mobile */}
        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
