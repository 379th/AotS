import React from 'react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';

interface Day3PartnerTaskScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export const Day3PartnerTaskScreen: React.FC<Day3PartnerTaskScreenProps> = ({ onBack, onNext }) => {
  const [entry1, setEntry1] = useLocalStorageString('day3_partner_1', '');
  const [entry2, setEntry2] = useLocalStorageString('day3_partner_2', '');
  const [entry3, setEntry3] = useLocalStorageString('day3_partner_3', '');

  return (
    <ScreenFrame>
      <TitleBar text="День 3 — Задание пары" />

      <div className="mx-auto mt-3 w-[92%] h-[73svh] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.75),rgba(36,48,56,.75))] p-3">
        <div className="h-full overflow-y-auto rounded-xl border border-amber-900/30 bg-white/5 p-3 space-y-4">
          <div>
            <div className="text-xs text-amber-200/80 mb-2">Запись 1</div>
            <textarea value={entry1} onChange={(e) => setEntry1(e.target.value)} className="w-full h-20 px-3 py-2 text-sm bg-white/10 border border-amber-900/30 rounded-lg text-amber-200 placeholder-amber-200/50 resize-none focus:outline-none" />
          </div>
          <div>
            <div className="text-xs text-amber-200/80 mb-2">Запись 2</div>
            <textarea value={entry2} onChange={(e) => setEntry2(e.target.value)} className="w-full h-20 px-3 py-2 text-sm bg-white/10 border border-amber-900/30 rounded-lg text-amber-200 placeholder-amber-200/50 resize-none focus:outline-none" />
          </div>
          <div>
            <div className="text-xs text-amber-200/80 mb-2">Запись 3</div>
            <textarea value={entry3} onChange={(e) => setEntry3(e.target.value)} className="w-full h-20 px-3 py-2 text-sm bg-white/10 border border-amber-900/30 rounded-lg text-amber-200 placeholder-amber-200/50 resize-none focus:outline-none" />
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
