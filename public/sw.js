/// <reference lib="webworker" />

const CACHE_NAME = 'circuit-soul-v1';
const STATIC_ASSETS = [
  '/',
  '/about',
  '/blog',
  '/projects',
  '/contact',
  '/manifest.json',
  '/icon.svg',
  '/favicon.svg',
  '/offline.html',
];

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(() => {
          // If fetch fails and we have no cache, serve offline page
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
          return null;
        });

      return cached || fetchPromise;
    })
  );
});
