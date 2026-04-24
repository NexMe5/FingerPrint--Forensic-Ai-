import React, { useState } from 'react';

interface CompareCompaniesProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onLogout: () => void;
}

export const CompareCompanies: React.FC<CompareCompaniesProps> = ({ activeView, setActiveView, onLogout }) => {
  const [companyA, setCompanyA] = useState('TechFlow Inc.');
  const [companyB, setCompanyB] = useState('Global Retail Ltd.');

  return (
    <div className="font-display bg-background-light text-slate-900 min-h-screen overflow-y-auto">
      {/* Top Navigation Bar */}
      {activeView !== 'benchmarks' && (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 lg:px-40 py-4 bg-white backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-3 text-primary">
            <div className="size-8">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" />
              </svg>
            </div>
            <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-tight">FingerPrint</h2>
          </div>
          <div className="hidden md:flex flex-1 justify-end gap-8">
            <nav className="flex items-center gap-8">
              <button onClick={() => setActiveView('dashboard')} className={`text-sm font-medium transition-colors ${activeView === 'dashboard' ? 'text-primary border-b-2 border-primary pb-1 font-bold' : 'text-slate-600 hover:text-primary'}`}>Dashboard</button>
              <button onClick={() => setActiveView('compare')} className={`text-sm font-medium transition-colors ${activeView === 'compare' ? 'text-primary border-b-2 border-primary pb-1 font-bold' : 'text-slate-600 hover:text-primary'}`}>Compare</button>
              <button onClick={() => setActiveView('archive')} className={`text-sm font-medium transition-colors ${activeView === 'archive' ? 'text-primary border-b-2 border-primary pb-1 font-bold' : 'text-slate-600 hover:text-primary'}`}>Reports</button>
            </nav>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20 cursor-pointer" onClick={onLogout} title="Logout" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAPEG31TLtYT_cx2moSYpB-cFyBtkOchu3vNMXlmzONe4h1dqMW1XrmJbpq9Xjfe5hVfULGAmjPuOVmfMLrL9EL3J4O2HZkKEFugnU14Y5Y5ndiTA11rMVKDhi5phMh1Hk0rWS7ZpdyPFYOvw14ylMnx3fMFrYBUWi0mrIpBhf3hayr_JvJY0zQgf7dVFDqQPnPJKZS2Ag5hUUamXFj8xTh6RWcfbs5YEIsRcLmPS4kGPryGijfMmwq49rHvaIIxulKSYOotSK2zLc8")'}}></div>
          </div>
          <button className="md:hidden text-slate-900">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>
      )}

      <main className="max-w-[1280px] mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-tight mb-2">Compare Companies</h1>
          <p className="text-slate-500 text-lg">Analyze financial risk metrics side-by-side to identify anomalies.</p>
        </div>

        {/* Input Section */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-primary/5 mb-8">
          <div className="flex flex-col lg:flex-row items-end gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow w-full">
              <label className="flex flex-col gap-2">
                <span className="text-slate-700 text-sm font-semibold uppercase tracking-wider">Company A</span>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                  <input className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="Search first company (e.g. Acme Corp)" value={companyA} onChange={(e) => setCompanyA(e.target.value)} />
                </div>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-slate-700 text-sm font-semibold uppercase tracking-wider">Company B</span>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                  <input className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="Search second company (e.g. Globex)" value={companyB} onChange={(e) => setCompanyB(e.target.value)} />
                </div>
              </label>
            </div>
            <button className="w-full lg:w-48 bg-primary hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">compare_arrows</span>
              Compare
            </button>
          </div>
        </section>

        {/* Results Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Company A Card */}
          <div className="bg-white rounded-xl p-6 border-l-4 border-primary shadow-sm h-fit">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">corporate_fare</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{companyA}</h3>
                <p className="text-sm text-slate-500">Nasdaq: TFLOW</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-600">M-Score</span>
                <span className="text-sm font-bold text-green-600">-2.84 (Safe)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-600">Z-Score</span>
                <span className="text-sm font-bold text-green-600">3.12 (Strong)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-600">Tone Sentiment</span>
                <span className="text-sm font-bold text-slate-900">Positive</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold text-sm">
                <span className="material-symbols-outlined text-base">verified_user</span>
                {companyA} is lower risk
              </div>
            </div>
          </div>

          {/* Radar Chart Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
            <h4 className="text-slate-900 font-bold mb-8 text-center uppercase tracking-widest text-xs">Risk Metric Distribution</h4>
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              {/* Simplified Radar Chart Visualization using CSS */}
              <div className="absolute inset-0 border border-slate-200 radar-grid opacity-50 rounded-full"></div>
              <div className="absolute inset-8 border border-slate-200 radar-grid opacity-50 rounded-full"></div>
              <div className="absolute inset-16 border border-slate-200 radar-grid opacity-50 rounded-full"></div>
              <div className="absolute inset-24 border border-slate-200 radar-grid opacity-50 rounded-full"></div>
              {/* Metric Labels */}
              <span className="absolute -top-6 text-[10px] font-bold text-slate-400">M-SCORE</span>
              <span className="absolute -right-12 top-1/4 text-[10px] font-bold text-slate-400">Z-SCORE</span>
              <span className="absolute -bottom-6 left-1/4 text-[10px] font-bold text-slate-400">CONSISTENCY</span>
              <span className="absolute -bottom-6 right-1/4 text-[10px] font-bold text-slate-400">ACCRUALS</span>
              <span className="absolute -left-12 top-1/4 text-[10px] font-bold text-slate-400">TONE</span>
              {/* Company A Data Overlay (Red) */}
              <svg className="absolute inset-0 w-full h-full transform rotate-0" viewBox="0 0 100 100">
                <polygon fill="rgba(230, 0, 0, 0.4)" points="50,15 85,40 75,85 25,85 15,40" stroke="#e60000" strokeWidth="2"></polygon>
              </svg>
              {/* Company B Data Overlay (Gray) */}
              <svg className="absolute inset-0 w-full h-full transform rotate-0" viewBox="0 0 100 100">
                <polygon fill="rgba(100, 116, 139, 0.4)" points="50,35 65,45 60,65 40,65 35,45" stroke="#64748b" strokeWidth="2"></polygon>
              </svg>
            </div>
            <div className="mt-12 flex gap-6 text-xs font-bold">
              <div className="flex items-center gap-2">
                <div className="size-3 bg-primary rounded-full"></div>
                <span className="text-slate-600">{companyA}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 bg-slate-500 rounded-full"></div>
                <span className="text-slate-600">{companyB}</span>
              </div>
            </div>
          </div>

          {/* Company B Card */}
          <div className="bg-white rounded-xl p-6 border-l-4 border-slate-400 shadow-sm h-fit">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                <span className="material-symbols-outlined text-3xl">storefront</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{companyB}</h3>
                <p className="text-sm text-slate-500">LSE: GRL</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-600">M-Score</span>
                <span className="text-sm font-bold text-red-600">-1.62 (Warning)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-600">Z-Score</span>
                <span className="text-sm font-bold text-orange-500">1.45 (Caution)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-600">Tone Sentiment</span>
                <span className="text-sm font-bold text-slate-900">Neutral-Negative</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-500 rounded-full font-bold text-sm">
                <span className="material-symbols-outlined text-base">report_problem</span>
                Higher Risk Potential
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <section className="mt-12 bg-white rounded-xl shadow-sm border border-primary/5 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Detailed Risk Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Metric</th>
                  <th className="px-6 py-4 text-xs font-bold text-primary uppercase text-right">{companyA}</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">{companyB}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">Consistency Score</p>
                    <p className="text-xs text-slate-400">Quarterly revenue variation</p>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-green-600">0.94 (High)</td>
                  <td className="px-6 py-4 text-right font-medium text-orange-500">0.42 (Low)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">Accruals Quality</p>
                    <p className="text-xs text-slate-400">Net income vs Cash flow</p>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">Normal</td>
                  <td className="px-6 py-4 text-right font-medium text-red-600">Divergent</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">Audit Risk</p>
                    <p className="text-xs text-slate-400">History of restatements</p>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">Clean</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">1 Correction</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-10 mt-20">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 text-slate-400">
            <div className="size-6">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" />
              </svg>
            </div>
            <span className="text-sm font-bold">FingerPrint Risk Intelligence © 2024</span>
          </div>
          <div className="flex gap-8">
            <a className="text-xs font-medium text-slate-400 hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="text-xs font-medium text-slate-400 hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="text-xs font-medium text-slate-400 hover:text-primary transition-colors" href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
