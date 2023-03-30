self.addEventListener("push", (e) => {
  const data = JSON.parse(e.data.text());

  const title = data.title;
  const options = {
    body: data.content,
    icon: 'assets/Saime.jpg',
    badge: "favicon.ico", 
    vibrate: [1000, 225, 300, 500, 1000],
    data: {
      url: "https://siic.saime.gob.ve",
      id: 'Server',
    },
  };

  e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (e) => {
  const {notification, action } = e;
  console.log(notification)
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