# Contributing Guide

Vielen Dank fuer Beitraege zu diesem Projekt.

## Ziel

Code soll wartbar, nachvollziehbar und konsistent bleiben.
Ein wichtiger Teil davon ist kurze, praezise Dokumentation fuer Komponenten und Methoden.

## Dokumentations-Standard (JSDoc)

Verwende JSDoc fuer alle neu exportierten Komponenten, Hooks und Utility-Funktionen.

### Was dokumentiert werden soll

- Exportierte React-Komponenten
- Exportierte Hooks
- Exportierte Utility-Funktionen
- Komplexe interne Helfer, wenn die Logik nicht sofort offensichtlich ist

### Was nicht noetig ist

- Triviale Einzeiler ohne Mehrwert
- Offensichtliche Zuweisungen oder reine Weiterleitungen ohne Logik

### Stilregeln

- Kurz und konkret (1 bis 2 Saetze reichen oft)
- Beschreibe Zweck und ggf. Verhalten, nicht Implementation im Detail
- Keine redundanten Kommentare, die nur den Code wiederholen
- Sprache im Projektkontext halten (Deutsch oder neutrales Englisch), aber konsistent

### Beispiele

```ts
/**
 * Renders active toasts from context as stacked notifications.
 */
export const ToastContainer: React.FC = () => {
  // ...
};
```

```ts
/**
 * Calculates age in years from a given birth date.
 */
export const calculateAge = (birthDate: Date): number => {
  // ...
};
```

## Vor Merge

Bitte vor Push mindestens einmal lokal ausfuehren:

```bash
npm run lint
npm run build
```

Wenn moeglich, kleine und fokussierte Commits erstellen.
