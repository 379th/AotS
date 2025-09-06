const CACHE_NAME = 'aots-v1';
const urlsToCache = [
  '/',
  '/Sorce/Background.png',
  '/Sorce/AotS_begine.png',
  '/Sorce/Screen_Start.png',
  '/Sorce/Creator.png',
  '/Sorce/Begine.png',
  '/Sorce/Quest_boton.png',
  '/Sorce/F_A_Q.png',
  '/Sorce/Setings.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Пропускаем API запросы - они не должны кэшироваться
  if (url.pathname.startsWith('/api/')) {
    return;
  }
  
  // Пропускаем все внешние ресурсы - они не должны кэшироваться
  if (url.hostname !== location.hostname) {
    console.log('SW: Skipping external resource:', url.href);
    return;
  }
  
  // Дополнительная проверка на внешние домены
  const externalDomains = [
    'fonts.googleapis.com',
    'telegram.org', 
    'googleapis.com',
    'fonts.gstatic.com',
    'gstatic.com'
  ];
  
  if (externalDomains.some(domain => url.hostname.includes(domain))) {
    console.log('SW: Skipping external domain:', url.hostname);
    return;
  }
  
  // Обрабатываем только локальные ресурсы
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch((error) => {
          console.log('SW: Fetch failed for', event.request.url, error);
          // Если fetch не удался, возвращаем пустой ответ
          return new Response('', { status: 404, statusText: 'Not Found' });
        });
      })
  );
});
