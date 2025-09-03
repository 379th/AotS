import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface PillProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Pill: React.FC<PillProps> = ({ children, onClick, className = "" }) => {
  const { theme } = useTheme();
  
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-3 py-2 backdrop-blur-sm transition-transform active:scale-95 hover:scale-105 ${
        theme === 'dark'
          ? 'border-white/20 bg-[#2d1b4e] text-white'
          : 'border-[#5c4032]/40 bg-[#f7f0e6] text-amber-900'
      } ${className}`}
    >
      {children}
    </button>
  );
};
