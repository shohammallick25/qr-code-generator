const CACHE_NAME = 'qr-generator-cache-v1';
const urlsToCache = [
  '.',
  './index.html',
  './style.css',
  './script.js',
  './1.mp4',
  './1.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
