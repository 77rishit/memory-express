import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Film,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Smartphone,
  BookOpen,
  FileText,
  RotateCcw
} from 'lucide-react';
import type { MemoryItem } from '../../types/timeline';
import { ambientSound } from '../../audio/ambientSound';

interface MemoryViewerProps {
  memory: MemoryItem | null;
  allMemories: MemoryItem[];
  onClose: () => void;
  onNavigate: (nextMemory: MemoryItem) => void;
}

export const MemoryViewer: React.FC<MemoryViewerProps> = ({
  memory,
  allMemories,
  onClose,
  onNavigate
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'visual' | 'transcript'>('visual');
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Keyboard navigation listener
  useEffect(() => {
    if (!memory) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === ' ' && (memory.category === 'video' || memory.type === 'video')) {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [memory, allMemories, isPlaying]);

  // Video playback sync
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, memory]);

  // Reset tab on memory change
  useEffect(() => {
    setActiveTab('visual');
    setIsPlaying(true);
  }, [memory]);

  if (!memory) return null;

  const currentIndex = allMemories.findIndex((m) => m.id === memory.id);
  const totalCount = allMemories.length;

  const goToPrev = () => {
    ambientSound.playNavClick();
    if (currentIndex > 0) {
      onNavigate(allMemories[currentIndex - 1]);
    } else {
      onNavigate(allMemories[totalCount - 1]);
    }
  };

  const goToNext = () => {
    ambientSound.playNavClick();
    if (currentIndex < totalCount - 1) {
      onNavigate(allMemories[currentIndex + 1]);
    } else {
      onNavigate(allMemories[0]);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / (videoRef.current.duration || 1)) * 100;
      setProgress(p);
    }
  };

  // Touch Swipe Gesture Handlers (Mobile / Tablet)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    // Minimum horizontal swipe distance of 45px and predominantly horizontal
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  const isVideo = memory.category === 'video' || memory.type === 'video';
  const isChat = memory.category === 'chat_screenshot';
  const isDocument = memory.category === 'document_screenshot';
  const posterUrl = memory.media ? memory.media.replace(/\.mp4$/i, '-poster.jpg') : '';
  const webpUrl = memory.media ? memory.media.replace(/\.(png|jpg|jpeg)$/i, '.webp') : '';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={memory.title}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 bg-[#030406]/98 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] select-none overflow-hidden animate-in fade-in duration-300"
    >
      {/* Background Film Grain Overlay */}
      <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between pb-2 sm:pb-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono-tech tracking-widest text-[#d4af37]">
          <span className="flex items-center gap-1.5 uppercase font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span className="truncate max-w-[150px] sm:max-w-none">{memory.date}</span>
          </span>
          {isVideo && (
            <>
              <span className="text-white/30 hidden xs:inline">·</span>
              <span className="hidden xs:flex items-center gap-1 text-white/70">
                <Film className="w-3 h-3 text-[#d4af37]" />
                <span>VIDEO {memory.duration && `(${memory.duration})`}</span>
              </span>
            </>
          )}
          {isChat && (
            <>
              <span className="text-white/30 hidden xs:inline">·</span>
              <span className="hidden xs:flex items-center gap-1 text-white/70">
                <Smartphone className="w-3 h-3 text-[#d4af37]" />
                <span>CHAT ARCHIVE</span>
              </span>
            </>
          )}
          {isDocument && (
            <>
              <span className="text-white/30 hidden xs:inline">·</span>
              <span className="hidden xs:flex items-center gap-1 text-white/70">
                <BookOpen className="w-3 h-3 text-[#d4af37]" />
                <span>PRIVATE JOURNAL</span>
              </span>
            </>
          )}
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* View Switcher for Chat/Document */}
          {(isChat || isDocument) && memory.transcript && (
            <div className="flex items-center bg-white/5 rounded-full p-0.5 border border-white/10 text-[11px] sm:text-xs font-mono-tech">
              <button
                type="button"
                onClick={() => setActiveTab('visual')}
                className={`min-h-[34px] px-2.5 sm:px-3 py-1 rounded-full transition-all touch-manipulation ${
                  activeTab === 'visual'
                    ? 'bg-[#d4af37] text-black font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Media
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('transcript')}
                className={`min-h-[34px] px-2.5 sm:px-3 py-1 rounded-full transition-all touch-manipulation ${
                  activeTab === 'transcript'
                    ? 'bg-[#d4af37] text-black font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Text
              </button>
            </div>
          )}

          {/* Close Button - Min 44x44px Touch Target */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close viewer (ESC)"
            className="min-h-[44px] min-w-[44px] p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 text-white/80 hover:text-white border border-white/15 transition-all flex items-center justify-center gap-1.5 text-xs font-mono-tech touch-manipulation focus-visible:ring-2 focus-visible:ring-[#d4af37]"
          >
            <span className="hidden sm:inline text-[11px] tracking-widest uppercase">CLOSE</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Cinematic Viewer Canvas */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-1.5 sm:my-2 max-w-5xl mx-auto w-full px-1 sm:px-2 overflow-y-auto">
        {/* Memory Title & Minimal Caption */}
        <div className="text-center mb-2 shrink-0 px-2">
          <h2 className="font-cinzel text-lg sm:text-2xl lg:text-4xl text-[#ede8df] font-bold tracking-wider uppercase mb-0.5 drop-shadow-md line-clamp-1">
            {memory.title}
          </h2>
          {memory.subtitle && (
            <p className="font-garamond italic text-xs sm:text-sm text-white/65 font-light line-clamp-1">
              {memory.subtitle}
            </p>
          )}
        </div>

        {/* Case 1: Video Memory Viewer */}
        {isVideo && (
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-[54vh] sm:h-[60vh] md:h-[64vh] bg-black rounded-lg overflow-hidden border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col justify-between group">
            <video
              ref={videoRef}
              src={memory.media}
              poster={posterUrl}
              playsInline
              loop
              autoPlay
              preload="metadata"
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className="w-full h-full object-contain cursor-pointer"
            />

            {/* Subtle Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Play/Pause Large Center Click Icon */}
            {!isPlaying && (
              <button
                type="button"
                aria-label="Play video"
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/80 border border-[#d4af37]/80 flex items-center justify-center text-[#d4af37] shadow-2xl">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 translate-x-0.5 fill-current" />
                </div>
              </button>
            )}

            {/* Video Control Bar */}
            <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col gap-1.5 sm:gap-2">
              {/* Progress Line */}
              <div
                role="slider"
                aria-label="Video scrubber"
                aria-valuenow={Math.round(progress)}
                tabIndex={0}
                className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer touch-manipulation py-1 -my-1"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  if (videoRef.current) {
                    videoRef.current.currentTime = pos * (videoRef.current.duration || 1);
                  }
                }}
              >
                <div
                  className="h-full bg-[#d4af37] transition-all duration-100 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono-tech text-white/80">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    onClick={togglePlay}
                    className="min-h-[36px] min-w-[36px] p-1.5 rounded-sm hover:text-[#d4af37] active:text-[#d4af37] transition-colors flex items-center justify-center touch-manipulation"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <button
                    type="button"
                    aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                    onClick={toggleMute}
                    className="min-h-[36px] min-w-[36px] p-1.5 rounded-sm hover:text-[#d4af37] active:text-[#d4af37] transition-colors flex items-center justify-center touch-manipulation"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#d4af37]" />}
                  </button>
                  <span className="text-[11px] text-white/50">{memory.duration || 'CLIP'}</span>
                </div>

                <button
                  type="button"
                  aria-label="Replay video from start"
                  onClick={() => {
                    if (videoRef.current) videoRef.current.currentTime = 0;
                  }}
                  className="min-h-[36px] min-w-[36px] p-1.5 rounded-sm hover:text-[#d4af37] active:text-[#d4af37] transition-colors flex items-center justify-center touch-manipulation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Case 2: Chat Screenshot Viewer (Phone Interface) */}
        {isChat && (
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-[54vh] sm:h-[62vh] flex items-center justify-center">
            {activeTab === 'visual' ? (
              <div className="relative h-full aspect-[9/18] bg-[#16171b] rounded-[2.2rem] sm:rounded-[2.5rem] border-4 border-[#2d2e33] p-2 sm:p-2.5 shadow-[0_20px_70px_rgba(0,0,0,0.95)] ring-1 ring-white/10 flex flex-col justify-between overflow-hidden">
                {/* Dynamic Island Header */}
                <div className="w-20 sm:w-24 h-3.5 sm:h-4 bg-black rounded-full mx-auto my-1 shrink-0 flex items-center justify-center gap-1.5 px-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1c1c1e]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0a84ff]/70" />
                </div>

                {/* Screenshot Scrollable Frame for 100% Crisp Legibility */}
                <div className="relative flex-1 w-full overflow-y-auto rounded-[1.3rem] sm:rounded-[1.4rem] bg-black scrollbar-thin touch-pan-y">
                  <picture>
                    <source srcSet={webpUrl} type="image/webp" />
                    <img
                      src={memory.media}
                      alt={memory.title}
                      loading="eager"
                      decoding="async"
                      className="w-full h-auto object-cover select-text"
                    />
                  </picture>
                </div>

                {/* Bottom Home Indicator */}
                <div className="w-24 sm:w-28 h-1 bg-white/30 rounded-full mx-auto my-1.5 shrink-0" />
              </div>
            ) : (
              /* High-legibility transcript view */
              <div className="w-full max-w-lg max-h-[54vh] sm:max-h-[58vh] overflow-y-auto bg-[#14151a] p-4 sm:p-6 rounded-lg border border-white/15 text-white/90 shadow-2xl leading-relaxed font-sans text-xs sm:text-base space-y-3 sm:space-y-4 touch-pan-y">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono-tech text-[#d4af37]">
                  <span>CONVERSATION TRANSCRIPT · {memory.sender || 'xox.prachi'}</span>
                  <span>{memory.date}</span>
                </div>
                {memory.transcript?.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-white/85 font-light leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Case 3: Document/Text Screenshot Viewer (Archival Diary) */}
        {isDocument && (
          <div className="relative w-full max-w-2xl h-[54vh] sm:h-[62vh] flex items-center justify-center">
            {activeTab === 'visual' ? (
              <div className="relative h-full w-full max-w-lg bg-[#1a1715] rounded-md border border-[#3b322a] p-3 sm:p-4 shadow-[0_20px_70px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden">
                <div className="flex items-center justify-between text-xs font-mono-tech text-[#d4af37] pb-2 border-b border-amber-900/30">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>ARCHIVAL DOCUMENT · UNSAID WORDS</span>
                  </span>
                  <span>{memory.date}</span>
                </div>

                <div className="flex-1 w-full overflow-y-auto mt-2 sm:mt-3 rounded-xs border border-white/10 bg-black/60 touch-pan-y">
                  <picture>
                    <source srcSet={webpUrl} type="image/webp" />
                    <img
                      src={memory.media}
                      alt={memory.title}
                      loading="eager"
                      decoding="async"
                      className="w-full h-auto object-cover select-text"
                    />
                  </picture>
                </div>
              </div>
            ) : (
              /* Clean Full Readable Diary Entry */
              <div className="w-full max-w-xl max-h-[54vh] sm:max-h-[58vh] overflow-y-auto bg-[#1a1715] p-5 sm:p-8 rounded-md border border-[#3d332a] text-[#ede8df] shadow-2xl space-y-3 sm:space-y-4 touch-pan-y">
                <div className="flex items-center justify-between pb-2 border-b border-amber-900/30 text-xs font-mono-tech text-[#d4af37]">
                  <span>UNSAID LETTER TRANSCRIPT</span>
                  <span>{memory.date}</span>
                </div>
                <div className="font-garamond text-sm sm:text-lg leading-relaxed text-white/90 space-y-3 sm:space-y-4">
                  {memory.transcript?.split('\n\n').map((par, i) => (
                    <p key={i} className="leading-relaxed">
                      {par}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Case 4: Photos & General Memories */}
        {!isVideo && !isChat && !isDocument && (
          <div className="relative w-full max-h-[55vh] sm:max-h-[62vh] aspect-[4/3] sm:aspect-video flex items-center justify-center rounded-sm overflow-hidden bg-black shadow-[0_20px_80px_rgba(0,0,0,0.95)] border border-white/10">
            <picture className="w-full h-full flex items-center justify-center">
              <source srcSet={webpUrl} type="image/webp" />
              <img
                src={memory.media}
                alt={memory.title}
                loading="eager"
                decoding="async"
                className="w-full h-full object-contain select-none animate-ken-burns"
              />
            </picture>
            <div className="absolute inset-0 film-grain opacity-20 pointer-events-none" />
          </div>
        )}

        {/* Minimal Description Caption below */}
        {memory.description && !isChat && !isDocument && (
          <div className="mt-2.5 max-w-xl text-center px-4">
            <p className="font-sans text-xs sm:text-sm leading-relaxed text-white/75 font-light line-clamp-2 sm:line-clamp-none">
              {memory.description}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Bar: Previous, Counter, Next Navigation - Min 44px Touch Targets */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between pt-2 sm:pt-3 border-t border-white/10 shrink-0">
        <button
          type="button"
          onClick={goToPrev}
          aria-label="Previous memory (Left Arrow or Swipe Right)"
          className="min-h-[44px] min-w-[44px] group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-sm bg-white/5 hover:bg-white/15 active:bg-white/20 text-white/80 hover:text-white border border-white/10 transition-all font-mono-tech text-xs tracking-wider touch-manipulation focus-visible:ring-2 focus-visible:ring-[#d4af37]"
        >
          <ChevronLeft className="w-4 h-4 text-[#d4af37] group-hover:-translate-x-1 transition-transform" />
          <span className="hidden xs:inline">PREVIOUS</span>
        </button>

        <div className="font-mono-tech text-xs tracking-[0.2em] text-white/50 text-center">
          <span className="text-[#d4af37] font-semibold">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>{' '}
          / {String(totalCount).padStart(2, '0')}
          <div className="text-[9px] text-white/30 tracking-widest hidden sm:block">
            SWIPE OR USE ARROW KEYS
          </div>
        </div>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Next memory (Right Arrow or Swipe Left)"
          className="min-h-[44px] min-w-[44px] group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-sm bg-white/5 hover:bg-white/15 active:bg-white/20 text-white/80 hover:text-white border border-white/10 transition-all font-mono-tech text-xs tracking-wider touch-manipulation focus-visible:ring-2 focus-visible:ring-[#d4af37]"
        >
          <span className="hidden xs:inline">NEXT</span>
          <ChevronRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
