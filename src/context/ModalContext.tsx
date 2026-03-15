import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { ModalInstance, ModalOptions } from "../types";

interface ModalContextType {
  openModal: (content: ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalShell: React.FC<{ modal: ModalInstance; onClose: (id: string) => void }> = ({ modal, onClose }) => {
  const isTop = modal.options.position === 'top';
  
  // Handle Escape key specifically for this modal stack item if needed, 
  // but usually global handler or backdrop click is enough.
  
  if (!modal.isOpen) return null; // Or handle exit animation here

  return (
    <div 
      className={`absolute inset-0 z-50 flex ${isTop ? 'items-start pt-32' : 'items-center'} justify-center bg-black/60 dark:bg-black/60 backdrop-blur animate-fade-in p-4`}
      onClick={() => modal.options.closeOnOutsideClick && onClose(modal.id)}
    >
      {/* Prevent clicks inside content from closing modal */}
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg">
        {modal.content}
      </div>
    </div>
  );
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalInstance[]>([]);

  const openModal = useCallback((content: ReactNode, options: ModalOptions = {}) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newModal: ModalInstance = {
      id,
      content,
      options: {
        position: 'center',
        closeOnOutsideClick: true,
        ...options
      },
      isOpen: true
    };
    
    setModals(prev => [...prev, newModal]);
  }, []);

  const closeUniqueModal = useCallback((id: string) => {
    setModals(prev => prev.map(modal => 
      modal.id === id ? { ...modal, isOpen: false } : modal
    ));

    // Remove from DOM immediately for now (can add delay for exit animation later)
    setModals(prev => prev.filter(modal => modal.id !== id));
  }, []);

  const closeModal = useCallback(() => {
    setModals(prev => {
      const lastOpen = [...prev].reverse().find(m => m.isOpen);
      if (!lastOpen) return prev;
      // We can't call closeUniqueModal directly inside setState updater effectively without side effects, 
      // so we just return the filtered state here for simplicity in this pattern.
      return prev.filter(m => m.id !== lastOpen.id);
    });
  }, []);

  const closeAllModals = useCallback(() => {
    setModals([]); 
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, closeAllModals }}>
      {children}
      {modals.map((modal) => (
        <ModalShell 
          key={modal.id} 
          modal={modal} 
          onClose={closeUniqueModal} 
        />
      ))}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};