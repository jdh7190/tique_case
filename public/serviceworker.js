var CACHE_NAME = 'v0.01';
var urlsToCache = [
  './index.html',
  './manifest.json',
  './send.html',
  './sendbsv.html',
  './settings.html',
  './history.html',
  './styles/style.css',
  './styles/send.css',
  './styles/sendbsv.css',
  './styles/settings.css',
  './styles/history.css',
  './scripts/bsv-mnemonic.min.js',
  './scripts/bsv.browser.min.js',
  './scripts/centrifuge.js',
  './scripts/config.js',
  './scripts/helpers.js',
  './scripts/history.js',
  './scripts/purse.js',
  './scripts/qrcode.min.js',
  './scripts/run.browser.min.js',
  './scripts/send.js',
  './scripts/sendbsv.js',
  './scripts/settings.js',
  './scripts/twemoji.min.js',
  './scripts/wallet.js',
  './scripts/idb.js',
  './images/back.svg',
  './images/backup.svg',
  './images/bsv-icon.svg',
  './images/case_logo.png',
  './images/check.svg',
  './images/clip.svg',
  './images/clip_highlight.svg',
  './images/copy.svg',
  './images/flip.svg',
  './images/history.svg',
  './images/Jigs.svg',
  './images/leftarrow.svg',
  './images/Ownership.svg',
  './images/Purse.svg',
  './images/restore.svg',
  './images/rightarrow.svg',
  './images/seed.svg',
  './images/settings-24px.svg',
  './images/suitcase.svg',
  './images/transfer.svg',
  './images/transferO.svg',
  './images/transferP.svg',
];
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching...')
        cache.addAll(urlsToCache)
      }).then(() => {
        self.skipWaiting();
      })
  )
})
self.addEventListener('activate', e => {
  console.log('Activated.')
  e.waitUntil(
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
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  )
})