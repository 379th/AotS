import React from 'react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTranslation } from '../i18n';
import { useTheme } from '../contexts/ThemeContext';
import { EXTERNAL_ASSETS } from '../config/externalAssets';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const { t, language, changeLanguage } = useTranslation();
  const [notifications, setNotifications] = useLocalStorage('notifications', true);
  const [soundEnabled, setSoundEnabled] = useLocalStorage('sound_enabled', false);
  const { theme, setTheme } = useTheme();

  return (
    <ScreenFrame>
      <TitleBar 
        text={t.settings.title} 
        imagePath={EXTERNAL_ASSETS.NAVIGATION.SETTINGS_TITLE}
      />

      <div className={`mx-auto mt-3 w-[92%] rounded-2xl border p-2 transition-colors duration-300 ${
        theme === 'dark'
          ? 'border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.75),rgba(36,48,56,.75))]'
          : 'border-[#5c4032]/50 bg-[#e2d0b6]'
      }`}>
        <div className={`relative h-[66svh] overflow-hidden rounded-xl border p-4 transition-colors duration-300 ${
          theme === 'dark'
            ? 'border-teal-700/30 bg-[radial-gradient(circle_at_center,rgba(78,120,120,.35),transparent_70%)]'
            : 'border-[#5c4032]/40 bg-[#f7f0e6]'
        }`}>
          
          <div className="h-full flex flex-col">
            <div className="flex-1 space-y-4">
              <h2 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                theme === 'dark' ? 'text-amber-200' : 'text-amber-900'
              }`}>
                {t.settings.title}
              </h2>

              {/* Уведомления */}
              <div className={`rounded-lg p-3 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-white/5' : 'bg-[#f7f0e6]'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-sm font-medium transition-colors duration-300 ${
                      theme === 'dark' ? 'text-amber-200' : 'text-amber-900'
                    }`}>Уведомления</h3>
                    <p className={`text-xs transition-colors duration-300 ${
                      theme === 'dark' ? 'text-amber-200/70' : 'text-amber-900/70'
                    }`}>Получать напоминания о квесте</p>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      notifications ? 'bg-amber-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Звук */}
              <div className={`rounded-lg p-3 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-white/5' : 'bg-[#f7f0e6]'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-sm font-medium transition-colors duration-300 ${
                      theme === 'dark' ? 'text-amber-200' : 'text-amber-900'
                    }`}>Звуковые эффекты</h3>
                    <p className={`text-xs transition-colors duration-300 ${
                      theme === 'dark' ? 'text-amber-200/70' : 'text-amber-900/70'
                    }`}>Включить звуки в приложении</p>
                  </div>
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      soundEnabled ? 'bg-amber-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Язык */}
              <div className={`rounded-lg p-3 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-white/5' : 'bg-[#f7f0e6]'
              }`}>
                <h3 className={`text-sm font-medium mb-2 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-amber-200' : 'text-amber-900'
                }`}>{t.settings.language}</h3>
                <div className="flex gap-2">
                                      <button
                      onClick={() => changeLanguage('ru')}
                      className={`px-3 py-1 rounded text-xs transition-colors ${
                        language === 'ru' 
                          ? 'bg-amber-500 text-white' 
                          : theme === 'dark' ? 'bg-white/10 text-amber-200' : 'bg-[#e2d0b6] text-amber-900'
                      }`}
                    >
                      {t.settings.russian}
                    </button>
                                      <button
                      onClick={() => changeLanguage('en')}
                      className={`px-3 py-1 rounded text-xs transition-colors ${
                        language === 'en' 
                          ? 'bg-amber-500 text-white' 
                          : theme === 'dark' ? 'bg-white/10 text-amber-200' : 'bg-[#e2d0b6] text-amber-900'
                      }`}
                    >
                      {t.settings.english}
                    </button>
                </div>
              </div>

              {/* Тема */}
              <div className={`rounded-lg p-3 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-white/5' : 'bg-[#f7f0e6]'
              }`}>
                <h3 className={`text-sm font-medium mb-2 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-amber-200' : 'text-amber-900'
                }`}>Тема оформления</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme('dark')}
                    className={`px-3 py-1 rounded text-xs transition-colors ${
                      theme === 'dark' 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-white/10 text-amber-200'
                    }`}
                  >
                    Темная
                  </button>
                  <button
                    onClick={() => setTheme('light')}
                    className={`px-3 py-1 rounded text-xs transition-colors ${
                      theme === 'light' 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-white/10 text-amber-200'
                    }`}
                  >
                    Светлая
                  </button>
                </div>
              </div>

              {/* Информация о приложении */}
              <div className={`rounded-lg p-3 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-white/5' : 'bg-[#f7f0e6]'
              }`}>
                <h3 className={`text-sm font-medium mb-2 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-amber-200' : 'text-amber-900'
                }`}>О приложении</h3>
                <div className={`text-xs space-y-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-amber-200/70' : 'text-amber-900/70'
                }`}>
                  <p>Версия: 1.0.0</p>
                  <p>Разработчик: Shadow Quest Team</p>
                  <p>© 2024 Все права защищены</p>
                </div>
              </div>
            </div>

            {/* Кнопка назад */}
            <div className="mt-4">
              <Pill onClick={onBack} className="w-full">
                {t.common.back}
              </Pill>
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
};
