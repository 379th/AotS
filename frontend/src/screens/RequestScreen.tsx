import React, { useEffect } from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';
import { initTelegram } from '../utils/telegram';
import { useTranslation } from '../i18n';

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
  const { t } = useTranslation();
  const [intent, setIntent] = useLocalStorageString("sq.player.intent");

  useEffect(() => {
    initTelegram();
  }, []);

  return (
                    <ScreenFrame>
                  <TitleBar text={t.request.title} />

      {/* Основной контентный блок между плашкой Запрос и полем Твой запрос */}
            <div className="relative z-10 px-4 mt-4">
        <div className="mx-auto w-full rounded-2xl border border-teal-700/30 bg-content-gradient p-6 text-left text-amber-50 shadow-[0_6px_28px_rgba(0,0,0,.35)]">
          <div className="h-[66svh]">
                        <h2 className="text-2xl font-extrabold tracking-tight">{t.request.shadows}</h2>
                        <p className="mt-3 text-[15px] leading-relaxed opacity-95">
                          {t.request.shadowsDescription}
                        </p>
                        <h3 className="mt-6 text-xl font-bold">{t.request.innerConflicts}</h3>
                        <p className="mt-3 text-[15px] leading-relaxed opacity-95">
                          {t.request.innerConflictsDescription}
                        </p>
                      </div>
                    </div>
      </div>

      {/* Зафиксированный слой с полем запроса и кнопками внизу страницы */}
      <div className="fixed bottom-0 left-0 right-0 z-10 px-4 pb-4 max-w-[520px] mx-auto">
        <div className="space-y-4">
                                {/* Поле ввода запроса */}
                      <div className="mx-auto w-full rounded-xl border border-amber-900/40 bg-input-gradient p-4 text-amber-900">
                        <label className="mb-2 block text-sm font-semibold opacity-90">{t.request.yourRequest}</label>
                        <input
                          value={intent}
                          onChange={(e) => setIntent(e.target.value.slice(0, 120))}
                          onFocus={(e) => {
                            if (e.target.value === intent) {
                              setIntent('');
                            }
                          }}
                          placeholder="Одна точная фраза"
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

