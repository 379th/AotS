import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { EXTERNAL_ASSETS, getImageUrl } from '../../config/externalAssets';

interface ScreenFrameProps {
  children: React.ReactNode;
}

export const ScreenFrame: React.FC<ScreenFrameProps> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div 
      className={`relative min-h-[100svh] w-full overflow-hidden bg-transparent flex flex-col transition-colors duration-300 ${
        theme === 'dark' ? 'text-white' : 'text-amber-900'
      }`}
      style={{ 
        paddingTop: 'env(safe-area-inset-top)', 
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))' 
      }}
    >
      {/* Фон из конфигурации */}
      <img 
        src={getImageUrl(EXTERNAL_ASSETS.BACKGROUNDS.MAIN_BACKGROUND)} 
        alt="bg" 
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover" 
      />
      {children}
    </div>
  );
};

