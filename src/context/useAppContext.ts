import { useContext } from "react";
import { AppContext } from "./AppContext";

/**
 * Returns the app-wide context and enforces provider usage.
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};