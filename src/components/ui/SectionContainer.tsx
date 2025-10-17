/**
 * SectionContainer - Wrapper component with scroll-reveal animations
 */

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as any,
    }
  },
};

export default function SectionContainer({ 
  children, 
  className = '', 
  id,
  delay = 0 
}: SectionContainerProps) {
  return (
    <motion.section
      id={id}
      className={`relative py-16 md:py-24 lg:py-32 overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUp}
      transition={{ delay }}
    >
      {children}
    </motion.section>
  );
}

