import { useState, useEffect } from 'react';
import { useShadowArchetypePair } from './hooks/useShadowArchetypePair';
import { RouteType } from './config/constants';
import { initTelegram } from './utils/telegram';
import { TimerApi } from './services/timerApi';
import { UserApi } from './services/userApi';
import { IntroScreen } from './screens/IntroScreen';
import { RequestScreen } from './screens/RequestScreen';
import { Day1Screen } from './screens/Day1Screen';
import { ShadowImageScreen } from './screens/ShadowImageScreen';
import { ShadowDetailsScreen } from './screens/ShadowDetailsScreen';
import { Day1QuestionsScreen } from './screens/Day1QuestionsScreen';
import { Day2EchoScreen } from './screens/Day2EchoScreen';
import { Day2Screen } from './screens/Day2Screen';
import { Day2LettersScreen } from './screens/Day2LettersScreen';
import { Day3MirrorScreen } from './screens/Day3MirrorScreen';
import { ArchetypeScreen } from './screens/ArchetypeScreen';
import { Day3PartnerTaskScreen } from './screens/Day3PartnerTaskScreen';
import { Day3ResourceScreen } from './screens/Day3ResourceScreen';
import { Day4IntegrationScreen } from './screens/Day4IntegrationScreen';
import { Day4TempleScreen } from './screens/Day4TempleScreen';
import { CompletionScreen } from './screens/CompletionScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { GuidanceScreen } from './screens/GuidanceScreen';
import { CreatorScreen } from './screens/CreatorScreen';
import { QuestScreen } from './screens/QuestScreen';
import { FaqScreen } from './screens/FaqScreen';
import { DeckScreen } from './screens/DeckScreen';
import { JournalScreen } from './screens/JournalScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { TimerScreen } from './screens/TimerScreen';

