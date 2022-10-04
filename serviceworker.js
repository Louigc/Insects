// The name of the cache - Vores variable 
const cacheName = 'cache-insects';

// On first load, create the cache. En slags mappe i browseren, hvor den ligger alle resourcerne ned i denne 
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      // Fetch data & add fetch result to cache
      return cache.addAll(['/insects/', '/insects/index.html', '/insects/butterflies.jpg']); // Vi cacher kun det ene insekt
    })
  );
});

// If a file is not available online (if offline) - Det samme som en fetch. Hvis ikke det findes online, så skal den gå ned og finde det tilsvarende i cachen
// open the cache, and look for a match
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.open(cacheName).then(cache => cache.match(event.request))
    )
  );
});
