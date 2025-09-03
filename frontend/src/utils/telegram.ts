// Simple Telegram WebApp API wrapper

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready?: () => void;
        expand?: () => void;
        setHeaderColor?: (color: string) => void;
        setBackgroundColor?: (color: string) => void;
        close?: () => void;
        sendData?: (data: string) => void;
        openTelegramLink?: (url: string) => void;
        MainButton?: {
          show?: () => void;
          hide?: () => void;
          setText?: (text: string) => void;
        };
        BackButton?: {
          show?: () => void;
          hide?: () => void;
        };
        HapticFeedback?: {
          impactOccurred?: (style: string) => void;
        };
      };
    };
  }
}

export async function initTelegram() {

  try {
    // Legacy WebApp API fallback
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      try {
        window.Telegram.WebApp?.ready?.();
        window.Telegram.WebApp?.expand?.();
        
        // Скрываем все элементы интерфейса Telegram
        try { 
          window.Telegram.WebApp?.MainButton?.hide?.(); 
        } catch (error) {
          console.log('Failed to hide MainButton:', error);
        }
        
        try { 
          window.Telegram.WebApp?.BackButton?.hide?.(); 
        } catch (error) {
          console.log('Failed to hide BackButton:', error);
        }
        
        // В версиях < 7.0 не поддерживаются смена цветов — вызываем только когда доступно и нет предупреждений
        try { 
          window.Telegram.WebApp?.setBackgroundColor?.('#120a22'); 
        } catch (error) {
          console.log('Failed to set background color:', error);
        }
        
        // Пытаемся установить прозрачный заголовок (если поддерживается)
        try { 
          window.Telegram.WebApp?.setHeaderColor?.('transparent'); 
        } catch (error) {
          console.log('Failed to set header color:', error);
        }
        
      } catch (error) {
        console.log('Legacy Telegram WebApp not available:', error);
      }
    }
  } catch (error) {
    console.error('Failed to initialize Telegram SDK:', error);
  }
}

export function openTelegramLink(url: string) {
  if (typeof window !== "undefined" && window.Telegram?.WebApp) {
    try {
      window.Telegram.WebApp?.openTelegramLink?.(url);
    } catch (error) {
      console.log('Failed to open Telegram link:', error);
      // Fallback to regular window.open
      window.open(url, '_blank');
    }
  } else {
    // Fallback for non-Telegram environment
    window.open(url, '_blank');
  }
}

export function sendTelegramData(data: string) {
  if (typeof window !== "undefined" && window.Telegram?.WebApp) {
    try {
      window.Telegram.WebApp?.sendData?.(data);
    } catch (error) {
      console.log('Failed to send data to Telegram:', error);
    }
  }
}

export function closeTelegramApp() {
  if (typeof window !== "undefined" && window.Telegram?.WebApp) {
    try {
      window.Telegram.WebApp?.close?.();
    } catch (error) {
      console.log('Failed to close Telegram app:', error);
    }
  }
}