function App() {
  const [route, setRoute] = useState<RouteType>("intro");
  const [previousRoute, setPreviousRoute] = useState<RouteType>("intro");
  const { resetPair } = useShadowArchetypePair();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Инициализация Telegram
        await initTelegram();
        
        // Создаем или обновляем пользователя на сервере
        const user = await UserApi.createOrUpdateUser();
        
        if (user) {
          console.log('Пользователь создан/обновлен:', user);
          
          // Восстанавливаем прогресс пользователя
          if (user.currentStep && user.currentStep !== 'intro') {
            setRoute(user.currentStep as RouteType);
            console.log('Восстановлен прогресс пользователя:', user.currentStep);
          }
        }
        
        console.log('Приложение инициализировано успешно');
      } catch (error) {
        console.error('Ошибка инициализации приложения:', error);
      }
    };

    initializeApp();
  }, []);

  const navigateTo = async (newRoute: RouteType) => {
    setPreviousRoute(route);
    setRoute(newRoute);
    
    // Сохраняем текущий шаг в базе данных
    try {
      await UserApi.saveCurrentStep(newRoute);
    } catch (error) {
      console.error('Ошибка сохранения шага:', error);
    }
  };

  const goBack = () => {
    setRoute(previousRoute);
  };

  // Функция для запуска таймера и перехода к следующему дню
  const startTimerAndContinue = async (dayNumber: number, nextRoute: RouteType) => {
    // Проверяем, есть ли уже запущенный таймер
    const timerKey = `timer_start_day_${dayNumber}`;
    const existingStartTime = localStorage.getItem(timerKey);
    
    if (!existingStartTime) {
      // Запускаем таймер только если его еще нет
      const now = Date.now();
      localStorage.setItem(timerKey, now.toString());
      console.log(`Запуск нового таймера для дня ${dayNumber}:`, new Date(now).toLocaleTimeString());
      
      // Сохраняем на сервер
      try {
        await TimerApi.saveTimer(dayNumber, now);
        console.log(`Таймер для дня ${dayNumber} сохранен на сервер`);
      } catch (error) {
        console.error('Ошибка сохранения таймера на сервер:', error);
      }
    } else {
      console.log(`Таймер для дня ${dayNumber} уже запущен:`, new Date(parseInt(existingStartTime)).toLocaleTimeString());
    }
    
    // Сохраняем текущий день в базе данных
    try {
      await UserApi.saveCurrentDay(dayNumber);
      console.log(`День ${dayNumber} сохранен в базе данных`);
    } catch (error) {
      console.error('Ошибка сохранения дня:', error);
    }
    
    // Переходим к следующему экрану
    await navigateTo(nextRoute);
  };

  const renderScreen = () => {
    switch (route) {
              case "intro":
          return (
            <IntroScreen
              onStart={async () => {
                // Сохраняем начало квеста в базе данных
                try {
                  await UserApi.saveCurrentStep("request");
                  console.log('Начало квеста сохранено в базе данных');
                } catch (error) {
                  console.error('Ошибка сохранения начала квеста:', error);
                }
                await navigateTo("request");
              }}
              onAboutCreator={() => navigateTo("creator")}
              onAboutQuest={() => navigateTo("quest")}
              onOpenFaq={() => navigateTo("faq")}
              onOpenSettings={() => navigateTo("settings")}
            />
          );
      
              case "request":
          return (
            <RequestScreen
              onBack={() => navigateTo("intro")}
              onNext={() => navigateTo("day1")}
              onAboutQuest={() => navigateTo("quest")}
              onGoDay1={() => navigateTo("day1")}
              onOpenDeck={() => navigateTo("deck")}
              onOpenJournal={() => navigateTo("journal")}
            />
          );

              case "day1":
          return (
            <Day1Screen
              onBackToRequest={() => navigateTo("request")}
              onAccept={() => startTimerAndContinue(1, "shadowImage")}
              onAboutQuest={() => navigateTo("quest")}
              onGoDay1={() => navigateTo("day1")}
              onOpenDeck={() => navigateTo("deck")}
              onOpenJournal={() => navigateTo("journal")}
            />
          );

        case "shadowImage":
          return (
            <ShadowImageScreen
              onBackToDay1={() => navigateTo("day1")}
              onContinue={() => navigateTo("shadowDetails")}
              onAboutQuest={() => navigateTo("quest")}
              onGoDay1={() => navigateTo("day1")}
              onOpenDeck={() => navigateTo("deck")}
              onOpenJournal={() => navigateTo("journal")}
            />
          );

        case "shadowDetails":
          return (
            <ShadowDetailsScreen
              onBack={() => navigateTo("shadowImage")}
              onNext={() => navigateTo("day1Questions")}
              onAboutQuest={() => navigateTo("quest")}
              onGoDay1={() => navigateTo("day1")}
              onOpenDeck={() => navigateTo("deck")}
              onOpenJournal={() => navigateTo("journal")}
            />
          );

        case "day1Questions":
          return (
            <Day1QuestionsScreen
              onBack={() => navigateTo("shadowDetails")}
              onNext={() => navigateTo("timer1")}
              onAboutQuest={() => navigateTo("quest")}
              onGoDay1={() => navigateTo("day1")}
              onOpenDeck={() => navigateTo("deck")}
              onOpenJournal={() => navigateTo("journal")}
            />
          );

        case "timer1":
          return (
            <TimerScreen
              onBack={() => navigateTo("day1Questions")}
              onContinue={() => navigateTo("day2")}
              dayNumber={1}
              dayTitle="День 1 - Призыв Тени"
            />
          );

        case "day2":
          return (
            <Day2EchoScreen
              onBack={() => navigateTo("timer1")}
              onNext={() => navigateTo("day2Screen")}
              onAboutQuest={() => navigateTo("quest")}
              onGoDay1={() => navigateTo("day1")}
              onOpenDeck={() => navigateTo("deck")}
              onOpenJournal={() => navigateTo("journal")}
            />
          );

        case "day2Screen":
          return (
            <Day2Screen
              onBack={() => navigateTo("day2")}
              onNext={() => startTimerAndContinue(2, "day2Letters")}
              onAboutQuest={() => navigateTo("quest")}
              onGoDay1={() => navigateTo("day1")}
              onOpenDeck={() => navigateTo("deck")}
              onOpenJournal={() => navigateTo("journal")}
            />
          );

              case "day2Letters":
          return (
            <Day2LettersScreen
              onBack={() => navigateTo("day2Screen")}
              onNext={() => navigateTo("timer2")}
              onAboutQuest={() => navigateTo("quest")}
              onGoDay1={() => navigateTo("day1")}
              onOpenDeck={() => navigateTo("deck")}
              onOpenJournal={() => navigateTo("journal")}
            />
          );

      case "timer2":
        return (
          <TimerScreen
            onBack={() => navigateTo("day2Letters")}
            onContinue={() => navigateTo("day3Mirror")}
            dayNumber={2}
            dayTitle="День 2 - Пещера Эха"
          />
        );

      case "day3Mirror":
        return (
          <Day3MirrorScreen
            onBack={() => navigateTo("timer2")}
            onNext={() => startTimerAndContinue(3, "archetype")}
            onAboutQuest={() => navigateTo("quest")}
            onGoDay1={() => navigateTo("day1")}
            onOpenDeck={() => navigateTo("deck")}
            onOpenJournal={() => navigateTo("journal")}
          />
        );

      case "archetype":
        return (
          <ArchetypeScreen
            onBack={() => navigateTo("day3Mirror")}
            onNext={() => navigateTo("day3Resource")}
            onAboutQuest={() => navigateTo("quest")}
            onGoDay1={() => navigateTo("day1")}
            onOpenDeck={() => navigateTo("deck")}
            onOpenJournal={() => navigateTo("journal")}
          />
        );

      case "day3Resource":
        return (
          <Day3ResourceScreen
            onBack={() => navigateTo("archetype")}
            onNext={() => navigateTo("day3PartnerTask")}
            onAboutQuest={() => navigateTo("quest")}
            onGoDay1={() => navigateTo("day1")}
            onOpenDeck={() => navigateTo("deck")}
            onOpenJournal={() => navigateTo("journal")}
          />
        );

              case "day3PartnerTask":
          return (
            <Day3PartnerTaskScreen
              onBack={() => navigateTo("day3Resource")}
              onNext={() => navigateTo("timer3")}
              onAboutQuest={() => navigateTo("quest")}
              onGoDay1={() => navigateTo("day1")}
              onOpenDeck={() => navigateTo("deck")}
              onOpenJournal={() => navigateTo("journal")}
            />
          );

      case "timer3":
        return (
          <TimerScreen
            onBack={() => navigateTo("day3PartnerTask")}
            onContinue={() => navigateTo("day4Temple")}
            dayNumber={3}
            dayTitle="День 3 - Зеркало Перехода"
          />
        );

      case "day4Temple":
        return (
          <Day4TempleScreen
            onBack={() => navigateTo("timer3")}
            onNext={() => navigateTo("day4Integration")}
            onAboutQuest={() => navigateTo("quest")}
            onGoDay1={() => navigateTo("day1")}
            onOpenDeck={() => navigateTo("deck")}
            onOpenJournal={() => navigateTo("journal")}
          />
        );

              case "day4Integration":
          return (
            <Day4IntegrationScreen
              onBack={() => navigateTo("day4Temple")}
              onNext={() => navigateTo("completion")}
              onAboutQuest={() => navigateTo("quest")}
              onGoDay1={() => navigateTo("day1")}
              onOpenDeck={() => navigateTo("deck")}
              onOpenJournal={() => navigateTo("journal")}
            />
          );

        case "completion":
          return (
            <CompletionScreen
              onNext={() => navigateTo("guidance")}
              onOpenProgress={() => navigateTo("progress")}
              onOpenJournal={() => navigateTo("journal")}
            />
          );

        case "progress":
          return (
            <ProgressScreen
              onBack={() => navigateTo("completion")}
              onNavigateToDay={(day: string) => navigateTo(day as RouteType)}
            />
          );

        case "guidance":
          return (
            <GuidanceScreen onBackToHome={() => {
              resetPair(); // Сбрасываем пару при возврате на главный
              navigateTo("intro");
            }} />
          );



        case "creator":
          return <CreatorScreen onBack={() => navigateTo("intro")} />;

        case "quest":
          return <QuestScreen onBack={goBack} />;

        case "faq":
          return <FaqScreen onBack={() => navigateTo("intro")} />;

        case "deck":
          return (
            <DeckScreen 
              onBack={goBack}
              onAboutQuest={() => navigateTo("quest")}
              onGoDay1={() => navigateTo("day1")}
              onOpenDeck={() => navigateTo("deck")}
              onOpenJournal={() => navigateTo("journal")}
            />
          );

        case "journal":
          return (
            <JournalScreen 
              onBack={goBack}
              onAboutQuest={() => navigateTo("quest")}
              onGoDay1={() => navigateTo("day1")}
              onOpenDeck={() => navigateTo("deck")}
              onOpenJournal={() => navigateTo("journal")}
            />
          );

        case "settings":
          return <SettingsScreen onBack={() => navigateTo("intro")} />;

        default:
          return (
            <div className="min-h-[100svh] flex items-center justify-center">
              <div className="text-amber-50 text-center">
                <h1 className="text-2xl font-bold mb-4">Экран &quot;{route}&quot; в разработке</h1>
                <button 
                  onClick={() => navigateTo("intro")}
                  className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
                >
                  Вернуться на главную
                </button>
              </div>
            </div>
          );
    }
  };

  return (
    <div
      className="min-h-[100svh] w-full relative"
      style={{
        backgroundImage: 'url(/Sorce/background/Background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-[1280px] mx-auto">
        {renderScreen()}
      </div>
    </div>
  );
}

export default App;
