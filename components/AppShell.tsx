import React from 'react';
import { DeviceType } from '../types';
import { Signal, Wifi, Battery, ChevronLeft, Lock, RefreshCw, Smartphone, Monitor } from 'lucide-react';

interface AppShellProps {
  title: string;
  device: DeviceType;
  children: React.ReactNode;
  className?: string;
}

export const AppShell: React.FC<AppShellProps> = ({ title, device, children, className = '' }) => {
  const isMobile = device === DeviceType.MOBILE;

  if (isMobile) {
    return (
      <div className={`relative bg-white rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ease-in-out ${className}`}
           style={{ width: '320px', height: '640px' }}>
        
        {/* Dynamic Island / Notch Area */}
        <div className="bg-slate-800 text-white px-6 pt-3 pb-1 flex justify-between items-center text-xs select-none z-20">
          <span className="font-semibold">9:41</span>
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-20"></div>
          <div className="flex gap-1.5 items-center">
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={12} />
          </div>
        </div>

        {/* App Content */}
        <div className="flex-1 overflow-hidden relative bg-slate-50 flex flex-col">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-800 rounded-full z-20 opacity-20"></div>
      </div>
    );
  }

  // Desktop View
  return (
    <div className={`relative bg-white rounded-lg border border-slate-300 shadow-xl overflow-hidden flex flex-col transition-all duration-500 ease-in-out ${className}`}
         style={{ width: '800px', height: '540px' }}>
      
      {/* Browser Toolbar */}
      <div className="bg-slate-100 border-b border-slate-200 h-10 flex items-center px-4 gap-4 select-none">
        {/* Traffic Lights */}
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
        </div>

        {/* Navigation & URL Bar */}
        <div className="flex-1 flex gap-3 items-center">
          <div className="flex gap-2 text-slate-400">
            <ChevronLeft size={16} />
            <ChevronLeft size={16} className="rotate-180" />
            <RefreshCw size={14} />
          </div>
          <div className="flex-1 bg-white border border-slate-200 rounded-md h-7 flex items-center px-3 text-xs text-slate-600 gap-2">
            <Lock size={10} className="text-emerald-600" />
            <span>app.assetmanager.io/{title.toLowerCase().replace(/\s/g, '-')}</span>
          </div>
        </div>
      </div>

      {/* App Content */}
      <div className="flex-1 overflow-hidden relative bg-slate-50 flex flex-col">
        {children}
      </div>
    </div>
  );
};