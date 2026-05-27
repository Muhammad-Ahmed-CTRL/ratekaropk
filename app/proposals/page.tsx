'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Copy, Share2, Download, AlertCircle } from 'lucide-react';
import { useRateStore } from '@/lib/store/useRateStore';
import { useToast } from '@/components/ui/Toast';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

function ProposalsContent() {
  const { calculatedRate, selectedSkillName, experience, clientType } = useRateStore();
  const [projectDescription, setProjectDescription] = useState('');
  const [rateInput, setRateInput] = useState<number>(calculatedRate?.usdMid || 0);
  const [proposal, setProposal] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const toast = useToast();

  const handleGenerate = async () => {
    if (!projectDescription.trim()) {
      toast.show('Please enter a project description', 'error');
      return;
    }

    setIsGenerating(true);
    setProposal('');

    try {
      const response = await fetch('/api/generate-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectDescription,
          rate: rateInput,
          clientType,
          skill: `${experience} ${selectedSkillName}`
        }),
      });

      if (!response.ok) throw new Error('Failed to generate proposal');
      
      const data = await response.json();
      setProposal(data.proposal);
      toast.show('Proposal generated successfully!');
    } catch (err) {
      toast.show(err instanceof Error ? err.message : 'Error generating proposal', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!proposal) return;
    navigator.clipboard.writeText(proposal);
    toast.show('Proposal copied to clipboard!');
  };

  const handleDownloadPDF = () => {
    if (!proposal) return;
    // In a real app, use jsPDF or similar to generate a PDF.
    // For now, downloading as a text file
    const blob = new Blob([proposal], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Proposal_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.show('Proposal downloaded!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-32">
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-[#00F5C4] mb-3">Proposal Generator</h1>
        <p className="text-[#8B8B9E] text-sm md:text-base">Transform client requirements into a professional pitch.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Panel: Form */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <div className="bg-[#111118] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6">
            <h2 className="text-xs font-bold text-[#8B8B9E] tracking-widest uppercase flex items-center gap-2 mb-4">
              <FileTextIcon /> Project Context
            </h2>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Describe the client's needs, deliverables, and timeline..."
              className="w-full h-48 bg-[#0A0A0F] border border-[rgba(255,255,255,0.1)] focus:border-[#00F5C4] rounded-xl px-4 py-3 text-white outline-none transition-colors resize-none mb-2"
            />
            <p className="text-[#8B8B9E] text-xs text-right">{projectDescription.length} chars</p>
          </div>

          <div className="bg-[#111118] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold text-[#8B8B9E] tracking-widest uppercase mb-1">Calculated Rate</h2>
              <p className="text-[11px] text-[#8B8B9E]">From Calculator ({clientType} client)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#F5A623] font-bold">$</span>
              <input
                type="number"
                value={rateInput}
                onChange={(e) => setRateInput(Number(e.target.value))}
                className="w-20 bg-[#0A0A0F] border border-[rgba(255,255,255,0.1)] focus:border-[#00F5C4] rounded-lg px-2 py-1 text-white font-numbers font-bold outline-none text-right"
              />
              <span className="text-[#8B8B9E] text-sm">/hr</span>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !projectDescription.trim()}
            className="btn-teal w-full py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2 animate-pulse">Generating...</span>
            ) : (
              <><Sparkles size={18} /> Generate Proposal</>
            )}
          </button>
        </div>

        {/* Right Panel: Preview */}
        <div className="w-full lg:w-[55%]">
          <div className="bg-[#111118] border border-[rgba(0,245,196,0.2)] rounded-2xl h-full min-h-[500px] flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.05)] px-6 py-4 bg-[#0A0A0F]/50">
              <div className="flex items-center gap-2 text-[#00F5C4]">
                <EyeIcon />
                <span className="text-xs font-bold tracking-widest uppercase">Live Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleCopy} disabled={!proposal} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgba(255,255,255,0.1)] text-[#8B8B9E] hover:text-white transition-colors disabled:opacity-50">
                  <Copy size={16} />
                </button>
                <button onClick={handleCopy} disabled={!proposal} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgba(255,255,255,0.1)] text-[#8B8B9E] hover:text-white transition-colors disabled:opacity-50">
                  <Share2 size={16} />
                </button>
                <button onClick={handleDownloadPDF} disabled={!proposal} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgba(255,255,255,0.1)] text-[#8B8B9E] hover:text-white transition-colors disabled:opacity-50">
                  <Download size={16} />
                </button>
              </div>
            </div>

            <div className="p-6 flex-grow overflow-y-auto">
              {isGenerating ? (
                <div className="space-y-4">
                  <div className="h-6 w-3/4 bg-[rgba(255,255,255,0.05)] rounded shimmer" />
                  <div className="h-4 w-full bg-[rgba(255,255,255,0.05)] rounded shimmer" />
                  <div className="h-4 w-5/6 bg-[rgba(255,255,255,0.05)] rounded shimmer" />
                  <div className="h-4 w-full bg-[rgba(255,255,255,0.05)] rounded shimmer" />
                  <div className="h-4 w-4/6 bg-[rgba(255,255,255,0.05)] rounded shimmer mt-6" />
                  <div className="h-4 w-5/6 bg-[rgba(255,255,255,0.05)] rounded shimmer" />
                </div>
              ) : proposal ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="prose prose-invert max-w-none text-sm text-[#E2E2E2] leading-relaxed whitespace-pre-wrap"
                >
                  {proposal}
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-[#8B8B9E] opacity-50">
                  <AlertCircle size={48} className="mb-4" />
                  <p>Generated proposal will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileTextIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" x2="8" y1="13" y2="13"/>
      <line x1="16" x2="8" y1="17" y2="17"/>
      <line x1="10" x2="8" y1="9" y2="9"/>
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

export default function ProposalsPage() {
  return (
    <ErrorBoundary>
      <ProposalsContent />
    </ErrorBoundary>
  );
}
