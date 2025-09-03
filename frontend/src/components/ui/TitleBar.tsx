import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface TitleBarProps {
  text?: string;
}

export const TitleBar: React.FC<TitleBarProps> = ({ text = "ПРИНЯТИЕ ТЕНИ" }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`mx-auto mt-3 w-[92%] rounded-xl border p-3 text-center shadow-[inset_0_2px_0_rgba(255,255,255,.35),0_10px_40px_rgba(0,0,0,.35)] transition-colors duration-300 ${
      theme === 'dark' 
        ? 'border-white/20 bg-[#1a0b2e] text-white' 
                  : 'border-[#5c4032]/60 bg-[#e2d0b6] text-amber-900'
    }`}>
      <h1 className={`select-none font-gothic text-[28px] tracking-[.06em] drop-shadow transition-colors duration-300 ${
        theme === 'dark' ? 'text-white' : 'text-amber-900'
      }`}>
        {text}
      </h1>
    </div>
  );
};

