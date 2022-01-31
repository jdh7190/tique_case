var CACHE_NAME = 'v0.01';
var urlsToCache = [
  './index.html',
  './manifest.json',
  './send.html',
  './sendbsv.html',
  './settings.html',
  './styles/send.css',
  './styles/sendbsv.css',
  './styles/settings.css',
  './scripts/bsv-mnemonic.min.js',
  './scripts/bsv.browser.min.js',
  './scripts/centrifuge.js',
  './scripts/centrifuge.min.js.map',
  './scripts/config.js',
  './scripts/helpers.js',
  './scripts/fontawesome.js',
  './scripts/history.js',
  './scripts/message.js',
  './scripts/orderLock.js',
  './scripts/purse.js',
  './scripts/qrcode.min.js',
  './scripts/run.browser.min.js',
  './scripts/send.js',
  './scripts/sendbsv.js',
  './scripts/settings.js',
  './scripts/tome.js',
  './scripts/twemoji.min.js',
  './scripts/wallet.js',
  './scripts/idb.js',
  './scripts/login.js',
  './assets/back.svg',
  './assets/backup.svg',
  './assets/bsv-icon.svg',
  './assets/case_logo.png',
  './assets/check.svg',
  './assets/clip.svg',
  './assets/clip_highlight.svg',
  './assets/copy.svg',
  './assets/flip.svg',
  './assets/history.svg',
  './assets/Jigs.svg',
  './assets/leftarrow.svg',
  './assets/Ownership.svg',
  './assets/Purse.svg',
  './assets/restore.svg',
  './assets/rightarrow.svg',
  './assets/seed.svg',
  './assets/settings-24px.svg',
  './assets/suitcase.svg',
  './assets/transfer.svg',
  './assets/transferO.svg',
  './assets/transferP.svg',
  './assets/logo-512x512.png',
  './assets/treasurechest.png',
  './assets/token.svg',
  './assets/bsvlogo_color.svg',
  './assets/tiquelogo.png',
  './assets/bsvlogo_gray.png',
  './assets/bsvlogo_white.png',
  './assets/tomeofhistory.png'
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