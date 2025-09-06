import React, { useEffect } from 'react';
import { ScreenFrame, TitleBar } from '../components/ui';
import { initTelegram } from '../utils/telegram';
import { useTranslation } from '../i18n';
import { useTheme } from '../contexts/ThemeContext';
import { getImageUrl, EXTERNAL_ASSETS } from '../config/externalAssets';

interface IntroScreenProps {
  onStart: () => Promise<void>;
  onAboutCreator: () => void;
  onAboutQuest: () => void;
  onOpenFaq: () => void;
  onOpenSettings: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onStart,
  onAboutCreator,
  onAboutQuest,
  onOpenFaq,
  onOpenSettings
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <ScreenFrame>
      <div className="flex flex-col h-full overflow-y-auto">
        {/* TitleBar */}
        <TitleBar 
          text="Принятие Тени" 
          imagePath={EXTERNAL_ASSETS.NAVIGATION.INTRO_TITLE}
        />
        
        {/* Основной контент */}
        <div className="flex-1 flex flex-col">
          {/* Центральная картинка */}
          <div className={`mx-auto mt-3 w-[95%] rounded-2xl border overflow-hidden transition-colors duration-300 ${
            theme === 'dark' 
              ? 'border-amber-900/30' 
              : 'border-amber-900/50'
          }`}>
            <img 
              src={getImageUrl(EXTERNAL_ASSETS.SCREENS.INTRO)} 
              alt="Start" 
              className="w-full h-auto max-h-[75svh] object-contain" 
            />
          </div>

          {/* Кнопки в 2 ряда */}
          <div className="mx-auto mt-4 w-[92%] grid grid-cols-3 gap-3">
            <button onClick={onAboutCreator} className="transition-transform active:scale-95 hover:scale-105">
              <img src={getImageUrl(EXTERNAL_ASSETS.BUTTONS.ABOUT_CREATOR)} alt={t.intro.aboutCreator} className="w-full h-auto" />
            </button>
            <button onClick={onStart} className="transition-transform active:scale-95 hover:scale-105">
              <img src={getImageUrl(EXTERNAL_ASSETS.BUTTONS.START)} alt={t.intro.start} className="w-full h-auto" />
            </button>
            <button onClick={onAboutQuest} className="transition-transform active:scale-95 hover:scale-105">
              <img src={getImageUrl(EXTERNAL_ASSETS.BUTTONS.ABOUT_QUEST)} alt={t.intro.aboutQuest} className="w-full h-auto" />
            </button>
          </div>
          <div className="mx-auto mt-3 w-[92%] flex justify-center gap-3">
            <button onClick={onOpenFaq} className="transition-transform active:scale-95 hover:scale-105 w-1/3">
              <img src={getImageUrl(EXTERNAL_ASSETS.BUTTONS.FAQ)} alt={t.intro.faq} className="w-full h-auto" />
            </button>
            <button onClick={onOpenSettings} className="transition-transform active:scale-95 hover:scale-105 w-1/3">
              <img src={getImageUrl(EXTERNAL_ASSETS.BUTTONS.SETTINGS)} alt={t.intro.settings} className="w-full h-auto" />
            </button>
          </div>
          
          {/* Дополнительный отступ снизу для прокрутки */}
          <div className="h-4"></div>
        </div>
      </div>
    </ScreenFrame>
  );
};

