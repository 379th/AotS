import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../../i18n';

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
    <div className="mx-auto w-full flex items-center justify-between gap-2">
                        {showBack && (
                    <button 
                      onClick={onBack} 
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-white/70 px-3 py-3 text-amber-900 backdrop-blur-sm transition-transform active:scale-95 hover:scale-105 font-semibold"
                    >
                      <ArrowLeft className="h-4 w-4" /> {defaultBackText}
                    </button>
                  )}
                  {showContinue && (
                    <button 
                      onClick={onContinue} 
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-button-gradient px-3 py-3 font-semibold text-amber-900 shadow-[0_6px_20px_rgba(0,0,0,.25)] transition-transform active:scale-95 hover:scale-105"
                    >
                      {defaultContinueText}
                    </button>
                  )}
    </div>
  );
};
