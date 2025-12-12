import type { ReactNode } from 'react';

interface Section {
  title: string;
  content?: string[];
  content2?: string[];
  content3?: string[];
  items?: string[];
  items2?: string[];
  items3?: string[];
  items4?: string[];
}

interface LegalContentProps {
  sections: Section[];
  title: string;
  lastUpdated: string;
  contact: string;
}

export default function LegalContent({ sections, title, lastUpdated, contact }: LegalContentProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
      <p className="text-slate-400 mb-8">{lastUpdated}</p>
      <p className="text-slate-300 mb-12">{contact}</p>

      <div className="space-y-12">
        {sections.map((section, index) => (
          <section key={index} className="prose prose-invert max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{section.title}</h2>
            
            {section.content && (
              <div className="space-y-4 mb-6">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-slate-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {section.items && (
              <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-slate-300 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {section.content2 && (
              <div className="space-y-4 mb-6">
                {section.content2.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-slate-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {section.items2 && (
              <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
                {section.items2.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-slate-300 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {section.content3 && (
              <div className="space-y-4 mb-6">
                {section.content3.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-slate-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {section.items3 && (
              <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
                {section.items3.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-slate-300 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {section.items4 && (
              <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
                {section.items4.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-slate-300 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}





