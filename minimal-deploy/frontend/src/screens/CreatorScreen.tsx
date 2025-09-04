import React from 'react';
import { Send } from 'lucide-react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { openTelegramLink } from '../utils/telegram';
import { useTranslation } from '../i18n';
import { useTheme } from '../contexts/ThemeContext';
import { EXTERNAL_ASSETS } from '../config/externalAssets';

interface CreatorScreenProps {
  onBack: () => void;
}

export const CreatorScreen: React.FC<CreatorScreenProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  return (
    <ScreenFrame>
      <TitleBar 
        text={t.creator.title} 
        imagePath={EXTERNAL_ASSETS.NAVIGATION.CREATOR_TITLE}
      />
      
      <div className={`mx-auto mt-2 w-[92%] rounded-2xl border p-4 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'border-white/20 bg-[#1a0b2e] text-white' 
          : 'border-[#5c4032]/60 bg-[#e2d0b6] text-amber-900'
      }`}>
        <h3 className="text-base md:text-lg font-bold">{t.creator.acknowledgments}</h3>
        <div className="h-[66svh] mt-2 space-y-2 text-[14px] leading-relaxed overflow-y-auto">
          {t.creator.acknowledgmentsList.map((line, i) => (
            <div key={i} className="text-left">
              <span>{line}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className={`mx-auto mt-2 w-[92%] rounded-2xl border p-4 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'border-white/20 bg-[#1a0b2e] text-white' 
          : 'border-[#5c4032]/60 bg-[#e2d0b6] text-amber-900'
      }`}>
        <div className={`w-full rounded-xl border p-4 leading-relaxed transition-colors duration-300 ${
          theme === 'dark' 
            ? 'border-white/20 bg-[#2d1b4e] text-white' 
            : 'border-[#5c4032]/40 bg-[#f7f0e6]'
        }`}>
          <p className="mt-2 text-[14px] md:text-[15px]">
            Vladimir Lakshman Das — практик пути «Радость. Осознанность. Баланс. Гармония.» Он соединяет игру и познание: от индийской традиции и «Лилы» до Юнга и современной психологии. Пишет и снимает, исследует человечество как социолог, учится у жизни как ученик, работает с архетипами как игропрактик, мыслит как философ, дышит и дисциплинируется как йогин, путешествует взглядом фотографа, а в цифровом мире держит осознанность как кибер-монах. Его цель — познакомить тебя с твоей изначальной личностью, научись быть наблюдателем себя, чтобы вернуться к целостности без насилия, через игру, внимание и тепло к себе.
          </p>
        </div>
      </div>
      
      <div className="mx-auto mt-2 w-[92%] flex items-center justify-between mb-4">
        <Pill onClick={() => openTelegramLink('https://t.me/SantoshaClub')}>
          <span className="inline-flex items-center gap-2">
            <Send className="h-4 w-4"/> @SantoshaClub
          </span>
        </Pill>
        <Pill onClick={onBack}>
          <span className="inline-flex items-center gap-2">
            <img src="/Sorce/buttons/Back.png" alt={t.common.back} className="h-4 w-4 object-contain"/>
            {t.common.back}
          </span>
        </Pill>
      </div>
    </ScreenFrame>
  );
};

