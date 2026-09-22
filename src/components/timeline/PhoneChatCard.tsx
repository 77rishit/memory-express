import React, { useState } from 'react';
import { MessageSquare, Calendar, Sparkles } from 'lucide-react';
import type { MemoryItem } from '../../types/timeline';
import { ambientSound } from '../../audio/ambientSound';

interface PhoneChatCardProps {
  memory: MemoryItem;
  onClick: () => void;
}

export const PhoneChatCard: React.FC<PhoneChatCardProps> = ({ memory, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const rotation = memory.rotation ?? 0;

  const handleClick = () => {
    ambientSound.playCardInspect();
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered
          ? 'translateY(-10px) scale(1.02) rotate(0deg)'
          : `rotate(${rotation}deg)`,
        transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease'
      }}
      className="group relative cursor-pointer select-none max-w-xs sm:max-w-sm w-full my-4"
    >
      {/* Phone Hardware Chassis */}
      <div className="relative bg-[#16171b] p-3 pt-3.5 pb-4 rounded-[2.5rem] border-4 border-[#2c2d33] shadow-[0_25px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/15">
        {/* Subtle Metallic Outer Edge Highlights */}
        <div className="absolute inset-0 rounded-[2.3rem] ring-1 ring-white/10 pointer-events-none" />

        {/* Top Speaker / Dynamic Island */}
        <div className="flex items-center justify-between px-6 pt-1 pb-2">
          <span className="text-[10px] font-mono-tech text-white/50 tracking-wider">
            {memory.date.includes('·') ? memory.date.split('·')[1].trim() : '10:55'}
          </span>
          <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center gap-1.5 px-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1c1c1e]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#0a84ff]/60" />
          </div>
          <div className="flex items-center gap-1 text-white/40 text-[9px] font-mono-tech">
            <span>5G</span>
            <span className="w-3.5 h-2 border border-white/40 rounded-xs flex items-center p-0.5">
              <span className="w-full h-full bg-white/70 rounded-xs" />
            </span>
          </div>
        </div>

        {/* Screenshot Viewport Container */}
        <div className="relative aspect-[9/17] w-full overflow-hidden bg-black rounded-[1.6rem] border border-white/5">
          <img
            src={memory.media}
            alt={memory.title}
            className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />

          {/* Glare Glass Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none rounded-[1.6rem]" />

          {/* Hover Overlay Hint */}
          <div
            className={`absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center gap-2 text-white transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="p-3 rounded-full bg-black/80 border border-[#d4af37]/60 text-[#d4af37] shadow-xl">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono-tech tracking-widest uppercase text-white/90 bg-black/80 px-2.5 py-1 rounded-full border border-white/10">
              Read Chat
            </span>
          </div>

          {/* Type Badge */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/80 border border-white/15 text-[9px] font-mono-tech text-[#d4af37] backdrop-blur-md">
            <Sparkles className="w-2.5 h-2.5" />
            <span>CHAT ARCHIVE</span>
          </div>
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="w-24 h-1 bg-white/30 rounded-full mx-auto mt-2.5" />

        {/* Card Caption Label Below Phone */}
        <div className="mt-3.5 px-2">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-garamond text-base sm:text-lg text-[#ede8df] font-semibold tracking-wide group-hover:text-[#d4af37] transition-colors line-clamp-1">
              {memory.title}
            </h3>
            <span className="font-mono-tech text-[10px] text-white/50 tracking-wider shrink-0 flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5 text-[#d4af37]/70" />
              {memory.date.split('·')[0].trim()}
            </span>
          </div>
          {memory.subtitle && (
            <p className="font-sans text-[11px] text-white/60 font-light mt-0.5 line-clamp-1">
              {memory.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Realistic Deep Drop Shadow behind card */}
      <div className="absolute -bottom-3 -right-2 w-full h-full bg-black/60 -z-10 rounded-[2.5rem] blur-xl" />
    </div>
  );
};
