import { useCallback, useState, type ReactNode } from 'react';
import type { ModalInstance, ModalOptions } from '../types';
import { ModalContext } from './ModalContext';

type ModalShellProps = {
  modal: ModalInstance;
  onClose: (id: string) => void;
};

/**
 * Internal shell that renders a single modal layer and backdrop behavior.
 */
const ModalShell = ({ modal, onClose }: ModalShellProps) => {
  const isTop = modal.options.position === 'top';
  const isFullscreenOnMobile = modal.options.fullscreenOnMobile;

  if (!modal.isOpen) return null;

  return (
    <div
      className={`absolute inset-0 z-50 flex bg-black/60 dark:bg-black/60 backdrop-blur animate-fade-in ${isFullscreenOnMobile ? 'items-stretch justify-stretch p-0 md:items-center md:justify-center md:p-4' : `${isTop ? 'items-start pt-32' : 'items-center'} justify-center p-4`}`}
      onClick={() => modal.options.closeOnOutsideClick && onClose(modal.id)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={isFullscreenOnMobile ? 'h-full w-full md:h-auto md:max-w-lg' : 'w-full max-w-lg'}
      >
        {modal.content}
      </div>
    </div>
  );
};

/**
 * Modal state provider managing a stack of modal instances.
 */
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
        ...options,
      },
      isOpen: true,
    };

    setModals((prev) => [...prev, newModal]);
  }, []);

  const closeUniqueModal = useCallback((id: string) => {
    setModals((prev) => prev.map((modal) => (modal.id === id ? { ...modal, isOpen: false } : modal)));
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  }, []);

  const closeModal = useCallback(() => {
    setModals((prev) => {
      const lastOpen = [...prev].reverse().find((modal) => modal.isOpen);
      if (!lastOpen) return prev;
      return prev.filter((modal) => modal.id !== lastOpen.id);
    });
  }, []);

  const closeAllModals = useCallback(() => {
    setModals([]);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, closeAllModals }}>
      {children}
      {modals.map((modal) => (
        <ModalShell key={modal.id} modal={modal} onClose={closeUniqueModal} />
      ))}
    </ModalContext.Provider>
  );
};
