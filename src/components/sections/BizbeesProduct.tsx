/**
 * BizbeesProduct Section - Modern product showcase with bee colors
 * Enhanced with latest design trends: Bento Grid, Glassmorphism, 3D transforms
 */

import { motion, AnimatePresence } from 'framer-motion';
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
  featuresTitle: string;
  cta: {
    primary: string;
    secondary: string;
  };
  mockupAlt: string;
  emailPlaceholder: string;
  emailDisclaimer: string;
  subscribeButton: string;
  clickToWatchDemo: string;
  videoNotSupported: string;
  videoDescription: string;
  videoTitle: string;
  videoSubtitle: string;
}

export default function BizbeesProduct({
  badge,
  title,
  subtitle,
  description,
  philosophy,
  features,
  featuresTitle,
  cta,
  mockupAlt,
  emailPlaceholder,
  emailDisclaimer,
  subscribeButton,
  clickToWatchDemo,
  videoNotSupported,
  videoDescription,
  videoTitle,
  videoSubtitle
}: BizbeesProductProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      // Wyślij email do webhooka Make.com
      await fetch('https://hook.eu2.make.com/qyj3xxarva1dpvw11zf7x84u6m5t381g', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          source: 'zautomatyzuj',
          wiadomosc: 'subskrypcja newslettera'
        })
      });
    } catch (error) {
      console.error('Error sending email to webhook:', error);
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
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
            {featuresTitle}
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

        {/* Enhanced Demo Button */}
        <motion.div
          className="max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            className="group relative w-full px-10 py-6 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-bold text-xl overflow-hidden shadow-2xl shadow-yellow-400/30 hover:shadow-yellow-400/50 transition-all duration-500"
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const event = new CustomEvent('openCommandPalette', {
                detail: { 
                  source: 'button',
                  preFilledContent: { action: 'demo' }
                }
              });
              document.dispatchEvent(event);
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {cta.primary}
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.button>
        </motion.div>

        {/* Video Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {videoTitle}
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {videoSubtitle}
          </p>
        </motion.div>

        {/* Enhanced Video Section with modern design */}
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

            {/* Video content area */}
            <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-900/30 to-slate-800/30">
              {/* Main video - playing in background */}
              <video
                className="w-full h-full object-cover rounded-b-3xl"
                autoPlay
                muted
                loop
                playsInline
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%231e293b'/%3E%3C/svg%3E"
              >
                <source src="/bizbees.mp4" type="video/mp4" />
                {videoNotSupported}
              </video>

              {/* Dark glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/50 to-slate-900/70 backdrop-blur-sm rounded-b-3xl" />

              {/* Floating particles effect over video */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-yellow-400/60 backdrop-blur-sm"
                  style={{
                    left: `${15 + i * 12}%`,
                    top: `${20 + i * 8}%`,
                  }}
                  animate={{
                    y: [0, -40, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              ))}

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.div
                  className="text-center cursor-pointer flex flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  onClick={openVideoModal}
                >
                  <motion.button
                    className="w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-400/60 to-amber-500/60 backdrop-blur-xl flex items-center justify-center border-2 border-yellow-400/70 shadow-2xl mb-6 hover:from-yellow-400/80 hover:to-amber-500/80 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 25px 50px -12px rgba(251, 191, 36, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: [1, 1.05, 1],
                      borderColor: ['rgba(251, 191, 36, 0.7)', 'rgba(251, 191, 36, 0.9)', 'rgba(251, 191, 36, 0.7)'],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Play icon */}
                    <svg 
                      className="w-8 h-8 text-slate-900 ml-1" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </motion.button>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <p className="text-slate-200 text-xl font-semibold mb-2 drop-shadow-lg">
                      {mockupAlt}
                    </p>
                    <p className="text-slate-300 text-sm drop-shadow-md">
                      {clickToWatchDemo}
                    </p>
                  </motion.div>
                </motion.div>
              </div>

              {/* Subtle border glow */}
              <div className="absolute inset-0 rounded-b-3xl border border-yellow-400/20 shadow-inner" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle Newsletter Section */}
      <motion.div
        className="max-w-2xl mx-auto mt-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative p-6 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-2">
              Bądź na bieżąco
            </h3>
            <p className="text-sm text-slate-400">
              Otrzymaj dostęp do najnowszych funkcjonalności za darmo na czas testów
            </p>
          </div>
          
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={emailPlaceholder}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-sm"
                required
              />
              <motion.button
                type="submit"
                disabled={isSubmitting || !email}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:from-blue-500 hover:to-blue-600 shadow-lg hover:shadow-blue-500/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSubmitted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  subscribeButton
                )}
              </motion.button>
            </div>
            <p className="text-xs text-center text-slate-500">
              {emailDisclaimer}
            </p>
          </form>
        </div>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeVideoModal}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-6 right-6 z-60 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              onClick={closeVideoModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Video container */}
            <motion.div
              className="relative w-full max-w-6xl mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video */}
              <video
                className="w-full h-auto rounded-2xl shadow-2xl"
                controls
                autoPlay
                muted={false}
                playsInline
              >
                <source src="/bizbees.mp4" type="video/mp4" />
                {videoNotSupported}
              </video>

              {/* Video title overlay */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionContainer>
  );
}
