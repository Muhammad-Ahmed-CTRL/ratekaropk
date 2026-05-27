'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function GlowCard({ children, className = '', delay = 0 }: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={clsx(
        'relative bg-card border border-teal rounded-card p-6 overflow-hidden glow-pulse',
        className
      )}
    >
      {/* Background radial gradient for subtle inner glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[rgba(0,245,196,0.1)] via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
