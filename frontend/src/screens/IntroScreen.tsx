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
          <div className={`mx-auto mt-3 w-full max-w-[90vw] sm:max-w-[523px] px-2 sm:px-4 rounded-2xl border overflow-hidden transition-colors duration-300 ${
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

          {/* Кнопки в 2 ряда на мобильных, в одну строку на больших экранах */}
          <div className="mx-auto mt-4 w-full max-w-[90vw] sm:max-w-[521px] px-2 sm:px-4">
            {/* Первый ряд: 3 кнопки на мобильных, все 5 на больших экранах */}
            <div className="flex flex-row sm:flex-row sm:justify-between gap-2 sm:gap-3 justify-center items-center">
              <button onClick={onAboutCreator} className="w-[110px] sm:w-[158px] h-[55px] sm:h-[80px] transition-transform active:scale-95 hover:scale-105">
                <img src={getImageUrl(EXTERNAL_ASSETS.BUTTONS.ABOUT_CREATOR)} alt={t.intro.aboutCreator} className="w-full h-full object-cover" />
              </button>
              <button onClick={onStart} className="w-[110px] sm:w-[158px] h-[55px] sm:h-[80px] transition-transform active:scale-95 hover:scale-105">
                <img src={getImageUrl(EXTERNAL_ASSETS.BUTTONS.START)} alt={t.intro.start} className="w-full h-full object-cover" />
              </button>
              <button onClick={onAboutQuest} className="w-[110px] sm:w-[158px] h-[55px] sm:h-[80px] transition-transform active:scale-95 hover:scale-105">
                <img src={getImageUrl(EXTERNAL_ASSETS.BUTTONS.ABOUT_QUEST)} alt={t.intro.aboutQuest} className="w-full h-full object-cover" />
              </button>
            </div>
            {/* Второй ряд: 2 кнопки на мобильных, скрыт на больших экранах */}
            <div className="flex flex-row sm:hidden gap-2 justify-center items-center mt-2">
              <button onClick={onOpenFaq} className="w-[110px] h-[55px] transition-transform active:scale-95 hover:scale-105">
                <img src={getImageUrl(EXTERNAL_ASSETS.BUTTONS.FAQ)} alt={t.intro.faq} className="w-full h-full object-cover" />
              </button>
              <button onClick={onOpenSettings} className="w-[110px] h-[55px] transition-transform active:scale-95 hover:scale-105">
                <img src={getImageUrl(EXTERNAL_ASSETS.BUTTONS.SETTINGS)} alt={t.intro.settings} className="w-full h-full object-cover" />
              </button>
            </div>
            {/* Дополнительные кнопки для больших экранов */}
            <div className="hidden sm:flex sm:flex-row sm:justify-center gap-3 mt-3">
              <button onClick={onOpenFaq} className="w-[158px] h-[80px] transition-transform active:scale-95 hover:scale-105">
                <img src={getImageUrl(EXTERNAL_ASSETS.BUTTONS.FAQ)} alt={t.intro.faq} className="w-full h-full object-cover" />
              </button>
              <button onClick={onOpenSettings} className="w-[158px] h-[80px] transition-transform active:scale-95 hover:scale-105">
                <img src={getImageUrl(EXTERNAL_ASSETS.BUTTONS.SETTINGS)} alt={t.intro.settings} className="w-full h-full object-cover" />
              </button>
            </div>
          </div>
          
          {/* Дополнительный отступ снизу для прокрутки */}
          <div className="h-4"></div>
        </div>
      </div>
    </ScreenFrame>
  );
};

