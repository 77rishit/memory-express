import React, { useState } from 'react';
import { BookOpen, Calendar, Lock } from 'lucide-react';
import type { MemoryItem } from '../../types/timeline';
import { ambientSound } from '../../audio/ambientSound';

interface DiaryDocumentCardProps {
  memory: MemoryItem;
  onClick: () => void;
}

export const DiaryDocumentCard: React.FC<DiaryDocumentCardProps> = ({ memory, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const rotation = memory.rotation ?? 0;
  const webpUrl = memory.media.replace(/\.(png|jpg|jpeg)$/i, '.webp');

  const handleClick = () => {
    ambientSound.playCardInspect();
    onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Open private diary memory: ${memory.title}, ${memory.date}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered
          ? 'translateY(-10px) scale(1.02) rotate(0deg)'
          : `rotate(${rotation}deg)`,
        transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease'
      }}
      className="group relative cursor-pointer select-none max-w-sm sm:max-w-md w-full my-4 touch-manipulation active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:outline-none rounded-md"
    >
      {/* Archival Diary Bound Cover */}
      <div className="relative bg-[#1c1917] p-3.5 sm:p-5 rounded-md border border-[#3b322b] shadow-[0_25px_60px_rgba(0,0,0,0.9)] ring-1 ring-amber-900/30">
        {/* Leather/Journal Edge Emboss line */}
        <div className="absolute inset-1.5 rounded-sm border border-amber-800/20 pointer-events-none" />

        {/* Archival Bookmark Ribbon */}
        <div className="absolute -top-3 right-6 sm:right-8 w-3.5 sm:w-4 h-8 sm:h-9 bg-[#8b2626] shadow-md border-x border-[#5c1a1a] rounded-b-xs pointer-events-none" />

        {/* Top Header Badge */}
        <div className="flex items-center justify-between pb-2.5 mb-2.5 sm:pb-3 sm:mb-3 border-b border-amber-900/30">
          <div className="flex items-center gap-1.5 text-[#d4af37] text-[10px] sm:text-[11px] font-mono-tech tracking-widest uppercase">
            <Lock className="w-3 h-3 text-[#d4af37]/70" />
            <span>CONFIDENTIAL ARCHIVE</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono-tech text-white/50">
            <Calendar className="w-3 h-3 text-[#d4af37]/60" />
            <span>{memory.date}</span>
          </div>
        </div>

        {/* Document Screenshot Viewport */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0d0e12] rounded-xs border border-white/10 shadow-inner">
          <picture>
            <source srcSet={webpUrl} type="image/webp" />
            <img
              src={memory.media}
              alt={memory.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          </picture>

          {/* Paper Texture and Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

          {/* Readable Preview Overlay at bottom */}
          <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 bg-gradient-to-t from-black via-black/90 to-transparent">
            <div className="flex items-center gap-1.5 text-[#d4af37] text-[10px] font-mono-tech uppercase tracking-wider mb-1">
              <BookOpen className="w-3 h-3" />
              <span>UNSAID LETTER EXCERPT</span>
            </div>
            <p className="font-garamond italic text-xs sm:text-sm text-white/90 line-clamp-2 leading-relaxed">
              "{memory.quote || 'Mujhe bas itna chahiye tha ki mai apni feelings kisi aise insaan ke saamne rakh saku...'}"
            </p>
          </div>

          {/* Hover Open Hint */}
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-xs flex flex-col items-center justify-center gap-2 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="p-3 sm:p-3.5 rounded-full bg-black/80 border border-[#d4af37]/70 text-[#d4af37] shadow-2xl">
              <BookOpen className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
            <span className="text-[11px] sm:text-xs font-mono-tech tracking-widest uppercase text-white bg-black/80 px-3 py-1 rounded-full border border-white/10">
              Open Full Diary Entry
            </span>
          </div>
        </div>

        {/* Card Footer Caption */}
        <div className="mt-3 px-1 flex flex-col justify-between">
          <h3 className="font-cinzel text-base sm:text-lg text-[#ede8df] font-semibold tracking-wide group-hover:text-[#d4af37] transition-colors">
            {memory.title}
          </h3>
          {memory.subtitle && (
            <p className="font-sans text-xs text-white/60 font-light mt-1">
              {memory.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Realistic Deep Drop Shadow behind card */}
      <div className="absolute -bottom-3 -right-2 w-full h-full bg-black/60 -z-10 rounded-md blur-xl" />
    </div>
  );
};
