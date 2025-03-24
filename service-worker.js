const CACHE_NAME = 'pwa-blog-cache-v2';
const OFFLINE_PAGE = 'offline.html';


self.addEventListener('install', (event) => {
    console.log(' Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log(' Caching offline page...');
            return cache.addAll([
                'home.html',
                'about.html',
                'offline.html',
                'styles.css',
                'script.js',
                'manifest.json',
                'icons/icon-192x192.png',
                'icons/icon-512x512.png'
            ]);
        })
    );
});


self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, response.clone()); // Simpan di cache
                    return response;
                });
            })
            .catch(() => {
                return caches.match(event.request).then((response) => {
                    return response || caches.match(OFFLINE_PAGE);
                });
            })
    );
});


self.addEventListener('activate', (event) => {
    console.log(' Activating Service Worker...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log(' Menghapus cache lama:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
