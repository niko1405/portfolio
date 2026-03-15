import { createContext, useContext, useEffect, useState } from "react";

interface AppContextType {
  cmdOpen: boolean;
  setCmdOpen: (open: boolean) => void;
  contactOpen: boolean;
  setContactOpen: (open: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  showIntro: boolean;
  setShowIntro: (show: boolean) => void;
  isReplayedIntro: boolean;
  setIsReplayedIntro: (isReplayed: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('theme-mode');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [showIntro, setShowIntro] = useState(() => {
    // Only show intro once per session
    const hasSeenIntro = sessionStorage.getItem('has-seen-intro');
    return !hasSeenIntro;
  });
  const [isReplayedIntro, setIsReplayedIntro] = useState(false);

  // Apply theme to document
  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-mode', theme);
  }, [isDarkMode]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Command Palette with Cmd+K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
      // Close overlays on Escape
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

  const value = {
    cmdOpen, setCmdOpen,
    contactOpen, setContactOpen,
    isDarkMode, toggleDarkMode,
    showIntro, setShowIntro,
    isReplayedIntro, setIsReplayedIntro
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};