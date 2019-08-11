const CACHE_NAME = "my-site-cache-v1";
const urlsToCache = [
  "https://elenanovias.com/",
  "https://elenanovias.com/images/banners/B_WD_2019-2.jpg",
  "https://elenanovias.com/images/slides/S_WD_2019-2.jpeg",
  "https://elenanovias.com/images/banners/B_WD_2018-2.jpeg",
  "https://elenanovias.com/images/banners/B_EWD_2019.jpeg",
  "https://elenanovias.com/images/banners/B_WD_2019.jpg",
  "https://elenanovias.com/templates/elenanovias/css/fonts/Montserrat-Regular.ttf",
  "https://elenanovias.com/templates/elenanovias/css/fonts/Montserrat-Light.ttf",
  "https://elenanovias.com/images/wed_19_2_7.jpg",
  "https://elenanovias.com/images/wed_19_5.jpg",
  "https://elenanovias.com/images/wed_19_2_4.jpg",
  "https://code.jquery.com/jquery-2.2.4.min.js",
  "https://elenanovias.com/templates/elenanovias/js/slick-carusel.min.js",
  "https://code.jquery.com/jquery-migrate-1.4.1.min.js",
  "https://elenanovias.com/templates/elenanovias/css/style.css?v=48"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// In main file
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("srws.js");
}
