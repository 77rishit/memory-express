import React, { useState } from 'react';
import { MapPin, Calendar, Camera } from 'lucide-react';
import type { MemoryItem } from '../../types/timeline';
import { ambientSound } from '../../audio/ambientSound';
import { PhoneChatCard } from './PhoneChatCard';
import { DiaryDocumentCard } from './DiaryDocumentCard';
import { VideoMemoryCard } from './VideoMemoryCard';

interface MemoryCardProps {
  memory: MemoryItem;
  onClick: () => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const rotation = memory.rotation ?? 0;

  // Dispatch to specialized components
  if (memory.category === 'chat_screenshot') {
    return <PhoneChatCard memory={memory} onClick={onClick} />;
  }

  if (memory.category === 'document_screenshot') {
    return <DiaryDocumentCard memory={memory} onClick={onClick} />;
  }

  if (memory.category === 'video') {
    return <VideoMemoryCard memory={memory} onClick={onClick} />;
  }

  // GENERAL MEMORY: photograph/card with date and a very short caption
  if (memory.category === 'general') {
    const handleGeneralClick = () => {
      ambientSound.playCardInspect();
      onClick();
    };

    const handleGeneralKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleGeneralClick();
      }
    };

    const webpUrl = memory.media.replace(/\.(png|jpg|jpeg)$/i, '.webp');

    return (
      <div
        role="button"
        tabIndex={0}
        aria-label={`Open memory: ${memory.title}, ${memory.date}`}
        onClick={handleGeneralClick}
        onKeyDown={handleGeneralKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered
            ? 'translateY(-8px) scale(1.02) rotate(0deg)'
            : `rotate(${rotation}deg)`,
          transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease'
        }}
        className="group relative cursor-pointer select-none max-w-sm sm:max-w-md w-full my-4 touch-manipulation active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:outline-none rounded-sm"
      >
        <div className="relative bg-[#181a20] p-3 sm:p-4 rounded-sm border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
          {/* Top minimal date & tag */}
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-white/50 pb-2 mb-1 border-b border-white/10">
            <span className="flex items-center gap-1 text-[#d4af37]">
              <Camera className="w-3 h-3" />
              <span>MEMORY ARCHIVE</span>
            </span>
            <span>{memory.date}</span>
          </div>

          {/* Media Viewport */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-black rounded-xs border border-white/5">
            <picture>
              <source srcSet={webpUrl} type="image/webp" />
              <img
                src={memory.media}
                alt={memory.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </picture>
            <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />
          </div>

          {/* Short Caption */}
          <div className="mt-3 px-1">
            <h3 className="font-garamond text-base sm:text-lg text-[#ede8df] font-semibold group-hover:text-[#d4af37] transition-colors line-clamp-1">
              {memory.title}
            </h3>
            {memory.subtitle && (
              <p className="font-sans text-xs text-white/60 font-light mt-0.5 line-clamp-1">
                {memory.subtitle}
              </p>
            )}
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 w-full h-full bg-black/50 -z-10 rounded-sm blur-md" />
      </div>
    );
  }

  // PHOTO: Premium cinematic photograph card
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

  const aspectClass =
    memory.aspectRatio === '1/1'
      ? 'aspect-square'
      : memory.aspectRatio === '16/9'
      ? 'aspect-video'
      : memory.aspectRatio === '9/16'
      ? 'aspect-[9/16]'
      : memory.aspectRatio === '3/4'
      ? 'aspect-[3/4]'
      : 'aspect-[4/3]';

  const webpUrl = memory.media.replace(/\.(png|jpg|jpeg)$/i, '.webp');

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Open photo memory: ${memory.title}, ${memory.date}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered
          ? 'translateY(-8px) scale(1.02) rotate(0deg)'
          : `rotate(${rotation * 0.5}deg)`,
        transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease'
      }}
      className="group relative cursor-pointer select-none max-w-[310px] xs:max-w-sm sm:max-w-md w-full my-3 sm:my-4 touch-manipulation active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:outline-none rounded-xs"
    >
      {/* Physical Photographic Card Body */}
      <div
        className={`relative bg-[#f7f5ed] p-3 sm:p-4 rounded-xs border border-[#e2ddd0] shadow-[0_20px_45px_rgba(0,0,0,0.75)] ${
          memory.cardStyle === 'polaroid' ? 'pb-10 sm:pb-12' : 'pb-4 sm:pb-5'
        }`}
      >
        {/* Archival Paper Texture sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/5 via-transparent to-amber-500/5 rounded-xs pointer-events-none" />

        {/* Media Frame */}
        <div className={`relative ${aspectClass} w-full overflow-hidden bg-[#12151b] rounded-2xs`}>
          <picture>
            <source srcSet={webpUrl} type="image/webp" />
            <img
              src={memory.media}
              alt={memory.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </picture>

          {/* Film Grain on photograph */}
          <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

          {/* Soft Light Leak Sheen on Hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-tr from-amber-400/20 via-transparent to-transparent pointer-events-none transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Polaroid Handwritten Caption / Label Chin */}
        <div className="mt-3.5 px-1 flex flex-col justify-between">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-garamond text-base sm:text-lg text-stone-900 font-semibold tracking-wide group-hover:text-amber-900 transition-colors line-clamp-1">
              {memory.title}
            </h3>
            <span className="font-mono-tech text-[10px] text-stone-600 tracking-wider shrink-0 flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5 text-stone-500" />
              {memory.date}
            </span>
          </div>

          {memory.location && (
            <div className="flex items-center gap-1 text-[11px] font-garamond italic text-stone-600 mt-0.5">
              <MapPin className="w-2.5 h-2.5 text-amber-800/80" />
              <span className="truncate">{memory.location}</span>
            </div>
          )}

          {memory.subtitle && (
            <p className="font-sans text-[11px] text-stone-700 font-light mt-1 line-clamp-1">
              {memory.subtitle}
            </p>
          )}
        </div>

        {/* Small Tape / Pin corner detail for physical collage realism */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-amber-100/60 border border-amber-200/50 backdrop-blur-xs -rotate-1 pointer-events-none opacity-80 shadow-xs" />
      </div>

      {/* Realistic Deep Drop Shadow behind card */}
      <div className="absolute -bottom-2 -right-2 w-full h-full bg-black/45 -z-10 rounded-xs blur-lg" />
    </div>
  );
};
