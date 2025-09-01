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
          ? 'border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.78),rgba(30,42,50,.78))]' 
          : 'border-amber-900/50 bg-gradient-to-b from-amber-100/80 to-amber-200/80'
      }`}>
        <div className={`relative h-[66svh] overflow-hidden rounded-xl border transition-colors duration-300 ${
          theme === 'dark' 
            ? 'border-teal-700/30' 
            : 'border-amber-900/40'
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
                  : 'text-amber-700/80 hover:text-amber-800'
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
            ? 'border-amber-900/40 bg-white/70 text-amber-900' 
            : 'border-amber-900/50 bg-white/90 text-amber-800'
        }`}>
          <ArrowLeft className="h-4 w-4" /> Назад
        </button>
        <button onClick={onContinue} className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border px-3 py-2 font-semibold shadow-[0_6px_20px_rgba(0,0,0,.25)] transition-transform active:scale-95 hover:scale-105 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'border-amber-900/40 bg-button-gradient text-amber-900' 
            : 'border-amber-900/50 bg-gradient-to-b from-amber-200/90 to-amber-300/90 text-amber-800'
        }`}>
          Продолжить
        </button>
      </div>
    </ScreenFrame>
  );
};

