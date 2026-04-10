import { useToastContext } from "../context";

/**
 * Convenience wrapper around toast context with typed helpers per toast kind.
 */
export const useToast = () => {
  const { addToast } = useToastContext();

  return {
    success: (message: string, duration?: number) => addToast(message, 'success', duration),
    error: (message: string, duration?: number) => addToast(message, 'error', duration),
    info: (message: string, duration?: number) => addToast(message, 'info', duration),
  };
};
