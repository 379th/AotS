import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { getImageUrl } from '../../config/externalAssets';

interface TitleBarProps {
  text?: string;
  imagePath?: string; // Путь к изображению TitleBar
}

export const TitleBar: React.FC<TitleBarProps> = ({ text = "ПРИНЯТИЕ ТЕНИ", imagePath }) => {
  const { theme } = useTheme();
  
  // Если передан путь к изображению, отображаем изображение
  if (imagePath) {
    return (
      <div className="mx-auto mt-3 w-full max-w-[523px] px-4">
        <img 
          src={getImageUrl(imagePath)} 
          alt={text} 
          className="w-full h-auto object-cover rounded-xl" 
        />
      </div>
    );
  }
  
  // Иначе отображаем текстовый TitleBar
  return (
    <div className={`mx-auto mt-3 w-full max-w-[523px] min-h-[112px] rounded-xl border p-2 text-center shadow-[inset_0_2px_0_rgba(255,255,255,.35),0_10px_40px_rgba(0,0,0,.35)] transition-colors duration-300 flex items-center justify-center ${
      theme === 'dark' 
        ? 'border-white/20 bg-[#1a0b2e] text-white' 
                  : 'border-[#5c4032]/60 bg-[#e2d0b6] text-amber-900'
    }`}>
      <h1 className={`select-none font-gothic text-lg sm:text-xl md:text-2xl tracking-[.06em] drop-shadow transition-colors duration-300 ${
        theme === 'dark' ? 'text-white' : 'text-amber-900'
      }`}>
        {text}
      </h1>
    </div>
  );
};

