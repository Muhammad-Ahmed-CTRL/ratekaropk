'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { SkillPill } from '@/components/ui/SkillPill';
import { GlowCard } from '@/components/ui/GlowCard';
import { CountUp } from '@/components/ui/CountUp';
import { ShareCard } from '@/components/ui/ShareCard';
import { RateSkeleton } from '@/components/ui/RateSkeleton';
import { useToast } from '@/components/ui/Toast';
import { useRateStore, Experience } from '@/lib/store/useRateStore';
import { categoryOrder, getSkillsByCategory } from '@/lib/marketRates';
import { getRateBySlug } from '@/lib/rateData';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { formatLastUpdated, formatPKRRate } from '@/lib/currencyFormat';
import { clsx } from 'clsx';
import { AlertTriangle, CalendarClock, Database, ExternalLink, Save, ShieldCheck } from 'lucide-react';

type LatestExchangeRate = {
  ok: boolean;
  rate: number;
  source: string;
  lastUpdated: string;
  providerUpdatedAt: string | null;
  stale: boolean;
};

function CalculatorContent() {
  const {
    selectedSkillSlug,
    selectedCategory,
    experience,
    city,
    clientType,
    calculatedRate,
    isCalculating,
    setSkill,
    setExperience,
    setCity,
    setClientType,
    setUsdToPkr,
    calculateRate,
    saveRate,
  } = useRateStore();

  const toast = useToast();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(selectedCategory);
  const [showShare, setShowShare] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [latestExchange, setLatestExchange] = useState<LatestExchangeRate | null>(null);
  const [exchangeError, setExchangeError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadLatestExchangeRate() {
      try {
        // The client only reads RateKaro's saved Supabase-backed rate endpoint.
        // Third-party FX providers are never called from the browser.
        const response = await fetch('/api/rates/latest', { cache: 'no-store' });
        if (!response.ok) throw new Error('Latest exchange rate unavailable');

        const data = (await response.json()) as LatestExchangeRate;
        if (!ignore && data.ok && Number.isFinite(data.rate)) {
          setLatestExchange(data);
          setUsdToPkr(data.rate);
          setExchangeError(null);
        }
      } catch {
        if (!ignore) {
          setExchangeError('Exchange rate is currently unavailable. Please try again later.');
        }
      }
    }

    loadLatestExchangeRate();

    return () => {
      ignore = true;
    };
  }, [setUsdToPkr]);

  useEffect(() => {
    calculateRate();
  }, [selectedSkillSlug, experience, city, clientType, latestExchange?.rate, calculateRate]);

  useEffect(() => {
    const skillSlug = searchParams.get('skill');
    if (!skillSlug || skillSlug === selectedSkillSlug) return;

    const skill = getRateBySlug(skillSlug);
    if (!skill) return;

    setSkill(skill.slug, skill.skill, skill.category);
    setActiveTab(skill.category);
  }, [searchParams, selectedSkillSlug, setSkill]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(Boolean(data.session));
    });
  }, []);

  const handleSave = async () => {
    const saved = saveRate();

    if (!saved) {
      toast.show('Calculate a rate before saving', 'error');
      return;
    }

    if (!isLoggedIn) {
      toast.show('Saved on this device. Sign in to sync it to your dashboard.');
      return;
    }

    try {
      const response = await fetch('/api/submit-rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skill: saved.skill,
          experience: saved.experience,
          city: saved.city,
          client_type: saved.clientType,
          pkr_low: saved.rate.pkrLow,
          pkr_mid: saved.rate.pkrMid,
          pkr_high: saved.rate.pkrHigh,
          usd_low: saved.rate.usdLow,
          usd_mid: saved.rate.usdMid,
          usd_high: saved.rate.usdHigh,
        }),
      });

      if (!response.ok) throw new Error('Cloud save failed');

      toast.show('Saved to your cloud dashboard.');
    } catch {
      toast.show('Saved locally, but cloud sync failed. Try again after login.', 'error');
    }
  };

  const cities = ['Remote', 'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Quetta', 'Multan'];
  const currentSkills = getSkillsByCategory(activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-32">
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-[#00F5C4] mb-3">Rate Calculator</h1>
        <p className="text-[#8B8B9E] text-sm md:text-base">Determine your optimal market rate based on real-world data points.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Panel: Inputs */}
        <div className="w-full lg:w-[60%] flex flex-col gap-10">
          
          {/* Skill Selection */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold text-[#8B8B9E] uppercase tracking-widest">Primary Skill</h2>
            </div>
            
            {/* Category Tabs */}
            <div className="flex overflow-x-auto pb-4 mb-4 gap-2 no-scrollbar border-b border-[rgba(255,255,255,0.05)]">
              {categoryOrder.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={clsx(
                    'whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-colors',
                    activeTab === cat ? 'bg-[rgba(255,255,255,0.1)] text-white' : 'text-[#8B8B9E] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Skill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {currentSkills.map((skill, idx) => (
                <SkillPill
                  key={skill.slug}
                  label={skill.skill}
                  isActive={selectedSkillSlug === skill.slug}
                  onClick={() => setSkill(skill.slug, skill.skill, skill.category)}
                  index={idx}
                />
              ))}
            </div>
          </section>

          {/* Experience Level */}
          <section>
            <h2 className="text-xs font-semibold text-[#8B8B9E] uppercase tracking-widest mb-4">Experience Level</h2>
            <div className="segmented-control w-full p-1">
              {(['junior', 'mid', 'senior'] as Experience[]).map(exp => (
                <button
                  key={exp}
                  onClick={() => setExperience(exp)}
                  className={clsx('segmented-option capitalize py-3', experience === exp && 'active')}
                >
                  {exp}
                </button>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Location Context */}
            <section>
              <h2 className="text-xs font-semibold text-[#8B8B9E] uppercase tracking-widest mb-4">Location Context</h2>
              <div className="flex flex-wrap gap-2">
                {cities.map(c => (
                  <button
                    key={c}
                    onClick={() => setCity(c.toLowerCase())}
                    className={clsx(
                      'px-4 py-1.5 rounded-full text-xs font-medium transition-colors border',
                      city === c.toLowerCase() 
                        ? 'border-[#00F5C4] text-[#00F5C4] bg-[rgba(0,245,196,0.08)]' 
                        : 'border-[rgba(255,255,255,0.1)] text-[#8B8B9E] hover:border-[rgba(255,255,255,0.3)] hover:text-white'
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </section>

            {/* Client Base */}
            <section>
              <h2 className="text-xs font-semibold text-[#8B8B9E] uppercase tracking-widest mb-4">Client Base</h2>
              <div 
                className="bg-[#111118] border border-[rgba(255,255,255,0.1)] rounded-xl p-4 flex flex-col justify-center cursor-pointer transition-colors hover:border-[rgba(255,255,255,0.2)]"
                onClick={() => setClientType(clientType === 'local' ? 'foreign' : 'local')}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">Foreign Client</span>
                  <div className={clsx('toggle-track', clientType === 'foreign' && 'active')}>
                    <div className={clsx('toggle-thumb', clientType === 'foreign' && 'active')} />
                  </div>
                </div>
                <AnimatePresence>
                  {clientType === 'foreign' && (
                    <motion.p 
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      className="text-[#8B8B9E] text-[11px] leading-tight"
                    >
                      Uses the latest available foreign-client benchmark for this skill.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </section>
          </div>
        </div>

        {/* Right Panel: Results */}
        <div className="w-full lg:w-[40%] sticky top-24 self-start">
          {isCalculating || !calculatedRate ? (
            <RateSkeleton />
          ) : (
            <GlowCard className="flex flex-col h-full">
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.05)] pb-4 mb-6">
                <h3 className="text-lg font-semibold text-[#00F5C4]">Estimated Market Rate</h3>
                <span className="text-[10px] font-bold bg-[rgba(255,255,255,0.1)] text-[#8B8B9E] px-2 py-1 rounded tracking-wider">HOURLY</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-6 sm:gap-0">
                {/* LOW */}
                <div className="flex-1 flex flex-col items-center border-b sm:border-b-0 sm:border-r border-[rgba(255,255,255,0.05)] pb-4 sm:pb-0">
                  <span className="text-[10px] font-bold text-[#8B8B9E] tracking-widest mb-1">LOW</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#F5A623] text-lg font-bold">$</span>
                    <CountUp to={calculatedRate.usdLow} className="text-3xl font-bold text-[#F5A623] font-numbers" />
                  </div>
                  <div className="flex items-baseline gap-1 mt-1 text-[#8B8B9E] text-xs font-numbers">
                    Rs <CountUp to={calculatedRate.pkrLow} />
                  </div>
                </div>

                {/* MID (Primary) */}
                <div className="flex-[1.5] flex flex-col items-center border-b sm:border-b-0 sm:border-r border-[rgba(255,255,255,0.05)] pb-4 sm:pb-0 px-2 scale-110">
                  <span className="text-[11px] font-bold text-[#00F5C4] tracking-widest mb-1">MID</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#F5A623] text-2xl font-bold">$</span>
                    <CountUp to={calculatedRate.usdMid} className="text-5xl font-bold text-[#F5A623] font-numbers drop-shadow-[0_0_15px_rgba(245,166,35,0.3)]" />
                  </div>
                  <div className="flex items-baseline gap-1 mt-2 text-[#E2E2E2] text-sm font-numbers">
                    Rs <CountUp to={calculatedRate.pkrMid} />
                  </div>
                </div>

                {/* HIGH */}
                <div className="flex-1 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-[#8B8B9E] tracking-widest mb-1">HIGH</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#F5A623] text-lg font-bold">$</span>
                    <CountUp to={calculatedRate.usdHigh} className="text-3xl font-bold text-[#F5A623] font-numbers" />
                  </div>
                  <div className="flex items-baseline gap-1 mt-1 text-[#8B8B9E] text-xs font-numbers">
                    Rs <CountUp to={calculatedRate.pkrHigh} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-auto">
                <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0A0A0F] p-4 text-xs text-[#8B8B9E]">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2">
                      <CalendarClock size={14} className="text-[#00F5C4]" />
                      <span>{new Date(calculatedRate.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={14} className={clsx(
                        calculatedRate.confidenceLabel === 'High' && 'text-[#00F5C4]',
                        calculatedRate.confidenceLabel === 'Medium' && 'text-[#F5A623]',
                        calculatedRate.confidenceLabel === 'Low' && 'text-red-300'
                      )} />
                      <span>{calculatedRate.confidenceLabel} confidence</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Database size={14} className="text-[#00A8F5]" />
                      <span>{calculatedRate.sourceCount} source{calculatedRate.sourceCount === 1 ? '' : 's'}</span>
                    </div>
                  </div>
                  {calculatedRate.warning && (
                    <div className="mt-3 flex items-start gap-2 text-[#F5A623]">
                      <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                      <span>{calculatedRate.warning}</span>
                    </div>
                  )}
                  <p className="mt-3">
                    Source: {calculatedRate.sourceLabel}.
                  </p>
                  <div className="mt-3 rounded-lg border border-[rgba(0,245,196,0.12)] bg-[rgba(0,245,196,0.04)] p-3">
                    {latestExchange ? (
                      <div className="space-y-1">
                        <p className="text-[#E2E2E2]">
                          Latest saved rate: 1 USD = {formatPKRRate(latestExchange.rate)} PKR
                        </p>
                        <p>
                          Last updated: {formatLastUpdated(latestExchange.lastUpdated)}
                        </p>
                        {latestExchange.stale && (
                          <p className="flex items-start gap-2 text-[#F5A623]">
                            <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                            <span>Showing last saved rate. Today&apos;s automatic update may not have completed.</span>
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-[#F5A623]">
                        {exchangeError ?? 'Loading latest saved exchange rate...'}
                      </p>
                    )}
                  </div>
                </div>
                <button onClick={handleSave} className="btn-teal w-full py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2">
                  <Save size={18} />
                  {isLoggedIn ? 'Save to Cloud Dashboard' : 'Save on This Device'}
                </button>
                <button onClick={() => setShowShare(!showShare)} className="btn-outline border-[rgba(255,255,255,0.1)] text-[#8B8B9E] hover:text-[#00F5C4] w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                  <ExternalLink size={16} />
                  Share Rate
                </button>
              </div>

              <AnimatePresence>
                {showShare && (
                  <ShareCard 
                    usdMid={calculatedRate.usdMid} 
                    experience={experience} 
                    skill={useRateStore.getState().selectedSkillName} 
                    city={city} 
                  />
                )}
              </AnimatePresence>
            </GlowCard>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<RateSkeleton />}>
        <CalculatorContent />
      </Suspense>
    </ErrorBoundary>
  );
}
