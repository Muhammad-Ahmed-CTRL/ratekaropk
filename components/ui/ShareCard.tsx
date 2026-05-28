'use client';

import { motion } from 'framer-motion';
import { Check, Copy, Twitter } from 'lucide-react';
import { useState } from 'react';

interface ShareCardProps {
  usdMid: number;
  experience: string;
  skill: string;
  city: string;
}

export function ShareCard({ usdMid, experience, skill, city }: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  
  const text = `I charge $${usdMid}/hr as a ${experience} ${skill} in ${city === 'remote' ? 'Remote (PK)' : city}.\n\nCalculated via RateKaro PK\nhttps://www.ratekaropk.site/calculator`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#111118] border border-[rgba(0,245,196,0.2)] rounded-xl p-5 mt-6 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-[#00F5C4]" />
      
      <p className="text-[#E2E2E2] text-sm leading-relaxed mb-4 font-medium italic">
        &quot;{text.split('\n')[0]}&quot;
      </p>
      
      <div className="flex items-center gap-3">
        <button
          onClick={handleWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 py-2 rounded-lg text-xs font-semibold transition-colors border border-[#25D366]/20"
        >
          {/* Custom WhatsApp Icon SVG */}
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          WhatsApp
        </button>
        
        <button
          onClick={handleTwitter}
          className="flex-1 flex items-center justify-center gap-2 bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 py-2 rounded-lg text-xs font-semibold transition-colors border border-[#1DA1F2]/20"
        >
          <Twitter size={16} />
          X / Twitter
        </button>
        
        <button
          onClick={handleCopy}
          className="w-10 h-9 flex items-center justify-center bg-[rgba(255,255,255,0.05)] text-[#8B8B9E] hover:text-white hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-colors border border-[rgba(255,255,255,0.1)]"
          title="Copy to clipboard"
        >
          {copied ? <Check size={16} className="text-[#00F5C4]" /> : <Copy size={16} />}
        </button>
      </div>
    </motion.div>
  );
}

