import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { FingerprintLogo } from './Common';
import { 
  LayoutDashboard, 
  Search, 
  History, 
  Settings, 
  ShieldAlert, 
  BarChart3,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'scanner', label: 'Live Scanner', icon: Search },
    { id: 'vault', label: 'Evidence Vault', icon: ShieldAlert },
    { id: 'archive', label: 'Archive', icon: History },
    { id: 'benchmarks', label: 'Sector Risks', icon: BarChart3 },
  ];

  return (
    <aside className="hidden md:flex w-72 border-r bg-white flex-col z-50">
      <div className="p-8 border-b border-slate-100 cursor-pointer" onClick={onLogout}>
        <FingerprintLogo />
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Main Navigation</p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group",
              activeView === item.id
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-slate-500 hover:bg-slate-50 hover:text-primary"
            )}
          >
            <item.icon className={cn("h-5 w-5", activeView === item.id ? "text-white" : "text-slate-400 group-hover:text-primary")} />
            {item.label}
            {activeView === item.id && (
              <motion.div layoutId="nav-pill" className="ml-auto w-1 h-5 bg-white/40 rounded-full" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button
          onClick={() => setActiveView('settings')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-slate-500 hover:bg-slate-50 hover:text-primary mb-2",
            activeView === 'settings' && "bg-slate-50 text-primary"
          )}
        >
          <Settings className="h-5 w-5" />
          Settings
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>

      <div className="p-6">
        <div className="p-4 bg-navy-deep rounded-2xl text-white relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-xs font-bold opacity-60 mb-1 tracking-widest uppercase">Analysis Status</p>
            <p className="text-sm font-black mb-3">Enterprise Node 01</p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Live & Synchronized</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-125 transition-transform">
            <span className="material-symbols-outlined text-4xl">security</span>
          </div>
        </div>
      </div>
    </aside>
  );
};


export default Sidebar;

