/**
 * FeatureCard - Reusable feature card with glassmorphism
 */

import { motion } from 'framer-motion';
import IconPlaceholder from './IconPlaceholder';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  index?: number;
}

export default function FeatureCard({ title, description, icon, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      className="group relative rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-yellow-400/40 hover:-translate-y-1"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/0 to-amber-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-20 pointer-events-none" />
      
      {/* Icon */}
      <div className="relative mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-amber-500/20 text-yellow-400 group-hover:text-yellow-300 transition-colors">
        <IconPlaceholder name={icon} className="w-6 h-6" />
      </div>

      {/* Content */}
      <h3 className="relative text-lg font-semibold text-white mb-2 group-hover:text-yellow-100 transition-colors">
        {title}
      </h3>
      <p className="relative text-sm text-slate-300 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

