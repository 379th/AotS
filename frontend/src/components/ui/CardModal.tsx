import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  cardName: string;
  cardType: 'shadow' | 'archetype';
  pairIndex: number;
}

export const CardModal: React.FC<CardModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  cardName,
  cardType,
  pairIndex
}) => {
  const { theme } = useTheme();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Сброс состояния при открытии
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative max-w-[95vw] max-h-[95vh] rounded-2xl border overflow-hidden transition-colors duration-300 ${
        theme === 'dark' 
          ? 'border-white/20 bg-[#1a0b2e] text-white' 
          : 'border-[#5c4032]/60 bg-[#e2d0b6] text-amber-900'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div>
            <h3 className="text-lg font-semibold">{cardName}</h3>
            <p className="text-sm opacity-70">
              {cardType === 'shadow' ? 'Тень' : 'Архетип'} • Пара {pairIndex + 1}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Кнопки управления масштабом */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
                className={`p-2 rounded-full transition-colors duration-200 disabled:opacity-50 ${
                  theme === 'dark' 
                    ? 'hover:bg-white/10 text-white' 
                    : 'hover:bg-[#5c4032]/10 text-amber-900'
                }`}
              >
                <ZoomOut size={20} />
              </button>
              <span className="text-sm font-mono px-2">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={scale >= 3}
                className={`p-2 rounded-full transition-colors duration-200 disabled:opacity-50 ${
                  theme === 'dark' 
                    ? 'hover:bg-white/10 text-white' 
                    : 'hover:bg-[#5c4032]/10 text-amber-900'
                }`}
              >
                <ZoomIn size={20} />
              </button>
              <button
                onClick={handleReset}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'hover:bg-white/10 text-white' 
                    : 'hover:bg-[#5c4032]/10 text-amber-900'
                }`}
              >
                <RotateCcw size={20} />
              </button>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'hover:bg-white/10 text-white' 
                  : 'hover:bg-[#5c4032]/10 text-amber-900'
              }`}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div 
          className="relative p-4 overflow-hidden"
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div 
            className="flex items-center justify-center"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
            }}
          >
            <img 
              src={imageUrl} 
              alt={cardName}
              className="rounded-lg transition-transform duration-200"
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                transform: `scale(${scale})`,
                transformOrigin: 'center'
              }}
              draggable={false}
              onMouseDown={handleMouseDown}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center p-4 border-t border-white/10">
          <p className="text-sm opacity-70 text-center">
            Колесо мыши: масштаб • Перетаскивание при увеличении • Кнопка ✕ для закрытия
          </p>
        </div>
      </div>
    </div>
  );
};
