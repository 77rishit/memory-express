import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ambientSound } from '../../audio/ambientSound';

interface CinematicIntroProps {
  onEnter: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onEnter }) => {
  const [line1, setLine1] = useState(false);
  const [line2, setLine2] = useState(false);
  const [title, setTitle] = useState(false);
  const [buttonReady, setButtonReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLine1(true), 600);
    const t2 = setTimeout(() => setLine2(true), 1500);
    const t3 = setTimeout(() => setTitle(true), 2400);
    const t4 = setTimeout(() => setButtonReady(true), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleEnterClick = () => {
    ambientSound.init();
    ambientSound.playCardInspect();
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  return (
    <div
      role="region"
      aria-label="Welcome screen"
      className={`fixed inset-0 z-50 bg-[#050608] text-[#ede8df] flex flex-col justify-center items-center px-4 sm:px-6 transition-all duration-700 select-none overflow-hidden ${
        isExiting ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Film Grain */}
      <div className="absolute inset-0 film-grain opacity-50 pointer-events-none" />

      {/* Subtle Radial Glow */}
      <div className="absolute w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-amber-500/5 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl flex flex-col items-center">
        {/* Poetic Opening Lines */}
        <div className="h-16 flex flex-col items-center justify-center mb-6 sm:mb-8">
          <p
            className={`font-garamond italic text-xl sm:text-3xl text-white/60 font-light tracking-wide transition-all duration-700 transform ${
              line1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            Some moments pass.
          </p>

          <p
            className={`font-garamond italic text-xl sm:text-3xl text-[#d4af37]/90 font-light tracking-wide transition-all duration-700 transform ${
              line2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            Some stay.
          </p>
        </div>

        {/* Brand Title */}
        <div
          className={`transition-all duration-700 transform mb-8 sm:mb-10 ${
            title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]/70" />
            <span className="font-mono-tech text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#d4af37]/80">
              A Personal Visual Journey
            </span>
          </div>

          <h1 className="font-cinzel text-4xl sm:text-7xl md:text-8xl tracking-[0.14em] sm:tracking-[0.16em] font-bold text-[#ede8df] uppercase">
            MY TIMELINE
          </h1>
        </div>

        {/* Tactile Enter Button */}
        <div
          className={`transition-all duration-700 transform ${
            buttonReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            type="button"
            onClick={handleEnterClick}
            aria-label="Enter chronology timeline"
            className="group relative inline-flex items-center justify-center gap-3 sm:gap-4 min-h-[48px] px-8 sm:px-10 py-3 sm:py-4 bg-[#0a0c12]/85 hover:bg-[#131722] active:scale-95 border border-[#d4af37]/50 hover:border-[#d4af37] rounded-sm text-[#ede8df] font-cinzel tracking-[0.25em] sm:tracking-[0.3em] text-xs uppercase transition-all duration-300 backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:shadow-[0_0_50px_rgba(212,175,55,0.35)] touch-manipulation focus-visible:ring-2 focus-visible:ring-[#d4af37]"
          >
            <span className="relative z-10 font-semibold group-hover:text-[#d4af37] transition-colors">
              ENTER
            </span>
            <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom notice */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-mono-tech text-white/30 tracking-[0.25em] uppercase whitespace-nowrap">
        PHOTOGRAPHY · STORIES · 2022 — PRESENT
      </div>
    </div>
  );
};
