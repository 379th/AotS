import React from 'react';

interface ScrollableScreenProps {
  children: React.ReactNode;
  bottomPadding?: number;
}

export const ScrollableScreen: React.FC<ScrollableScreenProps> = ({ 
  children, 
  bottomPadding = 32 
}) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Основной контент */}
      <div className="flex-1 flex flex-col">
        {children}
        
        {/* Отступ для кнопок */}
        <div style={{ height: `${bottomPadding}px` }}></div>
      </div>
    </div>
  );
};
