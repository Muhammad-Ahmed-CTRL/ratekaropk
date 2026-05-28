'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/Toast';
import { GlowCard } from '@/components/ui/GlowCard';
import { useTaxStore } from '@/lib/store/useTaxStore';

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { isPSEB, setPSEB } = useTaxStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const supabase = createClient();
  const requestedRedirect = searchParams.get('redirect') || '/calculator';
  const redirect =
    requestedRedirect.startsWith('/') && !requestedRedirect.startsWith('//')
      ? requestedRedirect
      : '/calculator';

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          pseb_registered: isPSEB,
        },
        emailRedirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(redirect)}`,
      },
    });

    if (error) {
      setLoading(false);
      toast.show(error.message, 'error');
      return;
    }

    if (data.session) {
      await supabase.auth.getSession();
      toast.show('Account created successfully.');
      window.location.assign(redirect);
      return;
    }

    setLoading(false);
    toast.show('Account created. Please check your email to verify, then sign in.');
    router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
  };

  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(redirect)}`,
      },
    });

    if (error) {
      toast.show(error.message, 'error');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 grid-texture relative py-10 md:py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-transparent to-[#0A0A0F] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <GlowCard className="p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-[#8B8B9E] text-sm">Save your rates, tax estimates, and proposal history.</p>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full bg-white text-black hover:bg-gray-100 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-colors mb-6"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-[rgba(255,255,255,0.1)] flex-1" />
            <span className="text-[#8B8B9E] text-xs font-medium">OR</span>
            <div className="h-px bg-[rgba(255,255,255,0.1)] flex-1" />
          </div>

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <Field label="Full Name">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input"
                placeholder="Ahmad Khan"
              />
            </Field>

            <Field label="Email">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                placeholder="you@example.com"
              />
            </Field>

            <Field label="Password">
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                placeholder="••••••••"
              />
            </Field>

            <button
              type="button"
              className="bg-[#0A0A0F] border border-[rgba(255,255,255,0.1)] rounded-xl p-4 mt-2 flex items-center justify-between text-left"
              onClick={() => setPSEB(!isPSEB)}
            >
              <span>
                <span className="block text-sm text-white font-medium">PSEB Registered</span>
                <span className="block text-[11px] text-[#8B8B9E] mt-1">For tax exemptions (0.25%)</span>
              </span>
              <span className={clsx('toggle-track', isPSEB && 'active')}>
                <span className={clsx('toggle-thumb', isPSEB && 'active')} />
              </span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn-teal w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : (
                <>Create Account <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <p className="text-center text-[#8B8B9E] text-sm mt-8">
            Already have an account?{' '}
            <Link href={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-[#00F5C4] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </GlowCard>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-[#8B8B9E] uppercase tracking-wider mb-2">{label}</span>
      {children}
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-4rem)] flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#00F5C4] border-t-transparent rounded-full animate-spin" /></div>}>
      <SignupForm />
    </Suspense>
  );
}
