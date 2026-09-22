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

  const isVideo = memory.category === 'video' || memory.type === 'video';
  const isChat = memory.category === 'chat_screenshot';
  const isDocument = memory.category === 'document_screenshot';

  return (
    <div className="fixed inset-0 z-50 bg-[#030406]/98 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6 select-none overflow-hidden animate-in fade-in duration-300">
      {/* Background Film Grain Overlay */}
      <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3 text-xs font-mono-tech tracking-widest text-[#d4af37]">
          <span className="flex items-center gap-1.5 uppercase font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            {memory.date}
          </span>
          {isVideo && (
            <>
              <span className="text-white/30">·</span>
              <span className="flex items-center gap-1 text-white/70">
                <Film className="w-3 h-3 text-[#d4af37]" />
                <span>VIDEO MEMORY {memory.duration && `(${memory.duration})`}</span>
              </span>
            </>
          )}
          {isChat && (
            <>
              <span className="text-white/30">·</span>
              <span className="flex items-center gap-1 text-white/70">
                <Smartphone className="w-3 h-3 text-[#d4af37]" />
                <span>CHAT ARCHIVE</span>
              </span>
            </>
          )}
          {isDocument && (
            <>
              <span className="text-white/30">·</span>
              <span className="flex items-center gap-1 text-white/70">
                <BookOpen className="w-3 h-3 text-[#d4af37]" />
                <span>PRIVATE JOURNAL</span>
              </span>
            </>
          )}
        </div>

        {/* View Switcher for Chat/Document */}
        {(isChat || isDocument) && memory.transcript && (
          <div className="flex items-center bg-white/5 rounded-full p-0.5 border border-white/10 text-xs font-mono-tech">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-3 py-1 rounded-full transition-all ${
                activeTab === 'visual'
                  ? 'bg-[#d4af37] text-black font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Original Media
            </button>
            <button
              onClick={() => setActiveTab('transcript')}
              className={`px-3 py-1 rounded-full transition-all ${
                activeTab === 'transcript'
                  ? 'bg-[#d4af37] text-black font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Read Full Text
            </button>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 transition-all flex items-center gap-1.5 text-xs font-mono-tech"
          title="Close (ESC)"
        >
          <span className="hidden sm:inline text-[11px] tracking-widest uppercase">CLOSE</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Cinematic Viewer Canvas */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-2 max-w-5xl mx-auto w-full px-2 overflow-y-auto">
        {/* Memory Title & Minimal Caption */}
        <div className="text-center mb-2.5 shrink-0">
          <h2 className="font-cinzel text-xl sm:text-3xl lg:text-4xl text-[#ede8df] font-bold tracking-wider uppercase mb-1 drop-shadow-md">
            {memory.title}
          </h2>
          {memory.subtitle && (
            <p className="font-garamond italic text-xs sm:text-base text-white/65 font-light">
              {memory.subtitle}
            </p>
          )}
        </div>

        {/* Case 1: Video Memory Viewer */}
        {isVideo && (
          <div className="relative w-full max-w-sm sm:max-w-md h-[58vh] sm:h-[62vh] bg-black rounded-lg overflow-hidden border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col justify-between group">
            <video
              ref={videoRef}
              src={memory.media}
              playsInline
              loop
              autoPlay
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
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs"
              >
                <div className="w-16 h-16 rounded-full bg-black/80 border border-[#d4af37]/80 flex items-center justify-center text-[#d4af37] shadow-2xl">
                  <Play className="w-8 h-8 translate-x-0.5 fill-current" />
                </div>
              </button>
            )}

            {/* Video Control Bar */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col gap-2">
              {/* Progress Line */}
              <div
                className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  if (videoRef.current) {
                    videoRef.current.currentTime = pos * (videoRef.current.duration || 1);
                  }
                }}
              >
                <div
                  className="h-full bg-[#d4af37] transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono-tech text-white/80">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-1 rounded-sm hover:text-[#d4af37] transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-1 rounded-sm hover:text-[#d4af37] transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#d4af37]" />}
                  </button>
                  <span className="text-[11px] text-white/50">{memory.duration || 'CINEMATIC CLIP'}</span>
                </div>

                <button
                  onClick={() => {
                    if (videoRef.current) videoRef.current.currentTime = 0;
                  }}
                  title="Replay from start"
                  className="p-1 rounded-sm hover:text-[#d4af37] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Case 2: Chat Screenshot Viewer (Phone Interface) */}
        {isChat && (
          <div className="relative w-full max-w-sm sm:max-w-md h-[58vh] sm:h-[65vh] flex items-center justify-center">
            {activeTab === 'visual' ? (
              <div className="relative h-full aspect-[9/18] bg-[#16171b] rounded-[2.5rem] border-4 border-[#2d2e33] p-2.5 shadow-[0_20px_70px_rgba(0,0,0,0.95)] ring-1 ring-white/10 flex flex-col justify-between overflow-hidden">
                {/* Dynamic Island Header */}
                <div className="w-24 h-4 bg-black rounded-full mx-auto my-1 shrink-0 flex items-center justify-center gap-1.5 px-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1c1c1e]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0a84ff]/70" />
                </div>

                {/* Screenshot Scrollable Frame for 100% Crisp Legibility */}
                <div className="relative flex-1 w-full overflow-y-auto rounded-[1.4rem] bg-black scrollbar-thin">
                  <img
                    src={memory.media}
                    alt={memory.title}
                    className="w-full h-auto object-cover select-text"
                  />
                </div>

                {/* Bottom Home Indicator */}
                <div className="w-28 h-1 bg-white/30 rounded-full mx-auto my-1.5 shrink-0" />
              </div>
            ) : (
              /* High-legibility transcript view */
              <div className="w-full max-w-lg max-h-[58vh] overflow-y-auto bg-[#14151a] p-6 rounded-lg border border-white/15 text-white/90 shadow-2xl leading-relaxed font-sans text-sm sm:text-base space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono-tech text-[#d4af37]">
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
          <div className="relative w-full max-w-2xl h-[58vh] sm:h-[65vh] flex items-center justify-center">
            {activeTab === 'visual' ? (
              <div className="relative h-full w-full max-w-lg bg-[#1a1715] rounded-md border border-[#3b322a] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden">
                <div className="flex items-center justify-between text-xs font-mono-tech text-[#d4af37] pb-2 border-b border-amber-900/30">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>ARCHIVAL DOCUMENT · UNSAID WORDS</span>
                  </span>
                  <span>{memory.date}</span>
                </div>

                <div className="flex-1 w-full overflow-y-auto mt-3 rounded-xs border border-white/10 bg-black/60">
                  <img
                    src={memory.media}
                    alt={memory.title}
                    className="w-full h-auto object-cover select-text"
                  />
                </div>
              </div>
            ) : (
              /* Clean Full Readable Diary Entry */
              <div className="w-full max-w-xl max-h-[58vh] overflow-y-auto bg-[#1a1715] p-6 sm:p-8 rounded-md border border-[#3d332a] text-[#ede8df] shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-amber-900/30 text-xs font-mono-tech text-[#d4af37]">
                  <span>UNSAID LETTER TRANSCRIPT</span>
                  <span>{memory.date}</span>
                </div>
                <div className="font-garamond text-base sm:text-lg leading-relaxed text-white/90 space-y-4">
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
          <div className="relative w-full max-h-[60vh] aspect-[16/10] sm:aspect-video flex items-center justify-center rounded-sm overflow-hidden bg-black shadow-[0_20px_80px_rgba(0,0,0,0.95)] border border-white/10">
            <img
              src={memory.media}
              alt={memory.title}
              className="w-full h-full object-contain select-none"
            />
            <div className="absolute inset-0 film-grain opacity-20 pointer-events-none" />
          </div>
        )}

        {/* Minimal Description Caption below (Real media is the story) */}
        {memory.description && !isChat && !isDocument && (
          <div className="mt-3 max-w-xl text-center px-4">
            <p className="font-sans text-xs sm:text-sm leading-relaxed text-white/75 font-light">
              {memory.description}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Bar: Previous, Counter, Next Navigation */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between pt-3 border-t border-white/10 shrink-0">
        <button
          onClick={goToPrev}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-all font-mono-tech text-xs tracking-wider"
        >
          <ChevronLeft className="w-4 h-4 text-[#d4af37] group-hover:-translate-x-1 transition-transform" />
          <span>PREVIOUS</span>
        </button>

        <div className="font-mono-tech text-xs tracking-[0.2em] text-white/50">
          <span className="text-[#d4af37] font-semibold">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>{' '}
          / {String(totalCount).padStart(2, '0')}
        </div>

        <button
          onClick={goToNext}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-all font-mono-tech text-xs tracking-wider"
        >
          <span>NEXT</span>
          <ChevronRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
