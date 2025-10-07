# PROMPT.md — Astro Automation Site (Plan → Diff → Commit)

## 🎯 Cel projektu
Stwórz **kompletną, ultrakreatywną stronę WWW** w **Astro 4+** dla firmy świadczącej usługi:
- automatyzacji procesów biznesowych,
- projektowania i wdrażania agentów AI,
- orkiestracji workflow,
- setupu zespołów,
- audytów i szkoleń.

Strona ma:
- wyglądać **na poziomie topowego designera** (czysto, kreatywnie, z animacjami),
- być zaprojektowana według najlepszych praktyk inżynierskich (**SOLID, DRY, KISS**),
- posiadać **Command Palette (Cmd/Ctrl + K)** do szybkiego kontaktu (prompt → klasyfikacja intencji → formularz),
- mieć pełne tłumaczenie **PL/EN**.

---

## 🧭 Workflow pracy agenta

1. 🧩 **Etap 1 – Planowanie**
   - Stwórz plik `PLAN.md` z pełnym planem projektu:
     - strukturą katalogów i plików,
     - opisem sekcji strony i komponentów,
     - koncepcją kolorystyki z logo,
     - planem Command Palette i formularza kontaktowego,
     - propozycją tłumaczeń i sekcji contentowych.
   - Po utworzeniu planu pokaż **diff do akceptacji** przed commitem.

2. ⚙️ **Etap 2 – Implementacja krokowa**
   - Po zatwierdzeniu planu:
     - Twórz poszczególne elementy (np. layout, hero section, navbar itd.),
     - Po każdym etapie pokazuj **diff zmian**,
     - Po akceptacji użytkownika wykonaj **commit** z opisem (`feat:`, `style:`, `refactor:`).

3. 🔁 **Każdy etap = diff → akceptacja → commit**
   - Nic nie commituj automatycznie — każda zmiana musi zostać zatwierdzona.

4. 🧱 **Pliki pomocnicze**
   - `PLAN.md` — plan projektu  
   - `CHANGELOG.md` — wpis po każdym commicie (co zostało zrobione)  
   - `scripts/extract-palette.mjs` — automatyczne generowanie kolorów z logo  
   - `src/styles/brand.css` — definicje kolorów (CSS variables)

---

## 🧰 Stack technologiczny

- **Astro 4+** (TypeScript, islands, layouts)
- **TailwindCSS** (custom theme + brand tokens)
- **Motion One** lub **Framer Motion (via React islands)** — animacje
- **Radix UI** lub **@cmdk** — Command Palette, Dialog, Popover
- **React Hook Form + Zod** — formularze (validacja)
- **Astro endpoint `/api/contact`** — obsługa kontaktu
- **i18n** — JSON (`/src/locales/pl.json`, `/src/locales/en.json`)
- **ESLint + Prettier + Husky (lint + typecheck przed commit)**  
- Architektura: **Atomic Design** (atoms/molecules/organisms), wzorce **Strategy / Command / Observer**

---

## 🎨 Kolorystyka z logo.svg / logo-image.svg

Kolorystyka ma być **automatycznie wyciągnięta z logo**:

- Pliki źródłowe:  
  - `public/logo.svg` – pełne logo (z napisami)  
  - `public/logo-image.svg` – sam znak graficzny

### Kroki:

1. **Analiza SVG**
   - Odczytaj kolory `fill`/`stroke`.
   - Wybierz 2–4 najbardziej reprezentatywne.
   - Oznacz jako `brand.primary`, `brand.secondary`, `brand.accent`.

2. **Skrypt ekstrakcji (`scripts/extract-palette.mjs`)**
   - Parsuje oba SVG.
   - Wyciąga unikalne kolory (hex/rgb/hsl).
   - Tworzy pliki:
     - `src/styles/brand.css` (CSS variables)
     - `src/locales/brand.json` (debug)
   - Pokazuje **diff** do akceptacji → **commit**.

3. **Zmienna CSS**
   ```css
   :root {
     --brand-primary: #1ad1ff;
     --brand-primary-rgb: 26 209 255;
     --brand-secondary: #7c5cff;
     --brand-secondary-rgb: 124 92 255;
     --brand-accent: #00ffa3;
     --brand-accent-rgb: 0 255 163;

     /* skalowanie */
     --brand-primary-50: #eafaff;
     --brand-primary-900: #062733;

     --brand-gradient-from: var(--brand-primary);
     --brand-gradient-via: var(--brand-secondary);
     --brand-gradient-to: var(--brand-accent);
     --brand-glow: drop-shadow(0 0 16px color-mix(in oklab, var(--brand-primary), white 20%));
   }
   ```

4. **Tailwind Config**
   ```ts
   extend: {
     colors: {
       brand: {
         DEFAULT: 'rgb(var(--brand-primary-rgb) / <alpha-value>)',
         primary: 'rgb(var(--brand-primary-rgb) / <alpha-value>)',
         secondary: 'rgb(var(--brand-secondary-rgb) / <alpha-value>)',
         accent: 'rgb(var(--brand-accent-rgb) / <alpha-value>)'
       }
     },
     gradientColorStops: {
       brand: {
         from: 'var(--brand-gradient-from)',
         via: 'var(--brand-gradient-via)',
         to: 'var(--brand-gradient-to)'
       }
     }
   }
   ```

