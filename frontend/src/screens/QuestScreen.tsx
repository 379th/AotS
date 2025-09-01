import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { useTranslation } from '../i18n';
import { useTheme } from '../contexts/ThemeContext';

interface QuestScreenProps {
  onBack: () => void;
}

export const QuestScreen: React.FC<QuestScreenProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  return (
    <ScreenFrame>
      <TitleBar text={t.aboutQuest.title} />
      
      <div className={`mx-auto mt-2 w-[92%] rounded-2xl border p-4 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'border-amber-900/40 bg-input-gradient text-amber-900' 
          : 'border-amber-900/60 bg-gradient-to-b from-amber-100/90 to-amber-200/90 text-amber-800'
      }`}>
        <div className={`h-[66svh] w-full overflow-auto rounded-xl border p-4 leading-relaxed space-y-4 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'border-amber-900/30 bg-white/70' 
            : 'border-amber-900/40 bg-white/95'
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

