# Portfolio Website

Persönliches Portfolio-Projekt (Student) mit Fokus auf ein klares, editor-inspiriertes UI, schnelle Navigation und saubere TypeScript-Struktur.

## Über das Projekt

Diese Website dient als zentrale Übersicht für meine Projekte, Skills und Kontaktmöglichkeiten.
Das Design orientiert sich an einem minimalistischen "Developer Workspace"-Look mit Sidebar, Tabs und Statusbar.

## Features

- Single-Page Portfolio mit React Router
- Intro-View beim ersten Laden
- Command Palette (`Cmd/Ctrl + K`)
- Dark/Light Theme (gespeichert in `localStorage`)
- Responsive Sidebar (Desktop + Mobile Overlay)
- Modale für Kontakt und Schnellaktionen
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

App läuft danach standardmässig über Vite im Browser.

## Kontaktformular via EmailJS

Damit Nachrichten aus dem Kontakt-Modal in deiner Mailbox landen:

1. Account auf `https://www.emailjs.com` erstellen.
1. Email Service verbinden (z. B. Outlook/Gmail).
1. Email Template anlegen (z. B. mit Variablen `from_email`, `subject`, `message`, `to_email`).
1. `.env` im Projektroot anlegen (oder `.env.example` kopieren) und Werte eintragen:

```env
VITE_EMAILJS_SERVICE_ID=dein_service_id
VITE_EMAILJS_TEMPLATE_ID=dein_template_id
VITE_EMAILJS_PUBLIC_KEY=dein_public_key
```

1. Dev-Server neu starten (`npm run dev`).

Hinweis: Ohne diese Variablen zeigt die App beim Senden eine Fehlermeldung im Toast.

## Scripts

- `npm run dev` - Development Server
- `npm run build` - TypeScript-Check + Production Build
- `npm run preview` - Build lokal previewen
- `npm run lint` - ESLint ausfuehren

## Beitrag & Doku-Konvention

Fuer Beitrags- und Dokumentationsrichtlinien (inkl. JSDoc-Standard) siehe
[CONTRIBUTING.md](CONTRIBUTING.md).

## GitHub "Last Updated" in der Statusbar

Damit rechts in der Statusbar die echte letzte Commit-Zeit erscheint, wird die GitHub API verwendet.
Aktuell sind Owner und Repo im Code hinterlegt (`niko1405/portfolio`).

Wenn du das ändern willst, passe die Konstanten in `src/components/layout/StatusBar.tsx` an.

## Status

Aktives Lern- und Portfolio-Projekt.
Neue Features und visuelle Verbesserungen werden laufend ergänzt.
