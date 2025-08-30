import React from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { openTelegramLink } from '../utils/telegram';
import { useTranslation } from '../i18n';

interface CreatorScreenProps {
  onBack: () => void;
}

export const CreatorScreen: React.FC<CreatorScreenProps> = ({ onBack }) => {
  const { t } = useTranslation();
  
  return (
    <ScreenFrame>
      <TitleBar text={t.creator.title} />
      
      <div className="mx-auto mt-2 w-[92%] flex-1 flex flex-col min-h-0 rounded-2xl border border-amber-900/40 bg-input-gradient p-4 text-amber-900">
        <h3 className="text-base md:text-lg font-bold">{t.creator.acknowledgments}</h3>
        <div className="flex-1 min-h-0 mt-2 space-y-2 text-[14px] leading-relaxed overflow-y-auto">
          {t.creator.acknowledgmentsList.map((line, i) => (
            <div key={i} className="text-left">
              <span>{line}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mx-auto mt-2 w-[92%] rounded-2xl border border-amber-900/40 bg-input-gradient p-4 text-amber-900">
        <div className="w-full rounded-xl border border-amber-900/30 bg-white/70 p-4 leading-relaxed">
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
            <ArrowLeft className="h-4 w-4"/> {t.common.back}
          </span>
        </Pill>
      </div>
    </ScreenFrame>
  );
};

