import { useState } from 'react';
import { CinematicIntro } from './components/intro/CinematicIntro';
import { TimelineHeader } from './components/timeline/TimelineHeader';
import { YearChapter } from './components/timeline/YearChapter';
import { CurrentSection } from './components/timeline/CurrentSection';
import { MemoryViewer } from './components/viewer/MemoryViewer';
import { CHAPTERS_DATA, MEMORIES_DATA } from './data/memories';
import type { MemoryItem } from './types/timeline';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);

  const yearsList = [...CHAPTERS_DATA.map((c) => c.year), 'CURRENT'];

  return (
    <div className="min-h-screen bg-[#050608] text-[#ede8df] antialiased selection:bg-[#d4af37]/30 selection:text-[#ede8df] relative overflow-x-hidden">
      {/* Background Film Grain Overlay */}
      <div className="fixed inset-0 film-grain opacity-40 pointer-events-none z-30" />

      {/* Cinematic Intro Screen */}
      {!hasEntered ? (
        <CinematicIntro onEnter={() => setHasEntered(true)} />
      ) : (
        <div className="relative w-full animate-in fade-in duration-1000">
          {/* Top Fixed Header with Year Navigation & Audio */}
          <TimelineHeader years={yearsList} />

          {/* Timeline Opening Hero Statement */}
          <div className="pt-28 pb-12 sm:pt-36 sm:pb-16 max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 text-[#d4af37]">
              <span className="font-mono-tech text-[10px] sm:text-[11px] tracking-[0.35em] uppercase">
                MY LIFE · 2022 — PRESENT
              </span>
            </div>

            <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wider text-[#ede8df] leading-tight mb-4">
              MY YEARS · MY MEMORIES<br />
              <span className="font-garamond italic font-normal text-white/70 text-2xl sm:text-4xl">
                the real moments that stayed.
              </span>
            </h1>

            <p className="font-sans text-xs sm:text-sm text-white/50 max-w-lg mx-auto font-light leading-relaxed">
              Every photograph and video is a bookmark in time. Real media, real memories. Click any item to open its detailed cinematic viewer.
            </p>

            {/* Subtle Visual Flow Line */}
            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-mono-tech tracking-[0.3em] uppercase text-white/30">
              <span>MY LIFE</span>
              <span>·</span>
              <span>MY YEARS</span>
              <span>·</span>
              <span>MY PHOTOS</span>
              <span>·</span>
              <span>MY VIDEOS</span>
              <span>·</span>
              <span>MY MEMORIES</span>
            </div>
          </div>

          {/* Chronological Year Chapters */}
          <main className="relative pb-24">
            {CHAPTERS_DATA.map((chapter) => (
              <YearChapter
                key={chapter.year}
                chapter={chapter}
                onSelectMemory={(memory) => setSelectedMemory(memory)}
              />
            ))}

            {/* Current Section (STILL WRITING...) */}
            <CurrentSection />
          </main>

          {/* Minimalist Footer */}
          <footer className="border-t border-white/5 py-12 px-6 text-center text-xs font-mono-tech text-white/30 tracking-widest uppercase">
            <div>THE STORY IS NEVER FINISHED · KEEP LIVING</div>
          </footer>

          {/* Fullscreen Cinematic Memory Viewer */}
          {selectedMemory && (
            <MemoryViewer
              memory={selectedMemory}
              allMemories={MEMORIES_DATA}
              onClose={() => setSelectedMemory(null)}
              onNavigate={(nextMem) => setSelectedMemory(nextMem)}
            />
          )}
        </div>
      )}
    </div>
  );
}
