import React from 'react';
import { Bus, BookOpen, Building, Calendar, Smartphone } from 'lucide-react';

export type TabType = 'bus' | 'books' | 'hostels' | 'timetable' | 'apk';

interface BottomNavProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChangeTab }) => {
  const tabs = [
    { id: 'bus' as TabType, label: 'Bus', icon: Bus },
    { id: 'books' as TabType, label: 'Books', icon: BookOpen },
    { id: 'hostels' as TabType, label: 'Hostels', icon: Building },
    { id: 'timetable' as TabType, label: 'Timetable', icon: Calendar },
    { id: 'apk' as TabType, label: 'APK App', icon: Smartphone },
  ];

  return (
    <nav className="w-full bg-white border-t border-slate-100 px-2 py-1.5 flex items-center justify-around z-20 shadow-lg shadow-slate-200/50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-all duration-200 ${
              isActive
                ? 'text-white bg-teal-600 shadow-sm shadow-teal-600/30 font-bold scale-[1.02]'
                : 'text-slate-500 hover:text-teal-600 font-medium'
            }`}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] tracking-tight leading-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
