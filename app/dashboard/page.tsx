'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/Toast';
import { useRateStore } from '@/lib/store/useRateStore';
import { useTaxStore } from '@/lib/store/useTaxStore';
import { Activity, Calculator, FileText, LogOut, Receipt, RefreshCw, User } from 'lucide-react';
import { formatPKR } from '@/lib/taxCalculator';
import { clsx } from 'clsx';

interface SavedRate {
  id: string;
  skill: string;
  experience: string;
  city: string;
  client_type: string;
  usd_mid: number;
  pkr_mid: number;
  created_at: string;
}

interface TaxEstimate {
  id: string;
  monthly_income: number;
  is_pseb: boolean;
  tax_amount: number;
  net_income: number;
  annual_projection: number;
  effective_rate: number;
  tax_rate: string;
  created_at: string;
}

interface Proposal {
  id: string;
  project_description: string;
  rate_used: number;
  generated_text: string;
  created_at: string;
}

type DashboardTab = 'rates' | 'tax' | 'proposals' | 'profile';

export default function DashboardPage() {
  const [user, setUser] = useState<{ id: string; email?: string; user_metadata: { full_name?: string; avatar_url?: string } } | null>(null);
  const [rates, setRates] = useState<SavedRate[]>([]);
  const [taxEstimates, setTaxEstimates] = useState<TaxEstimate[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [fullName, setFullName] = useState('');
  const [activeTab, setActiveTab] = useState<DashboardTab>('rates');
  const [expandedProposals, setExpandedProposals] = useState<Record<string, boolean>>({});

  const localRates = useRateStore((state) => state.savedRates);
  const localTaxEstimates = useTaxStore((state) => state.savedEstimates);
  const router = useRouter();
  const toast = useToast();
  const supabase = useMemo(() => createClient(), []);

  const fetchUserAndData = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push('/login?redirect=/dashboard');
      return;
    }

    setUser(session.user);
    setFullName(session.user.user_metadata?.full_name || '');

    const [ratesResult, taxResult, proposalsResult] = await Promise.all([
      supabase
        .from('saved_rates')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('tax_estimates')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('proposals')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false }),
    ]);

    if (ratesResult.error) console.error('Error fetching rates:', ratesResult.error);
    if (taxResult.error) console.error('Error fetching tax estimates:', taxResult.error);
    if (proposalsResult.error) console.error('Error fetching proposals:', proposalsResult.error);

    setRates((ratesResult.data as SavedRate[]) || []);
    setTaxEstimates((taxResult.data as TaxEstimate[]) || []);
    setProposals((proposalsResult.data as Proposal[]) || []);
    setLoading(false);
  }, [router, supabase]);

  useEffect(() => {
    fetchUserAndData();
  }, [fetchUserAndData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    toast.show('Logged out successfully');
  };

  const handleSyncLocalStats = async () => {
    if (localRates.length === 0 && localTaxEstimates.length === 0) {
      toast.show('No local guest stats to sync.');
      return;
    }

    setSyncing(true);

    try {
      await Promise.all([
        ...localRates.map((rate) =>
          fetch('/api/submit-rate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              skill: rate.skill,
              experience: rate.experience,
              city: rate.city,
              client_type: rate.clientType,
              pkr_low: rate.rate.pkrLow,
              pkr_mid: rate.rate.pkrMid,
              pkr_high: rate.rate.pkrHigh,
              usd_low: rate.rate.usdLow,
              usd_mid: rate.rate.usdMid,
              usd_high: rate.rate.usdHigh,
            }),
          })
        ),
        ...localTaxEstimates.map((estimate) =>
          fetch('/api/save-tax-estimate', {
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
          })
        ),
      ]);

      await fetchUserAndData();
      toast.show('Local guest stats synced to your account.');
    } catch {
      toast.show('Sync failed. Please try again.', 'error');
    } finally {
      setSyncing(false);
    }
  };

  const handleSaveProfile = async () => {
    const cleanName = fullName.trim();
    if (!cleanName) {
      toast.show('Please enter your name.', 'error');
      return;
    }

    setSavingProfile(true);

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { full_name: cleanName },
      });

      if (error) throw error;

      setUser(data.user);
      toast.show('Profile settings updated.');
    } catch {
      toast.show('Profile update failed. Please try again.', 'error');
    } finally {
      setSavingProfile(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-10 h-10 border-4 border-[#00F5C4] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: 'rates' as const, label: 'Saved Rates', icon: Activity, count: rates.length },
    { id: 'tax' as const, label: 'Tax Estimates', icon: Receipt, count: taxEstimates.length },
    { id: 'proposals' as const, label: 'Proposals', icon: FileText, count: proposals.length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-32">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Dashboard</h1>
          <p className="text-[#8B8B9E]">Welcome back, {user?.user_metadata?.full_name || 'Freelancer'}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={handleSyncLocalStats}
            disabled={syncing}
            className="btn-teal px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold disabled:opacity-60"
          >
            <RefreshCw size={16} className={clsx(syncing && 'animate-spin')} />
            Sync Guest Stats
          </button>
          <button
            onClick={handleLogout}
            className="btn-outline px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm text-red-400 hover:text-red-300 border-[rgba(255,100,100,0.2)] hover:border-[rgba(255,100,100,0.4)]"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-2">
          {tabs.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={clsx(
                'px-4 py-3 rounded-xl flex items-center justify-between gap-3 font-medium transition-colors text-left',
                activeTab === id
                  ? 'bg-[rgba(255,255,255,0.05)] text-white border border-[rgba(255,255,255,0.1)]'
                  : 'text-[#8B8B9E] hover:bg-[rgba(255,255,255,0.02)]'
              )}
            >
              <span className="flex items-center gap-3">
                <Icon size={18} className={activeTab === id ? 'text-[#00F5C4]' : undefined} />
                {label}
              </span>
              <span className="text-xs font-mono">{count}</span>
            </button>
          ))}
          <button
            onClick={() => router.push('/calculator')}
            className="text-[#8B8B9E] hover:bg-[rgba(255,255,255,0.02)] px-4 py-3 rounded-xl flex items-center gap-3 font-medium transition-colors text-left"
          >
            <Calculator size={18} />
            New Calculation
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={clsx(
              'px-4 py-3 rounded-xl flex items-center gap-3 font-medium transition-colors text-left',
              activeTab === 'profile'
                ? 'bg-[rgba(255,255,255,0.05)] text-white border border-[rgba(255,255,255,0.1)]'
                : 'text-[#8B8B9E] hover:bg-[rgba(255,255,255,0.02)]'
            )}
          >
            <User size={18} />
            Profile Settings
          </button>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-[#111118] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 md:p-8">
            {activeTab === 'rates' && (
              <>
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Activity size={20} className="text-[#00F5C4]" />
                  Saved Rate Calculations
                </h2>
                {rates.length === 0 ? (
                  <EmptyState label="You have not saved any rates yet." action="Go to Calculator" onClick={() => router.push('/calculator')} />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rates.map((rate) => (
                      <motion.div
                        key={rate.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#0A0A0F] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(0,245,196,0.2)] rounded-xl p-5 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-white">{rate.skill}</h3>
                            <p className="text-xs text-[#8B8B9E] capitalize">{rate.experience} - {rate.client_type} client - {rate.city}</p>
                          </div>
                          <span className="text-[10px] text-[#8B8B9E]">{new Date(rate.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.05)] pt-4">
                          <Metric label="USD Rate" value={`$${rate.usd_mid}/hr`} highlight />
                          <Metric label="PKR Rate" value={`Rs ${formatPKR(rate.pkr_mid)}/hr`} alignRight />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === 'tax' && (
              <>
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Receipt size={20} className="text-[#00F5C4]" />
                  Saved Tax Estimates
                </h2>
                {taxEstimates.length === 0 ? (
                  <EmptyState label="You have not saved any tax estimates yet." action="Open Tax Calculator" onClick={() => router.push('/tax')} />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {taxEstimates.map((estimate) => (
                      <motion.div
                        key={estimate.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#0A0A0F] border border-[rgba(255,255,255,0.05)] rounded-xl p-5"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-white">PKR {formatPKR(estimate.monthly_income)}/mo</h3>
                            <p className="text-xs text-[#8B8B9E]">{estimate.is_pseb ? 'PSEB registered' : 'Not PSEB registered'} - {estimate.tax_rate}</p>
                          </div>
                          <span className="text-[10px] text-[#8B8B9E]">{new Date(estimate.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-t border-[rgba(255,255,255,0.05)] pt-4">
                          <Metric label="Monthly Tax" value={`Rs ${formatPKR(estimate.tax_amount)}`} highlight />
                          <Metric label="Net Income" value={`Rs ${formatPKR(estimate.net_income)}`} alignRight />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === 'proposals' && (
              <>
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <FileText size={20} className="text-[#00F5C4]" />
                  Proposal History
                </h2>
                {proposals.length === 0 ? (
                  <EmptyState label="You have not generated any saved proposals yet." action="Generate Proposal" onClick={() => router.push('/proposals')} />
                ) : (
                  <div className="flex flex-col gap-4">
                    {proposals.map((proposal) => (
                      <motion.div
                        key={proposal.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#0A0A0F] border border-[rgba(255,255,255,0.05)] rounded-xl p-5"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="font-bold text-white line-clamp-2">{proposal.project_description}</h3>
                          <span className="text-[10px] text-[#8B8B9E] shrink-0">{new Date(proposal.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-[#F5A623] font-semibold mb-3">${proposal.rate_used}/hr</p>
                        <div className="relative">
                          <p className={clsx("text-sm text-[#E2E2E2] whitespace-pre-wrap", !expandedProposals[proposal.id] && "line-clamp-4")}>{proposal.generated_text}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(proposal.generated_text);
                              toast.show('Proposal copied to clipboard!');
                            }}
                            className="text-xs font-semibold text-[#00F5C4] hover:text-[#00c9a3] transition-colors flex items-center gap-1.5"
                          >
                            <FileText size={14} />
                            Copy Full Proposal
                          </button>
                          <button 
                            onClick={() => setExpandedProposals(prev => ({ ...prev, [proposal.id]: !prev[proposal.id] }))}
                            className="text-xs font-semibold text-[#8B8B9E] hover:text-white transition-colors"
                          >
                            {expandedProposals[proposal.id] ? 'Show Less' : 'Read Full'}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === 'profile' && (
              <>
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <User size={20} className="text-[#00F5C4]" />
                  Profile Settings
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
                  <div className="bg-[#0A0A0F] border border-[rgba(255,255,255,0.05)] rounded-xl p-5">
                    <label className="block">
                      <span className="text-xs font-semibold text-[#8B8B9E] uppercase tracking-widest">Full name</span>
                      <input
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111118] px-4 py-3 text-white outline-none transition-colors focus:border-[#00F5C4]"
                        placeholder="Your name"
                      />
                    </label>

                    <div className="mt-5 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[#111118] p-4">
                      <p className="text-xs font-semibold text-[#8B8B9E] uppercase tracking-widest mb-1">Account email</p>
                      <p className="text-sm text-[#E2E2E2] break-all">{user?.email || 'No email available'}</p>
                    </div>

                    <button
                      onClick={handleSaveProfile}
                      disabled={savingProfile}
                      className="btn-teal mt-5 px-6 py-3 rounded-xl text-sm font-semibold disabled:opacity-60"
                    >
                      {savingProfile ? 'Saving...' : 'Save Profile Settings'}
                    </button>
                  </div>

                  <div className="bg-[#0A0A0F] border border-[rgba(0,245,196,0.12)] rounded-xl p-5">
                    <div className="w-14 h-14 rounded-full bg-[rgba(0,245,196,0.12)] border border-[rgba(0,245,196,0.3)] flex items-center justify-center mb-4">
                      <User size={24} className="text-[#00F5C4]" />
                    </div>
                    <h3 className="font-bold text-white">{fullName || 'Freelancer'}</h3>
                    <p className="text-xs text-[#8B8B9E] mt-1 break-all">{user?.email}</p>
                    <p className="text-sm text-[#8B8B9E] mt-4">
                      This name is used across your dashboard and account profile. Saved rates, tax estimates, and proposals remain protected by Supabase RLS.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ label, action, onClick }: { label: string; action: string; onClick: () => void }) {
  return (
    <div className="text-center py-16 bg-[#0A0A0F] rounded-xl border border-[rgba(255,255,255,0.02)]">
      <p className="text-[#8B8B9E] mb-4">{label}</p>
      <button onClick={onClick} className="btn-teal px-6 py-2 rounded-lg text-sm font-medium">
        {action}
      </button>
    </div>
  );
}

function Metric({ label, value, highlight = false, alignRight = false }: { label: string; value: string; highlight?: boolean; alignRight?: boolean }) {
  return (
    <div className={alignRight ? 'text-right' : undefined}>
      <p className="text-[10px] text-[#8B8B9E] font-bold tracking-wider mb-1 uppercase">{label}</p>
      <p className={clsx('font-bold font-numbers', highlight ? 'text-xl text-[#F5A623]' : 'text-sm text-[#E2E2E2]')}>{value}</p>
    </div>
  );
}
