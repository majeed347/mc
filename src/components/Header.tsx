import React from 'react';
import { Download, Bell, User as UserIcon } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile | null;
  onOpenApkModal: () => void;
  onOpenProfile: () => void;
  onShowToast: (msg: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenApkModal,
  onOpenProfile,
  onShowToast,
}) => {
  return (
    <header className="flex items-center justify-between px-5 py-3 bg-white border-b border-slate-100 z-20">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm shadow-teal-500/20">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 2L11 13" />
            <path d="M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-sm tracking-tight text-slate-900 leading-none">Travel</span>
          <span className="font-extrabold text-sm tracking-tight text-teal-600 leading-none">Connect</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* APK / Install Quick Action Button */}
        <button
          onClick={onOpenApkModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200/80 text-xs font-bold transition-all active:scale-95 shadow-sm"
          title="Install Android App / Download APK"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>APK</span>
        </button>

        {/* Notifications */}
        <button
          onClick={() => onShowToast('No new notifications. All schedules up to date!')}
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:text-teal-600 hover:bg-slate-50 transition-colors active:scale-90"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
        </button>

        {/* Profile Avatar */}
        <button
          onClick={onOpenProfile}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-teal-100 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-teal-700 transition-colors active:scale-90 overflow-hidden"
          title="Profile & Bookings"
        >
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <UserIcon className="w-4 h-4" />
          )}
        </button>
      </div>
    </header>
  );
};
