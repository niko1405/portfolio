# Portfolio Website

Persoenliches Portfolio-Projekt (Student) mit Fokus auf ein klares, editor-inspiriertes UI, schnelle Navigation und saubere TypeScript-Struktur.

## Ueber das Projekt

Diese Website dient als zentrale Uebersicht fuer meine Projekte, Skills und Kontaktmoeglichkeiten.
Das Design orientiert sich an einem minimalistischen "Developer Workspace"-Look mit Sidebar, Tabs und Statusbar.

## Features

- Single-Page Portfolio mit React Router
- Intro-View beim ersten Laden
- Command Palette (`Cmd/Ctrl + K`)
- Dark/Light Theme (gespeichert in `localStorage`)
- Responsive Sidebar (Desktop + Mobile Overlay)
- Modale fuer Kontakt und Schnellaktionen
- Statusbar mit optionaler GitHub-"last updated" Anzeige

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide Icons

## Projektstruktur (Kurz)

```text
src/
  components/
    layout/
    modals/
    pages/
    shared/
  context/
  data/
  hooks/
  types/
```

## Lokales Setup

```bash
npm install
npm run dev
```

App laeuft danach standardmaessig ueber Vite im Browser.

## Scripts

- `npm run dev` - Development Server
- `npm run build` - TypeScript-Check + Production Build
- `npm run preview` - Build lokal previewen
- `npm run lint` - ESLint ausfuehren

## GitHub "Last Updated" in der Statusbar (optional)

Damit rechts in der Statusbar die echte letzte Commit-Zeit erscheint, wird die GitHub API verwendet.

1. Datei `.env` im Projektroot anlegen.
2. Werte eintragen:

```env
VITE_GITHUB_OWNER=dein-github-name
VITE_GITHUB_REPO=dein-repo-name
```

3. Dev-Server neu starten (`npm run dev`).

Hinweis: Ohne diese Variablen zeigt die Statusbar `last updated: n/a`.

## Status

Aktives Lern- und Portfolio-Projekt.
Neue Features und visuelle Verbesserungen werden laufend ergaenzt.
