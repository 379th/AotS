import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScreenFrame, TitleBar } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';

interface Day1ScreenProps {
  onBackToRequest: () => void;
  onAccept: () => void;
}

export const Day1Screen: React.FC<Day1ScreenProps> = ({
  onBackToRequest,
  onAccept
}) => {
  const [imgUrl, setImgUrl] = useLocalStorageString("sq.day1.forest.url");

  return (
    <ScreenFrame>
      <TitleBar text="День 1 — Призыв Тени" />

      <div className="mx-auto mt-3 w-[92%] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.08),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.8),rgba(36,48,56,.8))] p-2">
        <div className="relative h-[66svh] overflow-hidden rounded-xl border border-teal-700/30">
          {imgUrl ? (
            <img 
              src={imgUrl} 
              alt="Лес, где шепчут тени" 
              className="h-full w-full object-cover" 
            />
          ) : (
            <button 
              onClick={() => {
                const next = window.prompt("Укажи URL картинки для Дня 1", imgUrl || "");
                if (next !== null) setImgUrl(next.trim());
              }} 
              className="flex h-full w-full items-start justify-center pt-2 text-emerald-200/80 text-sm hover:text-emerald-200"
            >
              (Укажи URL картинки)
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto mt-2 w-[92%] text-center text-[13px] opacity-85">
        Ты входишь в лес, где тени шепчут правду.
      </div>

      <div className="mx-auto mt-2 mb-2 w-[92%] flex items-center justify-between gap-2">
        <button onClick={onBackToRequest} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-white/70 px-3 py-2 text-amber-900 backdrop-blur-sm transition-transform active:scale-95 hover:scale-105">
          <ArrowLeft className="h-4 w-4" /> Назад
        </button>
        <button onClick={onAccept} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-button-gradient px-3 py-2 font-semibold text-amber-900 shadow-[0_6px_20px_rgba(0,0,0,.25)] transition-transform active:scale-95 hover:scale-105">
          Принять Тень
        </button>
      </div>
    </ScreenFrame>
  );
};

