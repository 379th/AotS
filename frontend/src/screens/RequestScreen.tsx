import React, { useEffect } from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';
import { initTelegram } from '../utils/telegram';

interface RequestScreenProps {
  onBack: () => void;
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const RequestScreen: React.FC<RequestScreenProps> = ({
  onBack,
  onAboutQuest,
  onGoDay1,
  onOpenDeck,
  onOpenJournal
}) => {
  const [intent, setIntent] = useLocalStorageString("sq.player.intent");

  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <ScreenFrame>
      <TitleBar text="Запрос" />

      {/* Основной контентный блок между плашкой Запрос и полем Твой запрос */}
      <div className="relative z-10 px-4 mt-4 mb-4">
        <div className="mx-auto w-full rounded-2xl border border-teal-700/30 bg-content-gradient p-6 text-left text-amber-50 shadow-[0_6px_28px_rgba(0,0,0,.35)]">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Тени</h2>
            <p className="mt-3 text-[15px] leading-relaxed opacity-95">
              Представляют собой непризнанные импульсы и желания, которые, подавляешь из опасения быть осуждённой(ым) или непринятой(ым).
            </p>
            <h3 className="mt-6 text-xl font-bold">Внутренние конфликты</h3>
            <p className="mt-3 text-[15px] leading-relaxed opacity-95">
              Непринятие себя такой(им), какая(ой) есть на самом деле, приводит к внутренним конфликтам, которые могут проявляться в негативных чувствах и поведении.
            </p>
          </div>
        </div>
      </div>

      {/* Зафиксированный слой с полем запроса и кнопками внизу страницы */}
      <div className="fixed bottom-0 left-0 right-0 z-10 px-4 pb-4 max-w-[520px] mx-auto">
        <div className="space-y-4">
          {/* Поле ввода запроса */}
          <div className="mx-auto w-full rounded-xl border border-amber-900/40 bg-input-gradient p-4 text-amber-900">
            <label className="mb-2 block text-sm font-semibold opacity-90">Твой запрос</label>
            <input
              value={intent}
              onChange={(e) => setIntent(e.target.value.slice(0, 120))}
              placeholder="Одна короткая фраза о том, что хочешь изменить"
              className="w-full rounded-lg border border-amber-900/30 bg-white/70 px-3 py-2 text-sm placeholder:text-amber-900/50 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
            />
          </div>

          {/* Панель кнопок */}
          <BottomButtonPanel
            onBack={onBack}
            onContinue={onGoDay1}
          />

          {/* Панель навигации */}
          <NavigationPanel
            onAboutQuest={onAboutQuest}
            onGoDay1={onGoDay1}
            onOpenDeck={onOpenDeck}
            onOpenJournal={onOpenJournal}
          />
        </div>
      </div>
    </ScreenFrame>
  );
};

