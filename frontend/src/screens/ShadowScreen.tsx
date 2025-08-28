import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScreenFrame, TitleBar } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';

interface ShadowScreenProps {
  onBackToDay1: () => void;
  onContinue: () => void;
}

export const ShadowScreen: React.FC<ShadowScreenProps> = ({
  onBackToDay1,
  onContinue
}) => {
  const [imgUrl, setImgUrl] = useLocalStorageString("sq.day1.shadow.url");

  return (
    <ScreenFrame>
      <TitleBar text="Тень" />

      <div className="mx-auto mt-3 w-[92%] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.78),rgba(30,42,50,.78))] p-2">
        <div className="relative h-[66svh] overflow-hidden rounded-xl border border-teal-700/30">
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
              className="flex h-full w-full items-start justify-center pt-2 text-emerald-200/80 text-sm hover:text-emerald-200"
            >
              (Укажи URL картинки)
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto mt-2 mb-2 w-[92%] flex items-center justify-between gap-2">
        <button onClick={onBackToDay1} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-white/70 px-3 py-2 text-amber-900 backdrop-blur-sm active:translate-y-[1px]">
          <ArrowLeft className="h-4 w-4" /> Назад
        </button>
        <button onClick={onContinue} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-button-gradient px-3 py-2 font-semibold text-amber-900 shadow-[0_6px_20px_rgba(0,0,0,.25)] active:translate-y-[1px]">
          Продолжить
        </button>
      </div>
    </ScreenFrame>
  );
};

