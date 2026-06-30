"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code } from "lucide-react";
import { StatsBar, TechStackCarousel, ScrollIndicator } from "@/components/hero";
import { useSiteContent } from "@/lib/site-content/context";

/**
 * Hero Section - Abidjan Kinetic Aesthetic
 *
 * Brutalist typography with kinetic letter animation
 * Terracotta accent slashes, NO rounded corners
 * Heavy, weighted animations with custom easing
 */
export default function HeroSection() {
  const { content } = useSiteContent();
  const letters = content.hero.name.split("");

  return (
    <section className="relative flex min-h-screen w-full items-start justify-center overflow-hidden bg-concrete px-6 py-32 lg:px-8">
      {/* Contenu principal */}
      <div className="relative z-10 mx-auto max-w-7xl w-full">

        {/* Badge minimal - Lucide Icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 border-2 border-shadow bg-concrete px-4 py-2 font-mono text-xs font-medium text-shadow">
            <Code className="w-4 h-4" strokeWidth={2.5} />
            {content.hero.badge}
          </span>
        </motion.div>

        {/* Hero Name - Kinetic Letter Animation */}
        <div className="mb-8">
          <h1 className="font-serif text-[clamp(4rem,12vw,9rem)] font-black leading-[0.9] tracking-tight text-shadow">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="inline-block"
              >
                {letter === ' ' ? ' ' : letter}
              </motion.span>
            ))}
          </h1>

          {/* Diagonal Slash Accent */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '40%' }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="h-3 bg-terracotta mt-4"
            style={{ transform: 'skewX(-45deg)' }}
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl font-sans text-xl text-dust mb-16 leading-relaxed"
        >
          {content.hero.subtitle}{" "}
          <strong className="text-shadow font-medium">{content.hero.subtitleBold}</strong>.{" "}
          {content.hero.description}
        </motion.p>

        {/* CTAs - Brutalist Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-6"
        >
          {/* Primary CTA */}
          <Link
            href="#projects"
            className="group relative overflow-hidden border-4 border-shadow bg-terracotta px-10 py-5 font-sans text-base font-bold text-concrete transition-all duration-500 hover:bg-rust shadow-brutal hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1"
          >
            <span className="relative z-10">{content.hero.ctaProjects}</span>
          </Link>

          {/* Secondary CTA */}
          <Link
            href="#contact"
            className="group border-4 border-shadow bg-concrete px-10 py-5 font-sans text-base font-bold text-shadow transition-all duration-500 hover:bg-shadow hover:text-concrete"
          >
            {content.hero.ctaContact}
          </Link>
        </motion.div>

        {/* StatsBar - Metrics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3"
        >
          <StatsBar />
        </motion.div>

        {/* TechStackCarousel - Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className=""
        >
          <TechStackCarousel />
        </motion.div>

        {/* Status Badge - Bottom Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-19 left-6 lg:left-8"
        >
          <div className="flex items-center gap-3 border-2 border-forest bg-concrete px-4 font-mono text-xs">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping bg-forest opacity-75" />
              <span className="relative inline-flex h-3 w-3 bg-forest" />
            </span>
            <span className="text-shadow font-medium">{content.hero.status}</span>
          </div>
        </motion.div>

        {/* Large Geometric Element - Top Right */}
        <motion.div
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-20 right-8 hidden lg:block"
        >
          <div className="relative w-64 h-64">
            {/* Overlapping Brutalist Squares */}
            <div className="absolute top-0 left-0 w-48 h-48 border-4 border-shadow" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-clay opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gold-thread opacity-30"
                 style={{ transform: 'translate(-50%, -50%) rotate(45deg)' }} />
          </div>
        </motion.div>
      </div>

      {/* ScrollIndicator - Fixed Bottom */}
      <ScrollIndicator />
    </section>
  );
}
