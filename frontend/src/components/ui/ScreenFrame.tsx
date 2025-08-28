import React from 'react';
import { Frame } from './Frame';
import { Kintsugi } from './Kintsugi';

interface ScreenFrameProps {
  children: React.ReactNode;
}

export const ScreenFrame: React.FC<ScreenFrameProps> = ({ children }) => {
  return (
    <div 
      className="relative mx-auto min-h-[100svh] w-full max-w-[520px] overflow-hidden bg-mystic-gradient text-amber-50 flex flex-col"
      style={{ 
        paddingTop: 'env(safe-area-inset-top)', 
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))' 
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_70%_20%,rgba(169,139,225,.18),transparent_55%),radial-gradient(circle_at_30%_70%,rgba(169,139,225,.12),transparent_45%),repeating-linear-gradient(90deg,rgba(255,255,255,.035),rgba(255,255,255,.035)_1px,transparent_1px,transparent_2px)]" />
      <Frame />
      <Kintsugi />
      {children}
    </div>
  );
};

