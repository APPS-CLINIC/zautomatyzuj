#!/usr/bin/env node

/**
 * Skrypt ekstrakcji kolorów z logo SVG
 * Analizuje pliki logo.svg i logo-image.svg i wyciąga paletę kolorów
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Funkcja do konwersji hex na RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Funkcja do konwersji RGB na HSL
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// Funkcja do ekstrakcji kolorów z SVG
function extractColorsFromSVG(svgContent) {
  const colors = new Set();
  
  // Regex do znajdowania kolorów w różnych formatach
  const colorRegexes = [
    /fill="([^"]+)"/g,           // fill="color"
    /stroke="([^"]+)"/g,         // stroke="color"
    /fill:([^;]+);/g,            // fill: color;
    /stroke:([^;]+);/g,          // stroke: color;
    /#[0-9a-fA-F]{3,6}/g,       // hex colors
    /rgb\([^)]+\)/g,             // rgb()
    /rgba\([^)]+\)/g,           // rgba()
    /hsl\([^)]+\)/g,             // hsl()
    /hsla\([^)]+\)/g             // hsla()
  ];
  
  colorRegexes.forEach(regex => {
    let match;
    while ((match = regex.exec(svgContent)) !== null) {
      const color = match[1] || match[0];
      if (color && !color.includes('url(') && !color.includes('none')) {
        colors.add(color.trim());
      }
    }
  });
  
  return Array.from(colors);
}

// Funkcja do normalizacji kolorów
function normalizeColor(color) {
  // Usuń cudzysłowy i spacje
  color = color.replace(/['"]/g, '').trim();
  
  // Jeśli to hex bez #, dodaj #
  if (/^[0-9a-fA-F]{3,6}$/.test(color)) {
    return '#' + color;
  }
  
  return color;
}

// Funkcja do generowania skali kolorów
function generateColorScale(hex, name) {
  const rgb = hexToRgb(hex);
  if (!rgb) return {};
  
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  const scale = {};
  
  // Generuj skale od 50 do 900
  const scales = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  
  scales.forEach(weight => {
    let newL = hsl.l;
    let newS = hsl.s;
    
    if (weight <= 500) {
      // Jaśniejsze odcienie - zwiększ lightness, zmniejsz saturation
      const factor = (500 - weight) / 450; // 0-1
      newL = Math.min(95, hsl.l + factor * (95 - hsl.l));
      newS = Math.max(10, hsl.s - factor * hsl.s * 0.3);
    } else {
      // Ciemniejsze odcienie - zmniejsz lightness, zwiększ saturation
      const factor = (weight - 500) / 400; // 0-1
      newL = Math.max(5, hsl.l - factor * (hsl.l - 5));
      newS = Math.min(100, hsl.s + factor * (100 - hsl.s) * 0.2);
    }
    
    const newHsl = { h: hsl.h, s: newS, l: newL };
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    
    scale[weight] = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  });
  
  return scale;
}

// Funkcja do konwersji HSL na RGB
function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

// Funkcja do konwersji RGB na hex
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Główna funkcja
async function extractPalette() {
  console.log('🎨 Analizuję kolory z logo...');
  
  try {
    // Wczytaj pliki SVG
    const logoPath = join(projectRoot, 'public', 'logo.svg');
    const logoImagePath = join(projectRoot, 'public', 'logo-image.svg');
    
    const logoContent = readFileSync(logoPath, 'utf8');
    const logoImageContent = readFileSync(logoImagePath, 'utf8');
    
    // Wyciągnij kolory
    const logoColors = extractColorsFromSVG(logoContent);
    const logoImageColors = extractColorsFromSVG(logoImageContent);
    
    // Połącz i usuń duplikaty
    const allColors = [...new Set([...logoColors, ...logoImageColors])];
    
    console.log(`📊 Znaleziono ${allColors.length} kolorów:`);
    allColors.forEach(color => console.log(`  - ${color}`));
    
    // Filtruj tylko hex kolory
    const hexColors = allColors
      .map(normalizeColor)
      .filter(color => /^#[0-9a-fA-F]{3,6}$/.test(color))
      .map(color => color.toLowerCase());
    
    console.log(`\n🎯 Hex kolory (${hexColors.length}):`);
    hexColors.forEach(color => console.log(`  - ${color}`));
    
    // Wybierz główne kolory (najczęściej występujące lub najbardziej reprezentatywne)
    const mainColors = hexColors.slice(0, 3); // Pierwsze 3 unikalne kolory
    
    if (mainColors.length === 0) {
      console.log('⚠️  Nie znaleziono hex kolorów, używam domyślnych...');
      mainColors.push('#1ad1ff', '#7c5cff', '#00ffa3');
    }
    
    // Uzupełnij do 3 kolorów jeśli potrzeba
    while (mainColors.length < 3) {
      const fallbackColors = ['#1ad1ff', '#7c5cff', '#00ffa3'];
      const nextColor = fallbackColors[mainColors.length];
      if (!mainColors.includes(nextColor)) {
        mainColors.push(nextColor);
      }
    }
    
    const [primary, secondary, accent] = mainColors;
    
    console.log(`\n🎨 Główne kolory:`);
    console.log(`  Primary: ${primary}`);
    console.log(`  Secondary: ${secondary}`);
    console.log(`  Accent: ${accent}`);
    
    // Generuj CSS variables
    const cssVariables = {
      primary: primary,
      secondary: secondary,
      accent: accent,
      'primary-rgb': hexToRgb(primary),
      'secondary-rgb': hexToRgb(secondary),
      'accent-rgb': hexToRgb(accent)
    };
    
    // Generuj skale kolorów
    const primaryScale = generateColorScale(primary, 'primary');
    const secondaryScale = generateColorScale(secondary, 'secondary');
    const accentScale = generateColorScale(accent, 'accent');
    
    // Stwórz CSS content
    const cssContent = `/* Automatycznie wygenerowane z logo - ${new Date().toISOString()} */

