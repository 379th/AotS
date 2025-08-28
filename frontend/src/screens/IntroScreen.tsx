import React, { useEffect } from 'react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { initTelegram } from '../utils/telegram';

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
  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <ScreenFrame>
      <TitleBar text="Принятие тени" />
      
      <div className="mx-auto mt-3 w-[92%] h-[73svh] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.75),rgba(36,48,56,.75))] p-2">
        <div className="relative h-full overflow-hidden rounded-xl border border-teal-700/30 bg-[radial-gradient(circle_at_center,rgba(78,120,120,.35),transparent_70%)]">
          <div className="flex h-full items-center justify-center">
            <div className="text-center text-amber-200/70">
              <div className="text-sm">Добро пожаловать в квест "Принятие тени"</div>
              <div className="mt-1 text-xs">Готовы начать путешествие?</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-2 w-[92%]">
        <div className="grid grid-cols-3 gap-2">
          <Pill onClick={onAboutCreator}>О создателе</Pill>
          <Pill onClick={onStart}>Начало</Pill>
          <Pill onClick={onAboutQuest}>О квесте</Pill>
        </div>
      </div>

      <div className="mx-auto mt-2 w-[92%]">
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => { 
              onOpenFaq?.(); 
            }} 
            className="rounded-xl border border-amber-900/30 bg-white/60 px-3 py-2 text-sm font-medium text-amber-900 shadow-[0_3px_14px_rgba(0,0,0,.22)] backdrop-blur-sm active:translate-y-[1px]"
          >
            F.A.Q.
          </button>
          <button 
            onClick={() => { 
              onOpenSettings?.(); 
            }} 
            className="rounded-xl border border-amber-900/30 bg-white/60 px-3 py-2 text-sm font-medium text-amber-900 shadow-[0_3px_14px_rgba(0,0,0,.22)] backdrop-blur-sm active:translate-y-[1px]"
          >
            Настройки
          </button>
        </div>
      </div>
    </ScreenFrame>
  );
};

