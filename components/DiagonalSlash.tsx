'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface DiagonalSlashProps {
  className?: string;
  thickness?: number;
}

/**
 * Diagonal Slash Divider - Signature visual element
 * Animated diagonal line that draws on scroll
 */
export default function DiagonalSlash({ className = '', thickness = 4 }: DiagonalSlashProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${className}`} style={{ height: thickness }}>
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: '100%' } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="h-full bg-terracotta origin-left"
        style={{ transform: 'skewX(-45deg)' }}
      />
    </div>
  );
}
