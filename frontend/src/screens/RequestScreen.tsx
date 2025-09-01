import React, { useEffect } from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';
import { initTelegram } from '../utils/telegram';
import { useTranslation } from '../i18n';
import { useTheme } from '../contexts/ThemeContext';

interface RequestScreenProps {
  onBack: () => void;
  onNext: () => void;
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const RequestScreen: React.FC<RequestScreenProps> = ({
  onBack,
  onNext,
  onAboutQuest,
  onGoDay1,
  onOpenDeck,
  onOpenJournal
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [intent, setIntent] = useLocalStorageString("sq.player.intent");

  useEffect(() => {
    initTelegram();
  }, []);

  return (
                    <ScreenFrame>
                  <TitleBar text={t.request.title} />

      {/* Основной контентный блок с полем запроса внутри */}
            <div className="relative z-10 px-4 mt-4">
        <div className={`mx-auto w-full h-[66svh] rounded-2xl border p-6 text-left shadow-[0_6px_28px_rgba(0,0,0,.35)] transition-colors duration-300 ${
          theme === 'dark' 
            ? 'border-teal-700/30 bg-content-gradient text-amber-50' 
            : 'border-amber-900/50 bg-gradient-to-b from-amber-100/95 to-amber-200/95 text-amber-800'
        }`}>
          <div className="h-full overflow-y-auto flex flex-col">
                        <h2 className="text-2xl font-extrabold tracking-tight">{t.request.shadows}</h2>
                        <p className="mt-3 text-[15px] leading-relaxed opacity-95">
                          {t.request.shadowsDescription}
                        </p>
                        <h3 className="mt-6 text-xl font-bold">{t.request.innerConflicts}</h3>
                        <p className="mt-3 text-[15px] leading-relaxed opacity-95">
                          {t.request.innerConflictsDescription}
                        </p>
                        
                        {/* Поле ввода запроса внизу основного блока */}
                        <div className={`mt-auto pt-6 rounded-xl border p-4 transition-colors duration-300 ${
                          theme === 'dark' 
                            ? 'border-amber-900/40 bg-input-gradient text-amber-900' 
                            : 'border-amber-900/60 bg-gradient-to-b from-amber-100/90 to-amber-200/90 text-amber-800'
                        }`}>
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
                            className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/40 transition-colors duration-300 ${
                              theme === 'dark' 
                                ? 'border-amber-900/30 bg-white/70 placeholder:text-amber-900/50' 
                                : 'border-amber-900/40 bg-white/95 placeholder:text-amber-700/50'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
      </div>

      {/* Зафиксированный слой с кнопками внизу страницы */}
      <div className="fixed bottom-0 left-0 right-0 z-10 px-4 pb-4 max-w-[520px] mx-auto">
        <div className="space-y-4">

          {/* Панель кнопок */}
          <BottomButtonPanel
            onBack={onBack}
            onContinue={onNext}
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

