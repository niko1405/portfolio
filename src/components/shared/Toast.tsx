import { useToastContext } from '../../context/useToastContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastContext();

  const getIcon = (type: 'success' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} className="text-green-400" />;
      case 'error':
        return <AlertCircle size={18} className="text-red-400" />;
      case 'info':
        return <Info size={18} className="text-blue-400" />;
    }
  };

  const getBgColor = (type: 'success' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/30';
      case 'error':
        return 'bg-red-500/10 border-red-500/30';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/30';
    }
  };

  const getTextColor = (type: 'success' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return 'text-green-300';
      case 'error':
        return 'text-red-300';
      case 'info':
        return 'text-blue-300';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-70 flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`${getBgColor(toast.type)} border rounded-lg px-4 py-3 flex items-center gap-3 min-w-75 backdrop-blur-sm pointer-events-auto animate-in fade-in slide-in-from-right-4 duration-300`}
        >
          {getIcon(toast.type)}
          <span className={`text-sm font-mono ${getTextColor(toast.type)} flex-1`}>
            {toast.message}
          </span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 opacity-50 hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
