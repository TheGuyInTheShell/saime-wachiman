importScripts("service/utils/sw-utils.js");

const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";
const INMUTABLE_CACHE = "inmutable-v1";

const APP_SHELL = [
	// '/',
	"index.html",
	"style/style.css",
	"favicon.ico",
	"icon-512x512.png",
	"assets/banner_saime.jpg",
	"assets/saime_wachiman_logo.png",
	"assets/Saime.jpg",
	"app/index.js",
	"app/utils/hiddenBtn.js",
	"app/utils/subs.js",
	"app/events/btnSub.js",
	"app/events/btnUnsub.js",
	"app/socketsEvents/changeStatus.js",
	"service/utils/sw-utils.js",
	"service/initWorker.js",
];

const APP_SHELL_INMUTABLE = [
	"https://fonts.googleapis.com/css2?family=Lato:wght@100;400;700&display=swap",
];

self.addEventListener("install", (e) => {
	const cacheStatic = caches
		.open(STATIC_CACHE)
		.then((cache) => cache.addAll(APP_SHELL));

	const cacheInmutable = caches
		.open(INMUTABLE_CACHE)
		.then((cache) => cache.addAll(APP_SHELL_INMUTABLE));

	e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

self.addEventListener("activate", (e) => {
	const respuesta = caches.keys().then((keys) => {
		keys.forEach((key) => {
			if (key !== STATIC_CACHE && key.includes("static")) {
				return caches.delete(key);
			}

			if (key !== DYNAMIC_CACHE && key.includes("dynamic")) {
				return caches.delete(key);
			}
		});
	});

	e.waitUntil(respuesta);
});

self.addEventListener("fetch", (e) => {
	const respuesta = caches.match(e.request).then((res) => {
		if (res) {
			return res;
		} else {
			return fetch(e.request).then((newRes) => {
				return updateCache(DYNAMIC_CACHE, e.request, newRes);
			});
		}
	});

	e.respondWith(respuesta);
});

self.addEventListener("push", (e) => {
	const data = JSON.parse(e.data.text());

	const title = data.title;
	const options = {
		body: data.content,
		icon: "assets/Saime.jpg",
		badge: "favicon.ico",
		vibrate: [1000, 225, 300, 500, 1000],
		data: {
			url: "https://siic.saime.gob.ve",
			id: "Server",
		},
	};

	e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (e) => {
	const { notification, action } = e;
	console.log(notification);
	const res = clients.matchAll().then((clts) => {
		const clienteOn = clts.find((cliente) => {
			return cliente.visibilityState === "visible";
		});
		if (clienteOn) {
			clienteOn.navigate(notification.data.url);
			clienteOn.focus();
		} else {
			clients.openWindows(notification.data.url);
		}
		return notification.close();
	});

	e.waitUntil(res);
});
