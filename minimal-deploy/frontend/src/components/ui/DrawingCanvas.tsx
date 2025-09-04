import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface DrawingCanvasProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ 
  value, 
  onChange, 
  className = "" 
}) => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isInitialized, setIsInitialized] = useState(false);

  // Инициализация canvas и истории
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isInitialized) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Настройка контекста
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    setContext(ctx);

    // Создаем начальное состояние
    const initialDataUrl = canvas.toDataURL('image/png');
    setHistory([initialDataUrl]);
    setHistoryIndex(0);
    setIsInitialized(true);
    
    console.log('Canvas инициализирован. Начальное состояние:', initialDataUrl.substring(0, 50) + '...');

    // Если есть сохраненное значение, загружаем его
    if (value && value.startsWith('data:image')) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        setHistory([dataUrl]);
        setHistoryIndex(0);
        console.log('Загружен сохраненный рисунок');
      };
      img.src = value;
    }
  }, [value, isInitialized]);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas || !isInitialized) return;

    const dataUrl = canvas.toDataURL('image/png');
    
    setHistory(prevHistory => {
      const newHistory = prevHistory.slice(0, historyIndex + 1);
      newHistory.push(dataUrl);
      console.log('Сохранено в историю. Новый размер:', newHistory.length);
      return newHistory;
    });
    
    setHistoryIndex(prevIndex => {
      const newIndex = prevIndex + 1;
      console.log('Новый индекс истории:', newIndex);
      return newIndex;
    });
  };

  const undo = () => {
    console.log('Попытка отмены. Текущий индекс:', historyIndex, 'Размер истории:', history.length);
    
    if (historyIndex > 0 && history.length > 1) {
      const newIndex = historyIndex - 1;
      const canvas = canvasRef.current;
      const ctx = context;
      
      if (!canvas || !ctx) {
        console.log('Canvas или контекст недоступны');
        return;
      }

      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        setHistoryIndex(newIndex);
        onChange(history[newIndex]);
        console.log('Отменено действие. Новый индекс:', newIndex);
      };
      img.onerror = () => {
        console.log('Ошибка загрузки изображения для отмены');
      };
      img.src = history[newIndex];
    } else {
      console.log('Отмена невозможна - нет действий для отмены');
    }
  };

  const getMousePos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!context || !isInitialized) return;

    setIsDrawing(true);
    const pos = getMousePos(e);
    context.beginPath();
    context.moveTo(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || !context) return;

    const pos = getMousePos(e);
    context.lineTo(pos.x, pos.y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing || !isInitialized) return;
    
    setIsDrawing(false);
    
    // Сохраняем в историю
    saveToHistory();
    
    // Обновляем значение
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      onChange(dataUrl);
    }
  };

  const clearCanvas = () => {
    if (!context || !canvasRef.current || !isInitialized) return;
    
    // Сохраняем текущее состояние перед очисткой
    saveToHistory();
    
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    onChange('');
    console.log('Холст очищен');
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`text-xs mb-2 text-center transition-colors duration-300 ${
        theme === 'dark' 
          ? 'text-amber-200/60' 
          : 'text-amber-900/60'
      }`}>
        👆 Рисуй пальцем или мышкой
      </div>
      <canvas
        ref={canvasRef}
        width={300}
        height={200}
        className="w-full h-48 border border-amber-900/30 rounded-lg bg-white/10 cursor-crosshair touch-none select-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        style={{ touchAction: 'none' }}
      />
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          onClick={undo}
          disabled={historyIndex <= 0 || !isInitialized}
          className={`px-2 py-1 text-xs text-white rounded transition-colors ${
            historyIndex > 0 && isInitialized
              ? 'bg-amber-600/80 hover:bg-amber-600' 
              : 'bg-gray-500/50 cursor-not-allowed'
          }`}
          title={`Отменить последнее действие (${historyIndex} действий доступно)`}
        >
          ↩️
        </button>
        <button
          onClick={clearCanvas}
          disabled={!isInitialized}
          className={`px-2 py-1 text-xs text-white rounded transition-colors ${
            isInitialized
              ? 'bg-amber-600/80 hover:bg-amber-600'
              : 'bg-gray-500/50 cursor-not-allowed'
          }`}
          title="Очистить всё"
        >
          🗑️
        </button>
      </div>
      {/* Отладочная информация */}
      <div className={`text-xs mt-1 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'text-amber-200/40' 
          : 'text-amber-900/40'
      }`}>
        {isInitialized ? `История: ${historyIndex}/${history.length}` : 'Инициализация...'}
      </div>
    </div>
  );
};
