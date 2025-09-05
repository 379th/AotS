import React from 'react';
import { RoundButton } from './RoundButton';
import { closeTelegramApp } from '../../utils/telegram';

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
  
  return (
    <div className="mx-auto w-full max-w-[580px]">
      <div 
        className="rounded-2xl p-3 py-4 h-[110px]"
        style={{
          backgroundImage: 'url(/Sorce/navigation_panel/back_navigpanel_580x110.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="flex items-center justify-between w-full px-2 h-full">
          <RoundButton 
            label="" 
            imageSrc="/Sorce/navigation_panel/01_Learning.png" 
            tone="amber" 
            onClick={onAboutQuest} 
          />
          <RoundButton 
            label="" 
            imageSrc="/Sorce/navigation_panel/02_Quest.png" 
            tone="teal" 
            onClick={onGoDay1} 
          />
          <RoundButton 
            label="" 
            imageSrc="/Sorce/navigation_panel/03_Diary.png" 
            tone="slate" 
            onClick={onOpenJournal} 
          />
          <RoundButton 
            label="" 
            imageSrc="/Sorce/navigation_panel/04_Deck.png" 
            tone="sky" 
            onClick={onOpenDeck} 
          />
          <RoundButton 
            label="" 
            imageSrc="/Sorce/navigation_panel/05_Exit.png" 
            tone="rose" 
            onClick={closeTelegramApp} 
          />
        </div>
      </div>
    </div>
  );
};
