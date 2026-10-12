import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface AndroidStatusBarProps {
  darkTheme?: boolean;
}

export const AndroidStatusBar: React.FC<AndroidStatusBarProps> = ({ darkTheme = false }) => {
  const [timeStr, setTimeStr] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      setTimeStr(`${hours}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full flex items-center justify-between px-6 pt-2 pb-1 text-xs font-semibold select-none z-30 transition-colors ${
      darkTheme ? 'text-white' : 'text-slate-800'
    }`}>
      <span className="tracking-tight text-[11px] font-bold">{timeStr}</span>
      <div className="flex items-center gap-1.5 opacity-90">
        <span className="text-[10px] font-bold tracking-tighter">5G</span>
        <Signal className="w-3 h-3 stroke-[2.2]" />
        <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
        <div className="flex items-center gap-0.5">
          <span className="text-[9px] font-mono font-medium">92%</span>
          <BatteryMedium className="w-3.5 h-3.5 stroke-[2.2]" />
        </div>
      </div>
    </div>
  );
};
