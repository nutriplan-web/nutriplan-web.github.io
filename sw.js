// Service Worker de Recetario 365: instala la app completa (incluidos los datos de
// recetas y fotos) para que funcione rápida, estable y sin conexión.
const CACHE = 'recetario365-v15';
const ASSETS = [
  './', './index.html', './app.js', './styles.css', './icon.svg', './manifest.json',
  './icon-192.png', './icon-512.png',
  './recipes.json', './world_recipes.json', './menu_images.json', './secciones.json',
  './i18n_ro.json', './i18n_es.json', './i18n_en.json',
  './catalog_ro.json', './catalog_en.json'
];
// Ficheros de datos grandes que no cambian entre versiones: se sirven de caché.
const DATA_FILES = ['recipes.json', 'world_recipes.json', 'menu_images.json', 'catalog_ro.json', 'catalog_en.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  // Solo gestionamos recursos propios; lo externo (fotos, contador) va directo a la red.
  if (url.origin !== location.origin) return;

  // Las fotos del menú (img/) tampoco cambian: caché primero.
  const isData = DATA_FILES.some((f) => url.pathname.endsWith('/' + f)) || url.pathname.includes('/img/');
  if (isData) {
    // Datos empaquetados: caché primero (instantáneo y fiable), red solo si faltan.
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return response;
      }))
    );
    return;
  }

  // App (HTML/JS/CSS): red primero para recibir actualizaciones al instante,
  // con la copia en caché como respaldo cuando no hay conexión.
  event.respondWith(
    fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() =>
      caches.match(event.request).then((cached) => cached || caches.match('./index.html'))
    )
  );
});
