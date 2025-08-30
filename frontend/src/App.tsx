import { useState, useEffect } from 'react';
import { IntroScreen } from './screens/IntroScreen';
import { RequestScreen } from './screens/RequestScreen';
import { Day1Screen } from './screens/Day1Screen';
import { ShadowImageScreen } from './screens/ShadowImageScreen';
import { Day1QuestionsScreen } from './screens/Day1QuestionsScreen';
import { Day2EchoScreen } from './screens/Day2EchoScreen';
import { Day2LettersScreen } from './screens/Day2LettersScreen';
import { Day3MirrorScreen } from './screens/Day3MirrorScreen';
import { ArchetypeScreen } from './screens/ArchetypeScreen';
import { Day3PartnerTaskScreen } from './screens/Day3PartnerTaskScreen';
import { Day3ResourceScreen } from './screens/Day3ResourceScreen';
import { Day4IntegrationScreen } from './screens/Day4IntegrationScreen';
import { Day4TempleScreen } from './screens/Day4TempleScreen';
import { CompletionScreen } from './screens/CompletionScreen';
import { GuidanceScreen } from './screens/GuidanceScreen';
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
            onAccept={() => setRoute("shadowImage")}
            onAboutQuest={() => setRoute("quest")}
            onGoDay1={() => setRoute("day1")}
            onOpenDeck={() => setRoute("deck")}
            onOpenJournal={() => setRoute("journal")}
          />
        );

      case "shadowImage":
        return (
          <ShadowImageScreen
            onBackToDay1={() => setRoute("day1")}
            onContinue={() => setRoute("day1Questions")}
            onAboutQuest={() => setRoute("quest")}
            onGoDay1={() => setRoute("day1")}
            onOpenDeck={() => setRoute("deck")}
            onOpenJournal={() => setRoute("journal")}
          />
        );

      case "day1Questions":
        return (
          <Day1QuestionsScreen
            onBack={() => setRoute("shadowImage")}
            onNext={() => setRoute("day2")}
            onAboutQuest={() => setRoute("quest")}
            onGoDay1={() => setRoute("day1")}
            onOpenDeck={() => setRoute("deck")}
            onOpenJournal={() => setRoute("journal")}
          />
        );

      case "day2":
        return (
          <Day2EchoScreen
            onBack={() => setRoute("day1")}
            onNext={() => setRoute("day2Letters")}
            onAboutQuest={() => setRoute("quest")}
            onGoDay1={() => setRoute("day1")}
            onOpenDeck={() => setRoute("deck")}
            onOpenJournal={() => setRoute("journal")}
          />
        );

      case "day2Letters":
        return (
          <Day2LettersScreen
            onBack={() => setRoute("day2")}
            onNext={() => setRoute("day3Mirror")}
            onAboutQuest={() => setRoute("quest")}
            onGoDay1={() => setRoute("day1")}
            onOpenDeck={() => setRoute("deck")}
            onOpenJournal={() => setRoute("journal")}
          />
        );

      case "day3Mirror":
        return (
          <Day3MirrorScreen
            onBack={() => setRoute("day2Letters")}
            onNext={() => setRoute("archetype")}
            onAboutQuest={() => setRoute("quest")}
            onGoDay1={() => setRoute("day1")}
            onOpenDeck={() => setRoute("deck")}
            onOpenJournal={() => setRoute("journal")}
          />
        );

      case "archetype":
        return (
          <ArchetypeScreen
            onBack={() => setRoute("day3Mirror")}
            onNext={() => setRoute("day3Resource")}
            onAboutQuest={() => setRoute("quest")}
            onGoDay1={() => setRoute("day1")}
            onOpenDeck={() => setRoute("deck")}
            onOpenJournal={() => setRoute("journal")}
          />
        );

      case "day3Resource":
        return (
          <Day3ResourceScreen
            onBack={() => setRoute("archetype")}
            onNext={() => setRoute("day3PartnerTask")}
            onAboutQuest={() => setRoute("quest")}
            onGoDay1={() => setRoute("day1")}
            onOpenDeck={() => setRoute("deck")}
            onOpenJournal={() => setRoute("journal")}
          />
        );

      case "day3PartnerTask":
        return (
          <Day3PartnerTaskScreen
            onBack={() => setRoute("day3Resource")}
            onNext={() => setRoute("day4Temple")}
            onAboutQuest={() => setRoute("quest")}
            onGoDay1={() => setRoute("day1")}
            onOpenDeck={() => setRoute("deck")}
            onOpenJournal={() => setRoute("journal")}
          />
        );

      case "day4Temple":
        return (
          <Day4TempleScreen
            onBack={() => setRoute("day3PartnerTask")}
            onNext={() => setRoute("day4Integration")}
            onAboutQuest={() => setRoute("quest")}
            onGoDay1={() => setRoute("day1")}
            onOpenDeck={() => setRoute("deck")}
            onOpenJournal={() => setRoute("journal")}
          />
        );

      case "day4Integration":
        return (
          <Day4IntegrationScreen
            onBack={() => setRoute("day4Temple")}
            onNext={() => setRoute("completion")}
            onAboutQuest={() => setRoute("quest")}
            onGoDay1={() => setRoute("day1")}
            onOpenDeck={() => setRoute("deck")}
            onOpenJournal={() => setRoute("journal")}
          />
        );

      case "completion":
        return (
          <CompletionScreen
            onNext={() => setRoute("guidance")}
          />
        );

      case "guidance":
        return (
          <GuidanceScreen onBackToHome={() => setRoute("intro")} />
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
        return (
          <DeckScreen 
            onBack={() => setRoute("request")}
            onAboutQuest={() => setRoute("quest")}
            onGoDay1={() => setRoute("day1")}
            onOpenDeck={() => setRoute("deck")}
            onOpenJournal={() => setRoute("journal")}
          />
        );

      case "journal":
        return (
          <JournalScreen 
            onBack={() => setRoute("request")}
            onAboutQuest={() => setRoute("quest")}
            onGoDay1={() => setRoute("day1")}
            onOpenDeck={() => setRoute("deck")}
            onOpenJournal={() => setRoute("journal")}
          />
        );

      case "settings":
        return <SettingsScreen onBack={() => setRoute("intro")} />;

      default:
        return (
          <div className="min-h-[100svh] flex items-center justify-center">
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
    <div className="min-h-[100svh]">
      {renderScreen()}
    </div>
  );
}

export default App;
