import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import type { AppContextType } from "./AppContext";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [isReplayedIntro, setIsReplayedIntro] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme-mode');
    if (saved) return saved === 'dark';

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-mode', theme);
  }, [isDarkMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }

      if (e.key === 'Escape') {
        setCmdOpen(false);
        setContactOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const value: AppContextType = {
    cmdOpen, setCmdOpen,
    contactOpen, setContactOpen,
    isDarkMode, toggleDarkMode,
    isReplayedIntro, setIsReplayedIntro,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};