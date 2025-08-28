import { useState, useEffect } from 'react';
import { IntroScreen } from './screens/IntroScreen';
import { RequestScreen } from './screens/RequestScreen';
import { Day1Screen } from './screens/Day1Screen';
import { Day2Screen } from './screens/Day2Screen';
import { ShadowScreen } from './screens/ShadowScreen';
import { CreatorScreen } from './screens/CreatorScreen';
import { QuestScreen } from './screens/QuestScreen';
import { FaqScreen } from './screens/FaqScreen';
import { DeckScreen } from './screens/DeckScreen';
import { JournalScreen } from './screens/JournalScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { RouteType } from './config/constants';
import { initTelegram } from './utils/telegram';

function App() {
  const [route, setRoute] = useState<RouteType>("intro");

  useEffect(() => {
    initTelegram();
  }, []);

  const renderScreen = () => {
    switch (route) {
      case "intro":
        return (
          <IntroScreen
            onStart={() => setRoute("request")}
            onAboutCreator={() => setRoute("creator")}
            onAboutQuest={() => setRoute("quest")}
            onOpenFaq={() => setRoute("faq")}
            onOpenSettings={() => setRoute("settings")}
          />
        );
      
      case "request":
        return (
          <RequestScreen
            onBack={() => setRoute("intro")}
            onAboutQuest={() => setRoute("quest")}
            onGoDay1={() => setRoute("day1")}
            onOpenDeck={() => setRoute("deck")}
            onOpenJournal={() => setRoute("journal")}
          />
        );

      case "day1":
        return (
          <Day1Screen
            onBackToRequest={() => setRoute("request")}
            onAccept={() => setRoute("day2")}
          />
        );

      case "day2":
        return (
          <Day2Screen
            onBack={() => setRoute("day1")}
            onNext={() => setRoute("shadow")}
            onOpenJournal={() => setRoute("journal")}
          />
        );

      case "shadow":
        return (
          <ShadowScreen
            onBackToDay1={() => setRoute("day1")}
            onContinue={() => setRoute("intro")}
          />
        );

      case "creator":
        return <CreatorScreen onBack={() => setRoute("intro")} />;

      case "quest":
        return <QuestScreen onBack={() => setRoute("intro")} />;

      case "faq":
        return <FaqScreen onBack={() => setRoute("intro")} />;

      case "deck":
        return <DeckScreen onBack={() => setRoute("request")} />;

      case "journal":
        return <JournalScreen onBack={() => setRoute("request")} />;

      case "settings":
        return <SettingsScreen onBack={() => setRoute("intro")} />;

      default:
        return (
          <div className="min-h-[100svh] bg-[#120a22] flex items-center justify-center">
            <div className="text-amber-50 text-center">
              <h1 className="text-2xl font-bold mb-4">Экран "{route}" в разработке</h1>
              <button 
                onClick={() => setRoute("intro")}
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
    <div className="min-h-[100svh] bg-[#120a22]">
      {renderScreen()}
    </div>
  );
}

export default App;
