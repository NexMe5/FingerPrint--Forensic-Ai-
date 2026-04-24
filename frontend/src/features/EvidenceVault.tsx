import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { streamCall } from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Upload, ShieldCheck, ShieldAlert, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Progress } from '../components/ui/progress';
import { cn } from '../lib/utils';

export const EvidenceVault: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleValidate = async () => {
    if (!file) return;

    setIsValidating(true);
    setResult(null);
    setProgress(0);
    setStatus('Uploading for forensic extraction...');

    try {
      // Mocking file path for now since we can't actually upload in this env
      // But using the contract signature
      await streamCall({
        func: 'validate_document_streaming',
        args: { 
          file: file,  // actual File object — uploaded via FormData
        },
        onChunk: (chunk) => {
          if (chunk.status) setStatus(chunk.status);
          if (chunk.progress) setProgress(chunk.progress);
          if (chunk.result) setResult(chunk.result);
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-black text-navy-deep mb-2">Evidence Vault</h1>
        <p className="text-slate-500">Upload SEC filings, press releases, or internal memos for automated fact-checking and manipulation detection.</p>
      </div>

      {!result ? (
        <Card className="border-dashed border-2 border-primary/20 bg-primary/5 p-12 text-center">
          <div className="max-w-md mx-auto space-y-6">
            <div className="h-20 w-20 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <Upload className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-black text-navy-deep">Upload Document</h3>
              <p className="text-slate-500 text-sm mt-1">Supported formats: PDF, JPG, PNG, TXT</p>
            </div>
            <div className="flex flex-col gap-4">
              <label className="cursor-pointer">
                <input type="file" className="hidden" onChange={handleFileChange} />
                <div className="bg-white border border-slate-200 px-6 py-4 rounded-xl font-bold hover:border-primary transition-colors flex items-center justify-center gap-3">
                  <FileText className="h-5 w-5 text-slate-400" />
                  {file ? file.name : 'Select file from computer'}
                </div>
              </label>
              <Button 
                disabled={!file || isValidating} 
                onClick={handleValidate}
                className="bg-primary text-white h-14 rounded-xl font-black text-lg"
              >
                {isValidating ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                {isValidating ? 'Validating...' : 'Start Forensic Audit'}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {isValidating && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 space-y-4 max-w-xl mx-auto"
              >
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-primary">{status}</span>
                  <span className="text-navy-deep">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2"/>
                {/* <Progress value={progress} className="h-2" indicatorClassName="bg-primary" /> */}
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1 bg-navy-deep text-white border-none overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck className="h-24 w-24" />
              </div>
              <CardContent className="p-8 space-y-6 relative z-10">
                <div>
                  <p className="text-xs font-bold opacity-60 uppercase tracking-widest mb-1">Final Verdict</p>
                  <h3 className={cn(
                    "text-3xl font-black",
                    result.verdict === 'True' ? 'text-green-400' : 'text-red-400'
                  )}>
                    {result.verdict === 'True' ? 'AUTHENTIC' : 'SUSPICIOUS'}
                  </h3>
                </div>
                <div>
                  <p className="text-xs font-bold opacity-60 uppercase tracking-widest mb-1">Confidence Score</p>
                  <p className="text-4xl font-black">{(result.confidence * 100).toFixed(0)}%</p>
                </div>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10" onClick={() => setResult(null)}>
                  Audit Another Document
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Claim Verification Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.evidence.map((ev: any, i: number) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-100 flex gap-4">
                    <div className="shrink-0 pt-1">
                      {ev.verdict === 'True' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-deep text-sm mb-1">{ev.claim}</h4>
                      <p className="text-xs text-slate-500 italic mb-2">"{ev.evidence}"</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-slate-400">Confidence:</span>
                        <div className="w-24 bg-slate-100 h-1.5 rounded-full">
                          <div className="bg-primary h-1.5 rounded-full" style={{ width: `${ev.confidence * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  );
};
