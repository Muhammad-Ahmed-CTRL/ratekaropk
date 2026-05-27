'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface SkillPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  index?: number;
}

export function SkillPill({ label, isActive, onClick, index = 0 }: SkillPillProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        'px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border',
        isActive
          ? 'bg-[rgba(0,245,196,0.08)] border-[#00F5C4] text-[#00F5C4] shadow-[0_0_12px_rgba(0,245,196,0.2)]'
          : 'bg-[#111118] border-[rgba(0,245,196,0.15)] text-[#8B8B9E] hover:border-[rgba(0,245,196,0.3)] hover:text-white'
      )}
    >
      {label}
    </motion.button>
  );
}
