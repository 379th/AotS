import React from 'react';

interface ScreenFrameProps {
  children: React.ReactNode;
}

export const ScreenFrame: React.FC<ScreenFrameProps> = ({ children }) => {
  return (
    <div 
      className="relative mx-auto min-h-[100svh] w-full max-w-[520px] overflow-hidden bg-transparent text-amber-50 flex flex-col"
      style={{ 
        paddingTop: 'env(safe-area-inset-top)', 
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))' 
      }}
    >
      {/* Фон из Sorce */}
      <img src="/Sorce/Background.png" alt="bg" className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover" />
      {/* Убрали декоративные полосы/линии */}
      {children}
    </div>
  );
};

