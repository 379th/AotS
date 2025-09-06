const CACHE_NAME = 'aots-v3';

self.addEventListener('install', (event) => {
  console.log('SW: Installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('SW: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Пропускаем все внешние ресурсы
  if (url.hostname !== location.hostname) {
    console.log('SW: Skipping external resource:', url.href);
    return;
  }
  
  // Пропускаем API запросы
  if (url.pathname.startsWith('/api/')) {
    return;
  }
  
  // Обрабатываем только локальные ресурсы
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
