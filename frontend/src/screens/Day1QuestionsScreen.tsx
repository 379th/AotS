import React from 'react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';

interface Day1QuestionsScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export const Day1QuestionsScreen: React.FC<Day1QuestionsScreenProps> = ({ onBack, onNext }) => {
  const [q1, setQ1] = useLocalStorageString('day1_q_where', '');
  const [q2, setQ2] = useLocalStorageString('day1_q_protects', '');
  const [q3, setQ3] = useLocalStorageString('day1_q_inner_child', '');

  return (
    <ScreenFrame>
      <TitleBar text="День 1 — Вопросы" />

      <div className="mx-auto mt-3 w-[92%] h-[73svh] rounded-2xl border border-amber-900/30 bg-[#1b1130] p-3">
        <div className="h-full overflow-y-auto rounded-xl border border-amber-900/30 bg-[#241b2f] p-3 space-y-4">
          <div>
            <div className="text-xs text-amber-200/80 mb-1">Где в жизни ты это проявляешь?</div>
            <textarea
              value={q1}
              onChange={(e) => setQ1(e.target.value)}
              className="w-full h-24 px-3 py-2 text-sm bg-white/10 border border-amber-900/30 rounded-lg text-amber-200 placeholder-amber-200/50 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          <div>
            <div className="text-xs text-amber-200/80 mb-1">Как это защищает тебя?</div>
            <textarea
              value={q2}
              onChange={(e) => setQ2(e.target.value)}
              className="w-full h-24 px-3 py-2 text-sm bg-white/10 border border-amber-900/30 rounded-lg text-amber-200 placeholder-amber-200/50 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          <div>
            <div className="text-xs text-amber-200/80 mb-1">Что чувствует твой внутренний ребёнок?</div>
            <textarea
              value={q3}
              onChange={(e) => setQ3(e.target.value)}
              className="w-full h-24 px-3 py-2 text-sm bg-white/10 border border-amber-900/30 rounded-lg text-amber-200 placeholder-amber-200/50 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Pill onClick={onBack}>Назад</Pill>
            <Pill onClick={onNext}>Продолжить</Pill>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
};

