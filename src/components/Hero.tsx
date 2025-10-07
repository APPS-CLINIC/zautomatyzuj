import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Hero: FC = () => {
  const { t } = useTranslation();
  const highlights = t('hero.highlights', { returnObjects: true }) as string[];

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-20">
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="inline-flex rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
          {t('hero.badge')}
        </span>
        <h1 className="text-balance text-4xl font-bold leading-tight text-slate-50 sm:text-5xl">
          {t('hero.title')}
        </h1>
        <p className="text-balance max-w-2xl text-lg text-slate-300 sm:text-xl">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="#plan" className="btn-primary">
            {t('hero.primaryCta')}
          </a>
          <a href="#learn" className="btn-secondary">
            {t('hero.secondaryCta')}
          </a>
        </div>
      </div>

      <ul className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 text-left sm:grid-cols-3">
        {highlights.map((highlight) => (
          <li
            key={highlight}
            className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-300"
          >
            <span className="h-2 w-2 rounded-full bg-sky-400" aria-hidden />
            <p className="text-pretty text-base text-slate-200">{highlight}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Hero;
