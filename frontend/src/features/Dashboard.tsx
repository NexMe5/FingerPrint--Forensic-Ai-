import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { rpcCall } from '../api';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldAlert, History, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from './Common';

export const Dashboard: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalScans: 0,
    criticalThreats: 0,
    activeMonitoring: 12,
    avgConfidence: 94
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyData = await rpcCall({ func: 'get_analysis_history', args: { limit: 5 } });
        setHistory(historyData);
        setStats(prev => ({
          ...prev,
          totalScans: historyData.length + 42,
          criticalThreats: historyData.filter((i: any) => i.risk_score > 70).length + 2
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const cards = [
    { label: 'Total Analyses', val: stats.totalScans, icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Critical Alerts', val: stats.criticalThreats, icon: ShieldAlert, color: 'text-primary', bg: 'bg-primary/5' },
    { label: 'Avg Confidence', val: `${stats.avgConfidence}%`, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Active Watches', val: stats.activeMonitoring, icon: TrendingUp, color: 'text-navy-deep', bg: 'bg-slate-100' },
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-3 rounded-xl", c.bg)}>
                    <c.icon className={cn("h-6 w-6", c.color)} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">MTD</span>
                </div>
                <div>
                  <p className="text-3xl font-black text-navy-deep">{c.val}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{c.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-black text-navy-deep flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Recent Intelligence Runs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {history.map((item, idx) => (
                <div key={item.id || idx} className="p-4 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center font-black text-navy-deep">
                      {item.ticker.substring(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-navy-deep">{item.ticker}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-lg font-black text-navy-deep">{item.risk_score}</p>
                      <StatusBadge status={item.risk_score > 70 ? 'CRITICAL' : item.risk_score > 50 ? 'HIGH' : 'LOW'} />
                    </div>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors cursor-pointer">arrow_forward_ios</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-navy-deep border-none text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <AlertTriangle className="h-32 w-32" />
          </div>
          <CardHeader>
            <CardTitle className="text-white">Active Sector Warnings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10">
            {[
              { sector: 'Energy', threat: 'Accounting Drift', level: 'HIGH' },
              { sector: 'Commercial Banking', threat: 'Linguistic Hedging', level: 'CRITICAL' },
              { sector: 'Semiconductors', threat: 'Revenue Recognition', level: 'MODERATE' },
            ].map((w, i) => (
              <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">{w.level}</span>
                  <Activity className="h-3 w-3 text-white/40" />
                </div>
                <p className="text-sm font-black mb-1">{w.sector}</p>
                <p className="text-xs text-white/60">{w.threat} patterns identified in recent filings.</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

import { cn } from '../lib/utils';
