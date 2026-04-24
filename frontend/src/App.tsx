import React, { useState, useEffect } from 'react';
import { Sidebar } from './features/Sidebar';
import { Dashboard } from './features/Dashboard';
import { LiveScanner } from './features/LiveScanner';
import { EvidenceVault } from './features/EvidenceVault';
import { ArchiveView } from './features/ArchiveView';
import { CompareCompanies } from './features/CompareCompanies';
import { LandingPage } from './features/LandingPage';
import { ResultsView } from './features/ResultsView';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedReport, setSelectedReport] = useState<any>(null);

  useEffect(() => {
    console.log("RENDER_SUCCESS");
  }, []);

  const handleAnalyzeStart = () => {
    setIsLoggedIn(true);
    setActiveView('scanner');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveView('dashboard');
    setSelectedReport(null);
  };

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setActiveView('results');
  };

  if (!isLoggedIn) {
    return <LandingPage onAnalyze={handleAnalyzeStart} />;
  }

  const isLegacyView = ['dashboard', 'scanner', 'vault', 'results', 'archive', 'benchmarks'].includes(activeView);

  const renderContent = () => {
    if (selectedReport && activeView === 'results') {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={() => {
                setSelectedReport(null);
                setActiveView('archive');
              }}
              className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back to Archive
            </button>
          </div>
          <ResultsView data={selectedReport} />
        </div>
      );
    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'scanner':
        return <LiveScanner onComplete={(data) => handleViewReport(data)} />;
      case 'vault':
        return <EvidenceVault />;
      case 'archive':
        return <ArchiveView onAnalyzeNew={() => setActiveView('scanner')} onViewReport={handleViewReport} />;
      case 'benchmarks':
      case 'compare':
        return <CompareCompanies activeView={activeView} setActiveView={setActiveView} onLogout={handleLogout} />;
      default:
        return <Dashboard />;
    }
  };

  const content = (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeView + (selectedReport ? selectedReport.id : '')}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.2 }}
        className="h-full w-full"
      >
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="flex h-screen bg-background-light overflow-hidden">
      {isLegacyView ? (
        <>
          <Sidebar 
            activeView={activeView} 
            setActiveView={(view) => {
              setActiveView(view);
              setSelectedReport(null);
            }} 
            onLogout={handleLogout} 
          />
          <main className="flex-1 flex flex-col min-w-0 bg-background-light overflow-hidden">
            <header className="h-20 border-b border-slate-100 bg-white flex items-center justify-between px-8 shrink-0">
              <div>
                <h2 className="text-xl font-black text-navy-deep capitalize">{activeView.replace('-', ' ')}</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Forensic Node Access</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors relative">
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white" />
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                  <div className="text-right">
                    <p className="text-sm font-black text-navy-deep">Forensic Lead</p>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Tier-1 Access</p>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center font-black">
                    FL
                  </div>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {content}
            </div>
          </main>
        </>
      ) : (
        <main className="flex-1 min-w-0 overflow-y-auto custom-scrollbar">
          {content}
        </main>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
