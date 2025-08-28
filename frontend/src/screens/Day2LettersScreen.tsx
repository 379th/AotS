import React from 'react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';

interface Day2LettersScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export const Day2LettersScreen: React.FC<Day2LettersScreenProps> = ({ onBack, onNext }) => {
  const [shadowLetter, setShadowLetter] = useLocalStorageString('day2_letter_shadow', '');
  const [adultReply, setAdultReply] = useLocalStorageString('day2_letter_adult', '');

  return (
    <ScreenFrame>
      <TitleBar text="День 2 — Письма" />

      <div className="mx-auto mt-3 w-[92%] h-[73svh] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.75),rgba(36,48,56,.75))] p-3">
        <div className="h-full overflow-y-auto rounded-xl border border-amber-900/30 bg-white/5 p-3 space-y-4">
          <div>
            <div className="text-xs text-amber-200/80 mb-2">Напиши письмо от лица Тени.</div>
            <textarea
              value={shadowLetter}
              onChange={(e) => setShadowLetter(e.target.value)}
              className="w-full h-28 px-3 py-2 text-sm bg-white/10 border border-amber-900/30 rounded-lg text-amber-200 placeholder-amber-200/50 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>
          <div>
            <div className="text-xs text-amber-200/80 mb-2">Ответь на него от лица взрослого тебя. Заверши фразой: «Я вижу тебя. Я готов быть с тобой».</div>
            <textarea
              value={adultReply}
              onChange={(e) => setAdultReply(e.target.value)}
              className="w-full h-28 px-3 py-2 text-sm bg-white/10 border border-amber-900/30 rounded-lg text-amber-200 placeholder-amber-200/50 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Pill onClick={onBack}>Назад</Pill>
            <Pill onClick={onNext}>Продолжить</Pill>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
};
