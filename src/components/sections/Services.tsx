/**
 * Services Section - Overview of services offered
 */

import { motion } from 'framer-motion';
import SectionContainer from '../ui/SectionContainer';
import IconPlaceholder from '../ui/IconPlaceholder';

interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

interface ServicesProps {
  title: string;
  subtitle: string;
  services: Service[];
  additionalServicesTitle: string;
  additionalServices: string[];
  ctaText: string;
  ctaDescription: string;
}

export default function Services({
  title,
  subtitle,
  services,
  additionalServicesTitle,
  additionalServices,
  ctaText,
  ctaDescription
}: ServicesProps) {
  return (
    <SectionContainer id="services">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </h2>
          <p className="text-lg md:text-xl text-slate-300">
            {subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-violet-400/40 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/0 to-violet-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-20 pointer-events-none" />

              {/* Icon */}
              <div className="relative mb-6">
                <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <IconPlaceholder name={service.icon} className="w-8 h-8" />
                </div>
              </div>

              {/* Content */}
              <h3 className="relative text-2xl font-bold text-white mb-4 group-hover:text-indigo-100 transition-colors">
                {service.title}
              </h3>
              <p className="relative text-slate-300 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features list */}
              <ul className="relative space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-center gap-3 text-sm text-slate-400"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + featureIndex * 0.05 }}
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            {additionalServicesTitle}
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {additionalServices.map((service, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 backdrop-blur-sm hover:bg-white/10 hover:border-indigo-400/40 hover:text-white transition-all duration-300 cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.3
                }}
                whileHover={{ scale: 1.05 }}
              >
                {service}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            className="group relative px-10 py-5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold text-lg overflow-hidden shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const event = new CustomEvent('openCommandPalette', {
                detail: { 
                  source: 'button',
                  preFilledContent: { action: 'audit' }
                }
              });
              document.dispatchEvent(event);
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
          <p className="mt-4 text-slate-400 text-sm">
            {ctaDescription}
          </p>
        </motion.div>
      </div>
    </SectionContainer>
  );
}

