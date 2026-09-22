import React from 'react';
import { Clock } from 'lucide-react';
import type { YearChapterData, MemoryItem } from '../../types/timeline';
import { MemoryCard } from './MemoryCard';

interface YearChapterProps {
  chapter: YearChapterData;
  onSelectMemory: (memory: MemoryItem) => void;
}

export const YearChapter: React.FC<YearChapterProps> = ({ chapter, onSelectMemory }) => {
  const hasMemories = chapter.memories && chapter.memories.length > 0;

  return (
    <section id={`year-${chapter.year}`} className="relative py-16 sm:py-24 border-b border-white/5 scroll-mt-24">
      {/* Chapter Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#d4af37]/20 pb-6">
          <div>
            <span className="font-mono-tech text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.3em] uppercase text-[#d4af37]/80 block mb-1">
              CHAPTER · {chapter.theme}
            </span>
            <h2 className="font-cinzel text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[0.06em] sm:tracking-[0.1em] text-[#ede8df] leading-none">
              {chapter.displayYear}
            </h2>
          </div>

          <div className="max-w-md text-left md:text-right">
            <h3 className="font-cinzel text-sm sm:text-base tracking-[0.2em] uppercase text-[#ede8df] mb-1 font-semibold">
              {chapter.title}
            </h3>
            <p className="font-garamond italic text-base sm:text-lg text-white/60 font-light">
              "{chapter.description}"
            </p>
          </div>
        </div>
      </div>

      {/* Memory Cards Grid or Natural Timeline Gap */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {hasMemories ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-12 justify-items-center">
            {chapter.memories.map((memory) => (
              <MemoryCard
                key={memory.id}
                memory={memory}
                onClick={() => onSelectMemory(memory)}
              />
            ))}
          </div>
        ) : (
          /* Natural Timeline Gap Representation (for years without media, like 2024) */
          <div className="max-w-2xl mx-auto py-12 px-8 rounded-sm bg-white/[0.02] border border-dashed border-white/10 text-center relative">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#d4af37]">
              <Clock className="w-5 h-5 opacity-70" />
            </div>
            <h4 className="font-cinzel text-lg tracking-widest uppercase text-white/80 mb-2">
              A Quiet Interval in Time
            </h4>
            <p className="font-garamond italic text-base text-white/50 max-w-md mx-auto leading-relaxed">
              Fewer photographs were taken during this period as daily school routines ended and diploma studies began.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-[11px] font-mono-tech tracking-wider text-white/40">
              <span>NATURAL TIMELINE GAP · PRESERVING THE REAL STORY</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
