import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScreenFrame, TitleBar, RoundButton } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';
import { initTelegram, closeTelegramApp } from '../utils/telegram';
import { BookOpen, Swords, Layers, NotebookPen, LogOut } from 'lucide-react';

interface RequestScreenProps {
  onBack: () => void;
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const RequestScreen: React.FC<RequestScreenProps> = ({
  onBack,
  onAboutQuest,
  onGoDay1,
  onOpenDeck,
  onOpenJournal
}) => {
  const [intent, setIntent] = useLocalStorageString("sq.player.intent");

  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <ScreenFrame>
      <TitleBar text="Запрос" />

      {/* Основной контентный блок */}
      <div className="mx-auto mt-3 w-[92%] rounded-2xl border border-teal-700/30 bg-content-gradient p-4 text-left text-amber-50 shadow-[0_6px_28px_rgba(0,0,0,.35)]">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Тени</h2>
          <p className="mt-2 text-[15px] leading-relaxed opacity-95">
            Представляют собой непризнанные импульсы и желания, которые, подавляешь из опасения быть осуждённой(ым) или непринятой(ым).
          </p>
          <h3 className="mt-5 text-xl font-bold">Внутренние конфликты</h3>
          <p className="mt-2 text-[15px] leading-relaxed opacity-95">
            Непринятие себя такой(им), какая(ой) есть на самом деле, приводит к внутренним конфликтам, которые могут проявляться в негативных чувствах и поведении.
          </p>
        </div>
        
        {/* Поле ввода запроса */}
        <div className="mt-6 rounded-xl border border-amber-900/40 bg-input-gradient p-4 text-amber-900">
          <label className="mb-2 block text-sm font-semibold opacity-90">Твой запрос</label>
          <input
            value={intent}
            onChange={(e) => setIntent(e.target.value.slice(0, 120))}
            placeholder="Одна короткая фраза о том, что хочешь изменить"
            className="w-full rounded-lg border border-amber-900/30 bg-white/70 px-3 py-2 text-sm placeholder:text-amber-900/50 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
          />
        </div>
      </div>

      {/* Кнопки навигации */}
      <div className="mx-auto mt-6 w-[92%] flex items-center justify-between gap-2">
        <button 
          onClick={onBack} 
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-white/70 px-3 py-3 text-amber-900 backdrop-blur-sm active:translate-y-[1px] font-semibold"
        >
          <ArrowLeft className="h-4 w-4" /> Назад
        </button>
        <button 
          onClick={onGoDay1} 
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-button-gradient px-3 py-3 font-semibold text-amber-900 shadow-[0_6px_20px_rgba(0,0,0,.25)] active:translate-y-[1px]"
        >
          Продолжить
        </button>
      </div>

      {/* Нижняя панель навигации */}
      <nav className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)' }}>
        <div className="mx-auto mb-2 w-full max-w-[520px]">
          <div className="mx-3 rounded-2xl border border-amber-900/40 bg-button-gradient p-3 shadow-[0_-8px_30px_rgba(0,0,0,.35)]">
            <div className="flex items-center justify-between">
              <RoundButton label="Обучение" icon={BookOpen} tone="amber" onClick={onAboutQuest} />
              <RoundButton label="Квест" icon={Swords} tone="teal" onClick={onGoDay1} />
              <RoundButton label="Колода" icon={Layers} tone="sky" onClick={onOpenDeck} />
              <RoundButton label="Дневник" icon={NotebookPen} tone="slate" onClick={onOpenJournal} />
              <RoundButton label="Выход" icon={LogOut} tone="rose" onClick={closeTelegramApp} />
            </div>
          </div>
        </div>
      </nav>

      {/* Отступ для нижней панели */}
      <div className="h-32" />
    </ScreenFrame>
  );
};

