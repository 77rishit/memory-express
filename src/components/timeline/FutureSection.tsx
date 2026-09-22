import React from 'react';
import { Sparkles, Compass } from 'lucide-react';

export const FutureSection: React.FC = () => {
  return (
    <section id="year-future" className="relative py-24 sm:py-32 scroll-mt-24">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-[10px] font-mono-tech text-[#d4af37] tracking-[0.25em] uppercase">
          <Sparkles className="w-3 h-3 text-[#d4af37]" />
          <span>HORIZON</span>
        </div>

        <h2 className="font-cinzel text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[0.14em] text-[#ede8df] leading-none mb-4">
          FUTURE
        </h2>

        <div className="border-t border-b border-[#d4af37]/30 py-4 my-4 max-w-lg">
          <p className="font-garamond italic text-xl sm:text-2xl text-[#d4af37] tracking-wider">
            MEMORIES YET TO HAPPEN.
          </p>
        </div>

        <p className="font-sans text-xs sm:text-sm text-white/60 max-w-md leading-relaxed font-light mt-4 mb-8">
          The timeline stretches endlessly onward. There is no final destination, only unwritten chapters waiting to unfold.
        </p>

        {/* Ethereal Empty Frame Silhouette */}
        <div className="w-48 h-60 rounded-sm border border-dashed border-[#d4af37]/30 bg-gradient-to-b from-white/5 to-transparent flex flex-col items-center justify-center text-white/40 shadow-xl">
          <Compass className="w-6 h-6 text-[#d4af37]/60 mb-2 animate-spin" style={{ animationDuration: '20s' }} />
          <span className="font-mono-tech text-[10px] tracking-widest text-[#d4af37]/70 uppercase">
            RESERVED
          </span>
        </div>
      </div>
    </section>
  );
};
