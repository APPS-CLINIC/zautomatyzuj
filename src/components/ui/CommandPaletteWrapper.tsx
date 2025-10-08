import React from 'react';
import { CommandPaletteProvider } from '../providers/CommandPaletteProvider';
import CommandPalette from './CommandPalette';

/**
 * CommandPaletteWrapper.tsx - Wrapper dla Command Palette i Provider
 * 
 * Funkcje:
 * - Łączy Provider i CommandPalette w jeden komponent
 * - Eliminuje problem z SSR i Context
 */

const CommandPaletteWrapper: React.FC = () => {
  return (
    <CommandPaletteProvider>
      <CommandPalette />
    </CommandPaletteProvider>
  );
};

export default CommandPaletteWrapper;

