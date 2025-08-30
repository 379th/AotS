export interface Translations {
  // Общие элементы
  common: {
    back: string;
    continue: string;
    next: string;
    save: string;
    update: string;
    previous: string;
    nextPage: string;
    page: string;
    of: string;
    cards: string;
    from: string;
    empty: string;
  };

  // Навигация
  navigation: {
    training: string;
    quest: string;
    deck: string;
    journal: string;
    exit: string;
  };

  // Главный экран
  intro: {
    aboutCreator: string;
    start: string;
    aboutQuest: string;
    faq: string;
    settings: string;
  };

  // Запрос
  request: {
    title: string;
    shadows: string;
    shadowsDescription: string;
    innerConflicts: string;
    innerConflictsDescription: string;
    yourRequest: string;
    requestPlaceholder: string;
  };

  // День 1
  day1: {
    title: string;
    acceptShadow: string;
  };

  // День 2
  day2: {
    echo: string;
    letters: string;
  };

  // День 3
  day3: {
    mirror: string;
    archetype: string;
    partnerTask: string;
    resource: string;
  };

  // День 4
  day4: {
    integration: string;
    temple: string;
  };

  // FAQ
  faq: {
    title: string;
    safetyNotice: string;
    safetyDescription: string;
    requestDescription: string;
    whatIsShadow: string;
    shadowDescription: string;
    shadowImportant: string;
    whatIsArchetype: string;
    archetypeDescription: string;
    archetypeExamples: string;
    archetypeImportant: string;
    whyMeetShadow: string;
    whyMeetShadowList: string[];
    whyDoQuest: string;
    whyDoQuestList: string[];
    whatYouGet: string;
    whatYouGetList: string[];
    whatArchetypeGives: string;
    whatArchetypeGivesList: string[];
    whatYouNeed: string;
    whatYouNeedList: string[];
    howItGoes: string;
    day1Title: string;
    day1Goal: string;
    day1Steps: string[];
    day2Title: string;
    day2Goal: string;
    day2Steps: string[];
    day3Title: string;
    day3Goal: string;
    day3Steps: string[];
    day4Title: string;
    day4Goal: string;
    day4Steps: string[];
    whyTimer: string;
    whyTimerList: string[];
    whoIsFor: string;
    whoIsForList: string[];
    commonQuestions: string;
    nothingFeel: string;
    nothingFeelAnswer: string;
    canRepeat: string;
    canRepeatAnswer: string;
    ifHard: string;
    ifHardAnswer: string;
    howMuchTime: string;
    howMuchTimeAnswer: string;
    recommendations: string;
    recommendationsText: string[];
    shareNotes: string;
    shareNotesAnswer: string;
    angryAtLoved: string;
    angryAtLovedAnswer: string;
    angryAtLovedSteps: string[];
    contraindications: string;
    contraindicationsText: string[];
    contraindicationsList: string[];
    contraindicationsWarning: string;
    helpContacts: string[];
    afterDay4: string;
    week1Title: string;
    week1List: string[];
    week2Title: string;
    week2List: string[];
  };

  // Создатель
  creator: {
    title: string;
    acknowledgments: string;
    acknowledgmentsList: string[];
  };

  // Напутствие
  guidance: {
    title: string;
    inscription: string;
    congratulations: string;
    lilaGame: string;
    joy: string;
  };

  // Колода
  deck: {
    title: string;
  };

  // Дневник
  journal: {
    title: string;
  };

  // Настройки
  settings: {
    title: string;
    language: string;
    russian: string;
    english: string;
  };

  // О квесте
  aboutQuest: {
    title: string;
    whatIsShadow: string;
    whatIsShadowDescription: string;
    whyDoQuest: string;
    whyDoQuestDescription: string;
    whatYouGet: string;
    whatYouGetList: string[];
    howItGoes: string;
    howItGoesList: string[];
    whoIsFor: string;
    whoIsForList: string[];
    whatYouNeed: string;
    whatYouNeedDescription: string;
    timeDescription: string;
  };
}
