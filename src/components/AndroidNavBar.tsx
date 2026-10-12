import React from 'react';

interface AndroidNavBarProps {
  onBack?: () => void;
  onHome?: () => void;
  onRecents?: () => void;
  mode?: 'buttons' | 'gesture';
}

export const AndroidNavBar: React.FC<AndroidNavBarProps> = ({
  onBack,
  onHome,
  onRecents,
  mode = 'buttons'
}) => {
  if (mode === 'gesture') {
    return (
      <div className="w-full flex items-center justify-center py-2 bg-white select-none">
        <div className="w-32 h-1 bg-slate-400 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-8 bg-slate-900/95 text-white flex items-center justify-around px-8 select-none border-t border-slate-800">
      {/* Back button (Triangle) */}
      <button
        onClick={onBack}
        className="p-1 hover:text-teal-400 active:scale-90 transition-transform focus:outline-none"
        title="Back"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="19,4 5,12 19,20" />
        </svg>
      </button>

      {/* Home button (Circle) */}
      <button
        onClick={onHome}
        className="p-1 hover:text-teal-400 active:scale-90 transition-transform focus:outline-none"
        title="Home"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="8" />
        </svg>
      </button>

      {/* Recents button (Square) */}
      <button
        onClick={onRecents}
        className="p-1 hover:text-teal-400 active:scale-90 transition-transform focus:outline-none"
        title="Recent Apps"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="5" y="5" width="14" height="14" rx="2" />
        </svg>
      </button>
    </div>
  );
};
