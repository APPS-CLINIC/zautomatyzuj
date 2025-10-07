# PLAN.md — ZautomatyzujAI - Kompletna strona automatyzacji AI

## 🎯 Przegląd projektu

**Cel:** Stworzenie ultrakreatywnej strony WWW dla firmy świadczącej usługi automatyzacji procesów biznesowych, projektowania agentów AI, orkiestracji workflow, setupu zespołów, audytów i szkoleń.

**Kluczowe wymagania:**
- Design na poziomie topowego projektanta (czysto, kreatywnie, z animacjami)
- Architektura zgodna z SOLID, DRY, KISS
- Command Palette (Cmd/Ctrl + K) do szybkiego kontaktu
- Pełne tłumaczenie PL/EN
- Automatyczna kolorystyka wyciągnięta z logo

---

## 🎨 Kolorystyka i Branding

### Analiza logo
- **Źródło:** `public/logo.svg` (pełne logo) + `public/logo-image.svg` (znak graficzny)
- **Proces:** Automatyczna ekstrakcja kolorów przez `scripts/extract-palette.mjs`
- **Wynik:** CSS variables w `src/styles/brand.css`

### Paleta kolorów (przykładowa)
```css
:root {
  --brand-primary: #1ad1ff;        /* Główny kolor - niebieski */
  --brand-primary-rgb: 26 209 255;
  --brand-secondary: #7c5cff;      /* Drugorzędny - fioletowy */
  --brand-secondary-rgb: 124 92 255;
  --brand-accent: #00ffa3;         /* Akcent - zielony */
  --brand-accent-rgb: 0 255 163;
  
  /* Skalowanie kolorów */
  --brand-primary-50: #eafaff;
  --brand-primary-100: #d5f4ff;
  --brand-primary-200: #abe8ff;
  --brand-primary-300: #81ddff;
  --brand-primary-400: #57d1ff;
  --brand-primary-500: #1ad1ff;
  --brand-primary-600: #00b8e6;
  --brand-primary-700: #0099cc;
  --brand-primary-800: #007ab3;
  --brand-primary-900: #005b99;
  
  /* Gradienty */
  --brand-gradient-from: var(--brand-primary);
  --brand-gradient-via: var(--brand-secondary);
  --brand-gradient-to: var(--brand-accent);
  --brand-glow: drop-shadow(0 0 16px color-mix(in oklab, var(--brand-primary), white 20%));
}
```

### Motyw
- **Domyślny:** Dark mode
- **Przełącznik:** Light/dark z localStorage + prefers-color-scheme
- **Efekty:** Gradienty, glow, animacje z logo-image.svg jako maską

---

## 📁 Struktura projektu

```
/Users/pawelgabryel/repositories/zautomatyzujai/
├── src/
│   ├── components/
│   │   ├── ui/                          # Komponenty podstawowe (Atomic Design)
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── SectionTitle.astro
│   │   │   ├── CommandPalette.tsx       # React island dla Command Palette
│   │   │   ├── AnimatedText.astro
│   │   │   ├── LanguageSwitcher.astro
│   │   │   └── ThemeToggle.astro
│   │   ├── sections/                    # Sekcje strony (Organisms)
│   │   │   ├── Hero.astro
│   │   │   ├── Services.astro
│   │   │   ├── Process.astro
│   │   │   ├── Cases.astro
│   │   │   ├── Stack.astro
│   │   │   ├── Training.astro
│   │   │   ├── FAQ.astro
│   │   │   ├── Contact.astro
│   │   │   └── Footer.astro
│   │   └── providers/                   # React providers
│   │       ├── CommandPaletteProvider.tsx
│   │       └── ThemeProvider.tsx
│   ├── content/                         # Treści MDX
│   │   ├── services.mdx
│   │   ├── cases.mdx
│   │   └── trainings.mdx
│   ├── i18n/                           # Tłumaczenia
│   │   ├── config.ts
│   │   ├── i18next.ts
│   │   └── locales/
│   │       ├── pl.ts
│   │       ├── en.ts
│   │       └── brand.json              # Debug kolorów
│   ├── layouts/
│   │   ├── BaseLayout.astro            # Istniejący
│   │   └── MarketingLayout.astro       # Nowy layout dla strony głównej
│   ├── pages/
│   │   ├── index.astro                 # Redirect do /pl/
│   │   └── [lang]/
│   │       └── index.astro              # Strona główna z parametrem języka
│   ├── styles/
│   │   ├── global.css                  # Istniejący
│   │   ├── brand.css                   # Nowy - CSS variables z logo
│   │   └── components.css              # Style komponentów
│   └── utils/
│       ├── animations.ts               # Motion One utilities
│       ├── commands.ts                 # Command Palette actions
│       └── validation.ts               # Zod schemas
├── api/                                # Astro endpoints
│   └── contact.ts                      # Endpoint kontaktowy
├── scripts/                            # Skrypty pomocnicze
│   └── extract-palette.mjs             # Ekstrakcja kolorów z logo
├── public/
│   ├── logo.svg                        # Istniejący
│   ├── logo-image.svg                  # Istniejący
│   └── favicon.svg                     # Istniejący
├── PLAN.md                             # Ten plik
├── CHANGELOG.md                        # Historia zmian
└── README.md                           # Istniejący
```

