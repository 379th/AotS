import React from 'react';
import { LucideIcon } from 'lucide-react';
import { TONE_MAP } from '../../config/constants';
import { useTheme } from '../../contexts/ThemeContext';

interface RoundButtonProps {
  label: string;
  icon?: LucideIcon;
  imageSrc?: string;
  onClick?: () => void;
  tone?: keyof typeof TONE_MAP;
}

export const RoundButton: React.FC<RoundButtonProps> = ({ 
  label, 
  icon: Icon, 
  imageSrc,
  onClick, 
  tone = "stone" 
}) => {
  const { theme } = useTheme();
  
  // Если есть изображение, используем его как фон кнопки
  if (imageSrc) {
    return (
      <button 
        onClick={onClick}
        className="group relative flex h-22 w-22 md:h-24 md:w-24 rounded-full transition-transform active:scale-95 hover:scale-105 overflow-hidden"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
      </button>
    );
  }
  
  // Старый стиль для иконок
  return (
    <button 
      onClick={onClick}
      className={`group relative flex h-16 w-16 md:h-20 md:w-20 flex-col items-center justify-center rounded-full bg-gradient-to-b ${TONE_MAP[tone]} ring-2 transition-transform active:scale-95 hover:scale-105 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'text-amber-100 shadow-[0_8px_30px_rgba(0,0,0,.35)]' 
          : 'text-amber-900 shadow-[0_8px_30px_rgba(0,0,0,.35)]'
      }`}
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.18),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(0,0,0,.35),transparent_45%)]" />
      {Icon && (
        <Icon className="relative z-[1] mb-1 h-5 w-5" />
      )}
      <span className="relative z-[1] text-[10px] tracking-wide md:text-[11px] font-medium">
        {label}
      </span>
    </button>
  );
};

