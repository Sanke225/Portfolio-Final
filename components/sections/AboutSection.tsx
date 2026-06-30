"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSiteContent } from "@/lib/site-content/context";
import DiagonalSlash from "../DiagonalSlash";

/** About Section - Brutalist Split Layout */

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { content } = useSiteContent();
  const about = content.about;
  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full bg-shadow px-6 py-32 lg:px-8"
    >
      <DiagonalSlash className="mb-20" thickness={4} />

      {/* Brutalist Two-Column Split */}
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-[300px_1fr] gap-16 items-start">

          {/* Left: Rotated "ABOUT" */}
          <motion.div
            initial={{ opacity: 0, rotate: 90 }}
            animate={isInView ? { opacity: 1, rotate: 90 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <div className="sticky top-32">
              <h2 className="font-serif text-[180px] font-black text-dust/20 whitespace-nowrap origin-top-left"
                  style={{ writingMode: 'vertical-rl' }}>
                ABOUT
              </h2>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="space-y-12">

            {/* Section Number */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="font-mono text-sm text-dust">{about.sectionNumber}</span>
              <div className="h-px flex-1 bg-dust/30" />
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <h3 className="font-serif text-5xl font-black text-concrete mb-6">
                {about.title}
              </h3>
              <p className="font-sans text-lg text-dust leading-relaxed">
                {about.subtitle}
              </p>
            </motion.div>

            {/* Narrative Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 mb-12"
            >
              <p className="text-concrete/90 leading-relaxed">
                {about.paragraphs.intro}{" "}
                <strong className="text-terracotta font-medium">{about.paragraphs.introBold}</strong>.{" "}
                {about.paragraphs.introEnd}
              </p>
              <p className="text-concrete/80 leading-relaxed">
                {about.paragraphs.training}
              </p>
            </motion.div>

            {/* Stats - Brutalist Boxes */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 mb-12"
            >
              <div className="border-4 border-concrete bg-shadow p-4 text-center">
                <div className="font-mono text-3xl font-bold text-terracotta mb-1">{about.statsBoxes.codeYears}</div>
                <div className="font-mono text-xs text-dust">{about.statsBoxes.codeLabel}</div>
              </div>
              <div className="border-4 border-concrete bg-shadow p-4 text-center">
                <div className="font-mono text-3xl font-bold text-clay mb-1">{about.statsBoxes.projects}</div>
                <div className="font-mono text-xs text-dust">{about.statsBoxes.projectsLabel}</div>
              </div>
              <div className="border-4 border-forest bg-shadow p-4 text-center">
                <div className="font-mono text-3xl font-bold text-forest mb-1">{about.statsBoxes.skills}</div>
                <div className="font-mono text-xs text-dust">{about.statsBoxes.skillsLabel}</div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6"
            >
              {about.timeline.map((entry, index) => (
                <div
                  key={`${entry.year}-${index}`}
                  className={`border-l-4 ${
                    index % 4 === 0
                      ? "border-terracotta"
                      : index % 4 === 1
                        ? "border-clay"
                        : index % 4 === 2
                          ? "border-forest"
                          : "border-terracotta"
                  } pl-6 py-4`}
                >
                  <div className="font-mono text-xs text-gold-thread mb-2">{entry.year}</div>
                  <div className="font-sans text-lg font-bold text-concrete mb-1">{entry.title}</div>
                  <div className="text-sm text-dust">{entry.description}</div>
                </div>
              ))}
            </motion.div>

            {/* Tech Stack Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-3 pt-8 border-t-2 border-dust/20"
            >
              {about.techStack.map((tech, i) => (
                <span key={i} className="border-2 border-concrete bg-shadow px-3 py-1 font-mono text-xs text-concrete">
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
