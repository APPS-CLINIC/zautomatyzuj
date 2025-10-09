/**
 * TestimonialCard - Testimonial card with glassmorphism and quotation marks
 */

import { motion } from 'framer-motion';

interface TestimonialCardProps {
  quote: string;
  author: string;
  position: string;
  company: string;
  initials: string;
  index?: number;
}

export default function TestimonialCard({ 
  quote, 
  author, 
  position, 
  company, 
  initials,
  index = 0 
}: TestimonialCardProps) {
  return (
    <motion.div
      className="relative rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-violet-400/40"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.15,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {/* Quotation mark */}
      <div className="absolute top-6 left-6 text-6xl text-indigo-400/20 font-serif leading-none">
        "
      </div>

      {/* Quote */}
      <div className="relative z-10 mb-6 pt-8">
        <p className="text-slate-200 text-base leading-relaxed italic">
          {quote}
        </p>
      </div>

      {/* Author info */}
      <div className="relative z-10 flex items-center gap-4">
        {/* Avatar with initials */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-semibold text-sm">
          {initials}
        </div>

        {/* Name and position */}
        <div>
          <div className="font-semibold text-white text-sm">
            {author}
          </div>
          <div className="text-xs text-slate-400">
            {position}, {company}
          </div>
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/0 to-violet-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10 pointer-events-none" />
    </motion.div>
  );
}

