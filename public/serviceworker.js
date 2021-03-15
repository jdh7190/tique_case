var CACHE_NAME = 'v0.01';
var urlsToCache = [
  './index.html'
];
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching...')
        cache.addAll(urlsToCache)
      }).then(() => {
        self.skipWaiting();
      })
  )
})
self.addEventListener('activate', (event) => {
  console.log('Activated.')
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    })
  )
})
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  )
})