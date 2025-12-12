# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📊 PostHog Analytics

Aplikacja używa PostHog do trackowania eventów. Aby włączyć tracking, ustaw następujące zmienne środowiskowe w pliku `.env` w katalogu głównym projektu:

```env
PUBLIC_POSTHOG_KEY=your_posthog_key_here
PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

**Uwaga:** Kod obsługuje również prefiks `NEXT_PUBLIC_` dla kompatybilności z Next.js:
```env
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

W Astro zmienne publiczne powinny mieć prefiks `PUBLIC_`, ale kod automatycznie sprawdzi oba prefiksy. Jeśli zmienne nie są ustawione, PostHog będzie działał w trybie deweloperskim bez wysyłania eventów.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
