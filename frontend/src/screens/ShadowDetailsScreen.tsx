import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useTheme } from '../contexts/ThemeContext';
import { useShadowArchetypePair } from '../hooks/useShadowArchetypePair';
import { getPairByNumber } from '../utils/cardsData';
import { EXTERNAL_ASSETS } from '../config/externalAssets';

interface ShadowDetailsScreenProps {
  onBack: () => void;
  onNext: () => void;
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const ShadowDetailsScreen: React.FC<ShadowDetailsScreenProps> = ({ 
  onBack, 
  onNext,
  onAboutQuest,
  onGoDay1,
  onOpenDeck,
  onOpenJournal
}) => {
  const { theme } = useTheme();
  const { currentPairIndex, hasCurrentPair } = useShadowArchetypePair();
  const [shadowData, setShadowData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  // Загружаем данные тени из CSV
  React.useEffect(() => {
    const loadShadowData = async () => {
      if (!hasCurrentPair || currentPairIndex < 0) {
        setShadowData(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Получаем номер пары (currentPairIndex 0-indexed, CSV 1-indexed)
        const pairNumber = currentPairIndex + 1;
        console.log('Загрузка данных тени для пары:', pairNumber);

        const pair = await getPairByNumber(pairNumber);
        
        if (pair && pair.shadow) {
          console.log('Найдены данные тени:', pair.shadow);
          setShadowData(pair.shadow);
        } else {
          console.log('Данные тени не найдены для пары:', pairNumber);
          setShadowData(null);
        }
      } catch (err) {
        console.error('Ошибка загрузки данных тени:', err);
        setError('Ошибка загрузки данных тени');
        setShadowData(null);
      } finally {
        setLoading(false);
      }
    };

    loadShadowData();
  }, [currentPairIndex, hasCurrentPair]);

  return (
    <ScreenFrame>
      <div className="flex flex-col h-full overflow-y-auto">
        <TitleBar 
          text="Тень - Детали" 
          imagePath={EXTERNAL_ASSETS.NAVIGATION.SHADOW_DETAILS_TITLE}
        />

        {/* Основной контент */}
        <div className="flex-1 flex flex-col">
          <div className={`mx-auto mt-3 w-[92%] rounded-2xl border p-3 transition-colors duration-300 ${
            theme === 'dark' 
              ? 'border-white/20 bg-[#1a0b2e]' 
              : 'border-[#5c4032]/50 bg-[#e2d0b6]'
          }`}>
            <div className={`h-[66svh] overflow-y-auto rounded-xl border p-4 space-y-6 transition-colors duration-300 ${
              theme === 'dark' 
                ? 'border-white/20 bg-[#2d1b4e]' 
                : 'border-[#5c4032]/40 bg-[#f7f0e6]'
            }`}>
              
              {!hasCurrentPair ? (
                <div className={`flex items-center justify-center h-full text-center transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white/70' : 'text-amber-900/70'
                }`}>
                  <div>
                    <div className="text-lg font-medium mb-2">Сначала выберите пару</div>
                    <div className="text-sm">Перейдите на экраны Тень и Архетип для выбора пары</div>
                  </div>
                </div>
              ) : loading ? (
                <div className={`flex items-center justify-center h-full text-center transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white/70' : 'text-amber-900/70'
                }`}>
                  <div>
                    <div className="text-lg font-medium mb-2">Загрузка данных тени...</div>
                    <div className="text-sm">Пожалуйста, подождите</div>
                  </div>
                </div>
              ) : error ? (
                <div className={`flex items-center justify-center h-full text-center transition-colors duration-300 ${
                  theme === 'dark' ? 'text-red-400' : 'text-red-700'
                }`}>
                  <div>
                    <div className="text-lg font-medium mb-2">Ошибка загрузки</div>
                    <div className="text-sm">{error}</div>
                  </div>
                </div>
              ) : shadowData ? (
                <div className="space-y-6">
                  {/* Заголовок с названием тени */}
                  <div className="text-center">
                    <h2 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-amber-900'
                    }`}>
                      {shadowData.title_ru}
                    </h2>
                    <p className={`text-sm transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white/70' : 'text-amber-900/70'
                    }`}>
                      {shadowData.title_en}
                    </p>
                  </div>

                  {/* Конфликт или ресурс */}
                  {shadowData.conflict_or_resource && (
                    <div>
                      <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-amber-900'
                      }`}>
                        Конфликт
                      </h3>
                      <div className={`p-4 rounded-lg border-l-4 border-red-500/50 transition-colors duration-300 ${
                        theme === 'dark' 
                          ? 'bg-red-500/10 border-red-500/20' 
                          : 'bg-red-50 border-red-200'
                      }`}>
                        <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                          theme === 'dark' ? 'text-white/90' : 'text-amber-900/90'
                        }`}>
                          {shadowData.conflict_or_resource}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Полное описание */}
                  {shadowData.desc_full && (
                    <div>
                      <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-amber-900'
                      }`}>
                        Описание
                      </h3>
                      <div className={`p-4 rounded-lg border-l-4 border-blue-500/50 transition-colors duration-300 ${
                        theme === 'dark' 
                          ? 'bg-blue-500/10 border-blue-500/20' 
                          : 'bg-blue-50 border-blue-200'
                      }`}>
                        <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                          theme === 'dark' ? 'text-white/90' : 'text-amber-900/90'
                        }`}>
                          {shadowData.desc_full}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Шлока на деванагари */}
                  {shadowData.shloka_dev && (
                    <div>
                      <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-amber-900'
                      }`}>
                        Шлока (деванагари)
                      </h3>
                      <div className={`p-4 rounded-lg border-l-4 border-purple-500/50 transition-colors duration-300 ${
                        theme === 'dark' 
                          ? 'bg-purple-500/10 border-purple-500/20' 
                          : 'bg-purple-50 border-purple-200'
                      }`}>
                        <p className={`text-lg leading-relaxed transition-colors duration-300 ${
                          theme === 'dark' ? 'text-white/90' : 'text-amber-900/90'
                        }`}>
                          {shadowData.shloka_dev}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Ссылка на шлоку */}
                  {shadowData.shloka_ref && (
                    <div>
                      <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-amber-900'
                      }`}>
                        Источник
                      </h3>
                      <div className={`p-4 rounded-lg border-l-4 border-green-500/50 transition-colors duration-300 ${
                        theme === 'dark' 
                          ? 'bg-green-500/10 border-green-500/20' 
                          : 'bg-green-50 border-green-200'
                      }`}>
                        <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                          theme === 'dark' ? 'text-white/90' : 'text-amber-900/90'
                        }`}>
                          {shadowData.shloka_ref}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Перевод шлоки */}
                  {shadowData.shloka_tr && (
                    <div>
                      <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-amber-900'
                      }`}>
                        Перевод
                      </h3>
                      <div className={`p-4 rounded-lg border-l-4 border-orange-500/50 transition-colors duration-300 ${
                        theme === 'dark' 
                          ? 'bg-orange-500/10 border-orange-500/20' 
                          : 'bg-orange-50 border-orange-200'
                      }`}>
                        <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                          theme === 'dark' ? 'text-white/90' : 'text-amber-900/90'
                        }`}>
                          {shadowData.shloka_tr}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Значение шлоки */}
                  {shadowData.shloka_meaning && (
                    <div>
                      <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-amber-900'
                      }`}>
                        Значение
                      </h3>
                      <div className={`p-4 rounded-lg border-l-4 border-indigo-500/50 transition-colors duration-300 ${
                        theme === 'dark' 
                          ? 'bg-indigo-500/10 border-indigo-500/20' 
                          : 'bg-indigo-50 border-indigo-200'
                      }`}>
                        <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                          theme === 'dark' ? 'text-white/90' : 'text-amber-900/90'
                        }`}>
                          {shadowData.shloka_meaning}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className={`flex items-center justify-center h-full text-center transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white/70' : 'text-amber-900/70'
                }`}>
                  <div>
                    <div className="text-lg font-medium mb-2">Данные тени не найдены</div>
                    <div className="text-sm">Попробуйте выбрать другую пару</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Кнопки и панель навигации */}
          <div className="mx-auto mt-0.5 w-[92%]">
            {/* Панель кнопок */}
            <BottomButtonPanel
              onBack={onBack}
              onContinue={onNext}
            />

            {/* Панель навигации */}
            <div className="mt-0.5">
              <NavigationPanel
                onAboutQuest={onAboutQuest}
                onGoDay1={onGoDay1}
                onOpenDeck={onOpenDeck}
                onOpenJournal={onOpenJournal}
              />
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
};
