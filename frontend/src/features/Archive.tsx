import React, { useState, useEffect, useCallback } from 'react';
import { 
  Archive, 
  Search, 
  Filter, 
  ChevronRight, 
  ShieldAlert, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { rpcCall } from '../api';
import { cn } from '../lib/utils';

export function ForensicArchive() {
  const [history, setHistory] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    try {
      const data = await rpcCall({ func: 'get_analysis_history', args: { limit: 50 } });
      setHistory(data);
    } catch (err) {
      console.error('Failed to load history', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadHistory(); }, [loadHistory]);

  const filteredHistory = history.filter(h => 
    h.ticker.toLowerCase().includes(search.toLowerCase())
  );

  const getRiskColor = (score: number) => {
    if (score < 30) return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    if (score < 60) return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    if (score < 80) return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold tracking-tight">Forensic Archive</h2>
          <p className="text-muted-foreground text-sm">Historical audit results and manipulation signatures.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search ticker..." 
              className="pl-10 w-64 bg-card"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Badge variant="outline" className="px-3 py-1 bg-primary/5 text-primary border-primary/20">
            {filteredHistory.length} Analyses
          </Badge>
        </div>
      </div>

      <Card className="bg-card/40 backdrop-blur-xl border-primary/10 overflow-hidden shadow-2xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-primary/5">
                <TableRow className="border-primary/10 hover:bg-transparent">
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest py-4">Ticker</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest py-4 text-center">Risk Score</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest py-4 text-center">Status</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest py-4">Linguistic Red Flags</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest py-4 text-right">Date Analyzed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="animate-pulse border-primary/5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <TableCell key={j}><div className="h-4 bg-primary/10 rounded w-full" /></TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : filteredHistory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-20 text-center text-muted-foreground italic">
                      No forensic records found.
                    </TableCell>
                  </TableRow>
                ) : filteredHistory.map((h) => (
                  <TableRow key={h.id} className="border-primary/5 hover:bg-primary/5 transition-colors group cursor-pointer">
                    <TableCell className="font-bold py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-black border border-primary/20 flex items-center justify-center text-[10px] text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                          {h.ticker}
                        </div>
                        {h.ticker}
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-mono font-bold text-lg">
                      <span className={cn("px-2 py-0.5 rounded", getRiskColor(h.risk_score).split(' ')[1])}>
                        {h.risk_score}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={cn("border font-medium", getRiskColor(h.risk_score))}>
                        {h.risk_score > 80 ? 'CRITICAL' : h.risk_score > 60 ? 'HIGH' : h.risk_score > 30 ? 'ELEVATED' : 'STABLE'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {h.linguistic_red_flags?.slice(0, 2).map((flag: string, i: number) => (
                          <Badge key={i} variant="secondary" className="text-[10px] bg-white/5 border-white/10 font-normal">
                            {flag}
                          </Badge>
                        ))}
                        {h.linguistic_red_flags?.length > 2 && (
                          <span className="text-[10px] text-muted-foreground">+{h.linguistic_red_flags.length - 2} more</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-xs font-mono">
                      {new Date(h.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function Benchmarks() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCases = useCallback(async () => {
    try {
      const data = await rpcCall({ func: 'get_backtest_cases' });
      setCases(data);
    } catch (err) {
      console.error('Failed to load benchmarks', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadCases(); }, [loadCases]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h2 className="font-heading text-2xl font-bold tracking-tight">Landmark Benchmarks</h2>
        <p className="text-muted-foreground text-sm">Historical fraud cases used to train our forensic signatures.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 rounded-3xl bg-primary/5 border border-primary/10 animate-pulse" />
          ))
        ) : cases.map((c) => (
          <Card key={c.id} className="bg-card/40 border-primary/10 overflow-hidden group hover:border-primary/40 transition-all hover:shadow-2xl hover:shadow-primary/5 flex flex-col">
            <div className="h-2 bg-gradient-to-r from-rose-500 to-amber-500 opacity-50" />
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest text-rose-500 border-rose-500/20 bg-rose-500/5">
                  Fraud Case: {c.case_year}
                </Badge>
                <ShieldAlert className="h-5 w-5 text-rose-500" />
              </div>
              <CardTitle className="font-heading text-xl">{c.company_name}</CardTitle>
              <CardDescription className="text-xs font-mono">{c.ticker || 'N/A'}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground uppercase tracking-tighter">Manipulation Score</span>
                  <span className="text-rose-500 font-bold">{c.m_score}</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500" style={{ width: '85%' }} />
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary/70">Forensic Outcome</h4>
                <p className="text-sm text-foreground line-clamp-3">
                  {c.summary}
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-1">
                {c.tags?.map((tag: string) => (
                  <Badge key={tag} className="text-[10px] bg-primary/5 text-primary border-primary/20">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
