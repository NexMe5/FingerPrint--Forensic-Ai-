import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { streamCall } from '../api';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

interface LiveScannerProps {
  onComplete: (data: any) => void;
}

export const LiveScanner: React.FC<LiveScannerProps> = ({ onComplete }) => {
  const [ticker, setTicker] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticker) return;

    setIsScanning(true);
    setError(null);
    setProgress(0);
    setStatus('Initializing forensic nodes...');

    try {
      await streamCall({
        func: 'analyze_ticker_streaming',
        args: { ticker },
        onChunk: (chunk) => {
          if (chunk.status) setStatus(chunk.status);
          if (chunk.progress) setProgress(chunk.progress);
          if (chunk.result) {
            onComplete(chunk.result);
          }
          if (chunk.error) {
            setError(chunk.error);
            setIsScanning(false);
          }
        },
        onError: (err) => {
          setError(err.message);
          setIsScanning(false);
        }
      });
    } catch (err: any) {
      setError(err.message);
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-navy-deep mb-4">Live Forensic Scanner</h1>
        <p className="text-slate-500 max-w-xl mx-auto">Enter a corporate ticker symbol to initiate a triple-layer forensic deep dive into their recent financial disclosures.</p>
      </div>

      <Card className="shadow-2xl border-primary/10 overflow-hidden bg-white">
        <CardContent className="p-8">
          <form onSubmit={handleScan} className="flex gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <Input 
                className="pl-12 h-14 text-lg font-bold border-slate-200 focus:ring-primary focus:border-primary rounded-xl"
                placeholder="Enter Ticker (e.g. TSLA, NVDA, AAPL)"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                disabled={isScanning}
              />
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="h-14 px-8 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20"
              disabled={isScanning || !ticker}
            >
              {isScanning ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Search className="h-5 w-5 mr-2" />}
              {isScanning ? 'Scanning...' : 'Start Analysis'}
            </Button>
          </form>

          <AnimatePresence>
            {isScanning && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-12 space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Deep Scan in Progress</p>
                      <h3 className="text-lg font-black text-navy-deep">{status}</h3>
                    </div>
                    <span className="text-2xl font-black text-primary">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3 bg-slate-100" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Quantitative Core', status: progress > 20 ? 'COMPLETE' : 'PENDING' },
                    { label: 'Linguistic Tone', status: progress > 50 ? 'COMPLETE' : 'PENDING' },
                    { label: 'Market Pulse', status: progress > 80 ? 'COMPLETE' : 'PENDING' },
                  ].map((task) => (
                    <div key={task.label} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                      {task.status === 'COMPLETE' ? (
                        <ShieldCheck className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-slate-300 border-t-primary animate-spin" />
                      )}
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{task.status}</p>
                        <p className="text-sm font-bold text-navy-deep leading-tight">{task.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700"
              >
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm font-bold">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};
