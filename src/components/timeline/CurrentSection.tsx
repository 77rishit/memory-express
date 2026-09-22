import React, { useState } from 'react';
import { Clock, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export const CurrentSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <section
      id="year-current"
      className="relative py-24 sm:py-36 border-b border-white/5 scroll-mt-24 overflow-hidden"
    >
      {/* Dark, Quiet Window Ambient Rain Atmosphere */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608] via-[#090b10] to-[#040507]" />
        {/* Subtle rain reflection texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,135,160,0.06),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Quiet Chronological Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/50 text-[10px] font-mono-tech tracking-[0.3em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/80 animate-pulse" />
            <span>CURRENT SITUATION · SEPTEMBER 2026</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl text-[#ede8df] font-bold tracking-wider uppercase mb-3">
            Where Things Stand
          </h2>

          <p className="font-garamond italic text-base sm:text-xl text-white/50 max-w-lg mx-auto font-light leading-relaxed">
            "Some stories don't end. They simply become quiet."
          </p>
        </div>

        {/* Quiet Main Composition: Empty Phone Interface Beside The Silence Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-10">
          {/* Left Column: One Empty Phone Screen */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[300px] aspect-[9/18] bg-[#121317] rounded-[2.8rem] border-4 border-[#24262c] p-3 shadow-[0_30px_70px_rgba(0,0,0,0.95)] ring-1 ring-white/10 flex flex-col justify-between overflow-hidden">
              {/* Dynamic Island / Speaker */}
              <div className="w-24 h-4 bg-black rounded-full mx-auto my-1 shrink-0 flex items-center justify-center gap-1.5 px-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1c1c1e]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0a84ff]/50" />
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-3 text-[10px] font-mono-tech text-white/35 pt-1">
                <span>9:41</span>
                <span className="flex items-center gap-1">
                  <span>5G</span>
                  <span className="w-3.5 h-2 border border-white/30 rounded-xs flex items-center p-0.5">
                    <span className="w-2/3 h-full bg-white/50 rounded-xs" />
                  </span>
                </span>
              </div>

              {/* Chat App Header: Quiet Silence */}
              <div className="py-2.5 px-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[11px] font-mono-tech text-white/40">
                    P
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white/80 font-sans tracking-wide">
                      Prachi
                    </div>
                    <div className="text-[9px] font-mono-tech text-white/30">
                      offline
                    </div>
                  </div>
                </div>
                <div className="text-[9px] font-mono-tech text-white/30">
                  Sep 2026
                </div>
              </div>

              {/* Empty Chat Space (No incoming notifications, no chat bubbles) */}
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mb-3 text-white/20">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="font-mono-tech text-xs tracking-widest uppercase text-white/40 mb-1">
                  No new messages
                </span>
                <span className="font-sans text-[11px] text-white/25 font-light">
                  There are no recent notifications
                </span>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="py-2 px-3 border-t border-white/5 text-center">
                <span className="text-[10px] font-mono-tech tracking-wider text-white/30 uppercase">
                  Since last month...
                </span>
                <div className="w-24 h-1 bg-white/25 rounded-full mx-auto mt-2" />
              </div>

              {/* Soft Glass Glare Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.08] pointer-events-none rounded-[2.8rem]" />
            </div>
          </div>

          {/* Right Column: Visible Cinematic Typographic Progression */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pl-0 lg:pl-4">
            {/* Step 1: The Silence */}
            <div className="space-y-1.5 border-l-2 border-[#d4af37]/30 pl-5">
              <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#d4af37]/80 block">
                THE CURRENT REALITY
              </span>
              <div className="font-cinzel text-2xl sm:text-3xl text-[#ede8df] font-bold tracking-wider leading-relaxed">
                NO TEXTS.<br />
                NO CALLS.<br />
                NO MESSAGES.
              </div>
            </div>

            {/* Step 2: The Decision to Stop Forcing */}
            <div className="space-y-2 border-l-2 border-white/10 pl-5">
              <span className="font-mono-tech text-xs tracking-[0.25em] uppercase text-white/40 block">
                THE REALIZATION
              </span>
              <p className="font-garamond italic text-xl sm:text-2xl text-white/80 font-light leading-relaxed">
                Since last month,<br />
                I stopped reaching out.
              </p>
            </div>

            {/* Step 3: Caring vs Expecting */}
            <div className="space-y-2 border-l-2 border-[#d4af37]/30 pl-5">
              <span className="font-mono-tech text-xs tracking-[0.25em] uppercase text-[#d4af37]/70 block">
                ACCEPTANCE
              </span>
              <div className="font-cinzel text-xl sm:text-2xl text-[#ede8df] font-medium tracking-wide space-y-1">
                <div>I didn't stop caring.</div>
                <div className="text-[#d4af37]">I stopped expecting.</div>
              </div>
            </div>

            {/* Step 4: Final Line */}
            <div className="p-5 rounded-sm bg-white/[0.02] border border-white/10 max-w-lg">
              <p className="font-garamond italic text-lg sm:text-xl text-[#ede8df]/90 font-light leading-relaxed">
                "Some stories don't end.<br />
                They simply become quiet."
              </p>
            </div>

            {/* Toggle to Read Personal Experience Context */}
            <div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 text-xs font-mono-tech text-white/50 hover:text-white transition-colors tracking-wider uppercase"
              >
                <span>{isExpanded ? 'Collapse Context' : 'Read Personal Note'}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {isExpanded && (
                <div className="mt-4 p-6 rounded-sm bg-[#0d0f14] border border-white/10 text-white/80 font-sans text-xs sm:text-sm leading-relaxed space-y-3 animate-in fade-in duration-300">
                  <p>
                    Right now, there are no texts, no messages, and no calls.
                  </p>
                  <p>
                    For a long time, most of the effort to stay connected was coming from my side.
                    I kept trying to contact her, but I realized that every time I did, my expectations started increasing again.
                  </p>
                  <p>
                    I don't want to keep increasing those expectations. So, since last month, I stopped trying to contact her.
                  </p>
                  <p>
                    Not because I suddenly stopped caring. Not because I hate her. I simply decided to stop forcing something from my side and let things exist as they naturally are.
                  </p>
                  <p className="font-garamond italic text-base text-[#d4af37]">
                    For now, there is silence. And I am letting the silence be.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Empty Photograph Frame: The Unwritten Future */}
        <div className="mt-20 pt-16 border-t border-white/10 flex flex-col items-center text-center">
          <div className="relative w-48 sm:w-56 aspect-[3/4] bg-[#0c0d12] rounded-xs border-2 border-dashed border-white/20 p-4 flex flex-col items-center justify-center shadow-2xl group hover:border-[#d4af37]/40 transition-colors">
            {/* Subtle empty mat mount */}
            <div className="w-full h-full border border-white/5 flex flex-col items-center justify-center p-3 text-white/25">
              <Sparkles className="w-5 h-5 mb-2 opacity-50 text-[#d4af37]" />
              <span className="font-mono-tech text-[10px] tracking-widest uppercase text-white/40">
                UNWRITTEN
              </span>
            </div>
          </div>

          <div className="mt-5 space-y-1">
            <h4 className="font-cinzel text-lg sm:text-xl text-[#ede8df] tracking-wider uppercase font-semibold">
              Still writing...
            </h4>
            <div className="font-mono-tech text-xs tracking-[0.25em] text-[#d4af37]/80 uppercase">
              NEXT CHAPTER: UNKNOWN
            </div>
          </div>

          <p className="font-sans text-xs text-white/40 max-w-sm mt-3 font-light leading-relaxed">
            The timeline remains alive. New days will quietly become the next bookmarks in time.
          </p>
        </div>
      </div>
    </section>
  );
};
