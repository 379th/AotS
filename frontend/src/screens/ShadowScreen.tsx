import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScreenFrame, TitleBar } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';
import { useTheme } from '../contexts/ThemeContext';

interface ShadowScreenProps {
  onBackToDay1: () => void;
  onContinue: () => void;
}

export const ShadowScreen: React.FC<ShadowScreenProps> = ({
  onBackToDay1,
  onContinue
}) => {
  const { theme } = useTheme();
  const [imgUrl, setImgUrl] = useLocalStorageString("sq.day1.shadow.url");

  return (
    <ScreenFrame>
      <TitleBar text="Тень" />

      <div className={`mx-auto mt-3 w-[92%] rounded-2xl border p-2 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'border-white/20 bg-[#1a0b2e]' 
          : 'border-[#5c4032]/50 bg-[#e2d0b6]'
      }`}>
        <div className={`relative h-[66svh] overflow-hidden rounded-xl border transition-colors duration-300 ${
          theme === 'dark' 
            ? 'border-white/20' 
            : 'border-[#5c4032]/40'
        }`}>
          {imgUrl ? (
            <img 
              src={imgUrl} 
              alt="Образ Тени" 
              className="h-full w-full object-cover" 
            />
          ) : (
            <button 
              onClick={() => {
                const next = window.prompt("Укажи URL картинки для Тени", imgUrl || "");
                if (next !== null) setImgUrl(next.trim());
              }} 
              className={`flex h-full w-full items-start justify-center pt-2 text-sm hover:opacity-80 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'text-emerald-200/80 hover:text-emerald-200' 
                  : 'text-amber-900/80 hover:text-amber-900'
              }`}
            >
              (Укажи URL картинки)
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto mt-2 mb-2 w-[92%] flex items-center justify-between gap-2">
        <button onClick={onBackToDay1} className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border px-3 py-2 backdrop-blur-sm transition-transform active:scale-95 hover:scale-105 transition-colors duration-300 ${
          theme === 'dark' 
                            ? 'border-white/20 bg-white/70 text-white'
                                                : 'border-[#5c4032]/50 bg-white/90 text-amber-900'
        }`}>
          <ArrowLeft className="h-4 w-4" /> Назад
        </button>
        <button onClick={onContinue} className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border px-3 py-2 font-semibold shadow-[0_6px_20px_rgba(0,0,0,.25)] transition-transform active:scale-95 hover:scale-105 transition-colors duration-300 ${
          theme === 'dark' 
                            ? 'border-white/20 bg-button-gradient text-white'
                : 'border-[#5c4032]/50 bg-gradient-to-b from-amber-200/90 to-amber-300/90 text-amber-900'
        }`}>
          Продолжить
        </button>
      </div>
    </ScreenFrame>
  );
};

