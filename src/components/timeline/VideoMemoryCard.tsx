import React, { useRef, useState } from 'react';
import { Film, Play, Calendar, MapPin, Sparkles } from 'lucide-react';
import type { MemoryItem } from '../../types/timeline';
import { ambientSound } from '../../audio/ambientSound';

interface VideoMemoryCardProps {
  memory: MemoryItem;
  onClick: () => void;
}

export const VideoMemoryCard: React.FC<VideoMemoryCardProps> = ({ memory, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rotation = memory.rotation ?? 0;
  const isFeatured = memory.featured;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    ambientSound.playCardInspect();
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? 'translateY(-10px) scale(1.02) rotate(0deg)'
          : `rotate(${rotation}deg)`,
        transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease'
      }}
      className={`group relative cursor-pointer select-none max-w-sm sm:max-w-md w-full my-4 ${
        isFeatured ? 'sm:col-span-2 sm:max-w-lg lg:col-span-1 lg:max-w-md' : ''
      }`}
    >
      {/* Featured Subtle Milestone Aura */}
      {isFeatured && (
        <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37]/20 via-amber-500/10 to-[#d4af37]/20 rounded-sm blur-md pointer-events-none -z-10" />
      )}

      {/* Cinematic Film Memory Card Frame */}
      <div
        className={`relative bg-[#101216] p-3 sm:p-4 rounded-sm border shadow-[0_20px_45px_rgba(0,0,0,0.85)] transition-colors duration-500 ${
          isFeatured
            ? 'border-[#d4af37]/45 ring-1 ring-[#d4af37]/30 shadow-[0_25px_60px_rgba(212,175,55,0.12)]'
            : 'border-white/10'
        }`}
      >
        {/* Top Header / Sprocket / Milestone Ribbon */}
        <div className="flex items-center justify-between px-1 pb-2 border-b border-white/10 text-[9px] font-mono-tech text-[#d4af37]">
          {isFeatured ? (
            <div className="flex items-center gap-1.5 font-semibold text-[#d4af37] tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>TIMELINE MILESTONE</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[#d4af37]/80">
              <Film className="w-3 h-3 text-[#d4af37]" />
              <span className="tracking-widest uppercase">CINEMATIC VIDEO</span>
            </div>
          )}
          <span className="tracking-widest">{memory.duration || '00:05'}</span>
        </div>

        {/* Video Viewport Container */}
        <div className="relative aspect-[9/16] max-h-[400px] w-full mx-auto my-2.5 overflow-hidden bg-black rounded-xs border border-white/10 shadow-inner flex items-center justify-center">
          <video
            ref={videoRef}
            src={memory.media}
            muted
            playsInline
            loop
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Film Grain */}
          <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

          {/* Center Play Button Overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'opacity-80 scale-110' : 'opacity-100 scale-100'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-black/60 border border-[#d4af37]/70 flex items-center justify-center text-[#d4af37] shadow-2xl backdrop-blur-md">
              <Play className="w-6 h-6 translate-x-0.5 fill-current" />
            </div>
          </div>

          {/* Duration Pill at Top Right */}
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/75 border border-white/15 text-[10px] font-mono-tech text-white/90 backdrop-blur-md">
            {memory.duration}
          </div>
        </div>

        {/* Card Caption Label Below */}
        <div className="mt-2 px-1 flex flex-col justify-between">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-garamond text-base sm:text-lg text-[#ede8df] font-semibold tracking-wide group-hover:text-[#d4af37] transition-colors line-clamp-1">
              {memory.title}
            </h3>
            <span className="font-mono-tech text-[10px] text-white/50 tracking-wider shrink-0 flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5 text-[#d4af37]/70" />
              {memory.date}
            </span>
          </div>

          {memory.location && (
            <div className="flex items-center gap-1 text-[11px] font-garamond italic text-white/50 mt-0.5">
              <MapPin className="w-2.5 h-2.5 text-[#d4af37]/70" />
              <span className="truncate">{memory.location}</span>
            </div>
          )}

          {memory.subtitle && (
            <p className="font-sans text-[11px] text-white/60 font-light mt-1 line-clamp-1">
              {memory.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Realistic Deep Drop Shadow behind card */}
      <div className="absolute -bottom-3 -right-2 w-full h-full bg-black/60 -z-10 rounded-sm blur-xl" />
    </div>
  );
};
