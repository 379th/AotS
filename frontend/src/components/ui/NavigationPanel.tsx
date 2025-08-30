import React from 'react';
import { RoundButton } from './RoundButton';
import { BookOpen, Swords, Layers, NotebookPen, LogOut } from 'lucide-react';
import { closeTelegramApp } from '../../utils/telegram';
import { useTranslation } from '../../i18n';

interface NavigationPanelProps {
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const NavigationPanel: React.FC<NavigationPanelProps> = ({
  onAboutQuest,
  onGoDay1,
  onOpenDeck,
  onOpenJournal
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div className="rounded-2xl border border-amber-900/40 bg-button-gradient p-3 shadow-[0_8px_30px_rgba(0,0,0,.35)]">
                            <div className="flex items-center justify-between">
                      <RoundButton label={t.navigation.training} icon={BookOpen} tone="amber" onClick={onAboutQuest} />
                      <RoundButton label={t.navigation.quest} icon={Swords} tone="teal" onClick={onGoDay1} />
                      <RoundButton label={t.navigation.deck} icon={Layers} tone="sky" onClick={onOpenDeck} />
                      <RoundButton label={t.navigation.journal} icon={NotebookPen} tone="slate" onClick={onOpenJournal} />
                      <RoundButton label={t.navigation.exit} icon={LogOut} tone="rose" onClick={closeTelegramApp} />
                    </div>
      </div>
    </div>
  );
};