:root {
  /* Główne kolory brandu */
  --brand-primary: ${primary};
  --brand-primary-rgb: ${cssVariables['primary-rgb'].r} ${cssVariables['primary-rgb'].g} ${cssVariables['primary-rgb'].b};
  --brand-secondary: ${secondary};
  --brand-secondary-rgb: ${cssVariables['secondary-rgb'].r} ${cssVariables['secondary-rgb'].g} ${cssVariables['secondary-rgb'].b};
  --brand-accent: ${accent};
  --brand-accent-rgb: ${cssVariables['accent-rgb'].r} ${cssVariables['accent-rgb'].g} ${cssVariables['accent-rgb'].b};
  
  /* Skala primary */
${Object.entries(primaryScale).map(([weight, color]) => `  --brand-primary-${weight}: ${color};`).join('\n')}
  
  /* Skala secondary */
${Object.entries(secondaryScale).map(([weight, color]) => `  --brand-secondary-${weight}: ${color};`).join('\n')}
  
  /* Skala accent */
${Object.entries(accentScale).map(([weight, color]) => `  --brand-accent-${weight}: ${color};`).join('\n')}
  
  /* Gradienty */
  --brand-gradient-from: var(--brand-primary);
  --brand-gradient-via: var(--brand-secondary);
  --brand-gradient-to: var(--brand-accent);
  --brand-glow: drop-shadow(0 0 16px color-mix(in oklab, var(--brand-primary), white 20%));
  
  /* Light mode adjustments */
  --brand-primary-light: color-mix(in oklab, var(--brand-primary), black 20%);
  --brand-secondary-light: color-mix(in oklab, var(--brand-secondary), black 20%);
  --brand-accent-light: color-mix(in oklab, var(--brand-accent), black 20%);
}

/* Dark mode (domyślny) */
.dark {
  --brand-primary-current: var(--brand-primary);
  --brand-secondary-current: var(--brand-secondary);
  --brand-accent-current: var(--brand-accent);
}

/* Light mode */
.light {
  --brand-primary-current: var(--brand-primary-light);
  --brand-secondary-current: var(--brand-secondary-light);
  --brand-accent-current: var(--brand-accent-light);
}
`;

    // Zapisz CSS
    const cssPath = join(projectRoot, 'src', 'styles', 'brand.css');
    writeFileSync(cssPath, cssContent);
    
    // Stwórz JSON dla debugowania
    const debugData = {
      extracted: allColors,
      hexColors: hexColors,
      mainColors: {
        primary: primary,
        secondary: secondary,
        accent: accent
      },
      scales: {
        primary: primaryScale,
        secondary: secondaryScale,
        accent: accentScale
      },
      timestamp: new Date().toISOString()
    };
    
    const jsonPath = join(projectRoot, 'src', 'i18n', 'locales', 'brand.json');
    writeFileSync(jsonPath, JSON.stringify(debugData, null, 2));
    
    console.log(`\n✅ Wygenerowano:`);
    console.log(`  - src/styles/brand.css`);
    console.log(`  - src/i18n/locales/brand.json`);
    
    console.log(`\n🎉 Ekstrakcja kolorów zakończona pomyślnie!`);
    
  } catch (error) {
    console.error('❌ Błąd podczas ekstrakcji kolorów:', error.message);
    process.exit(1);
  }
}

// Uruchom skrypt
extractPalette();
