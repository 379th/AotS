import React from 'react';

interface PreloaderProps {
  isLoading: boolean;
  message?: string;
}

export const Preloader: React.FC<PreloaderProps> = ({ 
  isLoading, 
  message = "Загрузка..." 
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 w-full h-full z-50">
      {/* Только ваше изображение на полный экран */}
      <img 
        src="/Sorce/Preloader.png" 
        alt="Shadow Quest Loading" 
        className="w-full h-full object-cover"
      />
      
      {/* Текст "Загрузка" поверх изображения */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-white text-xl font-bold bg-black/50 px-4 py-2 rounded-lg">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Preloader;
