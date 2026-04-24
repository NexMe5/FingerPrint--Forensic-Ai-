import React from 'react';

export const LandingPage: React.FC<{ onAnalyze: () => void }> = ({ onAnalyze }) => {
  return (
    <div className="font-display bg-background-light text-slate-900 selection:bg-primary/20 min-h-screen overflow-y-auto">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">fingerprint</span>
            <span className="text-2xl font-black tracking-tight text-navy-deep">FingerPrint</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#">Home</a>
            <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#how-it-works">How It Works</a>
            <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#features">Features</a>
            <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#backtests">Backtests</a>
            <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onAnalyze} className="px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-primary transition-colors">Sign In</button>
            <button onClick={onAnalyze} className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-primary/30 transition-all">Get Started Free</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
              <span className="material-symbols-outlined text-primary text-sm">search</span>
              <span className="text-primary text-xs font-bold uppercase tracking-wider">AI-Powered Financial Forensics</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Detect Corporate Fraud <span className="text-primary">Before</span> The Market Does
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Our AI-driven forensics engine analyzes SEC filings, earnings transcripts, and linguistic patterns to expose hidden manipulation risks that traditional audits miss.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={onAnalyze} className="bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-[1.02] transition-transform">
                Analyze a Company <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button className="border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold hover:bg-primary/5 transition-colors">
                See Live Demo
              </button>
            </div>
          </div>
          <div className="relative">
            {/* Floating Card UI Mockup */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-2xl relative z-10">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                <div>
                  <h3 className="font-black text-navy-deep text-xl">ENRON CORP (ENE)</h3>
                  <p className="text-slate-500 text-xs">Analysis Date: Oct 2001</p>
                </div>
                <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-center">
                  <p className="text-[10px] font-bold uppercase opacity-80">Risk Score</p>
                  <p className="text-xl font-black leading-none">87/100</p>
                  <p className="text-[10px] font-bold">CRITICAL</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-500">payments</span>
                    <span className="text-sm font-semibold text-slate-700">Financial Anomalies</span>
                  </div>
                  <span className="bg-red-100 text-red-600 text-[10px] px-2 py-1 rounded font-black">HIGH RISK</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-orange-500">record_voice_over</span>
                    <span className="text-sm font-semibold text-slate-700">Linguistic Deception</span>
                  </div>
                  <span className="bg-orange-100 text-orange-600 text-[10px] px-2 py-1 rounded font-black">WARNING</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-500">sync_alt</span>
                    <span className="text-sm font-semibold text-slate-700">Reporting Consistency</span>
                  </div>
                  <span className="bg-blue-100 text-blue-600 text-[10px] px-2 py-1 rounded font-black">STABLE</span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="text-[10px] px-2 py-1 bg-slate-200 rounded-full font-bold text-slate-600">Off-balance sheet debt</span>
                <span className="text-[10px] px-2 py-1 bg-slate-200 rounded-full font-bold text-slate-600">Complex SPEs</span>
                <span className="text-[10px] px-2 py-1 bg-slate-200 rounded-full font-bold text-slate-600">LIFO/FIFO Drift</span>
              </div>
            </div>
            {/* Background decorative elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-slate-100 border-y border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-3xl font-black text-navy-deep">500+</p>
            <p className="text-sm text-slate-500 font-medium">Companies Scanned</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-navy-deep">6</p>
            <p className="text-sm text-slate-500 font-medium">Major Frauds Detected</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-navy-deep">83%</p>
            <p className="text-sm text-slate-500 font-medium">Accuracy Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-navy-deep">3</p>
            <p className="text-sm text-slate-500 font-medium">Signal Analysis Layers</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section className="py-24 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-navy-deep mb-4">Triple-Layer Forensic Engine</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">We use multi-modal AI to cross-reference data points and find inconsistencies the human eye misses.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connectors for Desktop */}
            <div className="hidden md:block absolute top-1/3 left-1/4 w-[20%] border-t-2 border-dashed border-slate-200"></div>
            <div className="hidden md:block absolute top-1/3 left-[58%] w-[20%] border-t-2 border-dashed border-slate-200"></div>
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-4xl">search_insights</span>
              </div>
              <h3 className="text-xl font-bold mb-3">1. Input Ticker</h3>
              <p className="text-slate-500">Provide any public stock ticker or upload raw SEC filings directly for scanning.</p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-4xl">psychology</span>
              </div>
              <h3 className="text-xl font-bold mb-3">2. AI Triple-Layer Analysis</h3>
              <p className="text-slate-500">Financial ratios, linguistic sentiment, and cross-filing consistency checks run in parallel.</p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-4xl">description</span>
              </div>
              <h3 className="text-xl font-bold mb-3">3. Risk Score + Report</h3>
              <p className="text-slate-500">Receive a detailed risk assessment and evidence dossier pinpointing red flags.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-black text-navy-deep mb-4">Core Analysis Modules</h2>
            <div className="h-1.5 w-24 bg-primary rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-shadow">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">calculate</span>
              <h4 className="text-xl font-bold mb-4">Beneish M-Score</h4>
              <p className="text-slate-500">Automated calculation of the 8 variables that identify earnings manipulation through financial reporting.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-shadow">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">analytics</span>
              <h4 className="text-xl font-bold mb-4">Altman Z-Score</h4>
              <p className="text-slate-500">Forecasting bankruptcy risk and financial distress with real-time sector adjustments.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-shadow">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">sentiment_dissatisfied</span>
              <h4 className="text-xl font-bold mb-4">Linguistic Tone Analyzer</h4>
              <p className="text-slate-500">Detecting deceptive speech patterns, excessive optimism, and avoidance of negative terms in earnings calls.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-shadow">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">compare_arrows</span>
              <h4 className="text-xl font-bold mb-4">Consistency Checker</h4>
              <p className="text-slate-500">Verifying that numbers cited in text match figures in financial statements across multiple quarters.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-shadow">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">trending_down</span>
              <h4 className="text-xl font-bold mb-4">Narrative Tone Drift</h4>
              <p className="text-slate-500">Tracking how executive narratives change over time relative to actual financial performance.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-shadow">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">picture_as_pdf</span>
              <h4 className="text-xl font-bold mb-4">Full PDF Export</h4>
              <p className="text-slate-500">Generate professional audit-ready reports for internal compliance or investment committee reviews.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Backtest Showcase */}
      <section className="py-24 bg-navy-deep text-white" id="backtests">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Case Studies</span>
            <h2 className="text-4xl font-black mt-2">Proven on Real Scandals</h2>
            <p className="text-slate-400 mt-4">See how FingerPrint would have flagged major collapses before they happened.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-2xl font-bold">Enron</h4>
                <span className="bg-primary px-3 py-1 rounded text-xs font-black">87/100 RISK</span>
              </div>
              <p className="text-slate-400 mb-6 italic">"Flagged critical SPE (Special Purpose Entity) anomalies and linguistic hedging patterns."</p>
              <div className="pt-6 border-t border-white/10">
                <p className="text-primary font-bold">14 Months Before</p>
                <p className="text-xs text-slate-500 uppercase font-bold">First Red Flag Detected</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-2xl font-bold">Wirecard</h4>
                <span className="bg-primary px-3 py-1 rounded text-xs font-black">92/100 RISK</span>
              </div>
              <p className="text-slate-400 mb-6 italic">"Detected circular cash flows and inconsistent auditor correspondence patterns."</p>
              <div className="pt-6 border-t border-white/10">
                <p className="text-primary font-bold">18 Months Before</p>
                <p className="text-xs text-slate-500 uppercase font-bold">Initial Fraud Signal</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-2xl font-bold">Theranos</h4>
                <span className="bg-primary px-3 py-1 rounded text-xs font-black">81/100 RISK</span>
              </div>
              <p className="text-slate-400 mb-6 italic">"Identified massive discrepancy between revenue claims and patent filing activity."</p>
              <div className="pt-6 border-t border-white/10">
                <p className="text-primary font-bold">9 Months Before</p>
                <p className="text-xs text-slate-500 uppercase font-bold">Risk Level Critical</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center mb-16 text-navy-deep">Trusted by Forensics Analysts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl relative">
              <span className="material-symbols-outlined text-primary text-6xl absolute -top-4 -left-4 opacity-20">format_quote</span>
              <p className="text-slate-700 leading-relaxed mb-8 relative z-10">"FingerPrint cut our initial screening time by 70%. It finds patterns in MD&amp;A sections that we previously needed hours to cross-reference manually."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-300 rounded-full"></div>
                <div>
                  <p className="font-bold text-navy-deep">Sarah Jenkins</p>
                  <p className="text-xs text-slate-500 uppercase font-bold">Senior Auditor, Tier-1 Bank</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl relative">
              <span className="material-symbols-outlined text-primary text-6xl absolute -top-4 -left-4 opacity-20">format_quote</span>
              <p className="text-slate-700 leading-relaxed mb-8 relative z-10">"The linguistic tone analyzer is a game-changer for our short-selling thesis development. It catches management's 'poker tells' with uncanny accuracy."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-300 rounded-full"></div>
                <div>
                  <p className="font-bold text-navy-deep">Marcus Thorne</p>
                  <p className="text-xs text-slate-500 uppercase font-bold">Managing Director, Alpha Short Fund</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl relative">
              <span className="material-symbols-outlined text-primary text-6xl absolute -top-4 -left-4 opacity-20">format_quote</span>
              <p className="text-slate-700 leading-relaxed mb-8 relative z-10">"Reliable, deep-level data that goes beyond the standard financial ratios. It's the most comprehensive manipulation detector I've used in 15 years."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-300 rounded-full"></div>
                <div>
                  <p className="font-bold text-navy-deep">David Chen</p>
                  <p className="text-xs text-slate-500 uppercase font-bold">Head of Compliance, Global Invest</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-gradient-to-r from-primary to-red-800 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-primary/20 opacity-50 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Start Detecting Manipulation Today</h2>
            <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto font-medium">Join 200+ hedge funds and audit firms using FingerPrint to protect their downside and expose financial fraud.</p>
            <button onClick={onAnalyze} className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-100 transition-colors shadow-xl">
              Analyze Now — It's Free to Start
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-deep py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6 text-white">
                <span className="material-symbols-outlined text-primary text-3xl">fingerprint</span>
                <span className="text-2xl font-black tracking-tight">FingerPrint</span>
              </div>
              <p className="text-slate-400 mb-8 max-w-xs">The world's first AI-powered forensic engine built specifically for institutional-grade earnings manipulation detection.</p>
              <div className="flex gap-4">
                <a className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-colors" href="#">
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                </a>
                <a className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-colors" href="#">
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
              </div>
            </div>
            <div>
              <h5 className="font-bold text-white mb-6">Product</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">Forensics Engine</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Backtest Library</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">API Access</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-6">Company</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Press Kit</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-6">Resources</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">Fraud Blog</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Research Papers</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Documentation</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">SEC Guide</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-slate-500 text-xs gap-4">
            <p>© 2024 FingerPrint Financial Forensics. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
              <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
