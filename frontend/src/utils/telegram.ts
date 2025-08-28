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
      };
    };
  }
}

export function initTelegram() {
  if (typeof window !== "undefined" && window.Telegram?.WebApp) {
    try {
      window.Telegram.WebApp?.ready?.();
      window.Telegram.WebApp?.expand?.();
      window.Telegram.WebApp?.setHeaderColor?.('#120a22');
      window.Telegram.WebApp?.setBackgroundColor?.('#120a22');
    } catch (error) {
      console.log('Telegram WebApp not available:', error);
    }
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
