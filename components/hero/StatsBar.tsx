"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * Stats Bar - Brutalist Abidjan
 *
 * Grille responsive avec animations de compteur kinétique
 * Style brutalist : bordures épaisses, pas d'arrondis
 * Animations progressives avec useInView
 */

interface StatCardProps {
  value: string;
  label: string;
  delay: number;
}

function StatCard({ value, label, delay }: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  // Animation de compteur
  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseInt(value.replace(/\D/g, ''));
    const hasPlus = value.includes('+');
    const duration = 2000; // 2 secondes
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(`${numericValue}${hasPlus ? '+' : ''}`);
        clearInterval(timer);
      } else {
        setDisplayValue(`${Math.floor(current)}${hasPlus ? '+' : ''}`);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="relative border-4 border-shadow bg-concrete px-6 py-8 lg:px-8 lg:py-10"
    >
      {/* Valeur - Terracotta accent */}
      <div className="mb-3">
        <span className="font-mono text-[clamp(2.5rem,5vw,4rem)] font-black leading-none text-terracotta">
          {displayValue}
        </span>
      </div>

      {/* Label */}
      <div className="font-sans text-sm font-bold uppercase tracking-wide text-shadow lg:text-base">
        {label}
      </div>

      {/* Diagonal Slash Accent - Bottom Right */}
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: '40px' } : { width: 0 }}
        transition={{
          duration: 0.6,
          delay: delay + 0.4,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="absolute bottom-0 right-0 h-1.5 bg-terracotta"
        style={{ transform: 'skewX(-45deg)', transformOrigin: 'right' }}
      />
    </motion.div>
  );
}

export default function StatsBar() {
  const stats = [
    { value: "12+", label: "PROJETS LIVRÉS" },
    { value: "8+", label: "CLIENTS SATISFAITS" },
    { value: "3", label: "ANNÉES D'EXPÉRIENCE" },
    { value: "100%", label: "FREELANCE" }
  ];

  return (
    <section className="relative w-full bg-concrete px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Grille responsive : 1 col mobile, 2 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
