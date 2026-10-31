import React, { useState } from 'react';
import { View, Text, Switch, Pressable, Alert, StyleSheet } from 'react-native';
import { sendTestNotification } from '../services/notifications';
export function SettingsMenu({ navigate }) {
  return <View style={s.wrap}><Text style={s.title}>Settings Menu</Text>
    {['Settings', 'Notifications', 'Favorites', 'Home'].map(page => <Pressable key={page} style={s.button} onPress={() => navigate(page)}><Text style={s.white}>{page} →</Text></Pressable>)}
  </View>;
}
export function SettingsScreen({ enabled, onEnabled }) {
  return <View style={s.wrap}><Text style={s.title}>Settings</Text>
    <View style={s.row}><Text>Enable notifications</Text><Switch value={enabled} onValueChange={onEnabled} /></View>
    <Text>Preferences are saved locally and restored on restart.</Text>
  </View>;
}
export function NotificationScreen({ enabled, onEnabled }) {
  const [status, setStatus] = useState('No test notification sent yet.');
  const test = async () => {
    if (!enabled) { Alert.alert('Notifications off', 'Enable notifications first.'); return; }
    try { await sendTestNotification(); setStatus('Test notification scheduled successfully.'); }
    catch (err) { Alert.alert('Notification error', err.message); setStatus(err.message); }
  };
  return <View style={s.wrap}><Text style={s.title}>Notifications</Text>
    <View style={s.row}><Text>Allow local notifications</Text><Switch value={enabled} onValueChange={onEnabled} /></View>
    <Pressable style={s.button} onPress={test}><Text style={s.white}>Send Test Notification</Text></Pressable>
    <Text>{status}</Text><Text style={s.hint}>Test on a physical device with Expo Go. Remote push notifications require additional native setup.</Text>
  </View>;
}
const s = StyleSheet.create({ wrap: { padding: 22, gap: 16 }, title: { fontSize: 28, fontWeight: '800', color: '#234d77' }, button: { padding: 16, backgroundColor: '#275d91', borderRadius: 12 }, white: { color: 'white', fontWeight: '700' }, row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, hint: { color: '#67788e' } });
