/**
 * WhyUs Section - 4 key differentiators with 3D tilt effects
 */

import { motion } from 'framer-motion';
import SectionContainer from '../ui/SectionContainer';
import IconPlaceholder from '../ui/IconPlaceholder';
import { useState } from 'react';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface WhyUsProps {
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
  ctaText: string;
  ctaDescription: string;
}

export default function WhyUs({
  title,
  subtitle,
  description,
  features,
  ctaText,
  ctaDescription
}: WhyUsProps) {
  return (
    <SectionContainer id="why-us">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span dangerouslySetInnerHTML={{ __html: title }} />
            </h2>
            <p className="text-xl text-slate-300 mb-4">
              {subtitle}
            </p>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              {description}
            </p>

            {/* CTA */}
            <motion.button
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold text-lg overflow-hidden shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            onClick={() => {
              const event = new CustomEvent('openCommandPalette', {
                detail: { 
                  source: 'button',
                  preFilledContent: { action: 'contact' }
                }
              });
              document.dispatchEvent(event);
              // Track button click
              if (typeof window !== 'undefined' && (window as any).trackEvent) {
                (window as any).trackEvent('why_us_cta_clicked', {
                  location: 'why_us_section',
                  action: 'contact',
                });
              } else if (typeof window !== 'undefined' && (window as any).posthog) {
                (window as any).posthog.capture('why_us_cta_clicked', {
                  location: 'why_us_section',
                  action: 'contact',
                });
              }
            }}
          >
              <span className="relative z-10 flex items-center gap-2">
                {ctaText}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
            <p className="mt-3 text-sm text-slate-400">
              {ctaDescription}
            </p>
          </motion.div>

          {/* Right: 2x2 Grid of feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

// Feature card with 3D tilt effect
function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className="group relative rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:border-indigo-400/40"
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/0 via-violet-500/0 to-fuchsia-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-30 pointer-events-none blur-xl" />

        {/* Icon */}
        <div
          className="relative mb-4 inline-flex w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform duration-300"
          style={{
            transform: 'translateZ(30px)',
          }}
        >
          <IconPlaceholder name={feature.icon} className="w-6 h-6" />
        </div>

        {/* Content */}
        <h3
          className="relative text-xl font-bold text-white mb-3 group-hover:text-indigo-100 transition-colors"
          style={{
            transform: 'translateZ(20px)',
          }}
        >
          {feature.title}
        </h3>
        <p
          className="relative text-sm text-slate-300 leading-relaxed"
          style={{
            transform: 'translateZ(10px)',
          }}
        >
          {feature.description}
        </p>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </div>
      </motion.div>
    </motion.div>
  );
}
