import React from 'react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';

interface GuidanceScreenProps {
  onBackToHome: () => void;
}

export const GuidanceScreen: React.FC<GuidanceScreenProps> = ({ onBackToHome }) => {
  return (
    <ScreenFrame>
      <TitleBar text="Напутствие" />
      <div className="mx-auto mt-3 w-[92%] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.75),rgba(36,48,56,.75))] p-3">
        <div className="h-[66svh] overflow-y-auto rounded-xl border border-amber-900/30 bg-white/5 p-4 text-amber-200/90 text-sm leading-6">
          <div className="mb-4">
            <strong>Надпись:</strong>
          </div>
          <div className="mb-4">
            Поздравляю квест завершён.
          </div>
          <div className="mb-4">
            В игре Лила говорится: «…Игра останавливается. Что произойдёт дальше — зависит от игрока. Природа космической игры проста: открыть, с какими новыми комбинациями, с какими новыми кармами, с какими спутниками игрок сможет вновь войти в игру и снова стремиться к состоянию, которое является его истинным домом. Он может продолжить игру в прятки с самим собой или навсегда остаться за пределами игры. А может вернуться на землю, чтобы помочь другим достичь цели, принимая роль дважды рождённого бодхисаттвы. Выбор остаётся за ним. Никто другой не может выбрать.»
          </div>
          <div>
            Радости, осознанности, баланса и гармонии!
          </div>
        </div>
        <div className="mt-3">
          <Pill onClick={onBackToHome} className="w-full">На главный</Pill>
        </div>
      </div>
    </ScreenFrame>
  );
};
