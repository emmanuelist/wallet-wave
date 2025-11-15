import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />
  };

  const backgrounds = {
    success: 'from-green-500/20 to-green-600/20 border-green-500/50',
    error: 'from-red-500/20 to-red-600/20 border-red-500/50',
    info: 'from-blue-500/20 to-blue-600/20 border-blue-500/50'
  };

  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl bg-gradient-to-br ${backgrounds[type]} animate-slide-in shadow-2xl`}>
      {icons[type]}
      <p className="text-white font-medium">{message}</p>
      <button onClick={onClose} className="ml-2 hover:bg-white/10 rounded-lg p-1 transition-colors">
        <X className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}
