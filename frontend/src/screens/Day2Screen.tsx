import React from 'react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';

interface Day2ScreenProps {
  onNext: () => void;
  onBack: () => void;
  onOpenJournal: () => void;
}

export const Day2Screen: React.FC<Day2ScreenProps> = ({
  onNext,
  onBack,
  onOpenJournal
}) => {
  const [reflection, setReflection] = useLocalStorageString('day2_reflection', '');

  return (
    <ScreenFrame>
      <TitleBar text="День 2: Встреча с тенью" />

      <div className="mx-auto mt-3 w-[92%] h-[66svh] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.75),rgba(36,48,56,.75))] p-2">
        <div className="relative h-full overflow-hidden rounded-xl border border-teal-700/30 bg-[radial-gradient(circle_at_center,rgba(78,120,120,.35),transparent_70%)] p-4">
          
          {/* Основной контент */}
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-amber-200 mb-3">
                Второй день путешествия
              </h2>
              
              <div className="text-sm text-amber-200/80 mb-4 space-y-2">
                <p>
                  Сегодня мы углубимся в исследование вашей тени. 
                  Какие качества вы обычно скрываете от других?
                </p>
                <p>
                  Подумайте о моментах, когда вы чувствовали стыд, 
                  гнев или другие "негативные" эмоции.
                </p>
              </div>

              {/* Поле для размышлений */}
              <div className="mb-4">
                <label className="block text-xs text-amber-200/70 mb-2">
                  Ваши размышления:
                </label>
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Запишите свои мысли о встрече с тенью..."
                  className="w-full h-24 px-3 py-2 text-sm bg-white/10 border border-amber-900/30 rounded-lg text-amber-200 placeholder-amber-200/50 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              {/* Вопросы для размышления */}
              <div className="bg-white/5 rounded-lg p-3 mb-4">
                <h3 className="text-xs font-medium text-amber-200 mb-2">
                  Вопросы для размышления:
                </h3>
                <ul className="text-xs text-amber-200/70 space-y-1">
                  <li>• Что вызывает у вас стыд?</li>
                  <li>• Какие качества вы считаете "плохими"?</li>
                  <li>• Что вы скрываете от других?</li>
                  <li>• Как ваша тень защищает вас?</li>
                </ul>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex gap-2">
              <Pill onClick={onOpenJournal} className="flex-1">
                Дневник
              </Pill>
              <Pill onClick={onBack} className="flex-1">
                Назад
              </Pill>
              <Pill onClick={onNext} className="flex-1">
                Далее
              </Pill>
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
};
