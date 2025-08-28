import React from 'react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';

interface GuidanceScreenProps {
  onBackToHome: () => void;
}

export const GuidanceScreen: React.FC<GuidanceScreenProps> = ({ onBackToHome }) => {
  return (
    <ScreenFrame>
      <TitleBar text="Напутствие" />
      <div className="mx-auto mt-3 w-[92%] h-[73svh] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.75),rgba(36,48,56,.75))] p-3">
        <div className="h-full overflow-hidden rounded-xl border border-amber-900/30 bg-white/5 p-4 text-amber-200/90 text-sm leading-6">
          В игре Лила говорится: «...Игра останавливается. Что произойдёт дальше — зависит от игрока. Природа космической игры проста: открыть, с какими новыми комбинациями, с какими новыми кармами, с какими спутниками игрок сможет вновь войти в игру и снова стремиться к состоянию, которое является его истинным домом...»
          <br /><br />
          Радости, осознанности, баланса и гармонии!
        </div>
        <div className="mt-3">
          <Pill onClick={onBackToHome} className="w-full">На главный</Pill>
        </div>
      </div>
    </ScreenFrame>
  );
};
