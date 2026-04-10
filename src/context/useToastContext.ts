import { useContext } from 'react';
import { ToastContext } from './ToastContext';

/**
 * Returns toast context functions and enforces provider usage.
 */
export const useToastContext = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToastContext must be used within a ToastProvider');
    }

    return context;
};