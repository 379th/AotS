import React from 'react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTranslation } from '../i18n';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const { t, language, changeLanguage } = useTranslation();
  const [notifications, setNotifications] = useLocalStorage('notifications', true);
  const [soundEnabled, setSoundEnabled] = useLocalStorage('sound_enabled', false);
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  return (
    <ScreenFrame>
      <TitleBar text={t.settings.title} />

      <div className="mx-auto mt-3 w-[92%] h-[66svh] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.75),rgba(36,48,56,.75))] p-2">
        <div className="relative h-full overflow-hidden rounded-xl border border-teal-700/30 bg-[radial-gradient(circle_at_center,rgba(78,120,120,.35),transparent_70%)] p-4">
          
          <div className="h-full flex flex-col">
            <div className="flex-1 space-y-4">
              <h2 className="text-lg font-semibold text-amber-200 mb-4">
                {t.settings.title}
              </h2>

              {/* Уведомления */}
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-amber-200">Уведомления</h3>
                    <p className="text-xs text-amber-200/70">Получать напоминания о квесте</p>
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
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-amber-200">Звуковые эффекты</h3>
                    <p className="text-xs text-amber-200/70">Включить звуки в приложении</p>
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
              <div className="bg-white/5 rounded-lg p-3">
                <h3 className="text-sm font-medium text-amber-200 mb-2">{t.settings.language}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => changeLanguage('ru')}
                    className={`px-3 py-1 rounded text-xs transition-colors ${
                      language === 'ru' 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-white/10 text-amber-200'
                    }`}
                  >
                    {t.settings.russian}
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`px-3 py-1 rounded text-xs transition-colors ${
                      language === 'en' 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-white/10 text-amber-200'
                    }`}
                  >
                    {t.settings.english}
                  </button>
                </div>
              </div>

              {/* Тема */}
              <div className="bg-white/5 rounded-lg p-3">
                <h3 className="text-sm font-medium text-amber-200 mb-2">Тема оформления</h3>
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
              <div className="bg-white/5 rounded-lg p-3">
                <h3 className="text-sm font-medium text-amber-200 mb-2">О приложении</h3>
                <div className="text-xs text-amber-200/70 space-y-1">
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