---

## 🧱 Sekcje strony

### 1. Navbar
- **Lokalizacja:** `src/layouts/MarketingLayout.astro`
- **Elementy:**
  - Logo (link do strony głównej)
  - Nawigacja: Services, Process, Cases, Training, Contact
  - Przycisk "⌘K – Szybki kontakt"
  - Przełącznik języka (PL/EN)
  - Przełącznik motywu (Dark/Light)

### 2. Hero Section
- **Komponent:** `src/components/sections/Hero.astro`
- **Elementy:**
  - Animowany tytuł z gradientem
  - Podtytuł z opisem usług
  - CTA: "Umów audyt" / "Book an audit"
  - Tło z logo-image.svg jako maską/parallax
  - Animowane elementy z Motion One

### 3. Services Section
- **Komponent:** `src/components/sections/Services.astro`
- **Usługi:**
  - Automatyzacja procesów biznesowych
  - Projektowanie i wdrażanie agentów AI
  - Orkiestracja workflow
  - Setup zespołów
  - Audyty i szkolenia
- **Layout:** Karty z ikonami i opisami

### 4. Process Section
- **Komponent:** `src/components/sections/Process.astro`
- **5 kroków:**
  1. Discovery (Odkrywanie)
  2. Audit (Audyt)
  3. PoC (Proof of Concept)
  4. Rollout (Wdrożenie)
  5. Enablement (Wsparcie)
- **Layout:** Timeline z animacjami

### 5. Case Studies
- **Komponent:** `src/components/sections/Cases.astro`
- **Elementy:**
  - 3 kafle z KPI
  - Przykłady sukcesów
  - Metryki biznesowe

### 6. Stack & Patterns
- **Komponent:** `src/components/sections/Stack.astro`
- **Elementy:**
  - Technologie (AI, Automation, Cloud)
  - Wzorce projektowe (Strategy, Command, Observer)
  - Architektura (SOLID, DRY, KISS)

### 7. Training
- **Komponent:** `src/components/sections/Training.astro`
- **Elementy:**
  - Ścieżki szkoleniowe
  - Warsztaty praktyczne
  - Certyfikacje

### 8. FAQ
- **Komponent:** `src/components/sections/FAQ.astro`
- **Layout:** Accordion z pytaniami i odpowiedziami

### 9. Contact
- **Komponent:** `src/components/sections/Contact.astro`
- **Elementy:**
  - Formularz kontaktowy
  - Integracja z Command Palette
  - Informacje kontaktowe

### 10. Footer
- **Komponent:** `src/components/sections/Footer.astro`
- **Elementy:**
  - Linki społecznościowe
  - Przełącznik języka
  - Polityka prywatności
  - Copyright

---

## 💬 Command Palette (Cmd/Ctrl + K)

### Architektura
- **Komponent:** `src/components/ui/CommandPalette.tsx` (React island)
- **Provider:** `src/components/providers/CommandPaletteProvider.tsx`
- **Actions:** `src/utils/commands.ts`

### Akcje
1. **"Umów audyt / Book an audit"**
   - Formularz: email, temat, preferowany termin
   - Wysyłka do `/api/contact`

2. **"Poproś o wycenę / Request a quote"**
   - Formularz: email, opis projektu, budżet
   - Wysyłka do `/api/contact`

3. **"Zarezerwuj demo / Book a demo"**
   - Formularz: email, preferowany termin, typ demo
   - Wysyłka do `/api/contact`

4. **"Napisz do nas / Contact us"**
   - Formularz: email, temat, wiadomość
   - Wysyłka do `/api/contact`

### Implementacja
- **Wzorzec:** Command Pattern
- **UI:** Radix UI Dialog + Command
- **Validacja:** React Hook Form + Zod
- **Notyfikacje:** Toast messages

---

## 🌐 i18n (Tłumaczenia)

### Struktura
- **Pliki:** `src/i18n/locales/pl.ts`, `src/i18n/locales/en.ts`
- **Konfiguracja:** `src/i18n/config.ts`, `src/i18n/i18next.ts`
- **Helper:** Funkcja `t(key)` do tłumaczeń

### Przełączanie języka
- **URL:** `/[lang]/` (pl, en)
- **Fallback:** Domyślnie PL
- **Storage:** localStorage dla preferencji

### Przykładowe treści

