import React, { useState, useEffect } from 'react';

interface ScreenTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  transitionDuration?: number;
}

export const ScreenTransition: React.FC<ScreenTransitionProps> = ({ 
  children, 
  isVisible, 
  transitionDuration = 300 
}) => {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setIsAnimating(true);
      
      // Небольшая задержка для плавного появления
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 50);

      return () => clearTimeout(timer);
    } else {
      setIsAnimating(true);
      
      // Ждем завершения анимации исчезновения перед удалением из DOM
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsAnimating(false);
      }, transitionDuration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, transitionDuration]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`transition-all duration-${transitionDuration} ease-in-out ${
        isVisible && !isAnimating
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-95'
      }`}
      style={{
        transitionDuration: `${transitionDuration}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Компонент для анимации загрузки контента
export const ContentLoader: React.FC<{ isLoading: boolean; children: React.ReactNode }> = ({ 
  isLoading, 
  children 
}) => {
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-indigo-900/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 relative">
              <div className="absolute inset-0 border-4 border-purple-300/30 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-4 border-blue-300/50 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              <div className="absolute inset-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
            </div>
            <p className="text-white text-sm animate-pulse">Загрузка...</p>
          </div>
        </div>
      )}
      <div className={isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}>
        {children}
      </div>
    </div>
  );
};

// Компонент для анимации появления элементов
export const FadeIn: React.FC<{ 
  children: React.ReactNode; 
  delay?: number;
  duration?: number;
}> = ({ children, delay = 0, duration = 500 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Компонент для анимации масштабирования
export const ScaleIn: React.FC<{ 
  children: React.ReactNode; 
  delay?: number;
  duration?: number;
}> = ({ children, delay = 0, duration = 400 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScreenTransition;
