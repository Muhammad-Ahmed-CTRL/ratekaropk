'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bell, LayoutGrid, User } from 'lucide-react';
import { clsx } from 'clsx';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/tax', label: 'Tax' },
  { href: '/proposals', label: 'Proposals' },
  { href: '/dashboard', label: 'Profile' },
];

export default function Navbar() {
  const pathname = usePathname();

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

      {/* Right icons */}
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/dashboard"
            className="w-8 h-8 flex items-center justify-center text-[#8B8B9E] hover:text-[#00F5C4] transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </Link>
        </motion.div>
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
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="w-8 h-8 rounded-full bg-[rgba(0,245,196,0.15)] border border-[rgba(0,245,196,0.3)] flex items-center justify-center cursor-pointer"
        >
          <Link href="/dashboard" aria-label="Profile">
            <User size={15} className="text-[#00F5C4]" />
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
