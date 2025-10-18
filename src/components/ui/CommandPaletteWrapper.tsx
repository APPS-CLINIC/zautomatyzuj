import React from 'react';
import { CommandPaletteProvider } from '../providers/CommandPaletteProvider';
import CommandPalette from './CommandPalette';
import type { Locale } from '../../i18n/config';

/**
 * CommandPaletteWrapper.tsx - Wrapper dla Command Palette i Provider
 * 
 * Funkcje:
 * - Łączy Provider i CommandPalette w jeden komponent
 * - Eliminuje problem z SSR i Context
 * - Przekazuje aktualny język do CommandPalette
 */

interface CommandPaletteWrapperProps {
  locale: Locale;
}

const CommandPaletteWrapper: React.FC<CommandPaletteWrapperProps> = ({ locale }) => {
  return (
    <CommandPaletteProvider>
      <CommandPalette locale={locale} />
    </CommandPaletteProvider>
  );
};

export default CommandPaletteWrapper;

