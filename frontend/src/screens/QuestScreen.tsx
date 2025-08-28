import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';

interface QuestScreenProps {
  onBack: () => void;
}

export const QuestScreen: React.FC<QuestScreenProps> = ({ onBack }) => {
  return (
    <ScreenFrame>
      <TitleBar text="О квесте" />
      
      <div className="mx-auto mt-2 w-[92%] overflow-hidden h-[73svh] flex flex-col min-h-0 rounded-2xl border border-amber-900/40 bg-input-gradient p-4 text-amber-900">
        <div className="flex-1 min-h-0 w-full overflow-auto rounded-xl border border-amber-900/30 bg-white/70 p-4 leading-relaxed space-y-4">
          <h2 className="text-lg font-extrabold tracking-tight">Что такое «Тень»?</h2>
          <p className="mt-2 text-[14px] md:text-[15px]">
            Это те качества, чувства и желания, которые мы обычно прячем: «не буду злиться», «я не боюсь», «мне не больно». 
            Они никуда не исчезают — просто уходят в тень и управляют нами из‑под полы.
          </p>
          
          <h3 className="mt-4 text-base md:text-lg font-bold">Зачем проходить квест?</h3>
          <p className="mt-2 text-[14px] md:text-[15px]">
            Перестать ругать себя и стать к себе добрее. Понять, почему я так реагирую, и научиться выбирать по‑новому. 
            Получить больше смелости, спокойствия и ясности. Улучшить отношения с близкими и с собой. 
            Вернуть энергию, которую забирает внутренний конфликт.
          </p>
          
          <h3 className="mt-4 text-base md:text-lg font-bold">Что ты получишь на выходе?</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-[14px] md:text-[15px]">
            <li>Осознание своей тени (честный взгляд, без стыда).</li>
            <li>Диалог с ней (умение слушать и слышать, любить себя).</li>
            <li>Опору архетипа — сильного светлого качества, которое помогает.</li>
            <li>Личный символ целостности и план действий.</li>
          </ul>
          
          <h3 className="mt-4 text-base md:text-lg font-bold">Как это проходит?</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-[14px] md:text-[15px]">
            <li>День 1 — Призыв Тени: знакомство с тем, что прячется.</li>
            <li>День 2 — Диалог: письмо от Тени и ответ от взрослого тебя.</li>
            <li>День 3 — Архетипический выбор: берём ресурс светлой стороны.</li>
            <li>День 4 — Интеграция: символ целостности и завершение цикла.</li>
          </ul>
          
          <h3 className="mt-4 text-base md:text-lg font-bold">Кому подойдёт?</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-[14px] md:text-[15px]">
            <li>Тем, кто переживает сильные эмоции и хочет понять себя.</li>
            <li>Тем, кто часто ссорится или стесняется своих чувств и хочет мягкости и силы.</li>
            <li>Творческим и любознательным: формат игровой, с рисунками и заметками.</li>
          </ul>
          
          <h3 className="mt-4 text-base md:text-lg font-bold">Что нужно?</h3>
          <p className="mt-2 text-[14px] md:text-[15px]">
            Тетрадь/дневник и ручка; иногда листы для рисования (по желанию).
          </p>
          <p className="mt-2 text-[14px] md:text-[15px]">
            От 10 минут до суток — выбирай по состоянию и глубине дня.
          </p>
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

