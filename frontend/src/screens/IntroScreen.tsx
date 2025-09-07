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
          <div className={`mx-auto mt-3 w-full max-w-[523px] px-4 rounded-2xl border overflow-hidden transition-colors duration-300 ${
            theme === 'dark' 
              ? 'border-amber-900/30' 
              : 'border-amber-900/50'
          }`}>
            <img 
              src={getImageUrl(EXTERNAL_ASSETS.SCREENS.INTRO)} 
              alt="Start" 
              className="w-full h-auto object-cover" 
            />
          </div>

          {/* Кнопки в 2 ряда */}
          <div className="mx-auto mt-4 w-full max-w-[521px] px-4 flex flex-col sm:flex-row sm:justify-between gap-3">
            <button onClick={onAboutCreator} className="w-full sm:w-[158px] h-[80px] transition-transform active:scale-95 hover:scale-105">
              <img src={getImageUrl(EXTERNAL_ASSETS.BUTTONS.ABOUT_CREATOR)} alt={t.intro.aboutCreator} className="w-full h-full object-cover" />
            </button>
            <button onClick={onStart} className="w-full sm:w-[158px] h-[80px] transition-transform active:scale-95 hover:scale-105">
              <img src={getImageUrl(EXTERNAL_ASSETS.BUTTONS.START)} alt={t.intro.start} className="w-full h-full object-cover" />
            </button>
            <button onClick={onAboutQuest} className="w-full sm:w-[158px] h-[80px] transition-transform active:scale-95 hover:scale-105">
              <img src={getImageUrl(EXTERNAL_ASSETS.BUTTONS.ABOUT_QUEST)} alt={t.intro.aboutQuest} className="w-full h-full object-cover" />
            </button>
          </div>
          <div className="mx-auto mt-3 w-full max-w-[521px] px-4 flex flex-col sm:flex-row sm:justify-center gap-3">
            <button onClick={onOpenFaq} className="w-full sm:w-[158px] h-[80px] transition-transform active:scale-95 hover:scale-105">
              <img src={getImageUrl(EXTERNAL_ASSETS.BUTTONS.FAQ)} alt={t.intro.faq} className="w-full h-full object-cover" />
            </button>
            <button onClick={onOpenSettings} className="w-full sm:w-[158px] h-[80px] transition-transform active:scale-95 hover:scale-105">
              <img src={getImageUrl(EXTERNAL_ASSETS.BUTTONS.SETTINGS)} alt={t.intro.settings} className="w-full h-full object-cover" />
            </button>
          </div>
          
          {/* Дополнительный отступ снизу для прокрутки */}
          <div className="h-4"></div>
        </div>
      </div>
    </ScreenFrame>
  );
};

