import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { StatusBadge } from './Common';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ResultsViewProps {
  data: any;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ data }) => {
  if (!data) return null;

  const quantMetrics = Object.entries(data.quantitative.metrics).map(([key, val]) => ({
    name: key,
    value: val
  }));

  const chartData = [
    { name: 'Q1', score: 20 },
    { name: 'Q2', score: 45 },
    { name: 'Q3', score: 38 },
    { name: 'Q4', score: data.risk_score },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-20"
    >
      {/* Header Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-3xl font-black text-navy-deep">{data.ticker}</CardTitle>
              <p className="text-slate-500 text-sm">Analysis complete • {new Date(data.timestamp).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black text-primary">{data.risk_score}</div>
              <StatusBadge status={data.quantitative.risk_label === "High" ? "CRITICAL" : "LOW"} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e60000" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#e60000" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#e60000" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Quantitative Benchmarks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Beneish M-Score</p>
                <p className="text-2xl font-black">{data.quantitative.beneish_m_score}</p>
              </div>
              <Badge variant={data.quantitative.risk_label === "High" ? "destructive" : "secondary"}>
                {data.quantitative.risk_label === "High" ? "Anomaly Detected" : "Within Norms"}
              </Badge>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Altman Z-Score</p>
                <p className="text-2xl font-black">{data.quantitative.altman_z_score}</p>
              </div>
              <Badge variant={data.quantitative.altman_z_score < 1.81 ? "destructive" : "secondary"}>
                {data.quantitative.altman_z_score < 1.81 ? "Distress" : "Stable"}
              </Badge>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-400 mb-2 uppercase">Index Drift Analysis</p>
              <div className="h-[60px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={quantMetrics}>
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {quantMetrics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.value > 1.2 ? '#e60000' : '#0f172a'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Forensic Deep Dive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">psychology</span>
              Linguistic Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-navy-deep">Deception Probability</span>
                <span className="text-lg font-black text-primary">{data.linguistic.deception_probability}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${data.linguistic.deception_probability}%` }}
                  className="bg-primary h-2 rounded-full" 
                />
              </div>
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">Red Flag Linguistic Cues</h5>
              <div className="flex flex-wrap gap-2">
                {data.linguistic.key_linguistic_red_flags.map((flag: string) => (
                  <Badge key={flag} variant="outline" className="border-primary/20 text-primary bg-primary/5">
                    {flag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="prose prose-sm max-w-none text-slate-600">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.linguistic.summary}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">verified_user</span>
              Executive Fact-Check
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Credibility Score</p>
                <p className="text-3xl font-black text-navy-deep">{data.fact_check.overall_credibility}/100</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/5">
                <span className="material-symbols-outlined text-4xl text-primary">gavel</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {data.fact_check.claims.map((claim: any, idx: number) => (
                <div key={idx} className="p-3 border border-slate-100 rounded-lg hover:border-primary/20 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-bold text-slate-700">{claim.claim}</p>
                    <Badge className={claim.verdict.toLowerCase().includes('true') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                      {claim.verdict}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{claim.evidence}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};
