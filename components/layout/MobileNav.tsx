'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Calculator, Receipt, FileText, User } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/calculator', label: 'Calculator', icon: Calculator },
  { href: '/tax', label: 'Tax', icon: Receipt },
  { href: '/proposals', label: 'Proposals', icon: FileText },
  { href: '/dashboard', label: 'Profile', icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-4 mb-4 bg-[#111118]/95 backdrop-blur-md border border-[rgba(0,245,196,0.12)] rounded-[28px] px-2 py-2 flex items-center justify-around shadow-[0_-4px_32px_rgba(0,0,0,0.5)]">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-2xl"
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-nav-active"
                  className="absolute inset-0 rounded-2xl bg-[rgba(0,245,196,0.1)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                className={clsx(
                  'relative z-10 transition-colors',
                  isActive ? 'text-[#00F5C4]' : 'text-[#8B8B9E]'
                )}
              />
              <span
                className={clsx(
                  'relative z-10 text-[10px] font-medium transition-colors',
                  isActive ? 'text-[#00F5C4]' : 'text-[#8B8B9E]'
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
