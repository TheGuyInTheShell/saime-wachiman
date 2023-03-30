
export function customNotificaction() {
    const options = {
      body: "Cuerpo",
      icon: "img/icons/icon-72x72.png",
    };
    const notification = new Notification("hola mundo", options);
    notification.onclick = () => {
      console.log("click");
    };
  }
  
  
export async function getPublickey() {
  return fetch("app/key")
    .then((res) => res.arrayBuffer())
    .then((key) => new Uint8Array(key))
    .catch(console.log);
  }
    
    
export function notifyMe() {
  if (!window.Notification) {
    console.log("No posee notificaciones");
    return;
  }
  const permission = Notification.permission;
  if (permission === "granted") {
    customNotificaction();
  } else if (permission !== "denied" || permission === "default") {
    Notification.requestPermission( (permission) => {
      if (permission === "granted") {
        customNotificaction();
      }
    });
  }
}
  
export function downSub() {
    worker.pushManager.getSubscription().then((sub) => {
      sub.unsubscribe().then(() =>
        console.log('down sub')
          ).catch(console.log);
    });
  }
  
