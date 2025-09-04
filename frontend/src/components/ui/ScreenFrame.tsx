import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface ScreenFrameProps {
  children: React.ReactNode;
}

export const ScreenFrame: React.FC<ScreenFrameProps> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div 
      className={`relative mx-auto min-h-[100svh] w-full max-w-[520px] overflow-hidden bg-transparent flex flex-col transition-colors duration-300 ${
        theme === 'dark' ? 'text-white' : 'text-amber-900'
      }`}
      style={{ 
        paddingTop: 'env(safe-area-inset-top)', 
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))' 
      }}
    >
      {children}
    </div>
  );
};

