import { createContext } from "react";

export interface AppContextType {
  cmdOpen: boolean;
  setCmdOpen: (open: boolean) => void;
  contactOpen: boolean;
  setContactOpen: (open: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isReplayedIntro: boolean;
  setIsReplayedIntro: (isReplayed: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export { AppContext };