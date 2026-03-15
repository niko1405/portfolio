import { useEffect } from 'react';

// Type definition for a single shortcut
interface ShortcutConfig {
  key: string;          
  meta?: boolean;       // Cmd (Mac) oder Ctrl (Windows) pressed?
  shift?: boolean;      // Shift pressed?
  alt?: boolean;        // Alt pressed?
  preventDefault?: boolean; // Should the default behavior be prevented?
  action: (e: KeyboardEvent) => void; // The function to be executed
}

export const useKeyboardShortcuts = (shortcuts: ShortcutConfig[]) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      
      // We iterate through all defined shortcuts
      shortcuts.forEach((shortcut) => {
        const { key, meta, shift, alt, preventDefault = true, action } = shortcut;

        // 1. Check if the main key matches (case-insensitive)
        const isKeyMatch = e.key.toLowerCase() === key.toLowerCase();

        // 2. Check modifier keys (Meta/Ctrl, Shift, Alt)
        // Note: !! converts undefined to false (strict boolean check)
        const isMetaMatch = !!meta === (e.metaKey || e.ctrlKey);
        const isShiftMatch = !!shift === e.shiftKey;
        const isAltMatch = !!alt === e.altKey;

        // 3. If everything matches -> execute action
        if (isKeyMatch && isMetaMatch && isShiftMatch && isAltMatch) {
          if (preventDefault) {
            e.preventDefault();
          }
          action(e);
        }
      });
    };

    // Register event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup on unmount
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]); // Re-run effect when shortcuts change
};