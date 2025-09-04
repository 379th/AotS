import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { useTranslation } from '../i18n';
import { useTheme } from '../contexts/ThemeContext';
import { EXTERNAL_ASSETS } from '../config/externalAssets';

interface QuestScreenProps {
  onBack: () => void;
}

export const QuestScreen: React.FC<QuestScreenProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  return (
    <ScreenFrame>
      <TitleBar 
        text={t.aboutQuest.title} 
        imagePath={EXTERNAL_ASSETS.NAVIGATION.QUEST_TITLE}
      />
      
      <div className={`mx-auto mt-2 w-[92%] rounded-2xl border p-4 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'border-white/20 bg-[#1a0b2e] text-white' 
          : 'border-[#5c4032]/60 bg-[#e2d0b6] text-amber-900'
      }`}>
        <div className={`h-[66svh] w-full overflow-auto rounded-xl border p-4 leading-relaxed space-y-4 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'border-white/20 bg-[#2d1b4e] text-white' 
            : 'border-[#5c4032]/40 bg-[#f7f0e6]'
        }`}>
          <h2 className="text-lg font-extrabold tracking-tight">{t.aboutQuest.whatIsShadow}</h2>
          <p className="mt-2 text-[14px] md:text-[15px]">
            {t.aboutQuest.whatIsShadowDescription}
          </p>
          
          <h3 className="mt-4 text-base md:text-lg font-bold">{t.aboutQuest.whyDoQuest}</h3>
          <p className="mt-2 text-[14px] md:text-[15px]">
            {t.aboutQuest.whyDoQuestDescription}
          </p>
          
          <h3 className="mt-4 text-base md:text-lg font-bold">{t.aboutQuest.whatYouGet}</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-[14px] md:text-[15px]">
            {t.aboutQuest.whatYouGetList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          
          <h3 className="mt-4 text-base md:text-lg font-bold">{t.aboutQuest.howItGoes}</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-[14px] md:text-[15px]">
            {t.aboutQuest.howItGoesList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          
          <h3 className="mt-4 text-base md:text-lg font-bold">{t.aboutQuest.whoIsFor}</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-[14px] md:text-[15px]">
            {t.aboutQuest.whoIsForList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          
          <h3 className="mt-4 text-base md:text-lg font-bold">{t.aboutQuest.whatYouNeed}</h3>
          <p className="mt-2 text-[14px] md:text-[15px]">
            {t.aboutQuest.whatYouNeedDescription}
          </p>
          <p className="mt-2 text-[14px] md:text-[15px]">
            {t.aboutQuest.timeDescription}
          </p>
        </div>
      </div>
      
      <div className="mx-auto mt-2 w-[92%] text-right mb-4">
        <Pill onClick={onBack}>
          <span className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4"/> {t.common.back}
          </span>
        </Pill>
      </div>
    </ScreenFrame>
  );
};

