/* eslint-disable no-console */

// Debug util

const DEBUG = process.env.NODE_ENV === 'development';
const debug = (method, arg1, arg2) =>
                DEBUG && console[method] && (
                  arg2 ? console[method](`[SW] ${arg1}`, arg2) : console[method](`[SW] ${arg1}`)
                );

// Global config

const { assets } = global.serviceWorkerOption;
const CACHE_NAME = (new Date()).toISOString();

let assetsToCache = [
  ...assets,
  './',
];

assetsToCache = assetsToCache.map(path => new URL(path, global.location).toString());

// ============================================================================
// ============================================================================

self.addEventListener('install', (event) => {
  debug('log', 'Install Event');

  // Populate new cache with application assets
  event.waitUntil(
    global.caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(assetsToCache))
      .then(() => debug('log', 'Install: Cached webpack assets', assetsToCache))
      .then(() => self.skipWaiting())
      .catch((err) => {
        debug('error', 'Install: Cache error', err);
        throw err;
      }),
  );
});

self.addEventListener('activate', (event) => {
  debug('log', 'Activate Event');

  // Clear old caches
  event.waitUntil(
    global.caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName.indexOf(CACHE_NAME) === 0) {
              return null;
            }

            debug('log', `Activate: Clearing Cache '${cacheName}'`);
            return global.caches.delete(cacheName);
          }),
        ),
      )
      .then(() => debug('log', 'Activate: Done clearing old caches'))
      .then(() => self.clients.claim())
      .then(() => debug('log', 'Activate: Claimed clients'))
      .catch((err) => {
        debug('error', 'Activate: Cache delete error', err);
        throw err;
      }),
  );
});

self.addEventListener('message', (event) => {
  console.log(event);
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') {
    debug('log', `Fetch: Ignored non-GET (${request.method}) request`);
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== location.origin) {
    debug('log', `Fetch: Ignore cross-origin request ${url.origin}`);
    return;
  }

  const resource = global.caches.match(request)
    .then((res) => {
      // Found in cache
      if (res) {
        debug('log', `Fetch: Fetched ${url.href} from cache`);
        return res;
      }

      return fetch(request)
        .then((networkRes) => {
          // Bad fetch response
          if (!networkRes) {
            debug('log', `Fetch: Null response from ${url.href}`);

            return networkRes;
          } else if (!networkRes.ok) {
            debug('log', `Fetch: Bad response from ${url.href} (${networkRes.status} ${networkRes.type})`);

            return networkRes;
          }

          // Good fetch response
          debug('log', `Fetch: ${url.href} fetched`);

          // Clone + Store response in cache
          const cacheRes = networkRes.clone();
          global.caches
            .open(CACHE_NAME)
            .then(cache => cache.put(request, cacheRes))
            .then(() => debug('log', `Fetch: ${url.href} cached`));

          return networkRes;
        })
        .catch((err) => {
          debug('error', 'Fetch: Fetch API error', err);
          throw err;
        });
    });

  event.respondWith(resource);
});
