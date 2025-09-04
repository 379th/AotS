import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { useTheme } from '../../contexts/ThemeContext';
import { getBackgroundImage, EXTERNAL_ASSETS } from '../../config/externalAssets';

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
  const { theme } = useTheme();
  
  const defaultBackText = backText || t.common.back;
  const defaultContinueText = continueText || t.common.continue;
  
  return (
    <div 
      className="mx-auto w-full flex items-center justify-between gap-2 p-4 rounded-2xl"
      style={{
        backgroundImage: getBackgroundImage(EXTERNAL_ASSETS.BUTTONS.PANEL_BACKGROUND),
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
                        {showBack && (
                    <button 
                      onClick={onBack} 
                      className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border px-3 py-3 backdrop-blur-sm transition-transform active:scale-95 hover:scale-105 font-semibold transition-colors duration-300 ${
                        theme === 'dark' 
                          ? 'border-white/20 bg-white/70 text-white' 
                          : 'border-[#5c4032]/40 bg-white/70 text-amber-900'
                      }`}
                    >
                      <ArrowLeft className="h-4 w-4" /> {defaultBackText}
                    </button>
                  )}
                  {showContinue && (
                    <button 
                      onClick={onContinue} 
                      className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border px-3 py-3 font-semibold shadow-[0_6px_20px_rgba(0,0,0,.25)] transition-transform active:scale-95 hover:scale-105 transition-colors duration-300 ${
                        theme === 'dark' 
                          ? 'border-white/20 bg-button-gradient text-white' 
                          : 'border-[#5c4032]/40 bg-button-gradient text-amber-900'
                      }`}
                    >
                      {defaultContinueText}
                    </button>
                  )}
    </div>
  );
};
