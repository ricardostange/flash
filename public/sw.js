// Scope-relative URLs work both at / and at a GitHub Pages project path.
const ROOT = self.registration.scope;
const PREFIX = `flash-shell-${new URL(ROOT).pathname}-`;
const CACHE = `${PREFIX}v2`;
const url = (path) => new URL(path, ROOT).href;

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const response = await fetch(url('index.html'), { cache: 'reload' });
    if (!response.ok) throw new Error('Unable to cache app shell');
    const html = await response.text();
    const assets = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
      .map((match) => new URL(match[1], ROOT).href)
      .filter((asset) => asset.startsWith(url('assets/')));
    await cache.addAll([ROOT, url('index.html'), url('favicon.svg'), url('manifest.webmanifest'), ...new Set(assets)]);
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith(PREFIX) && key !== CACHE).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith(ROOT)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const response = await fetch(event.request);
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(cache.put(event.request, copy));
      }
      return response;
    } catch {
      // Static assets are identical across Origin header variants (e.g. module requests).
      return (await cache.match(event.request, { ignoreVary: true }))
        || (event.request.mode === 'navigate' ? await cache.match(url('index.html')) : undefined)
        || Response.error();
    }
  })());
});
