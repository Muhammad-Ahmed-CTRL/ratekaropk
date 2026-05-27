'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Info, Receipt, Save } from 'lucide-react';
import { clsx } from 'clsx';
import { useTaxStore } from '@/lib/store/useTaxStore';
import { formatPKR } from '@/lib/taxCalculator';
import { CountUp } from '@/components/ui/CountUp';
import { useToast } from '@/components/ui/Toast';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

export default function TaxCalculatorPage() {
  const { monthlyIncome, isPSEB, result, setIncome, togglePSEB, saveEstimate } = useTaxStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(Boolean(data.session));
    });
  }, []);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncome(Number(e.target.value));
  };

  const handleExport = () => {
    // Basic implementation for export - would generate PDF in full app
    const text = `RateKaro PK - Tax Estimate\n\nMonthly Income: PKR ${formatPKR(monthlyIncome)}\nPSEB Registered: ${isPSEB ? 'Yes' : 'No'}\n\nMonthly Tax: PKR ${result?.taxAmount}\nNet Monthly Income: PKR ${result?.netIncome}\nAnnual Projection: PKR ${result?.annualProjection}\nEffective Tax Rate: ${result?.effectiveRate.toFixed(2)}%\nApplicable Tax Slab: ${result?.taxRate}`;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RateKaro_Tax_Estimate_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    const estimate = saveEstimate();

    if (!estimate) {
      toast.show('Calculate a tax estimate before saving', 'error');
      return;
    }

    if (!isLoggedIn) {
      toast.show('Tax estimate saved on this device. Sign in to sync it to your dashboard.');
      return;
    }

    try {
      const response = await fetch('/api/save-tax-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          monthly_income: estimate.monthlyIncome,
          is_pseb: estimate.isPSEB,
          tax_amount: estimate.result.taxAmount,
          net_income: estimate.result.netIncome,
          annual_projection: estimate.result.annualProjection,
          effective_rate: estimate.result.effectiveRate,
          tax_rate: estimate.result.taxRate,
        }),
      });

      if (!response.ok) throw new Error('Cloud save failed');

      toast.show('Tax estimate saved to your cloud dashboard.');
    } catch {
      toast.show('Saved locally, but cloud sync failed. Try again after login.', 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 pb-32">
      <div className="mb-10 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-bold text-[#00F5C4] mb-3">Tax Calculator</h1>
        <p className="text-[#8B8B9E] text-sm md:text-base max-w-2xl">Estimate your tax liability and net income based on current Pakistani freelancer tax brackets (2024-2025).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Income Input Card */}
        <div className="lg:col-span-2 bg-[#111118] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 md:p-8 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 sm:gap-0">
            <h2 className="text-xs font-bold text-[#8B8B9E] tracking-widest uppercase">Monthly Income (PKR)</h2>
            <div className="text-3xl md:text-4xl font-bold text-[#F5A623] font-numbers">
              {formatPKR(monthlyIncome)}
            </div>
          </div>

          <div className="relative pt-2 pb-6">
            <input
              type="range"
              min="10000"
              max="2000000"
              step="10000"
              value={monthlyIncome}
              onChange={handleSliderChange}
              className="w-full"
            />
            <div className="flex justify-between mt-3 text-xs text-[#8B8B9E] font-mono">
              <span>10K</span>
              <span>2M+</span>
            </div>
          </div>
        </div>

        {/* PSEB Toggle Card */}
        <div 
          className="bg-[#111118] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 md:p-8 flex flex-col justify-center cursor-pointer transition-colors hover:border-[rgba(0,245,196,0.2)] group"
          onClick={togglePSEB}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xs font-bold text-[#8B8B9E] tracking-widest uppercase mb-1">PSEB Status</h2>
              <span className={clsx("text-lg font-semibold transition-colors", isPSEB ? "text-white" : "text-[#8B8B9E]")}>
                {isPSEB ? 'Registered' : 'Not Registered'}
              </span>
            </div>
            <div className={clsx('toggle-track scale-110', isPSEB && 'active')}>
              <div className={clsx('toggle-thumb', isPSEB && 'active')} />
            </div>
          </div>
          
          <div className="mt-auto flex items-start gap-2 bg-[rgba(0,245,196,0.05)] p-3 rounded-lg border border-[rgba(0,245,196,0.1)]">
            <Info size={16} className="text-[#00F5C4] shrink-0 mt-0.5" />
            <p className="text-[11px] text-[#8B8B9E] leading-relaxed">
              PSEB registered freelancers enjoy a flat <span className="text-[#00F5C4] font-semibold">0.25%</span> tax rate on IT export remittances.
            </p>
          </div>
        </div>
      </div>

      {/* Results Cards */}
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Tax Amount */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-[rgba(255,255,255,0.05)] rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#8B8B9E]">
                <Receipt size={16} />
                <h3 className="text-xs font-bold tracking-widest uppercase">Tax Amount</h3>
              </div>
              <span className="text-[10px] bg-[rgba(255,255,255,0.1)] text-[#8B8B9E] px-2 py-1 rounded font-mono">
                {result.taxRate} RATE
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[#8B8B9E] text-sm font-semibold">PKR</span>
              <CountUp to={result.taxAmount} className="text-4xl font-bold text-[#F5A623] font-numbers" />
              <span className="text-[#8B8B9E] text-sm">/mo</span>
            </div>
          </motion.div>

          {/* Net Take-Home */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-[#00F5C4] rounded-2xl p-6 shadow-[0_0_30px_rgba(0,245,196,0.05)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F5C4] blur-[80px] opacity-10 pointer-events-none" />
            
            <div className="flex items-center gap-2 text-[#00F5C4] mb-4">
              <div className="w-4 h-4 rounded-full border-2 border-[#00F5C4] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#00F5C4] rounded-full" />
              </div>
              <h3 className="text-xs font-bold tracking-widest uppercase">Net Take-Home</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[#8B8B9E] text-sm font-semibold">PKR</span>
              <CountUp to={result.netIncome} className="text-4xl md:text-5xl font-bold text-[#00F5C4] font-numbers drop-shadow-[0_0_15px_rgba(0,245,196,0.3)]" />
              <span className="text-[#8B8B9E] text-sm">/mo</span>
            </div>
          </motion.div>

          {/* Annual Projection */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-[rgba(255,255,255,0.05)] rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#8B8B9E]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                <h3 className="text-xs font-bold tracking-widest uppercase">Annual Projection</h3>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[#8B8B9E] text-sm font-semibold">PKR</span>
              <CountUp to={result.annualProjection} className="text-3xl font-bold text-[#F5A623] font-numbers" />
              <span className="text-[#8B8B9E] text-sm">/yr</span>
            </div>
          </motion.div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="btn-teal px-6 py-3 rounded-xl flex items-center gap-2 text-sm mr-3"
        >
          <Save size={16} />
          {isLoggedIn ? 'Save to Dashboard' : 'Save on This Device'}
        </button>
        <button 
          onClick={handleExport}
          className="btn-outline px-6 py-3 rounded-xl flex items-center gap-2 text-sm"
        >
          <Download size={16} />
          Export Summary
        </button>
      </div>
    </div>
  );
}
