import React, { useEffect } from 'react';
import ContactChat from '../contact/ContactChat';
import I18nProvider from '../providers/I18nProvider';
import { useCommandPalette } from '../providers/CommandPaletteProvider';
import type { Locale } from '../../i18n/config';

/**
 * CommandPalette.tsx - React island dla Command Palette (Cmd/Ctrl + K)
 * 
 * Funkcje:
 * - Globalny dostęp z klawiatury (Cmd/Ctrl + K)
 * - Modal z interaktywnym czatem kontaktowym
 * - Obsługa Escape do zamknięcia
 * - Obsługa wielojęzyczności
 */

interface CommandPaletteProps {
  locale: Locale;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ locale }) => {
  const { isOpen, closeCommandPalette } = useCommandPalette();

  // Obsługa klawiatury
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCommandPalette();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCommandPalette]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Glassmorphism Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={closeCommandPalette}
      />
      
      {/* Chat Container - bez ramki, tylko glassmorphism */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white/5 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        {/* Close Button - floating */}
        <button
          onClick={closeCommandPalette}
          className="absolute top-4 right-4 z-10 p-2 text-slate-300 hover:text-white transition-colors rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
          aria-label="Zamknij"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Contact Chat - bez dodatkowego padding */}
        <div className="overflow-y-auto max-h-[90vh]">
          <I18nProvider locale={locale}>
            <ContactChat showHeader={false} />
          </I18nProvider>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
