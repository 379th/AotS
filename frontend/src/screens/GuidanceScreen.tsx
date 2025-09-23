import React from 'react';
import { ScreenFrame, TitleBar, Pill, DataExportImport } from '../components/ui';
import { useTheme } from '../contexts/ThemeContext';
import { EXTERNAL_ASSETS } from '../config/externalAssets';

interface GuidanceScreenProps {
  onBackToHome: () => void;
}

export const GuidanceScreen: React.FC<GuidanceScreenProps> = ({ onBackToHome }) => {
  const { theme } = useTheme();
  return (
    <ScreenFrame>
      <TitleBar 
        text="Напутствие" 
        imagePath={EXTERNAL_ASSETS.NAVIGATION.GUIDANCE_TITLE}
      />
      <div 
        className={`mx-auto mt-3 w-full max-w-[90vw] sm:max-w-[521px] h-[70vh] sm:h-[782px] rounded-2xl border p-3 transition-colors duration-300 flex flex-col ${
          theme === 'dark' 
            ? 'border-white/20' 
            : 'border-[#5c4032]/50'
        }`}
        style={{
          backgroundImage: theme === 'dark' ? 'none' : 'url(/Sorce/windows/external_container.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div 
          className={`flex-1 overflow-y-auto rounded-xl border p-4 text-[17px] leading-6 transition-colors duration-300 ${
            theme === 'dark' 
              ? 'border-white/20 text-white' 
              : 'border-[#5c4032]/40 text-amber-900'
          }`}
          style={{
            backgroundImage: theme === 'dark' ? 'none' : 'url(/Sorce/windows/internal_container.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >

          <div className="mb-4">
            Поздравляю квест завершён.
          </div>
          <div className="mb-4">
            В игре Лила говорится: «…Игра останавливается. Что произойдёт дальше — зависит от игрока. Природа космической игры проста: открыть, с какими новыми комбинациями, с какими новыми кармами, с какими спутниками игрок сможет вновь войти в игру и снова стремиться к состоянию, которое является его истинным домом. Он может продолжить игру в прятки с самим собой или навсегда остаться за пределами игры. А может вернуться на землю, чтобы помочь другим достичь цели, принимая роль дважды рождённого бодхисаттвы. Выбор остаётся за ним. Никто другой не может выбрать.»
          </div>
          <div className="mb-6">
            Радости, осознанности, баланса и гармонии!
          </div>

          {/* Экспорт/Импорт данных */}
          <div className="border-t pt-4">
            <div className="mb-3 font-medium">💾 Сохранение данных дневника</div>
            <DataExportImport />
          </div>
        </div>
        <div className="mt-3 flex-shrink-0">
          <Pill onClick={onBackToHome} className="w-full">На главный</Pill>
        </div>
      </div>
    </ScreenFrame>
  );
};
