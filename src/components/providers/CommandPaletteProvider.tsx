import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * CommandPaletteProvider.tsx - React context dla Command Palette
 * 
 * Funkcje:
 * - Globalny stan Command Palette
 * - Obsługa klawiatury (Cmd/Ctrl + K)
 * - Integracja z i18n
 * - Toast notyfikacje
 */

interface CommandPaletteContextType {
  isOpen: boolean;
  preFilledContent?: {
    message?: string;
    subject?: string;
    action?: 'audit' | 'quote' | 'demo' | 'contact';
  };
  openCommandPalette: (preFilledContent?: CommandPaletteContextType['preFilledContent']) => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextType | undefined>(undefined);

export const useCommandPalette = () => {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error('useCommandPalette must be used within CommandPaletteProvider');
  }
  return context;
};

interface CommandPaletteProviderProps {
  children: React.ReactNode;
}

export const CommandPaletteProvider: React.FC<CommandPaletteProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preFilledContent, setPreFilledContent] = useState<CommandPaletteContextType['preFilledContent']>();

  const openCommandPalette = (content?: CommandPaletteContextType['preFilledContent']) => {
    setPreFilledContent(content);
    setIsOpen(true);
  };
  const closeCommandPalette = () => {
    setIsOpen(false);
    setPreFilledContent(undefined);
  };
  const toggleCommandPalette = () => setIsOpen(prev => !prev);

  // Globalna obsługa klawiatury i eventów
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape
      if (e.key === 'Escape' && isOpen) {
        closeCommandPalette();
      }
    };

    const handleOpenCommandPalette = (event: CustomEvent) => {
      const content = event.detail?.preFilledContent;
      openCommandPalette(content);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('openCommandPalette', handleOpenCommandPalette);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('openCommandPalette', handleOpenCommandPalette);
    };
  }, [isOpen, openCommandPalette]);

  // Blokowanie scrollowania gdy Command Palette jest otwarty
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const value: CommandPaletteContextType = {
    isOpen,
    preFilledContent,
    openCommandPalette,
    closeCommandPalette,
    toggleCommandPalette,
  };

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
    </CommandPaletteContext.Provider>
  );
};
