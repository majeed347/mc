import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="bg-slate-900/90 text-white px-4 py-2.5 rounded-full shadow-xl backdrop-blur-xs flex items-center gap-2 text-xs font-semibold max-w-xs text-center border border-slate-700/50">
        <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />
        <span className="truncate">{message}</span>
      </div>
    </div>
  );
};
