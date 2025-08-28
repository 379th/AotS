import React from 'react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';

interface Day2EchoScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export const Day2EchoScreen: React.FC<Day2EchoScreenProps> = ({ onBack, onNext }) => {
  const [imageUrl, setImageUrl] = useLocalStorageString('day2_echo_image', '');

  return (
    <ScreenFrame>
      <TitleBar text="День 2 — Пещера Эха" />

      <div className="mx-auto mt-3 w-[92%] h-[73svh] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.75),rgba(36,48,56,.75))] p-2">
        <div className="relative h-full overflow-hidden rounded-xl border border-teal-700/30 bg-[radial-gradient(circle_at_center,rgba(78,120,120,.35),transparent_70%)] p-3 flex flex-col">
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="(Укажи URL картинки)"
            className="mb-2 w-full rounded border border-teal-700/40 bg-black/20 px-3 py-2 text-xs text-amber-200 placeholder-amber-200/50 focus:outline-none"
          />
          <div className="flex-1 rounded-lg bg-black/10 border border-teal-800/30 overflow-hidden flex items-center justify-center">
            {imageUrl ? (
              <img src={imageUrl} alt="echo" className="max-h-full max-w-full object-contain" />
            ) : (
              <div className="text-amber-200/50 text-xs">(Укажи URL картинки)</div>
            )}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Pill onClick={onBack}>Назад</Pill>
            <Pill onClick={onNext}>Продолжить</Pill>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
};
