export const dictionary = {
  meta: {
    title: 'ZautomatyzujAI — Automate with confidence',
    description:
      'Design resilient AI automations with modular, transparent workflows and human oversight built in.',
  },
  hero: {
    badge: 'Automation playbook',
    title: 'Build AI-led processes that stay under control',
    subtitle:
      'ZautomatyzujAI gives your team reusable patterns, quality checks, and governance tooling so automations scale safely.',
    primaryCta: 'Plan your automation',
    secondaryCta: 'See how it works',
    highlights: [
      'Composable architecture with clear ownership',
      'Audit-ready checkpoints for every decision',
      'Metrics that align business and engineering goals',
    ],
  },
  footer: {
    note: '© {{year}} ZautomatyzujAI. All rights reserved.',
  },
} as const;

export type Dictionary = typeof dictionary;
