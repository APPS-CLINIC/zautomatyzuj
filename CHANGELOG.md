# CHANGELOG.md — Historia zmian ZautomatyzujAI

## [Commit 1] - 2025-10-07

### ✨ Nowe funkcje
- **PLAN.md** - Kompletna specyfikacja projektu z 18-etapowym planem implementacji
- **Ekstrakcja kolorów** - Automatyczny skrypt `scripts/extract-palette.mjs` do analizy logo
- **Brand CSS** - `src/styles/brand.css` z kolorami wyciągniętymi z logo
- **Tailwind Config** - Konfiguracja z brand colors i animacjami
- **i18n Setup** - Podstawowa konfiguracja tłumaczeń PL/EN
- **Komponenty podstawowe** - Hero.tsx, LanguageSwitcher.astro, BaseLayout.astro

### 🎨 Kolorystyka
- **Primary:** `#2b6ef9` (niebieski) - główny kolor brandu
- **Secondary:** `#3a166b` (fioletowy) - drugorzędny kolor
- **Accent:** `#bbb1cc` (szary) - kolor akcentowy
- **Pełne skale** - 50-900 dla każdego koloru
- **Gradienty** - automatyczne kombinacje kolorów
- **Glow efekty** - cienie z brand colors

### 📊 Statystyki
- **24 kolory** znalezione w logo SVG
- **6 hex kolorów** wyciągniętych
- **3 główne kolory** wybrane jako brand palette
- **20 plików** utworzonych/zmodyfikowanych
- **3695 linii** dodanych

### 🛠 Technologie
- Astro 5+ z React islands
- TailwindCSS 4+ z custom theme
- i18next dla tłumaczeń
- TypeScript z strict mode
- CSS Variables dla dynamicznych kolorów

### 📁 Struktura
```
/scripts/extract-palette.mjs     # Skrypt ekstrakcji kolorów
/src/styles/brand.css           # CSS variables z logo
/src/styles/global.css          # Globalne style z brand colors
/tailwind.config.js             # Konfiguracja Tailwind
/src/i18n/                      # Tłumaczenia PL/EN
/src/components/                # Komponenty podstawowe
/src/layouts/                   # Layouty Astro
```

### 🎯 Następne kroki
- Stworzenie podstawowych komponentów UI (Button, Card, SectionTitle)
- Implementacja sekcji Hero z animacjami
- Command Palette (Cmd/Ctrl + K)
- Pełne tłumaczenia PL/EN
- Endpoint /api/contact

---

**Status:** ✅ Commit 1 zakończony pomyślnie
**Następny:** Etap 2 - Podstawowe komponenty UI
