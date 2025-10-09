/**
 * ProblemSolution Section - Shows customer problems and our solutions
 */

import { motion } from 'framer-motion';
import SectionContainer from '../ui/SectionContainer';
import IconPlaceholder from '../ui/IconPlaceholder';

interface Problem {
  title: string;
  description: string;
}

interface Solution {
  title: string;
  description: string;
  features: string[];
}

interface ProblemSolutionProps {
  title: string;
  subtitle: string;
  problems: Problem[];
  solutionTitle: string;
  solutionSubtitle: string;
  solutions: Solution[];
}

export default function ProblemSolution({
  title,
  subtitle,
  problems,
  solutionTitle,
  solutionSubtitle,
  solutions
}: ProblemSolutionProps) {
  return (
    <SectionContainer id="problem-solution" className="-mt-48">
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
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Problems Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                className="group relative rounded-2xl bg-red-500/5 border border-red-500/20 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-red-500/10 hover:border-red-500/40"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {/* Cross icon */}
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400">
                    <IconPlaceholder name="cross" className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white pt-1">
                    {problem.title}
                  </h3>
                </div>
                <p className="text-slate-300 leading-relaxed pl-12">
                  {problem.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Separator with gradient */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative h-px max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
          </div>
          <div className="text-center mt-8">
            <motion.div
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-400/30"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-lg font-semibold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                {solutionTitle}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Solutions Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto">
            {solutionSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className="group relative rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-indigo-400/40 hover:-translate-y-2 hover:ring-1 hover:ring-indigo-400/40"
              initial={{ opacity: 0, y: 40 }}
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

              {/* Check icon */}
              <div className="relative mb-6">
                <div className="inline-flex w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/30 to-emerald-500/30 items-center justify-center text-green-400 group-hover:scale-110 transition-transform duration-300">
                  <IconPlaceholder name="check" className="w-7 h-7" />
                </div>
              </div>

              {/* Content */}
              <h3 className="relative text-2xl font-bold text-white mb-4 group-hover:text-indigo-100 transition-colors">
                {solution.title}
              </h3>
              <p className="relative text-slate-300 leading-relaxed mb-6">
                {solution.description}
              </p>

              {/* Features list */}
              <ul className="relative space-y-2">
                {solution.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

