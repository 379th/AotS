import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScreenFrame, TitleBar } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';

interface ShadowImageScreenProps {
  onBackToDay1: () => void;
  onContinue: () => void;
}

export const ShadowImageScreen: React.FC<ShadowImageScreenProps> = ({
  onBackToDay1,
  onContinue
}) => {
  const [imgUrl, setImgUrl] = useLocalStorageString("sq.shadow.image.url");

  return (
    <ScreenFrame>
      <TitleBar text="Тень" />

      <div className="mx-auto mt-3 w-[92%] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.08),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.8),rgba(36,48,56,.8))] p-2">
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
                const next = window.prompt("Укажи URL картинки", imgUrl || "");
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
        <button onClick={onBackToDay1}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-[#241b2f] px-3 py-2 font-semibold text-amber-200 shadow-[0_6px_20px_rgba(0,0,0,.25)] active:translate-y-[1px] flex-1">
          <ArrowLeft className="h-4 w-4" /> Назад
        </button>
        <button onClick={onContinue} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-button-gradient px-3 py-2 font-semibold text-amber-900 shadow-[0_6px_20px_rgba(0,0,0,.25)] active:translate-y-[1px] flex-1">
          Продолжить
        </button>
      </div>
    </ScreenFrame>
  );
};
