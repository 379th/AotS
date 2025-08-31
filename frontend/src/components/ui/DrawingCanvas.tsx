import React, { useRef, useEffect, useState } from 'react';

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [previousState, setPreviousState] = useState<string>('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Настройка контекста для лучшего рисования пальцем
    ctx.strokeStyle = '#d97706'; // amber-600
    ctx.lineWidth = 4; // Увеличил толщину для пальца
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    setContext(ctx);

    // Восстановление сохраненного рисунка
    if (value && value.startsWith('data:image')) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = value;
    }
  }, [value]);

  const saveCurrentState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return '';
    
    return canvas.toDataURL('image/png');
  };

  const undo = () => {
    if (!previousState) return;
    
    const canvas = canvasRef.current;
    const ctx = context;
    if (!canvas || !ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      onChange(previousState);
      setPreviousState(''); // Сбрасываем предыдущее состояние после отмены
    };
    img.src = previousState;
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
    if (!context) return;

    // Сохраняем текущее состояние перед началом рисования
    setPreviousState(saveCurrentState());
    
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
    if (!isDrawing) return;
    
    setIsDrawing(false);
    
    // Обновляем значение
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      onChange(dataUrl);
    }
  };

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;
    
    // Сохраняем текущее состояние перед очисткой
    setPreviousState(saveCurrentState());
    
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    onChange('');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="text-xs text-amber-200/60 mb-2 text-center">
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
        style={{ touchAction: 'none' }} // Отключаем стандартные жесты браузера
      />
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          onClick={undo}
          disabled={!previousState}
          className={`px-2 py-1 text-xs text-white rounded transition-colors ${
            previousState 
              ? 'bg-amber-600/80 hover:bg-amber-600' 
              : 'bg-gray-500/50 cursor-not-allowed'
          }`}
          title="Отменить последнее действие"
        >
          ↩️
        </button>
        <button
          onClick={clearCanvas}
          className="px-2 py-1 text-xs bg-amber-600/80 text-white rounded hover:bg-amber-600 transition-colors"
          title="Очистить всё"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};
