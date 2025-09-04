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
