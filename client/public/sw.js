// todo
self.addEventListener("notificationclick", handleNotificationClick);
function handleNotificationClick(event) {
  event.notification.close();

  if (event.action === "like") {
    console.log("like");
  } else if (event.action === "reply") {
    console.log("reply");
  } else {
    self.clients.openWindow("https://code-assistent.herokuapp.com");
  }
}
// todo
self.addEventListener("push", receivePushNotification);
function receivePushNotification(event) {
  const { title, body, icon, image, actions } = event.data.json();

  //
  if ("actions" in Notification.prototype) {
    const maxVisibleActions = Notification.maxActions;
    if (maxVisibleActions < 4) {
      console.log(
        `❓ This notification will only display ` +
          `${maxVisibleActions} actions.`
      );
    } else {
      oconsole.log(
        `❓ This notification can display up to ` +
          `${maxVisibleActions} actions.`
      );
    }
  } else {
    console.log("Action buttons are NOT supported.");
  }

  if ("badge" in Notification.prototype) {
    console.log("badge -yes");
  } else {
    console.log("badge -no");
  }

  const options = {
    body,
    image,
    actions,
    icon,
  };

  event.waitUntil(self.registration.showNotification(title, options));
}
