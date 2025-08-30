import React, { useEffect } from 'react';
import { ScreenFrame } from '../components/ui';
import { initTelegram } from '../utils/telegram';
import { useTranslation } from '../i18n';

interface IntroScreenProps {
  onStart: () => void;
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
  
  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <ScreenFrame>
      {/* Верхняя плашка */}
      <div className="mx-auto mt-3 w-[92%]">
        <img src="/Sorce/AotS_begine.png" alt="AotS" className="w-full" />
      </div>

      {/* Центральная картинка */}
      <div className="mx-auto mt-3 w-[92%] rounded-2xl border border-amber-900/30 overflow-hidden">
        <img src="/Sorce/Screen_Start.png" alt="Start" className="w-full h-[60svh] object-cover" />
      </div>

      {/* Кнопки в 2 ряда */}
      <div className="mx-auto mt-3 w-[92%] grid grid-cols-3 gap-2">
        <button onClick={onAboutCreator} className="transition-transform active:scale-95 hover:scale-105"><img src="/Sorce/Creator.png" alt={t.intro.aboutCreator} className="w-full" /></button>
        <button onClick={onStart} className="transition-transform active:scale-95 hover:scale-105"><img src="/Sorce/Begine.png" alt={t.intro.start} className="w-full" /></button>
        <button onClick={onAboutQuest} className="transition-transform active:scale-95 hover:scale-105"><img src="/Sorce/Quest_boton.png" alt={t.intro.aboutQuest} className="w-full" /></button>
      </div>
      <div className="mx-auto mt-2 w-[92%] grid grid-cols-3 gap-2">
        <button onClick={onOpenFaq} className="transition-transform active:scale-95 hover:scale-105"><img src="/Sorce/F_A_Q.png" alt={t.intro.faq} className="w-full" /></button>
        <div></div>
        <button onClick={onOpenSettings} className="transition-transform active:scale-95 hover:scale-105"><img src="/Sorce/Setings.png" alt={t.intro.settings} className="w-full" /></button>
      </div>
    </ScreenFrame>
  );
};

