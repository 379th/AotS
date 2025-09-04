import React, { useEffect } from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';
import { initTelegram } from '../utils/telegram';
import { useTranslation } from '../i18n';
import { useTheme } from '../contexts/ThemeContext';
import { EXTERNAL_ASSETS } from '../config/externalAssets';

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
      <div className="flex flex-col h-full overflow-y-auto">
        <TitleBar 
          text={t.request.title} 
          imagePath={EXTERNAL_ASSETS.NAVIGATION.REQUEST_TITLE}
        />

        {/* Основной контент */}
        <div className="flex-1 flex flex-col">
          {/* Основной контентный блок с полем запроса внутри */}
          <div className="mx-auto mt-3 w-[92%]">
            <div className={`h-[66svh] rounded-2xl border p-6 text-left shadow-[0_6px_28px_rgba(0,0,0,.35)] transition-colors duration-300 ${
              theme === 'dark' 
                ? 'border-white/20 bg-[#1a0b2e] text-white' 
                : 'border-[#5c4032]/50 bg-[#e2d0b6] text-amber-900'
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
                    ? 'border-white/20 bg-[#2d1b4e] text-white' 
                    : 'border-[#5c4032]/60 bg-[#f7f0e6] text-amber-900'
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
                        ? 'border-white/20 bg-[#2d1b4e] text-white placeholder:text-white/50' 
                        : 'border-[#5c4032]/40 bg-white/95 placeholder:text-amber-900/50'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Кнопки и панель навигации */}
          <div className="mx-auto mt-0.5 w-[92%]">
            {/* Панель кнопок */}
            <BottomButtonPanel
              onBack={onBack}
              onContinue={onNext}
            />

            {/* Панель навигации */}
            <div className="mt-0.5">
              <NavigationPanel
                onAboutQuest={onAboutQuest}
                onGoDay1={onGoDay1}
                onOpenDeck={onOpenDeck}
                onOpenJournal={onOpenJournal}
              />
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
};

