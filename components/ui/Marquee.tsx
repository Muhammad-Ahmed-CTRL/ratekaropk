'use client';

import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // duration in seconds
}

export function Marquee({ children, speed = 28 }: MarqueeProps) {
  return (
    <div className="w-full overflow-hidden bg-card border-y border-[rgba(0,245,196,0.1)] py-3 relative flex">
      {/* Gradient masks for fading edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-primary to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-primary to-transparent pointer-events-none" />
      
      <div 
        className="flex min-w-full items-center shrink-0 animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex items-center gap-8 md:gap-16 px-4 md:px-8">
          {children}
        </div>
        {/* Duplicate for seamless looping */}
        <div className="flex items-center gap-8 md:gap-16 px-4 md:px-8" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
