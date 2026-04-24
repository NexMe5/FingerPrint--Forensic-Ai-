import React from 'react';
import { cn } from '../lib/utils';

export const FingerprintLogo = ({ className = "h-8 w-8", textClassName = "text-xl" }: { className?: string; textClassName?: string }) => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <div className={cn("flex items-center justify-center text-primary transition-transform group-hover:scale-110", className)}>
      <span className="material-symbols-outlined text-[1.5em]">fingerprint</span>
    </div>
    <span className={cn("font-black tracking-tight text-navy-deep", textClassName)}>FingerPrint</span>
  </div>
);

export const StatusBadge = ({ status }: { status: string }) => {
  const getStyles = () => {
    switch (status.toUpperCase()) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-700 ring-red-600/20';
      case 'HIGH':
        return 'bg-orange-100 text-orange-700 ring-orange-600/20';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-700 ring-yellow-600/20';
      case 'LOW':
        return 'bg-blue-100 text-blue-700 ring-blue-600/20';
      default:
        return 'bg-slate-100 text-slate-700 ring-slate-600/20';
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase ring-1 ring-inset",
      getStyles()
    )}>
      {status}
    </span>
  );
};
