<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shadow Quest - Полное превью</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://unpkg.com/lucide-react@0.344.0/dist/umd/lucide-react.js"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: #120a22;
        }
        #root {
            min-height: 100vh;
        }

        /* Дополнительные стили для мобильной версии */
        @media (max-width: 768px) {
            body {
                font-size: 14px;
            }
        }

        /* Анимации для переходов */
        .fade-in {
            animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Стили для скроллбаров */
        ::-webkit-scrollbar {
            width: 6px;
        }

        ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
            background: rgba(216, 186, 144, 0.6);
            border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: rgba(216, 186, 144, 0.8);
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        // Импорт иконок из Lucide React
        const { ArrowLeft, Send, LogOut, Layers, NotebookPen, Swords, BookOpen } = LucideReact;

        // ================= Runtime configuration =================

        const DEFAULT_IMAGES = {
          INTRO_IMAGE_URL: "",
          PANEL_IMAGE_URL: "",
          DAY1_FOREST_URL: "",
          DAY1_SHADOW_URL: "",
          DAY2_CAVE_URL: "",
          DAY3_MIRROR_URL: "",
          DAY3_ARCH_URL: "",
          DAY4_TEMPLE_URL: "",
        };

        const DEFAULT_GRATITUDE = [
          "Выражаю признательность всем и всему за любовь, веру, поддержку!",
          "Благодарю Бога за возможность чувствовать Радость, видеть красоту, жить творчески.",
          "Благодарю Маму за рождение и вложенные время и силы в моё развитие.",
          "Благодарю Леру за сопровождение на пути к зрелой, ответственной позиции.",
          "Благодарю Янику за поддержку и советы.",
          "Поклон и благодарность Bhagavad Gita за мудрость.",
          "Благодарю Карла Густава Юнга за науку, за язык архетипов — инструмент диалога с бессознательным.",
          "Благодарю Стефана Волински — его подход помогает бережно встречаться с тенью внутреннего ребёнка и возвращать силу наблюдателя.",
          "Благодарю Чака Спеццано за МАК‑колоду «Архетипы и Тени» и ясный путь работы с тенью.",
          "Благодарю Гудакешу за вдохновение: напоминание о победе над «сном» дало мощный творческий импульс.",
          "Благодарю ChatGPT за соавторство и поддержку на каждом шаге.",
          "Благодарю себя за завершённое дело.",
        ];

        const DEFAULT_DAYS = {
          1: { title: "День 1 — Призыв Тени" },
          2: { title: "День 2 — Пещера Эха" },
          3: { title: "День 3 — Зеркало Перехода" },
          4: { title: "День 4 — Храм Целостности" },
        };

        // Runtime overrides
        const EXT_CONTENT = (typeof window !== "undefined" && window.__SQ_CONTENT) || {};
        const IMAGES = { ...DEFAULT_IMAGES, ...(EXT_CONTENT.IMAGES || {}) };
        const GRATITUDE = Array.isArray(EXT_CONTENT.GRATITUDE) ? EXT_CONTENT.GRATITUDE : DEFAULT_GRATITUDE;
        const DAYS = EXT_CONTENT.DAYS ? { ...DEFAULT_DAYS, ...EXT_CONTENT.DAYS } : DEFAULT_DAYS;

        const EXT_FLAGS = (typeof window !== "undefined" && window.__SQ_FLAGS) || {};
        const ENABLE_SENDDATA = EXT_FLAGS.ENABLE_SENDDATA || false;
        const ALLOWED_SENDDATA_ACTIONS = EXT_FLAGS.ALLOWED_SENDDATA_ACTIONS || ["share_consent"];

        function sendIfAllowed(action, extra = {}) {
          if (!ENABLE_SENDDATA) return;
          if (!ALLOWED_SENDDATA_ACTIONS.includes(action)) return;
          try { window?.Telegram?.WebApp?.sendData?.(JSON.stringify({ action, ...extra })); } catch {}
        }

        // ================= Visual frame & helpers =================

        function Frame() {
          return (
            React.createElement('svg', {
              className: 'pointer-events-none absolute inset-0 -z-10 h-full w-full',
              viewBox: '0 0 100 200',
              preserveAspectRatio: 'none'
            }, [
              React.createElement('rect', { key: 'rect1', x: '2', y: '2', width: '96', height: '196', rx: '3', fill: 'none', stroke: '#936b5b', strokeWidth: '1.2' }),
              React.createElement('rect', { key: 'rect2', x: '4', y: '4', width: '92', height: '192', rx: '2.5', fill: 'none', stroke: '#c79b5e', strokeWidth: '0.6' }),
              React.createElement('path', { key: 'path1', d: 'M7 10 C 7 30, 17 26, 17 40 C 17 60, 7 56, 7 78 C 7 96, 17 92, 17 112 C 17 134, 7 130, 7 154 C 7 172, 14 178, 14 188', stroke: '#5b816e', strokeWidth: '.6', fill: 'none' }),
              React.createElement('path', { key: 'path2', d: 'M93 10 C 93 30, 83 26, 83 40 C 83 60, 93 56, 93 78 C 93 96, 83 92, 83 112 C 83 134, 93 130, 93 154 C 93 172, 86 178, 86 188', stroke: '#5b816e', strokeWidth: '.6', fill: 'none' })
            ])
          );
        }

        function Kintsugi() {
          return (
            React.createElement('svg', {
              className: 'pointer-events-none absolute inset-0 -z-9 h-full w-full opacity-70',
              viewBox: '0 0 100 200',
              preserveAspectRatio: 'none'
            }, [
              React.createElement('g', { key: 'g', stroke: '#D6B55B', strokeWidth: '0.3', strokeLinecap: 'round', strokeLinejoin: 'round' }, [
                React.createElement('path', { key: 'path1', d: 'M10 152 C 18 138, 28 134, 36 118 S 55 94, 66 86 84 68, 90 60', fill: 'none' }),
                React.createElement('path', { key: 'path2', d: 'M20 22 C 32 30, 40 42, 48 54 S 62 78, 72 86', fill: 'none' }),
                React.createElement('path', { key: 'path3', d: 'M12 106 C 20 104, 28 110, 34 118 S 46 134, 54 142', fill: 'none' })
              ])
            ])
          );
        }

        const GothicFont = () => (
          React.createElement('style', {}, `
            @import url('https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap');
            .font-gothic { font-family: 'UnifrakturMaguntia', system-ui, ui-serif, Georgia, serif; }
          `)
        );

        function TitleBar({ text = "ПРИНЯТИЕ ТЕНИ" }) {
          return (
            React.createElement('div', {
              className: 'mx-auto mt-3 w-[92%] rounded-xl border border-amber-900/40 bg-[linear-gradient(180deg,rgba(216,186,144,.95),rgba(186,152,109,.95))] p-3 text-center shadow-[inset_0_2px_0_rgba(255,255,255,.35),0_10px_40px_rgba(0,0,0,.35)]'
            }, [
              React.createElement('h1', {
                key: 'title',
                className: 'select-none font-gothic text-[28px] tracking-[.06em] text-amber-900 drop-shadow'
              }, text)
            ])
          );
        }

        function ScreenFrame({ children }) {
          return (
            React.createElement('div', {
              className: 'relative mx-auto min-h-[100svh] w-full max-w-[520px] overflow-hidden bg-[radial-gradient(circle_at_20%_10%,#3C2A6A_0%,#2C1B4C_35%,#1B1030_70%)] text-amber-50 flex flex-col',
              style: { paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }
            }, [
              React.createElement(GothicFont, { key: 'font' }),
              React.createElement('div', {
                key: 'bg',
                className: 'pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_70%_20%,rgba(169,139,225,.18),transparent_55%),radial-gradient(circle_at_30%_70%,rgba(169,139,225,.12),transparent_45%),repeating-linear-gradient(90deg,rgba(255,255,255,.035),rgba(255,255,255,.035)_1px,transparent_1px,transparent_2px)]'
              }),
              React.createElement(Frame, { key: 'frame' }),
              React.createElement(Kintsugi, { key: 'kintsugi' }),
              children
            ])
          );
        }

        function Pill({ children, onClick }) {
          return (
            React.createElement('button', {
              onClick: onClick,
              className: 'rounded-full border border-amber-900/40 bg-white/60 px-3 py-1.5 text-amber-900 hover:bg-white/80 active:translate-y-[1px] transition-all duration-200'
            }, children)
          );
        }

        function RoundButton({ label, icon: Icon, onClick, tone = "stone" }) {
          const toneMap = {
            amber: "from-amber-900/80 to-amber-700/80 ring-amber-800/70",
            sky: "from-sky-900/80 to-sky-700/80 ring-sky-800/70",
            teal: "from-teal-900/80 to-teal-700/80 ring-teal-800/70",
            slate: "from-slate-900/80 to-slate-700/80 ring-slate-800/70",
            stone: "from-stone-900/80 to-stone-700/80 ring-stone-800/70",
            rose: "from-rose-900/80 to-rose-700/80 ring-rose-800/70",
          };
          return (
            React.createElement('button', {
              onClick: onClick,
              className: `group relative flex h-16 w-16 md:h-20 md:w-20 flex-col items-center justify-center rounded-full bg-gradient-to-b ${toneMap[tone]} ring-2 text-amber-100 shadow-[0_8px_30px_rgba(0,0,0,.35)] transition-transform active:scale-95 hover:scale-105`
            }, [
              React.createElement('div', {
                key: 'bg',
                className: 'absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.18),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(0,0,0,.35),transparent_45%)]'
              }),
              React.createElement(Icon, { key: 'icon', className: 'relative z-[1] mb-1 h-5 w-5' }),
              React.createElement('span', {
                key: 'label',
                className: 'relative z-[1] text-[10px] tracking-wide md:text-[11px] font-medium'
              }, label)
            ])
          );
        }

        // ================= Screens =================

        function StartScreen({ onBack, onForward, onAboutQuest, onOpenDeck, onOpenJournal }) {
          const [intent, setIntent] = React.useState(() => {
            try { return localStorage.getItem("sq.player.intent") || ""; } catch { return ""; }
          });
          React.useEffect(() => { try { localStorage.setItem("sq.player.intent", intent); } catch {} }, [intent]);
          React.useEffect(() => { try { const tg = window?.Telegram?.WebApp; tg?.ready?.(); tg?.expand?.(); tg?.setHeaderColor?.("secondary_bg_color"); tg?.setBackgroundColor?.("#1B1030"); } catch {} }, []);

          return (
            React.createElement(ScreenFrame, {}, [
              React.createElement(TitleBar, { key: 'title', text: 'Запрос' }),
              React.createElement('div', {
                key: 'content',
                className: 'mx-auto mt-3 w-[92%] flex-1 rounded-2xl border border-teal-700/30 bg-[linear-gradient(180deg,rgba(17,21,35,.90),rgba(18,22,38,.90))] p-4 text-left text-amber-50 shadow-[0_6px_28px_rgba(0,0,0,.35)]',
                style: { marginBottom: 'calc(env(safe-area-inset-bottom) + 360px)' }
              }, [
                React.createElement('h2', { key: 'h2', className: 'text-2xl font-extrabold tracking-tight' }, 'Тени'),
                React.createElement('p', {
                  key: 'p1',
                  className: 'mt-2 text-[15px] leading-relaxed opacity-95'
                }, 'Представляют собой непризнанные импульсы и желания, которые, подавляешь из опасения быть осуждённой(ым) или непринятой(ым).'),
                React.createElement('h3', { key: 'h3', className: 'mt-5 text-xl font-bold' }, 'Внутренние конфликты'),
                React.createElement('p', {
                  key: 'p2',
                  className: 'mt-2 text-[15px] leading-relaxed opacity-95'
                }, 'Непринятие себя такой(им), какая(ой) есть на самом деле, приводит к внутренним конфликтам, которые могут проявляться в негативных чувствах и поведении.')
              ]),
              React.createElement('div', {
                key: 'input-container',
                className: 'absolute inset-x-0',
                style: { bottom: 'calc(env(safe-area-inset-bottom) + 220px)' }
              }, [
                React.createElement('div', {
                  key: 'input',
                  className: 'mx-auto w-[92%] rounded-2xl border border-amber-900/40 bg-[linear-gradient(180deg,rgba(233,213,184,.96),rgba(215,189,150,.98))] p-4 text-amber-900 shadow-[0_6px_28px_rgba(0,0,0,.35)]'
                }, [
                  React.createElement('label', {
                    key: 'label',
                    className: 'mb-1 block text-xs opacity-80'
                  }, 'Запрос'),
                  React.createElement('input', {
                    key: 'input-field',
                    value: intent,
                    onChange: (e) => setIntent(e.target.value.slice(0, 120)),
                    placeholder: 'Одна короткая фраза',
                    className: 'w-full rounded-lg border border-amber-900/30 bg-white/70 px-3 py-2 text-sm placeholder:text-amber-900/50 focus:outline-none focus:ring-2 focus:ring-amber-700/40'
                  })
                ])
              ]),
              React.createElement('div', {
                key: 'buttons',
                className: 'absolute inset-x-0 z-40',
                style: { bottom: 'calc(env(safe-area-inset-bottom) + 160px)' }
              }, [
                React.createElement('div', {
                  key: 'button-group',
                  className: 'mx-auto w-[92%] flex items-center justify-between gap-2'
                }, [
                  React.createElement('button', {
                    key: 'back',
                    onClick: onBack,
                    className: 'inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-white/70 px-3 py-2 text-amber-900 backdrop-blur-sm active:translate-y-[1px]'
                  }, [
                    React.createElement(ArrowLeft, { key: 'icon', className: 'h-4 w-4' }),
                    'Назад'
                  ]),
                  React.createElement('button', {
                    key: 'continue',
                    onClick: onForward,
                    className: 'inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-[linear-gradient(180deg,rgba(221,196,158,.94),rgba(199,167,127,.96))] px-3 py-2 font-semibold text-amber-900 shadow-[0_6px_20px_rgba(0,0,0,.25)] active:translate-y-[1px]'
                  }, 'Продолжить')
                ])
              ]),
              React.createElement('nav', {
                key: 'nav',
                className: 'fixed inset-x-0 bottom-0 z-50 flex items-center justify-center',
                style: { paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)' }
              }, [
                React.createElement('div', { key: 'nav-container', className: 'mx-auto mb-2 w-full max-w-[520px]' }, [
                  React.createElement('div', {
                    key: 'nav-bg',
                    className: 'mx-3 rounded-2xl border border-amber-900/40 bg-[linear-gradient(180deg,rgba(221,196,158,.94),rgba(199,167,127,.96))] p-3 shadow-[0_-8px_30px_rgba(0,0,0,.35)]'
                  }, [
                    React.createElement('div', { key: 'nav-buttons', className: 'flex items-center justify-between' }, [
                      React.createElement(RoundButton, { key: 'about', label: 'Обучение', icon: BookOpen, tone: 'amber', onClick: onAboutQuest }),
                      React.createElement(RoundButton, { key: 'quest', label: 'Квест', icon: Swords, tone: 'teal', onClick: onForward }),
                      React.createElement(RoundButton, { key: 'deck', label: 'Колода', icon: Layers, tone: 'sky', onClick: onOpenDeck }),
                      React.createElement(RoundButton, { key: 'journal', label: 'Дневник', icon: NotebookPen, tone: 'slate', onClick: onOpenJournal }),
                      React.createElement(RoundButton, { key: 'exit', label: 'Выход', icon: LogOut, tone: 'rose', onClick: () => { try { window?.Telegram?.WebApp?.close?.(); } catch {} } })
                    ])
                  ])
                ])
              ]),
              React.createElement('div', { key: 'spacer', className: 'h-36' })
            ])
          );
        }

        function DeckScreen({ onBack }) {
          const [slots] = React.useState(() => {
            try {
              const raw = localStorage.getItem('sq.deck.slots');
              if (!raw) return Array(9).fill('');
              const arr = JSON.parse(raw);
              return Array.isArray(arr) ? arr.slice(0,9).concat(Array(Math.max(0,9-arr.length)).fill('')) : Array(9).fill('');
            } catch { return Array(9).fill(''); }
          });

          return (
            React.createElement(ScreenFrame, {}, [
              React.createElement(TitleBar, { key: 'title', text: 'Колода' }),
              React.createElement('div', {
                key: 'content',
                className: 'mx-auto mt-3 w-[92%] flex-1 rounded-2xl border border-amber-900/40 bg-[linear-gradient(180deg,rgba(233,213,184,.96),rgba(215,189,150,.98))] p-4 text-amber-900'
              }, [
                React.createElement('div', { key: 'grid', className: 'grid grid-cols-3 gap-3' }, [
                  ...slots.map((val, i) => (
                    React.createElement('div', {
                      key: i,
                      className: 'aspect-square rounded-xl border border-amber-900/30 bg-white/80 flex items-center justify-center text-sm p-2'
                    }, val ? React.createElement('span', {}, `Карты: ${val}`) : React.createElement('span', { className: 'opacity-60' }, 'Пусто'))
                  )),
                  React.createElement('p', {
                    key: 'desc',
                    className: 'col-span-3 mt-3 text-xs opacity-80 text-center'
                  }, 'Всего карт будет 126. Здесь будут появляться открытые карты по номерам.')
                ])
              ]),
              React.createElement('div', {
                key: 'back-btn',
                className: 'mx-auto mt-2 w-[92%] text-right'
              }, [
                React.createElement(Pill, {
                  key: 'pill',
                  onClick: onBack
                }, [
                  React.createElement('span', { key: 'span', className: 'inline-flex items-center gap-2' }, [
                    React.createElement(ArrowLeft, { key: 'icon', className: 'h-4 w-4' }),
                    'Назад'
                  ])
                ])
              ])
            ])
          );
        }

        function JournalScreen({ onBack }) {
          const [notes, setNotes] = React.useState(() => { try { return localStorage.getItem("sq.journal.notes") || ""; } catch { return ""; } });
          const [diary, setDiary] = React.useState(() => { try { return localStorage.getItem("sq.journal.diary") || ""; } catch { return ""; } });
          React.useEffect(() => { try { localStorage.setItem("sq.journal.notes", notes); } catch {} }, [notes]);
          React.useEffect(() => { try { localStorage.setItem("sq.journal.diary", diary); } catch {} }, [diary]);

          return (
            React.createElement(ScreenFrame, {}, [
              React.createElement(TitleBar, { key: 'title', text: 'Дневник' }),
              React.createElement('div', {
                key: 'content',
                className: 'mx-auto mt-2 w-[92%] overflow-hidden h-[60svh] flex flex-col min-h-0 rounded-2xl border border-amber-900/40 bg-[linear-gradient(180deg,rgba(233,213,184,.96),rgba(215,189,150,.98))] p-4 text-amber-900'
              }, [
                React.createElement('div', {
                  key: 'notes-container',
                  className: 'flex-1 min-h-0 w-full overflow-auto space-y-4'
                }, [
                  React.createElement('div', {
                    key: 'notes',
                    className: 'rounded-xl border border-amber-900/30 bg-white/80 p-3'
                  }, [
                    React.createElement('label', {
                      key: 'notes-label',
                      className: 'mb-1 block text-xs opacity-80'
                    }, 'Заметки'),
                    React.createElement('textarea', {
                      key: 'notes-textarea',
                      value: notes,
                      onChange: (e)=>setNotes(e.target.value),
                      rows: 6,
                      className: 'w-full rounded-lg border border-amber-900/30 bg-white/95 p-3 text-sm resize-none'
                    })
                  ]),
                  React.createElement('div', {
                    key: 'diary',
                    className: 'rounded-xl border border-amber-900/30 bg-white/80 p-3'
                  }, [
                    React.createElement('label', {
                      key: 'diary-label',
                      className: 'mb-1 block text-xs opacity-80'
                    }, 'Дневник'),
                    React.createElement('textarea', {
                      key: 'diary-textarea',
                      value: diary,
                      onChange: (e)=>setDiary(e.target.value),
                      rows: 10,
                      className: 'w-full rounded-lg border border-amber-900/30 bg-white/95 p-3 text-sm resize-none'
                    })
                  ])
                ])
              ]),
              React.createElement('div', {
                key: 'back-btn',
                className: 'mx-auto mt-2 w-[92%] text-right'
              }, [
                React.createElement(Pill, {
                  key: 'pill',
                  onClick: onBack
                }, [
                  React.createElement('span', { key: 'span', className: 'inline-flex items-center gap-2' }, [
                    React.createElement(ArrowLeft, { key: 'icon', className: 'h-4 w-4' }),
                    'Назад'
                  ])
                ])
              ])
            ])
          );
        }

        function Day1Intro({ onBack }) {
          return (
            React.createElement(ScreenFrame, {}, [
              React.createElement(TitleBar, { key: 'title', text: 'День 1 — Призыв Тени' }),
              React.createElement('div', {
                key: 'content',
                className: 'mx-auto mt-3 w-[92%] min-h-[0] flex-1 rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.08),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.8),rgba(36,48,56,.8))] p-2'
              }, [
                React.createElement('div', {
                  key: 'img',
                  className: 'relative h-full overflow-hidden rounded-xl border border-teal-700/30'
                }, [
                  IMAGES.DAY1_FOREST_URL ? (
                    React.createElement('img', {
                      key: 'forest-img',
                      src: IMAGES.DAY1_FOREST_URL,
                      alt: 'Лес Забытого',
                      className: 'h-full w-full object-cover'
                    })
                  ) : (
                    React.createElement('div', {
                      key: 'placeholder',
                      className: 'flex h-full items-center justify-center text-amber-200/80 text-sm'
                    }, '(Укажи URL картинки леса)')
                  )
                ])
              ]),
              React.createElement('div', {
                key: 'back-btn',
                className: 'mx-auto mt-3 mb-4 w-[92%] flex items-center justify-end'
              }, [
                React.createElement(Pill, {
                  key: 'pill',
                  onClick: onBack
                }, [
                  React.createElement('span', { key: 'span', className: 'inline-flex items-center gap-2' }, [
                    React.createElement(ArrowLeft, { key: 'icon', className: 'h-4 w-4' }),
                    'Назад'
                  ])
                ])
              ])
            ])
          );
        }

        // ================= Combined Screens from page_3_page_4_page_5 =================

        // Request Screen (Page 3)
        function RequestScreen({
          onBack,
          onAboutQuest,
          onGoDay1,
          onOpenDeck,
          onOpenJournal,
        }) {
          const [intent, setIntent] = React.useState(() => {
            try { return localStorage.getItem("sq.player.intent") || ""; } catch { return ""; }
          });

          React.useEffect(() => { try { localStorage.setItem("sq.player.intent", intent); } catch {} }, [intent]);
          React.useEffect(() => {
            try {
              const tg = window?.Telegram?.WebApp;
              tg?.ready?.(); tg?.expand?.();
              tg?.setHeaderColor?.("secondary_bg_color");
              tg?.setBackgroundColor?.("#1B1030");
            } catch {}
          }, []);

          return (
            React.createElement(ScreenFrame, {}, [
              React.createElement(TitleBar, { key: 'title', text: 'Запрос' }),
              React.createElement('div', {
                key: 'content',
                className: 'mx-auto mt-3 w-[92%] rounded-2xl border border-teal-700/30 bg-[linear-gradient(180deg,rgba(17,21,35,.90),rgba(18,22,38,.90))] p-4 text-left text-amber-50 shadow-[0_6px_28px_rgba(0,0,0,.35)]',
                style: { marginBottom: 'calc(env(safe-area-inset-bottom) + 320px)' }
              }, [
                React.createElement('h2', { key: 'h2', className: 'text-2xl font-extrabold tracking-tight' }, 'Тени'),
                React.createElement('p', {
                  key: 'p1',
                  className: 'mt-2 text-[15px] leading-relaxed opacity-95'
                }, 'Представляют собой непризнанные импульсы и желания, которые, подавляешь из опасения быть осуждённой(ым) или непринятой(ым).'),
                React.createElement('h3', { key: 'h3', className: 'mt-5 text-xl font-bold' }, 'Внутренние конфликты'),
                React.createElement('p', {
                  key: 'p2',
                  className: 'mt-2 text-[15px] leading-relaxed opacity-95'
                }, 'Непринятие себя такой(им), какая(ой) есть на самом деле, приводит к внутренним конфликтам, которые могут проявляться в негативных чувствах и поведении.')
              ]),
              React.createElement('div', {
                key: 'input-container',
                className: 'absolute inset-x-0',
                style: { bottom: 'calc(env(safe-area-inset-bottom) + 210px)' }
              }, [
                React.createElement('div', {
                  key: 'input',
                  className: 'mx-auto w-[92%] rounded-2xl border border-amber-900/40 bg-[linear-gradient(180deg,rgba(233,213,184,.96),rgba(215,189,150,.98))] p-4 text-amber-900 shadow-[0_6px_28px_rgba(0,0,0,.35)]'
                }, [
                  React.createElement('label', {
                    key: 'label',
                    className: 'mb-1 block text-xs opacity-80'
                  }, 'Запрос'),
                  React.createElement('input', {
                    key: 'input-field',
                    value: intent,
                    onChange: (e) => setIntent(e.target.value.slice(0, 120)),
                    placeholder: 'Одна короткая фраза',
                    className: 'w-full rounded-lg border border-amber-900/30 bg-white/70 px-3 py-2 text-sm placeholder:text-amber-900/50 focus:outline-none focus:ring-2 focus:ring-amber-700/40'
                  })
                ])
              ]),
              React.createElement('div', {
                key: 'buttons',
                className: 'absolute inset-x-0 z-40',
                style: { bottom: 'calc(env(safe-area-inset-bottom) + 150px)' }
              }, [
                React.createElement('div', {
                  key: 'button-group',
                  className: 'mx-auto w-[92%] flex items-center justify-between gap-2'
                }, [
                  React.createElement('button', {
                    key: 'back',
                    onClick: onBack,
                    className: 'inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-white/70 px-3 py-2 text-amber-900 backdrop-blur-sm active:translate-y-[1px]'
                  }, [
                    React.createElement(ArrowLeft, { key: 'icon', className: 'h-4 w-4' }),
                    'Назад'
                  ]),
                  React.createElement('button', {
                    key: 'continue',
                    onClick: onGoDay1,
                    className: 'inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-[linear-gradient(180deg,rgba(221,196,158,.94),rgba(199,167,127,.96))] px-3 py-2 font-semibold text-amber-900 shadow-[0_6px_20px_rgba(0,0,0,.25)] active:translate-y-[1px]'
                  }, 'Продолжить')
                ])
              ]),
              React.createElement('nav', {
                key: 'nav',
                className: 'fixed inset-x-0 bottom-0 z-50 flex items-center justify-center',
                style: { paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)' }
              }, [
                React.createElement('div', { key: 'nav-container', className: 'mx-auto mb-2 w-full max-w-[520px]' }, [
                  React.createElement('div', {
                    key: 'nav-bg',
                    className: 'mx-3 rounded-2xl border border-amber-900/40 bg-[linear-gradient(180deg,rgba(221,196,158,.94),rgba(199,167,127,.96))] p-3 shadow-[0_-8px_30px_rgba(0,0,0,.35)]'
                  }, [
                    React.createElement('div', { key: 'nav-buttons', className: 'flex items-center justify-between' }, [
                      React.createElement(RoundButton, { key: 'about', label: 'Обучение', icon: BookOpen, tone: 'amber', onClick: onAboutQuest }),
                      React.createElement(RoundButton, { key: 'quest', label: 'Квест', icon: Swords, tone: 'teal', onClick: onGoDay1 }),
                      React.createElement(RoundButton, { key: 'deck', label: 'Колода', icon: Layers, tone: 'sky', onClick: onOpenDeck }),
                      React.createElement(RoundButton, { key: 'journal', label: 'Дневник', icon: NotebookPen, tone: 'slate', onClick: onOpenJournal }),
                      React.createElement(RoundButton, { key: 'exit', label: 'Выход', icon: LogOut, tone: 'rose', onClick: () => { try { window?.Telegram?.WebApp?.close?.(); } catch {} } })
                    ])
                  ])
                ])
              ]),
              React.createElement('div', { key: 'spacer', className: 'h-36' })
            ])
          );
        }

        // Day 1 Screen (Page 4)
        function Day1Screen({ onBackToRequest, onAccept }) {
          const [imgUrl, setImgUrl] = React.useState(() => {
            try { return localStorage.getItem("sq.day1.forest.url") || ""; } catch { return ""; }
          });
          React.useEffect(() => { try { localStorage.setItem("sq.day1.forest.url", imgUrl || ""); } catch {} }, [imgUrl]);

          return (
            React.createElement(ScreenFrame, {}, [
              React.createElement(TitleBar, { key: 'title', text: 'День 1 — Призыв Тени' }),
              React.createElement('div', {
                key: 'content',
                className: 'mx-auto mt-3 w-[92%] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.08),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.8),rgba(36,48,56,.8))] p-2'
              }, [
                React.createElement('div', {
                  key: 'img',
                  className: 'relative h-[66svh] overflow-hidden rounded-xl border border-teal-700/30'
                }, [
                  imgUrl ? (
                    React.createElement('img', {
                      key: 'forest-img',
                      src: imgUrl,
                      alt: 'Лес, где шепчут тени',
                      className: 'h-full w-full object-cover'
                    })
                  ) : (
                    React.createElement('button', {
                      key: 'upload-btn',
                      onClick: () => {
                        const next = window.prompt("Укажи URL картинки для Дня 1", imgUrl || "");
                        if (next !== null) setImgUrl(next.trim());
                      },
                      className: 'flex h-full w-full items-start justify-center pt-2 text-emerald-200/80 text-sm hover:text-emerald-200'
                    }, '(Укажи URL картинки)')
                  )
                ])
              ]),
              React.createElement('div', {
                key: 'subtitle',
                className: 'mx-auto mt-2 w-[92%] text-center text-[13px] opacity-85'
              }, 'Ты входишь в лес, где тени шепчут правду.'),
              React.createElement('div', {
                key: 'buttons',
                className: 'mx-auto mt-2 mb-2 w-[92%] flex items-center justify-between gap-2'
              }, [
                React.createElement('button', {
                  key: 'back',
                  onClick: onBackToRequest,
                  className: 'inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-white/70 px-3 py-2 text-amber-900 backdrop-blur-sm active:translate-y-[1px]'
                }, [
                  React.createElement(ArrowLeft, { key: 'icon', className: 'h-4 w-4' }),
                  'Назад'
                ]),
                React.createElement('button', {
                  key: 'accept',
                  onClick: onAccept,
                  className: 'inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-[linear-gradient(180deg,rgba(221,196,158,.94),rgba(199,167,127,.96))] px-3 py-2 font-semibold text-amber-900 shadow-[0_6px_20px_rgba(0,0,0,.25)] active:translate-y-[1px]'
                }, 'Принять Тень')
              ])
            ])
          );
        }

        // Shadow Screen (Page 5)
        function ShadowScreen({ onBackToDay1, onContinue }) {
          const [imgUrl, setImgUrl] = React.useState(() => {
            try { return localStorage.getItem("sq.day1.shadow.url") || ""; } catch { return ""; }
          });
          React.useEffect(() => { try { localStorage.setItem("sq.day1.shadow.url", imgUrl || ""); } catch {} }, [imgUrl]);

          return (
            React.createElement(ScreenFrame, {}, [
              React.createElement(TitleBar, { key: 'title', text: 'Тень' }),
              React.createElement('div', {
                key: 'content',
                className: 'mx-auto mt-3 w-[92%] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.78),rgba(30,42,50,.78))] p-2'
              }, [
                React.createElement('div', {
                  key: 'img',
                  className: 'relative h-[66svh] overflow-hidden rounded-xl border border-teal-700/30'
                }, [
                  imgUrl ? (
                    React.createElement('img', {
                      key: 'shadow-img',
                      src: imgUrl,
                      alt: 'Образ Тени',
                      className: 'h-full w-full object-cover'
                    })
                  ) : (
                    React.createElement('button', {
                      key: 'upload-btn',
                      onClick: () => {
                        const next = window.prompt("Укажи URL картинки для Тени", imgUrl || "");
                        if (next !== null) setImgUrl(next.trim());
                      },
                      className: 'flex h-full w-full items-start justify-center pt-2 text-emerald-200/80 text-sm hover:text-emerald-200'
                    }, '(Укажи URL картинки)')
                  )
                ])
              ]),
              React.createElement('div', {
                key: 'buttons',
                className: 'mx-auto mt-2 mb-2 w-[92%] flex items-center justify-between gap-2'
              }, [
                React.createElement('button', {
                  key: 'back',
                  onClick: onBackToDay1,
                  className: 'inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-white/70 px-3 py-2 text-amber-900 backdrop-blur-sm active:translate-y-[1px]'
                }, [
                  React.createElement(ArrowLeft, { key: 'icon', className: 'h-4 w-4' }),
                  'Назад'
                ]),
                React.createElement('button', {
                  key: 'continue',
                  onClick: onContinue,
                  className: 'inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-900/40 bg-[linear-gradient(180deg,rgba(221,196,158,.94),rgba(199,167,127,.96))] px-3 py-2 font-semibold text-amber-900 shadow-[0_6px_20px_rgba(0,0,0,.25)] active:translate-y-[1px]'
                }, 'Продолжить')
              ])
            ])
          );
        }

        // ================= Intro / Creator / Quest / FAQ =================

        function IntroScreen({ onStart, onAboutCreator, onAboutQuest, onOpenFaq }) {
          React.useEffect(() => {
            try {
              const tg = window?.Telegram?.WebApp;
              tg?.ready?.();
              tg?.expand?.();
              tg?.setHeaderColor?.("secondary_bg_color");
              tg?.setBackgroundColor?.("#1B1030");
            } catch {}
          }, []);

          return (
            React.createElement(ScreenFrame, {}, [
              React.createElement(TitleBar, { key: 'title', text: 'Принятие тени' }),
              React.createElement('div', {
                key: 'content',
                className: 'mx-auto mt-3 w-[92%] h-[73svh] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.75),rgba(36,48,56,.75))] p-2'
              }, [
                React.createElement('div', {
                  key: 'img',
                  className: 'relative h-full overflow-hidden rounded-xl border border-teal-700/30 bg-[radial-gradient(circle_at_center,rgba(78,120,120,.35),transparent_70%)]'
                }, [
                  React.createElement('div', {
                    key: 'placeholder',
                    className: 'flex h-full items-center justify-center'
                  }, [
                    React.createElement('div', {
                      key: 'text',
                      className: 'text-center text-amber-200/70'
                    }, [
                      React.createElement('div', { key: 'line1', className: 'text-sm' }, '(Поставь URL иллюстрации в INTRO_IMAGE_URL)'),
                      React.createElement('div', { key: 'line2', className: 'mt-1 text-xs' }, 'Пока — мягкий фон и рамка')
                    ])
                  ])
                ])
              ]),
              React.createElement('div', { key: 'buttons', className: 'mx-auto mt-2 w-[92%]' }, [
                React.createElement('div', { key: 'grid', className: 'grid grid-cols-3 gap-2' }, [
                  React.createElement(Pill, { key: 'creator', onClick: onAboutCreator }, 'О создателе'),
                  React.createElement(Pill, { key: 'start', onClick: onStart }, 'Начало'),
                  React.createElement(Pill, { key: 'quest', onClick: onAboutQuest }, 'О квесте')
                ])
              ]),
              React.createElement('div', { key: 'faq', className: 'mx-auto mt-2 w-[92%]' }, [
                React.createElement('button', {
                  key: 'faq-btn',
                  onClick: () => { sendIfAllowed('faq'); onOpenFaq?.(); },
                  className: 'w-full rounded-xl border border-amber-900/30 bg-white/60 px-3 py-2 text-sm font-medium text-amber-900 shadow-[0_3px_14px_rgba(0,0,0,.22)] backdrop-blur-sm active:translate-y-[1px]'
                }, 'F.A.Q.')
              ])
            ])
          );
        }

        function CreatorScreen({ onBack }) {
          return (
            React.createElement(ScreenFrame, {}, [
              React.createElement(TitleBar, { key: 'title', text: 'О создателе квеста' }),
              React.createElement('div', {
                key: 'content',
                className: 'mx-auto mt-2 w-[92%] rounded-2xl border border-amber-900/40 bg-[linear-gradient(180deg,rgba(233,213,184,.96),rgba(215,189,150,.98))] p-4 text-amber-900'
              }, [
                React.createElement('h3', { key: 'gratitude-title', className: 'text-base md:text-lg font-bold' }, 'Благодарности'),
                React.createElement('ul', {
                  key: 'gratitude-list',
                  className: 'mt-2 space-y-2 text-[14px] leading-relaxed list-disc pl-5 max-h-[40vh] overflow-y-auto'
                }, GRATITUDE.map((line, i) => (
                  React.createElement('li', { key: i }, line)
                )))
              ]),
              React.createElement('div', {
                key: 'creator-info',
                className: 'mx-auto mt-2 w-[92%] rounded-2xl border border-amber-900/40 bg-[linear-gradient(180deg,rgba(233,213,184,.96),rgba(215,189,150,.98))] p-4 text-amber-900'
              }, [
                React.createElement('div', {
                  key: 'creator-text',
                  className: 'w-full rounded-xl border border-amber-900/30 bg-white/70 p-4 leading-relaxed'
                }, [
                  React.createElement('p', {
                    key: 'bio',
                    className: 'mt-2 text-[14px] md:text-[15px]'
                  }, 'Vladimir Lakshman Das — практик пути «Радость. Осознанность. Баланс. Гармония». Он соединяет игру и познание: от индийской традиции и «Лилы» до Юнга и современной психологии. Пишет и снимает, исследует человечество как социолог, учится у жизни как ученик, работает с архетипами как игропрактик, мыслит как философ, дышит и дисциплинируется как йогин, путешествует взглядом фотографа, а в цифровом мире держит осознанность как кибер‑монах.')
                ])
              ]),
              React.createElement('div', {
                key: 'buttons',
                className: 'mx-auto mt-2 w-[92%] flex items-center justify-between'
              }, [
                React.createElement(Pill, {
                  key: 'telegram',
                  onClick: () => {
                    try {
                      window?.Telegram?.WebApp?.openTelegramLink?.('https://t.me/SantoshaClub');
                    } catch {};
                    try {
                      window.open('https://t.me/SantoshaClub', '_blank');
                    } catch {}
                  }
                }, [
                  React.createElement('span', { key: 'span', className: 'inline-flex items-center gap-2' }, [
                    React.createElement(Send, { key: 'icon', className: 'h-4 w-4' }),
                    '@SantoshaClub'
                  ])
                ]),
                React.createElement(Pill, { key: 'back', onClick: onBack }, [
                  React.createElement('span', { key: 'span', className: 'inline-flex items-center gap-2' }, [
                    React.createElement(ArrowLeft, { key: 'icon', className: 'h-4 w-4' }),
                    'Назад'
                  ])
                ])
              ])
            ])
          );
        }

        function QuestScreen({ onBack }) {
          return (
            React.createElement(ScreenFrame, {}, [
              React.createElement(TitleBar, { key: 'title', text: 'О квесте' }),
              React.createElement('div', {
                key: 'content',
                className: 'mx-auto mt-2 w-[92%] overflow-hidden h-[73svh] flex flex-col min-h-0 rounded-2xl border border-amber-900/40 bg-[linear-gradient(180deg,rgba(233,213,184,.96),rgba(215,189,150,.98))] p-4 text-amber-900'
              }, [
                React.createElement('div', {
                  key: 'scroll-content',
                  className: 'flex-1 min-h-0 w-full overflow-auto rounded-xl border border-amber-900/30 bg-white/70 p-4 leading-relaxed space-y-4'
                }, [
                  React.createElement('h2', {
                    key: 'shadow-title',
                    className: 'text-lg font-extrabold tracking-tight'
                  }, 'Что такое «Тень»?' ),
                  React.createElement('p', {
                    key: 'shadow-desc',
                    className: 'mt-2 text-[14px] md:text-[15px]'
                  }, 'Это те качества, чувства и желания, которые мы обычно прячем: «не буду злиться», «я не боюсь», «мне не больно». Они никуда не исчезают — просто уходят в тень и управляют нами из‑под полы.'),
                  React.createElement('h3', {
                    key: 'purpose-title',
                    className: 'mt-4 text-base md:text-lg font-bold'
                  }, 'Зачем проходить квест?' ),
                  React.createElement('p', {
                    key: 'purpose-desc',
                    className: 'mt-2 text-[14px] md:text-[15px]'
                  }, 'Перестать ругать себя и стать к себе добрее. Понять, почему я так реагирую, и научиться выбирать по‑новому. Получить больше смелости, спокойствия и ясности. Улучшить отношения с близкими и с собой. Вернуть энергию, которую забирает внутренний конфликт.'),
                  React.createElement('h3', {
                    key: 'results-title',
                    className: 'mt-4 text-base md:text-lg font-bold'
                  }, 'Что ты получишь на выходе?' ),
                  React.createElement('ul', {
                    key: 'results-list',
                    className: 'mt-2 list-disc pl-5 space-y-1 text-[14px] md:text-[15px]'
                  }, [
                    React.createElement('li', { key: '1' }, 'Осознание своей тени (честный взгляд, без стыда).'),
                    React.createElement('li', { key: '2' }, 'Диалог с ней (умение слушать и слышать, любить себя).'),
                    React.createElement('li', { key: '3' }, 'Опору архетипа — сильного светлого качества, которое помогает.'),
                    React.createElement('li', { key: '4' }, 'Личный символ целостности и план действий.')
                  ]),
                  React.createElement('h3', {
                    key: 'process-title',
                    className: 'mt-4 text-base md:text-lg font-bold'
                  }, 'Как это проходит?' ),
                  React.createElement('ul', {
                    key: 'process-list',
                    className: 'mt-2 list-disc pl-5 space-y-1 text-[14px] md:text-[15px]'
                  }, [
                    React.createElement('li', { key: '1' }, 'День 1 — Призыв Тени: знакомство с тем, что прячется.'),
                    React.createElement('li', { key: '2' }, 'День 2 — Диалог: письмо от Тени и ответ от взрослого тебя.'),
                    React.createElement('li', { key: '3' }, 'День 3 — Архетипический выбор: берём ресурс светлой стороны.'),
                    React.createElement('li', { key: '4' }, 'День 4 — Интеграция: символ целостности и завершение цикла.')
                  ]),
                  React.createElement('h3', {
                    key: 'audience-title',
                    className: 'mt-4 text-base md:text-lg font-bold'
                  }, 'Кому подойдёт?' ),
                  React.createElement('ul', {
                    key: 'audience-list',
                    className: 'mt-2 list-disc pl-5 space-y-1 text-[14px] md:text-[15px]'
                  }, [
                    React.createElement('li', { key: '1' }, 'Тем, кто переживает сильные эмоции и хочет понять себя.'),
                    React.createElement('li', { key: '2' }, 'Тем, кто часто ссорится или стесняется своих чувств и хочет мягкости и силы.'),
                    React.createElement('li', { key: '3' }, 'Творческим и любознательным: формат игровой, с рисунками и заметками.')
                  ]),
                  React.createElement('h3', {
                    key: 'requirements-title',
                    className: 'mt-4 text-base md:text-lg font-bold'
                  }, 'Что нужно?' ),
                  React.createElement('p', {
                    key: 'requirements-desc',
                    className: 'mt-2 text-[14px] md:text-[15px]'
                  }, 'Тетрадь/дневник и ручка; иногда листы для рисования (по желанию).'),
                  React.createElement('p', {
                    key: 'requirements-time',
                    className: 'mt-2 text-[14px] md:text-[15px]'
                  }, 'От 10 минут до суток — выбирай по состоянию и глубине дня.')
                ])
              ]),
              React.createElement('div', {
                key: 'back-btn',
                className: 'mx-auto mt-2 w-[92%] text-right'
              }, [
                React.createElement(Pill, { key: 'pill', onClick: onBack }, [
                  React.createElement('span', { key: 'span', className: 'inline-flex items-center gap-2' }, [
                    React.createElement(ArrowLeft, { key: 'icon', className: 'h-4 w-4' }),
                    'Назад'
                  ])
                ])
              ])
            ])
          );
        }

        function FaqScreen({ onBack }) {
          const [currentSection, setCurrentSection] = React.useState(0);
          const sections = [
            { title: 'Техника безопасности', content: 'Квест — не психотерапия и не медпомощь. При переживании травмы, самоповреждения, тяжёлой депрессии/паники — обратись к специалисту. Если в процессе стало по‑настоящему тяжело — стоп, пауза, дыхание, поговорить с родными/близкими или терапевтом.' },
            { title: 'Что такое Тень?', content: 'Тень — это тоже архетип. Это те наши качества, чувства и желания, которым «не дают место»: злость, страх, стыд, зависть, нужда в поддержке, потребность отдыхать, желание внимания. Они не «плохие» — просто вытеснены и потому управляют нами из‑под полы.' },
            { title: 'Что такое Архетип?', content: 'Архетип — это опора, образ/паттерн светлой/здоровой силы, которая помогает держать равновесие и направлять энергию тени. Примеры: Хранитель (границы и забота), Воин (смелость и действие), Мудрец (ясность и наблюдение).' },
            { title: 'Зачем встречаться с Тенью?', content: 'Прекратить «скрытое управление»: аффекты и импульсы становятся осознаннее. Вернуть доступ к заблокированной энергии: злость → границы/сила, страх → осторожность/мудрость и т. д. Развивать сострадание к себе вместо самообесценивания.' },
          ];

          return (
            React.createElement(ScreenFrame, {}, [
              React.createElement(TitleBar, { key: 'title', text: 'FAQ — Принятие Тени' }),
              React.createElement('div', {
                key: 'content',
                className: 'mx-auto mt-2 w-[92%] overflow-hidden h-[73svh] flex flex-col min-h-0 rounded-2xl border border-amber-900/40 bg-[linear-gradient(180deg,rgba(233,213,184,.96),rgba(215,189,150,.98))] p-4 text-amber-900'
              }, [
                React.createElement('div', {
                  key: 'section-nav',
                  className: 'flex gap-2 mb-4 overflow-x-auto pb-2'
                }, sections.map((section, i) => (
                  React.createElement('button', {
                    key: i,
                    onClick: () => setCurrentSection(i),
                    className: `px-3 py-1 rounded-full text-xs whitespace-nowrap ${currentSection === i ? 'bg-amber-900 text-white' : 'bg-white/60 text-amber-900'}`,
                  }, section.title)
                ))),
                React.createElement('div', {
                  key: 'section-content',
                  className: 'flex-1 min-h-0 w-full overflow-auto rounded-xl border border-amber-900/30 bg-white/70 p-4 leading-relaxed'
                }, [
                  React.createElement('h3', {
                    key: 'section-title',
                    className: 'font-bold mb-2'
                  }, sections[currentSection].title),
                  React.createElement('p', {
                    key: 'section-text',
                    className: 'text-[14px] md:text-[15px]'
                  }, sections[currentSection].content)
                ])
              ]),
              React.createElement('div', {
                key: 'back-btn',
                className: 'mx-auto mt-2 w-[92%] text-right'
              }, [
                React.createElement(Pill, { key: 'pill', onClick: onBack }, [
                  React.createElement('span', { key: 'span', className: 'inline-flex items-center gap-2' }, [
                    React.createElement(ArrowLeft, { key: 'icon', className: 'h-4 w-4' }),
                    'Назад'
                  ])
                ])
              ])
            ])
          );
        }

        // ================= Preview router =================

        function BlockA_Preview() {
          const [route, setRoute] = React.useState("intro");
          React.useEffect(() => { try { window?.Telegram?.WebApp?.ready?.(); } catch {} }, []);

          return React.createElement('div', { className: 'min-h-[100svh] bg-[#120a22]' }, [
            route === "intro" && React.createElement(IntroScreen, {
              key: 'intro',
              onStart: () => setRoute("request"),
              onAboutCreator: () => setRoute("creator"),
              onAboutQuest: () => setRoute("quest"),
              onOpenFaq: () => setRoute("faq")
            }),
            route === "creator" && React.createElement(CreatorScreen, { key: 'creator', onBack: () => setRoute("intro") }),
            route === "quest" && React.createElement(QuestScreen, { key: 'quest', onBack: () => setRoute("intro") }),
            route === "faq" && React.createElement(FaqScreen, { key: 'faq', onBack: () => setRoute("intro") }),
            route === "request" && React.createElement(RequestScreen, {
              key: 'request',
              onBack: () => setRoute("intro"),
              onAboutQuest: () => setRoute("quest"),
              onGoDay1: () => setRoute("day1"),
              onOpenDeck: () => setRoute("deck"),
              onOpenJournal: () => setRoute("journal")
            }),
            route === "day1" && React.createElement(Day1Screen, {
              key: 'day1',
              onBackToRequest: () => setRoute("request"),
              onAccept: () => setRoute("shadow")
            }),
            route === "shadow" && React.createElement(ShadowScreen, {
              key: 'shadow',
              onBackToDay1: () => setRoute("day1"),
              onContinue: () => setRoute("start")
            }),
            route === "start" && React.createElement(StartScreen, {
              key: 'start',
              onBack: () => setRoute("intro"),
              onForward: () => setRoute("day1"),
              onAboutQuest: () => setRoute("quest"),
              onOpenDeck: () => setRoute("deck"),
              onOpenJournal: () => setRoute("journal")
            }),
            route === "deck" && React.createElement(DeckScreen, { key: 'deck', onBack: () => setRoute("request") }),
            route === "journal" && React.createElement(JournalScreen, { key: 'journal', onBack: () => setRoute("request") })
          ]);
        }

        // Рендерим приложение
        ReactDOM.render(React.createElement(BlockA_Preview), document.getElementById('root'));

        // ================= Micro tests =================
        (function blockATests(){
          if (typeof window === "undefined") return;
          try {
            console.log('🎭 Shadow Quest Preview loaded successfully!');
            console.log('📱 Available routes:', ["intro","creator","quest","faq","request","day1","shadow","start","deck","journal"]);
            console.assert(Array.isArray(GRATITUDE) && GRATITUDE.length > 0, "GRATITUDE loaded");
            console.log('✅ All systems operational');
          } catch (e) {
            console.warn('❌ Test failed:', e);
          }
        })();
    </script>
</body>
</html>