**Hero (PL):**
```typescript
hero: {
  badge: 'Playbook automatyzacji',
  title: 'Uwolnij przepływy pracy. Zautomatyzuj firmę z klasą.',
  subtitle: 'Projektuj odporne automatyzacje AI z modułowymi procesami, przejrzystą kontrolą jakości i nadzorem człowieka.',
  primaryCta: 'Umów audyt',
  secondaryCta: 'Zobacz jak to działa'
}
```

**Hero (EN):**
```typescript
hero: {
  badge: 'Automation playbook',
  title: 'Unleash your workflows. Automate your business with finesse.',
  subtitle: 'Design resilient AI automations with modular processes, transparent quality control and human oversight.',
  primaryCta: 'Book an audit',
  secondaryCta: 'See how it works'
}
```

---

## 🛠 Stack technologiczny

### Core
- **Astro 5+** - Framework główny
- **TypeScript** - Typowanie
- **React 19** - Islands dla interaktywnych komponentów

### Styling
- **TailwindCSS 4+** - Utility-first CSS
- **Custom theme** - Brand colors z logo
- **CSS Variables** - Dynamiczne kolory

### Animacje
- **Motion One** - Lekkie animacje
- **Framer Motion** - Zaawansowane animacje (React islands)

### UI Components
- **Radix UI** - Command Palette, Dialog, Popover
- **React Hook Form** - Formularze
- **Zod** - Walidacja

### i18n
- **i18next** - Tłumaczenia
- **react-i18next** - React integration

### Quality
- **ESLint** - Linting
- **Prettier** - Formatowanie
- **Husky** - Pre-commit hooks

---

## 🚀 Plan implementacji

### Etap 1: Podstawy (Commits 1-3)
1. **Commit 1:** Analiza logo + skrypt ekstrakcji kolorów
2. **Commit 2:** Konfiguracja brand.css + Tailwind
3. **Commit 3:** Podstawowe komponenty UI

### Etap 2: Layout i nawigacja (Commits 4-6)
4. **Commit 4:** MarketingLayout + Navbar
5. **Commit 5:** Hero section z animacjami
6. **Commit 6:** Footer + podstawowa nawigacja

### Etap 3: Sekcje treściowe (Commits 7-12)
7. **Commit 7:** Services section
8. **Commit 8:** Process section (timeline)
9. **Commit 9:** Cases section
10. **Commit 10:** Stack section
11. **Commit 11:** Training section
12. **Commit 12:** FAQ section

### Etap 4: Interaktywność (Commits 13-15)
13. **Commit 13:** Command Palette (React island)
14. **Commit 14:** Contact form + API endpoint
15. **Commit 15:** Theme toggle + language switcher

### Etap 5: Optymalizacja (Commits 16-18)
16. **Commit 16:** Pełne tłumaczenia PL/EN
17. **Commit 17:** Animacje i efekty wizualne
18. **Commit 18:** Finalne poprawki + dokumentacja

---

## 📋 Zasady kodowania

### Architektura
- **SOLID** - Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion
- **DRY** - Don't Repeat Yourself
- **KISS** - Keep It Simple, Stupid

### Komponenty
- **Atomic Design** - atoms/molecules/organisms
- **Reużywalność** - ui/ + sections/
- **Komentarze** - Opis sekcji i przeznaczenia

### Kolory
- **Brak twardych hexów** - tylko `var(--brand-...)`
- **CSS Variables** - Dynamiczne zmiany motywu
- **Kontrast** - Automatyczne testy dostępności

### Commits
- **Konwencja:** `feat:`, `fix:`, `style:`, `refactor:`
- **Diff przed commitem** - Zawsze pokazać zmiany
- **Akceptacja użytkownika** - Nic nie commituj automatycznie

---

## 🧪 Jakość i testy

### Pre-commit
- `pnpm lint` - ESLint check
- `pnpm typecheck` - TypeScript check
- `pnpm format` - Prettier formatowanie

### Testy kontrastu
- Skrypt generuje wynik w `CHANGELOG.md`
- Automatyczne sprawdzanie WCAG 2.1

### Build
- `astro check` - Sprawdzenie przed buildem
- `astro build` - Produkcyjny build

---

## 🎯 Końcowy efekt

Po pełnym wdrożeniu:
- ✅ Gotowy projekt w strukturze Astro 5+
- ✅ Wszystkie sekcje PL/EN
- ✅ Animacje + Command Palette + formularz kontaktowy
- ✅ Automatycznie dopasowana kolorystyka z logo
- ✅ Estetyczny, profesjonalny wygląd AI/Automation brandu
- ✅ Responsywny design
- ✅ Dark/Light mode
- ✅ Pełna dostępność (WCAG 2.1)

---

## 📝 Następne kroki

1. **Zatwierdzenie planu** - Użytkownik akceptuje ten PLAN.md
2. **Etap 1** - Analiza logo + ekstrakcja kolorów
3. **Diff + Commit** - Pokazanie zmian przed commitem
4. **Iteracyjne wdrożenie** - Krok po kroku zgodnie z planem

**Gotowy do rozpoczęcia implementacji! 🚀**
