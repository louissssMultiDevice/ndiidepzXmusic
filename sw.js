// sw.js - Service Worker untuk Push Notifications
const CACHE_NAME = 'ndiidepzXmusic-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/app.js',
  '/assets/logo.png'
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
      }
    )
  );
});

self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: data.icon || '/assets/logo.png',
    badge: '/assets/badge.png',
    tag: data.tag,
    data: data.data,
    actions: data.actions || [],
    requireInteraction: data.requireInteraction || false
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action) {
    // Handle action buttons
    switch (event.action) {
      case 'view-profile':
        clients.openWindow('/profile.html?id=' + event.notification.data.userId);
        break;
      case 'follow-back':
        // Implement follow back logic
        break;
      case 'join-live':
        clients.openWindow('/live.html?id=' + event.notification.data.eventId);
        break;
    }
  } else {
    // Default click action
    if (event.notification.data && event.notification.data.url) {
      clients.openWindow(event.notification.data.url);
    } else {
      clients.openWindow('/');
    }
  }
});

self.addEventListener('notificationclose', (event) => {
  // Track notification dismissal jika diperlukan
  console.log('Notification closed:', event.notification.tag);
});
