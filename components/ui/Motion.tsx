'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { clsx } from 'clsx';

type MotionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const smoothEase = [0.16, 1, 0.3, 1] as const;

export function Reveal({ children, className, delay = 0 }: MotionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: smoothEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className, delay = 0 }: MotionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.09,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: MotionProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: smoothEase },
        },
      }}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  );
}
