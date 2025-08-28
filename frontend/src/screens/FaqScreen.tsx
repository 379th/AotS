import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';

interface FaqScreenProps {
  onBack: () => void;
}

export const FaqScreen: React.FC<FaqScreenProps> = ({ onBack }) => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const sections = [
    { 
      title: 'Техника безопасности', 
      content: 'Квест — не психотерапия и не медпомощь. При переживании травмы, самоповреждения, тяжёлой депрессии/паники — обратись к специалисту. Если в процессе стало по‑настоящему тяжело — стоп, пауза, дыхание, поговорить с родными/близкими или терапевтом.' 
    },
    { 
      title: 'Что такое Тень?', 
      content: 'Тень — это тоже архетип. Это те наши качества, чувства и желания, которым «не дают место»: злость, страх, стыд, зависть, нужда в поддержке, потребность отдыхать, желание внимания. Они не «плохие» — просто вытеснены и потому управляют нами из‑под полы.' 
    },
    { 
      title: 'Что такое Архетип?', 
      content: 'Архетип — это опора, образ/паттерн светлой/здоровой силы, которая помогает держать равновесие и направлять энергию тени. Примеры: Хранитель (границы и забота), Воин (смелость и действие), Мудрец (ясность и наблюдение).' 
    },
    { 
      title: 'Зачем встречаться с Тенью?', 
      content: 'Прекратить «скрытое управление»: аффекты и импульсы становятся осознаннее. Вернуть доступ к заблокированной энергии: злость → границы/сила, страх → осторожность/мудрость и т. д. Развивать сострадание к себе вместо самообесценивания.' 
    },
  ];

  return (
    <ScreenFrame>
      <TitleBar text="FAQ — Принятие Тени" />
      
      <div className="mx-auto mt-2 w-[92%] overflow-hidden h-[73svh] flex flex-col min-h-0 rounded-2xl border border-amber-900/40 bg-input-gradient p-4 text-amber-900">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {sections.map((section, i) => (
            <button
              key={i}
              onClick={() => setCurrentSection(i)}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                currentSection === i 
                  ? 'bg-amber-900 text-white' 
                  : 'bg-white/60 text-amber-900'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
        
        <div className="flex-1 min-h-0 w-full overflow-auto rounded-xl border border-amber-900/30 bg-white/70 p-4 leading-relaxed">
          <h3 className="font-bold mb-2">{sections[currentSection].title}</h3>
          <p className="text-[14px] md:text-[15px]">{sections[currentSection].content}</p>
        </div>
      </div>
      
      <div className="mx-auto mt-2 w-[92%] text-right">
        <Pill onClick={onBack}>
          <span className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4"/> Назад
          </span>
        </Pill>
      </div>
    </ScreenFrame>
  );
};

