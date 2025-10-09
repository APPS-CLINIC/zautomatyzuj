/**
 * CaseStudies Section - Social proof with metrics and testimonials
 */

import { motion } from 'framer-motion';
import SectionContainer from '../ui/SectionContainer';
import MetricCard from '../ui/MetricCard';
import TestimonialCard from '../ui/TestimonialCard';

interface Metric {
  value: string;
  label: string;
  description: string;
}

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  initials: string;
}

interface CaseStudiesProps {
  title: string;
  subtitle: string;
  metrics: Metric[];
  testimonials: Testimonial[];
}

export default function CaseStudies({
  title,
  subtitle,
  metrics,
  testimonials
}: CaseStudiesProps) {
  return (
    <SectionContainer id="case-studies">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
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

        {/* Metrics Bar */}
        <div className="mb-20">
          <div className="relative rounded-3xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-400/20 backdrop-blur-xl overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-violet-500/5 to-fuchsia-500/5 opacity-50" />
            
            {/* Metrics Grid */}
            <div className="relative grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {metrics.map((metric, index) => (
                <MetricCard
                  key={index}
                  value={metric.value}
                  label={metric.label}
                  description={metric.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              position={testimonial.position}
              company={testimonial.company}
              initials={testimonial.initials}
              index={index}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

