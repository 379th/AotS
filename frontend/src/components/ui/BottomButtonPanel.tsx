import React from 'react';
import { useTranslation } from '../../i18n';
// Временно отключаем импорт для локальной разработки
// import { getBackgroundImage, EXTERNAL_ASSETS } from '../../config/externalAssets';

interface BottomButtonPanelProps {
  onBack: () => void;
  onContinue: () => void;
  backText?: string;
  continueText?: string;
  showBack?: boolean;
  showContinue?: boolean;
}

export const BottomButtonPanel: React.FC<BottomButtonPanelProps> = ({
  onBack,
  onContinue,
  backText,
  continueText,
  showBack = true,
  showContinue = true
}) => {
  const { t } = useTranslation();
  
  const defaultBackText = backText || t.common.back;
  const defaultContinueText = continueText || t.common.continue;
  
  return (
    <div 
      className="mx-auto w-full flex items-center justify-center gap-12 px-4 py-2 rounded-2xl"
      style={{
        // Временно отключаем фоновое изображение для локальной разработки
        // backgroundImage: getBackgroundImage(EXTERNAL_ASSETS.BUTTONS.PANEL_BACKGROUND),
        // backgroundSize: 'cover',
        // backgroundPosition: 'center'
      }}
    >
      {showBack && (
        <button 
          onClick={onBack} 
          className="transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <img 
            src="/Sorce/buttons/Back.png" 
            alt={defaultBackText}
            className="object-contain"
          />
        </button>
      )}
      {showContinue && (
        <button 
          onClick={onContinue} 
          className="transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <img 
            src="/Sorce/buttons/Continue.png" 
            alt={defaultContinueText}
            className="object-contain"
          />
        </button>
      )}
    </div>
  );
};
