/**
 * BizbeesProduct Section - Modern product showcase with bee colors
 * Enhanced with latest design trends: Bento Grid, Glassmorphism, 3D transforms
 */

import { motion } from 'framer-motion';
import SectionContainer from '../ui/SectionContainer';
import AnimatedBizbeesLogo from '../ui/AnimatedBizbeesLogo';
import FlyingBees from '../ui/FlyingBees';
import { useState, type ReactElement } from 'react';

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

  // Icon mapping for features
  const iconMap: Record<string, ReactElement> = {
    mail: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    calendar: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    document: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    concierge: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    meeting: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    finance: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <SectionContainer id="bizbees-product" className="relative overflow-hidden">
      {/* Flying bees background */}
      <FlyingBees count={12} />
      
      {/* Enhanced gradient background with mesh effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-yellow-400/20 via-amber-500/15 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-radial from-amber-500/15 via-yellow-600/10 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Enhanced Badge with glassmorphism */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-yellow-400/30 text-yellow-400 text-sm font-bold uppercase tracking-wider shadow-lg shadow-yellow-400/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
            </span>
            {badge}
          </span>
        </motion.div>

        {/* Enhanced Header with better typography */}
        <motion.div
          className="text-center mb-20 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center justify-center gap-12 md:gap-16 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              <AnimatedBizbeesLogo size="lg" />
            </motion.div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter">
              <motion.span 
                className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                {title}
              </motion.span>
            </h2>
          </div>
          <p className="text-2xl md:text-3xl text-slate-100 mb-6 font-medium leading-relaxed">
            {subtitle}
          </p>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Philosophy Section with glassmorphism */}
        <motion.div
          className="mb-20 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-amber-500/5 rounded-3xl" />
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
                {philosophy.title}
              </h3>
              <p className="text-xl md:text-2xl text-slate-200 mb-8 text-center italic font-light">
                „{philosophy.subtitle}"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {philosophy.principles.map((principle, index) => (
                  <motion.div
                    key={index}
                    className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 hover:bg-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <p className="relative text-slate-100 text-center font-medium">
                      {principle}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid Layout for Features */}
        <div className="mb-20">
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Twój cyfrowy rój w akcji
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`group relative p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-400/10 ${
                  index === 0 ? 'md:col-span-2' : ''
                } ${index === features.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-amber-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative" style={{ transform: 'translateZ(20px)' }}>
                  {/* Icon with enhanced styling */}
                  <motion.div
                    className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-amber-500/10 border border-yellow-400/20 text-yellow-400 mb-6 shadow-lg"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {iconMap[feature.icon] || iconMap.mail}
                  </motion.div>
                  
                  <h4 className="text-xl md:text-2xl font-bold text-slate-100 mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          className="max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-amber-500/5 rounded-3xl" />
            
            <div className="relative">
              {/* Email Signup Form */}
              <form onSubmit={handleEmailSubmit} className="mb-8">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={emailPlaceholder}
                    className="w-full px-8 py-5 pr-40 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-yellow-400/30 focus:border-yellow-400/50 transition-all duration-300 text-lg"
                    required
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="absolute right-2 top-2 bottom-2 px-8 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:from-yellow-300 hover:to-amber-400 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
                    ) : isSubmitted ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      'Zapisz się'
                    )}
                  </motion.button>
                </div>
                <p className="mt-4 text-center text-sm text-slate-400">
                  {emailDisclaimer}
                </p>
              </form>

              {/* Enhanced Demo Button */}
              <motion.button
                className="group relative w-full px-10 py-6 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-bold text-xl overflow-hidden shadow-2xl shadow-yellow-400/30 hover:shadow-yellow-400/50 transition-all duration-500"
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {cta.primary}
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Mockup with modern design */}
        <motion.div
          className="relative max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 via-amber-500/20 to-yellow-600/30 rounded-3xl blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
          
          {/* Modern glass container */}
          <div className="relative rounded-3xl bg-slate-900/40 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Enhanced browser chrome */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-slate-900/60 to-slate-800/60 backdrop-blur-xl">
              <div className="flex gap-2.5">
                <motion.div 
                  className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-red-400 to-red-500 shadow-lg"
                  whileHover={{ scale: 1.2 }}
                />
                <motion.div 
                  className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg"
                  whileHover={{ scale: 1.2 }}
                />
                <motion.div 
                  className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-green-400 to-green-500 shadow-lg"
                  whileHover={{ scale: 1.2 }}
                />
              </div>
              <div className="flex-1 mx-6">
                <div className="flex items-center gap-3 h-8 px-4 bg-slate-800/50 backdrop-blur-sm rounded-lg max-w-md border border-white/10">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-sm text-slate-400">bizbees.ai</span>
                </div>
              </div>
            </div>

            {/* Enhanced content area */}
            <div className="aspect-[16/10] p-8 bg-gradient-to-br from-slate-900/30 to-slate-800/30">
              <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/40 to-transparent backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
                {/* Animated grid pattern */}
                <motion.div 
                  className="absolute inset-0 opacity-10"
                  animate={{
                    backgroundPosition: ['0px 0px', '60px 60px'],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.3) 2px, transparent 2px), linear-gradient(90deg, rgba(251, 191, 36, 0.3) 2px, transparent 2px)`,
                    backgroundSize: '60px 60px'
                  }}
                />

                {/* Enhanced center content */}
                <div className="relative z-10">
                  <motion.div
                    className="w-32 h-32 rounded-3xl bg-gradient-to-br from-yellow-400/30 to-amber-500/30 backdrop-blur-xl flex items-center justify-center border-2 border-yellow-400/30 shadow-2xl"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0],
                      borderColor: ['rgba(251, 191, 36, 0.3)', 'rgba(251, 191, 36, 0.5)', 'rgba(251, 191, 36, 0.3)'],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <AnimatedBizbeesLogo size="md" />
                  </motion.div>
                  <motion.div 
                    className="mt-6 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-slate-300 text-lg font-semibold mb-2">
                      {mockupAlt}
                    </p>
                    <p className="text-slate-400 text-sm">
                      Wkrótce dostępne
                    </p>
                  </motion.div>
                </div>

                {/* Floating particles effect */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-yellow-400/40"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + i * 10}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
