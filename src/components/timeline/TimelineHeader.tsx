import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ambientSound } from '../../audio/ambientSound';

interface TimelineHeaderProps {
  years?: (number | string)[];
}

export const TimelineHeader: React.FC<TimelineHeaderProps> = () => {
  const [isMuted, setIsMuted] = useState(ambientSound.getIsMuted());
  const [activeYear, setActiveYear] = useState<string>('2022');

  const handleToggleSound = () => {
    const next = ambientSound.toggleMute();
    setIsMuted(next);
  };

  const scrollToYear = (year: number | string) => {
    ambientSound.playNavClick();
    const targetId =
      year === 'CURRENT' || year === 'NOW'
        ? 'year-current'
        : year === 'FUTURE'
        ? 'year-future'
        : `year-${year}`;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll listener to update active year
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const yearElements = [
        { key: '2022', id: 'year-2022' },
        { key: '2023', id: 'year-2023' },
        { key: '2024', id: 'year-2024' },
        { key: '2025', id: 'year-2025' },
        { key: '2026', id: 'year-2026' },
        { key: 'NOW', id: 'year-current' }
      ];

      for (let i = yearElements.length - 1; i >= 0; i--) {
        const item = yearElements[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveYear(item.key);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineSteps = [
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },
    { label: 'NOW', value: 'CURRENT' }
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#050608]/92 backdrop-blur-xl border-b border-white/10 px-2.5 sm:px-6 py-2 sm:py-3 flex items-center justify-between safe-top">
      {/* Brand Title */}
      <div className="flex items-center gap-2 shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
        <span className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#ede8df] font-bold uppercase hidden md:inline">
          MY TIMELINE
        </span>
      </div>

      {/* Progress Indicator: 2022 — 2023 — 2024 — 2025 — 2026 — NOW */}
      <nav
        aria-label="Timeline Chronology"
        className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 overflow-x-auto max-w-[74vw] sm:max-w-none scrollbar-none touch-pan-x"
      >
        {timelineSteps.map((step, idx) => {
          const isActive = activeYear === step.label;
          const isLast = idx === timelineSteps.length - 1;

          return (
            <React.Fragment key={step.label}>
              <button
                type="button"
                onClick={() => scrollToYear(step.value)}
                aria-label={`Jump to year ${step.label}`}
                aria-current={isActive ? 'step' : undefined}
                className={`min-h-[36px] min-w-[34px] px-2 sm:px-2.5 py-1 rounded-full text-xs font-mono-tech tracking-wider transition-all duration-300 whitespace-nowrap touch-manipulation focus-visible:ring-2 focus-visible:ring-[#d4af37] ${
                  isActive
                    ? 'text-[#d4af37] bg-[#d4af37]/20 font-semibold ring-1 ring-[#d4af37]/50 shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                    : 'text-white/65 hover:text-white hover:bg-white/10 active:bg-white/15'
                }`}
              >
                {step.label}
              </button>
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="text-white/20 select-none text-[10px] sm:text-xs font-mono-tech px-0.5"
                >
                  —
                </span>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      {/* Ambient Sound Toggle */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={handleToggleSound}
          aria-label={isMuted ? 'Unmute Ambient Sound' : 'Mute Ambient Sound'}
          className="min-h-[44px] min-w-[44px] p-2 rounded-full bg-white/5 hover:bg-white/15 active:bg-white/20 text-white/70 hover:text-white border border-white/10 transition-all flex items-center justify-center text-xs font-mono-tech touch-manipulation focus-visible:ring-2 focus-visible:ring-[#d4af37]"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-red-400" />
          ) : (
            <div className="flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-[#d4af37]" />
              <div className="flex items-end gap-0.5 h-2.5">
                <span className="w-0.5 bg-[#d4af37] rounded-full animate-bounce h-1.5" style={{ animationDelay: '0ms' }} />
                <span className="w-0.5 bg-[#d4af37] rounded-full animate-bounce h-2.5" style={{ animationDelay: '150ms' }} />
                <span className="w-0.5 bg-[#d4af37] rounded-full animate-bounce h-1" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </button>
      </div>
    </header>
  );
};
