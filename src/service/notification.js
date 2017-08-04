import FCM from 'react-native-fcm';
import { AsyncStorage } from 'react-native';

export function listenNotification() {
  // FCM.requestPermissions();
  return FCM.getInitialNotification().then((notif) => {
    if (notif && notif.body !== undefined) {
      return notif;
    }
  });
}
export function handleNotification(data) {
  FCM.removeAllDeliveredNotifications(data);
  FCM.cancelAllLocalNotifications();
  return AsyncStorage.getItem('user', (err, result) => {
    if (result !== null) {
      const user = JSON.parse(result);
      if (user.email !== '' && user.registrationid !== '') {
        return user;
      }
    }
  });
}
