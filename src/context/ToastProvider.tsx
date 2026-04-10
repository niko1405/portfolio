import { useCallback, useState } from 'react';
import { ToastContext } from './ToastContext';
import type { Toast, ToastContextType } from './ToastContext';

/**
 * Provides toast state and toast lifecycle handlers.
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const addToast = useCallback(
        (message: string, type: 'success' | 'error' | 'info' = 'success', duration = 3000) => {
            const id = Date.now().toString();
            const toast: Toast = { id, message, type, duration };

            setToasts(prev => [...prev, toast]);

            if (duration > 0) {
                window.setTimeout(() => {
                    removeToast(id);
                }, duration);
            }
        },
        [removeToast]
    );

    const value: ToastContextType = { toasts, addToast, removeToast };

    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    );
};