self.addEventListener('push', function(event) {
  const title = 'Takanam.in';

  const options = {
    body: event.data.text(),
    icon: 'images/icon_m.png',
    badge: 'images/icon_s.png',
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: 'normal'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
  console.log('On notification click: ', event.notification.tag);
  console.log(event)
  event.notification.close();
  clients.openWindow("/");
}, false);
