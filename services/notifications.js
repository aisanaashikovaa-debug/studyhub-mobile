import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function sendTestNotification() {
  const permission = await Notifications.requestPermissionsAsync();
  if (!permission.granted) throw new Error('Notification permission denied');
  await Notifications.scheduleNotificationAsync({
    content: { title: 'StudyHub reminder', body: 'Your test notification is working!' },
    trigger: null,
  });
}
