import React from 'react';

export const CinematicOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 select-none overflow-hidden">
      {/* Film Grain Texture */}
      <div className="absolute inset-0 film-grain opacity-60" />

      {/* Radial Vignette */}
      <div className="absolute inset-0 cinematic-vignette" />

      {/* Cinematic Anamorphic Letterbox Bars (Top and Bottom) */}
      <div className="absolute top-0 left-0 right-0 h-3 sm:h-5 bg-[#030406]/90 border-b border-white/5" />
      <div className="absolute bottom-0 left-0 right-0 h-3 sm:h-5 bg-[#030406]/90 border-t border-white/5" />
    </div>
  );
};
