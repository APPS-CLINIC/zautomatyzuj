/**
 * MetricCard - Metric card with counter animation
 */

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface MetricCardProps {
  value: string;
  label: string;
  description: string;
  index?: number;
}

export default function MetricCard({ value, label, description, index = 0 }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="text-center px-6 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        delay: index * 0.15,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {/* Value with gradient */}
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
        {value}
      </div>

      {/* Label */}
      <div className="text-base md:text-lg font-semibold text-white mb-1">
        {label}
      </div>

      {/* Description */}
      <div className="text-sm text-slate-400">
        {description}
      </div>
    </motion.div>
  );
}

