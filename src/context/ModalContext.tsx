import { createContext, useContext, type ReactNode } from 'react';
import type { ModalOptions } from '../types';

/**
 * Public contract for opening and closing modal instances.
 */
export interface ModalContextType {
  openModal: (content: ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;
  closeAllModals: () => void;
}

/**
 * Shared modal context instance consumed by `useModal` and provided by `ModalProvider`.
 */
export const ModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * Accessor for modal actions with runtime provider guard.
 */
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};