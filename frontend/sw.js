/* JP Croco Admin — Service Worker para push no aparelho do admin.
   Exige contexto seguro (HTTPS/ngrok ou localhost). Em HTTP puro de LAN
   o registro falha e o painel usa toast+som+vibração como fallback. */
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); });

// Push futuro via servidor (ex.: Web Push). Hoje o painel usa showNotification local.
self.addEventListener('push', (e) => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch (_) {}
  const title = data.title || 'JP Croco - Nova venda!';
  const body = data.body || 'Há uma atualização de pedido no painel.';
  e.waitUntil(
    self.registration.showNotification(title, {
      body,
      tag: 'jpcroco-pedido',
      renotify: true,
      vibrate: [200, 100, 200],
    })
  );
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = '/pages/admin.html';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
      for (const w of wins) {
        if (w.url.includes('/pages/admin.html')) return w.focus();
      }
      return self.clients.openWindow(url);
    })
  );
});
