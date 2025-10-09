/**
 * BizbeesProduct Section - Main product showcase with bee colors and email signup
 */

import { motion } from 'framer-motion';
import SectionContainer from '../ui/SectionContainer';
import FeatureCard from '../ui/FeatureCard';
import AnimatedBizbeesLogo from '../ui/AnimatedBizbeesLogo';
import FlyingBees from '../ui/FlyingBees';
import { useState } from 'react';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface Philosophy {
  title: string;
  subtitle: string;
  principles: string[];
}

interface BizbeesProductProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  philosophy: Philosophy;
  features: Feature[];
  cta: {
    primary: string;
    secondary: string;
  };
  mockupAlt: string;
  emailPlaceholder: string;
  emailDisclaimer: string;
}

export default function BizbeesProduct({
  badge,
  title,
  subtitle,
  description,
  philosophy,
  features,
  cta,
  mockupAlt,
  emailPlaceholder,
  emailDisclaimer
}: BizbeesProductProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <SectionContainer id="bizbees-product" className="relative">
      {/* Flying bees background */}
      <FlyingBees count={10} />
      
      {/* Bee-themed glow background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-yellow-400/15 via-amber-500/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Badge with bee colors */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/10 to-amber-500/10 border border-yellow-400/30 text-yellow-400 text-sm font-semibold uppercase tracking-wider">
            {badge}
          </span>
        </motion.div>

        {/* Header with animated bee logo */}
        <motion.div
          className="text-center mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 flex items-center justify-center gap-8">
            {/* Animated Bee Logo - smaller, inline with title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <AnimatedBizbeesLogo size="lg" />
            </motion.div>
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-200 mb-4">
            {subtitle}
          </p>
          <p className="text-lg text-slate-300">
            {description}
          </p>
        </motion.div>

        {/* Philosophy Section */}
        <motion.div
          className="text-center mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400">
            {philosophy.title}
          </h3>
          <p className="text-lg md:text-xl text-slate-200 mb-6 italic">
            {philosophy.subtitle}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {philosophy.principles.map((principle, index) => (
              <motion.div
                key={index}
                className="px-4 py-2 rounded-lg bg-yellow-400/10 border border-yellow-400/20 text-slate-200 text-sm md:text-base"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                {principle}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>

        {/* CTA Section with Email Signup */}
        <motion.div
          className="max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Email Signup Form */}
          <div className="mb-8">
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={emailPlaceholder}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 backdrop-blur-sm"
                  required
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="absolute right-2 top-2 bottom-2 px-6 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:from-yellow-300 hover:to-amber-400"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
                  ) : isSubmitted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    'Zapisz się'
                  )}
                </motion.button>
              </div>
              <p className="text-center text-sm text-slate-400">
                {emailDisclaimer}
              </p>
            </form>
          </div>

          {/* Demo Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-semibold text-lg overflow-hidden shadow-lg shadow-yellow-400/30 hover:shadow-xl hover:shadow-yellow-400/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {cta.primary}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Mockup placeholder with bee colors */}
        <motion.div
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Bee-themed blur backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-3xl blur-3xl -z-10" />
          
          {/* Modern Mockup container */}
          <div className="relative rounded-2xl bg-slate-900/30 border border-white/5 backdrop-blur-xl overflow-hidden shadow-xl">
            {/* Modern Browser chrome - thinner */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-slate-900/40">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              </div>
              <div className="flex-1 mx-3">
                <div className="h-5 bg-slate-800/30 rounded-md max-w-sm border border-white/5" />
              </div>
            </div>

            {/* Transparent content area */}
            <div className="aspect-[16/10] p-6 bg-transparent">
              <div className="h-full rounded-lg border border-white/5 bg-slate-900/20 flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                  }} />
                </div>

                {/* Center bee icon */}
                <div className="relative">
                  <motion.div
                    className="w-20 h-20 rounded-xl bg-gradient-to-br from-yellow-400/25 to-amber-500/25 flex items-center justify-center backdrop-blur-sm border border-yellow-400/15 shadow-lg"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.div>
                  <div className="mt-4 text-center">
                    <p className="text-slate-300 text-sm font-medium">
                      {mockupAlt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}

