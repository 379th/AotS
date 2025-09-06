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
  // Пропускаем API запросы - они не должны кэшироваться
  if (event.request.url.includes('/api/')) {
    return;
  }
  
  // Пропускаем внешние ресурсы - они не должны кэшироваться
  if (event.request.url.includes('fonts.googleapis.com') || 
      event.request.url.includes('telegram.org') ||
      event.request.url.includes('googleapis.com') ||
      event.request.url.includes('fonts.gstatic.com')) {
    return;
  }
  
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
