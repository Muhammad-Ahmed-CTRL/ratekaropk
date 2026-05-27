'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/tax', label: 'Tax' },
  { href: '/proposals', label: 'Proposals' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
    router.push('/');
    router.refresh();
  }, [supabase, router]);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [menuOpen]);

  const avatarUrl = user?.user_metadata?.avatar_url;
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-6 lg:px-10 h-14 border-b border-[rgba(0,245,196,0.08)] bg-[#0A0A0F]/90 backdrop-blur-md">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <motion.div
          whileHover={{ scale: 1.03 }}
        >
          <Image
            src="/brand/ratekaro-logo-transparent.png"
            alt="RateKaro PK"
            width={436}
            height={115}
            priority
            className="h-9 w-auto"
          />
        </motion.div>
      </Link>

      {/* Nav links */}
      <nav className="flex items-center gap-1">
        {navLinks.map((link) => {
          const isActive =
            link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200',
                isActive ? 'text-[#00F5C4]' : 'text-[#8B8B9E] hover:text-white'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-[rgba(0,245,196,0.08)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Right: Auth area */}
      <div className="flex items-center gap-3">
        {loading ? (
          <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] animate-pulse" />
        ) : user ? (
          /* ---- Logged in ---- */
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/dashboard"
                className="w-8 h-8 flex items-center justify-center text-[#8B8B9E] hover:text-[#00F5C4] transition-colors"
                aria-label="Dashboard"
              >
                <LayoutGrid size={18} />
              </Link>
            </motion.div>

            {/* User avatar / dropdown trigger */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.08 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((prev) => !prev);
                }}
                className="w-9 h-9 rounded-full bg-[rgba(0,245,196,0.15)] border border-[rgba(0,245,196,0.3)] flex items-center justify-center cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#00F5C4]/40"
                aria-label="User menu"
              >
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={displayName}
                    width={36}
                    height={36}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <UserIcon size={15} className="text-[#00F5C4]" />
                )}
              </motion.button>

              {/* Dropdown menu */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-56 bg-[#15151F] border border-[rgba(255,255,255,0.08)] rounded-xl shadow-2xl overflow-hidden z-[100]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
                      <p className="text-sm font-semibold text-white truncate">{displayName}</p>
                      <p className="text-xs text-[#8B8B9E] truncate">{user.email}</p>
                    </div>

                    {/* Menu items */}
                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#E2E2E2] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                      >
                        <LayoutGrid size={16} className="text-[#8B8B9E]" />
                        My Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-[rgba(255,100,100,0.06)] transition-colors"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* ---- Not logged in ---- */
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-[rgba(0,245,196,0.12)] border border-[rgba(0,245,196,0.25)] text-[#00F5C4] hover:bg-[rgba(0,245,196,0.2)] transition-colors"
            >
              <LogIn size={16} />
              Sign In
            </motion.button>
          </Link>
        )}
      </div>
    </header>
  );
}

