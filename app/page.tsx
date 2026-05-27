'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calculator, Receipt, FileText, ArrowRight, Zap, Globe, Shield } from 'lucide-react';
import { Marquee } from '@/components/ui/Marquee';

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-8 grid-texture pt-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0F]/50 to-[#0A0A0F] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6"
          >
            <Image
              src="/brand/ratekaro-logo-transparent.png"
              alt="RateKaro PK"
              width={580}
              height={153}
              priority
              className="w-[240px] md:w-[380px] h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(0,245,196,0.1)] border border-[rgba(0,245,196,0.2)] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#00F5C4] animate-pulse" />
            <span className="text-xs font-medium text-[#00F5C4] uppercase tracking-wider">Pakistan&apos;s #1 Rate Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">Stop Guessing.</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5C4] to-[#00A8F5] drop-shadow-[0_0_40px_rgba(0,245,196,0.4)]">Start Charging Right.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-[#8B8B9E] max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Pakistan&apos;s first freelancer rate intelligence tool. Get market rates, calculate taxes, and generate AI proposals tailored for Pakistani freelancers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link href="/calculator" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto btn-teal px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,245,196,0.3)]">
                Calculate My Rate
                <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/tax" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto btn-outline px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 bg-[#111118]/50 backdrop-blur-sm">
                <Receipt size={18} />
                Tax Calculator
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Floating gradient orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F5C4] rounded-full blur-[150px] opacity-10 pointer-events-none mix-blend-screen" />
      </section>

      {/* Stats Marquee */}
      <section className="relative z-20 -mt-8 mb-24">
        <Marquee speed={35}>
          <div className="flex items-center gap-2 text-xl font-mono text-[#E2E2E2] font-semibold"><span className="text-[#00F5C4]">2.3M+</span> Freelancers</div>
          <span className="w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.2)]" />
          <div className="flex items-center gap-2 text-xl font-mono text-[#E2E2E2] font-semibold"><span className="text-[#00F5C4]">$530M+</span> IT Exports</div>
          <span className="w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.2)]" />
          <div className="flex items-center gap-2 text-xl font-mono text-[#E2E2E2] font-semibold"><span className="text-[#00F5C4]">45+</span> Skills Tracked</div>
          <span className="w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.2)]" />
          <div className="flex items-center gap-2 text-xl font-mono text-[#E2E2E2] font-semibold"><span className="text-[#00F5C4]">Top 4</span> Freelance Market</div>
        </Marquee>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to <span className="text-[#00F5C4]">succeed</span></h2>
          <p className="text-[#8B8B9E] max-w-xl mx-auto">Stop leaving money on the table. Use data-driven tools to price your services competitively and professionally.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#111118] border border-[rgba(0,245,196,0.15)] rounded-2xl p-8 card-hover relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F5C4] blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="w-12 h-12 rounded-xl bg-[rgba(0,245,196,0.1)] border border-[rgba(0,245,196,0.2)] flex items-center justify-center mb-6 text-[#00F5C4]">
              <Calculator size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Rate Calculator</h3>
            <p className="text-[#8B8B9E] leading-relaxed mb-6">Discover accurate market rates for 45+ skills based on your experience, city, and client type (Local/Foreign).</p>
            <Link href="/calculator" className="inline-flex items-center gap-2 text-[#00F5C4] font-medium text-sm hover:underline underline-offset-4">
              Calculate Rate <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#111118] border border-[rgba(0,245,196,0.15)] rounded-2xl p-8 card-hover relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F5C4] blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="w-12 h-12 rounded-xl bg-[rgba(0,245,196,0.1)] border border-[rgba(0,245,196,0.2)] flex items-center justify-center mb-6 text-[#00F5C4]">
              <Receipt size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Tax Calculator</h3>
            <p className="text-[#8B8B9E] leading-relaxed mb-6">Navigate FBR tax slabs and PSEB IT export exemptions easily. See your exact take-home pay instantly.</p>
            <Link href="/tax" className="inline-flex items-center gap-2 text-[#00F5C4] font-medium text-sm hover:underline underline-offset-4">
              Calculate Tax <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#111118] border border-[rgba(0,245,196,0.15)] rounded-2xl p-8 card-hover relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F5C4] blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="w-12 h-12 rounded-xl bg-[rgba(0,245,196,0.1)] border border-[rgba(0,245,196,0.2)] flex items-center justify-center mb-6 text-[#00F5C4]">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI Proposals</h3>
            <p className="text-[#8B8B9E] leading-relaxed mb-6">Generate professional, high-converting client proposals tailored to your rate and project context using AI.</p>
            <Link href="/proposals" className="inline-flex items-center gap-2 text-[#00F5C4] font-medium text-sm hover:underline underline-offset-4">
              Generate Proposal <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[rgba(255,255,255,0.02)] border-y border-[rgba(255,255,255,0.05)] py-24 mb-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why use RateKaro?</h2>
            <p className="text-[#8B8B9E] max-w-xl mx-auto">Built specifically for the nuances of the Pakistani freelance ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center mb-6 text-white border border-[rgba(255,255,255,0.1)]">
                <Globe size={28} />
              </div>
              <h4 className="text-lg font-bold mb-2">Local Context</h4>
              <p className="text-[#8B8B9E] text-sm leading-relaxed">Rates adjusted for major Pakistani cities (Karachi, Lahore, Islamabad) and remote work.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center mb-6 text-white border border-[rgba(255,255,255,0.1)]">
                <Zap size={28} />
              </div>
              <h4 className="text-lg font-bold mb-2">Live Currency Check</h4>
              <p className="text-[#8B8B9E] text-sm leading-relaxed">See PKR and USD ranges with a live exchange check and a clearly labeled fallback when the feed is unavailable.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center mb-6 text-white border border-[rgba(255,255,255,0.1)]">
                <Shield size={28} />
              </div>
              <h4 className="text-lg font-bold mb-2">PSEB Integrated</h4>
              <p className="text-[#8B8B9E] text-sm leading-relaxed">Tax calculations include official PSEB IT export exemptions (0.25%) built right in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-gradient-to-br from-[#111118] to-[#0A0A0F] border border-[rgba(0,245,196,0.3)] rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-[0_0_50px_rgba(0,245,196,0.1)]"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Ready to upgrade your freelance career?</h2>
            <p className="text-[#8B8B9E] mb-10 text-lg max-w-xl mx-auto">Join thousands of Pakistani freelancers who are charging what they&apos;re truly worth.</p>
            <Link href="/calculator">
              <button className="btn-teal px-10 py-4 rounded-full text-lg font-bold inline-flex items-center gap-3">
                Start Calculating Now <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
