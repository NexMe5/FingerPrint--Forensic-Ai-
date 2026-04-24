import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { rpcCall } from '../api';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { StatusBadge } from './Common';
import { Search, Visibility, Download, Delete, Add } from 'lucide-react';
import { Spinner } from '../components/ui/spinner';

interface ArchiveViewProps {
  onAnalyzeNew: () => void;
  onViewReport: (report: any) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ onAnalyzeNew, onViewReport }) => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const loadHistory = useCallback(async () => {
    setLoading(true);
    try {
      const data = await rpcCall({ func: 'get_analysis_history', args: { limit: 50 } });
      setHistory(data);
    } catch (err) {
      console.error("Failed to load history", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.ticker.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'All') return matchesSearch;
    if (filter === 'Critical') return matchesSearch && item.risk_score > 70;
    return matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1200px] mx-auto w-full space-y-8"
    >
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-tight">Report History</h1>
          <p className="text-slate-500 text-base font-normal">Manage and review your security analysis reports.</p>
        </div>
        <Button onClick={onAnalyzeNew} className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-sm">add</span>
          New Analysis
        </Button>
      </div>

      <div className="sticky top-0 bg-background-light z-30 py-4 border-b border-slate-200">
        <div className="flex w-full items-stretch rounded-xl h-14 shadow-sm ring-1 ring-primary/10 focus-within:ring-primary/40 transition-all bg-white overflow-hidden">
          <div className="text-slate-400 flex items-center justify-center pl-4">
            <span className="material-symbols-outlined">search</span>
          </div>
          <Input 
            className="border-none focus-visible:ring-0 h-full placeholder:text-slate-400 text-base font-normal px-4"
            placeholder="Search by ticker or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {['All', 'Critical', 'High', 'Medium', 'Low'].map((f) => (
          <Button 
            key={f}
            variant={filter === f ? "default" : "outline"}
            className={filter === f ? "bg-primary text-white" : "bg-white text-slate-700"}
            onClick={() => setFilter(f)}
          >
            {f === 'All' ? 'All Reports' : f}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner className="h-10 w-10 text-primary" />
        </div>
      ) : (
        <Card className="overflow-hidden border border-primary/10 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/5">
                  <th className="px-6 py-4 text-slate-900 text-sm font-bold tracking-tight">Ticker</th>
                  <th className="px-6 py-4 text-slate-900 text-sm font-bold tracking-tight">Date</th>
                  <th className="px-6 py-4 text-slate-900 text-sm font-bold tracking-tight">Risk Score</th>
                  <th className="px-6 py-4 text-slate-900 text-sm font-bold tracking-tight text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-primary/[0.02] transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-primary">
                          {item.ticker.substring(0, 2)}
                        </div>
                        <span className="text-slate-900 font-semibold">{item.ticker}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-slate-500 font-mono text-sm">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-navy-deep">{item.risk_score}</span>
                        <StatusBadge status={item.risk_score > 70 ? "CRITICAL" : item.risk_score > 50 ? "HIGH" : "LOW"} />
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-3">
                        <Button variant="ghost" size="icon" onClick={() => onViewReport(item)} className="text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">visibility</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">download</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500 transition-colors">
                          <span className="material-symbols-outlined">delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </motion.div>
  );
};
