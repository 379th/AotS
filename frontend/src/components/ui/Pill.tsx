import React from 'react';

interface PillProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Pill: React.FC<PillProps> = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-white/70 px-3 py-2 text-amber-900 backdrop-blur-sm active:translate-y-[1px] ${className}`}
    >
      {children}
    </button>
  );
};