5. **Stylizacja**
   - Dominujący motyw: ciemny (dark mode).
   - Użycie gradientów i glow efektów.
   - CTA i hero: `bg-gradient-to-r from-[var(--brand-gradient-from)] via-[var(--brand-gradient-via)] to-[var(--brand-gradient-to)]`.
   - Hero tło może wykorzystywać `logo-image.svg` jako maskę/parallax pattern.

6. **Tryb light/dark**
   - Domyślnie dark.
   - Automatyczne rozjaśnienie kolorów dla light.
   - Przełącznik (`localStorage`, `prefers-color-scheme`).
   - Diff przed commitem → commit po akceptacji.

---

## 📁 Struktura projektu (do opisania w PLAN.md)

```
/src
  /components
    /ui
      Button.astro
      Card.astro
      SectionTitle.astro
      CommandPalette.astro
      AnimatedText.astro
    /sections
      Hero.astro
      Services.astro
      Process.astro
      Cases.astro
      Stack.astro
      Training.astro
      FAQ.astro
      Contact.astro
      Footer.astro
  /content
    services.mdx
    cases.mdx
    trainings.mdx
  /locales
    pl.json
    en.json
  /layouts
    MarketingLayout.astro
  /pages
    index.astro
  /styles
    globals.css
    brand.css
/api
  contact.ts
PLAN.md
CHANGELOG.md
```

---

## 🧱 Sekcje strony

1. **Navbar** — linki + przycisk `⌘K – Szybki kontakt`
2. **Hero** — claim, CTA, animowany motyw logo-image.svg
3. **Services** — karty usług (automatyzacja, agenci, workflow, audyty, szkolenia)
4. **Process** — 5 kroków pracy (Discovery → Audit → PoC → Rollout → Enablement)
5. **Case Studies** — 3 kafle KPI
6. **Stack & Patterns** — technologie + wzorce projektowe
7. **Training** — ścieżki i warsztaty
8. **FAQ**
9. **Contact** — formularz i Command Palette
10. **Footer** — social, języki, polityka

---

## 💬 Command Palette (Cmd/Ctrl + K)

- Komponent `CommandPalette.astro` lub `CommandPalette.tsx`.
- Dostępna globalnie z klawiatury.
- Akcje:
  - „Umów audyt / Book an audit”
  - „Poproś o wycenę / Request a quote”
  - „Zarezerwuj demo / Book a demo”
  - „Napisz do nas / Contact us”
- Po wyborze:
  - Pyta o e-mail i temat.
  - Wysyła dane do `/api/contact`.
  - Pokazuje status (`toast.success` / `toast.error`).
- Logika oparta o wzorzec **Command** (akcje i dispatch).

---

## 🧠 i18n
- Pliki: `src/locales/pl.json`, `src/locales/en.json`
- Helper `t(key)` do tłumaczeń.
- Automatyczne przełączanie języka przez query param lub localStorage.
- Każda sekcja zawiera treści w obu językach.

---

## 📈 Przykładowe treści (PL/EN)

**Hero:**
> PL: „Uwolnij przepływy pracy. Zautomatyzuj firmę z klasą.”  
> EN: “Unleash your workflows. Automate your business with finesse.”

**CTA:**
> PL: „Umów audyt” / EN: “Book an audit”

**Command prompt:**
> PL: „Napisz, jak możemy pomóc…”  
> EN: “Tell us how we can help…”

---

## 🔍 Zasady kodowania

- Każdy komponent ma komentarz opisujący sekcję i przeznaczenie.
- Brak twardych hexów — tylko zmienne (`var(--brand-...)`).
- Komponenty pisane w duchu **SOLID, DRY, KISS**.
- Reużywalność: `ui/` + `sections/`.
- Commit messages zgodne z konwencją:
  - `feat:` — nowe funkcje
  - `fix:` — poprawki
  - `style:` — zmiany w stylach
  - `refactor:` — refaktoryzacja

---

## 🧪 CI & jakość

- `pnpm lint && pnpm typecheck` w pre-commit
- Formatowanie Prettier + ESLint (plugin Astro + Tailwind)
- Test kontrastu kolorów (skrypt generuje wynik w `CHANGELOG.md`)
- Możliwość `astro check` przed buildem

---

## 🪄 Końcowy efekt

Po pełnym wdrożeniu i commitach:
- gotowy projekt w strukturze Astro,
- wszystkie sekcje PL/EN,
- animacje + Command Palette + formularz kontaktowy,
- automatycznie dopasowana kolorystyka z logo,
- estetyczny, profesjonalny wygląd AI/Automation brandu.

---

## 🚀 Start

> **Zadanie startowe:**  
> Utwórz plik `PLAN.md` z pełną strukturą projektu, opisem sekcji, komponentów i planem wdrożenia (z użyciem kolorów z logo).  
> Następnie pokaż diff do akceptacji przed pierwszym commitem.  
> Po akceptacji przejdź do wdrożenia krok po kroku, za każdym razem pokazując diff i pytając o zatwierdzenie przed commitem.
