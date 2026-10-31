import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SignupScreen, LoginScreen } from './screens/AuthScreens';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import { SettingsMenu, SettingsScreen, NotificationScreen } from './screens/SettingsScreens';
import { readJson, writeJson } from './services/storage';
import { fetchItems } from './services/api';

export default function App() {
  const [screen, setScreen] = useState('Login');
  const [username, setUsername] = useState('');
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    (async () => {
      setFavorites(await readJson('favorites', []));
      setNotificationsEnabled(await readJson('notificationsEnabled', false));
      try { setItems(await fetchItems()); } catch (err) { setError(err.message); }
      setLoading(false);
    })();
  }, []);
  const toggleFavorite = (item) => {
    const next = favorites.some(x => x.id === item.id) ? favorites.filter(x => x.id !== item.id) : [...favorites, item];
    setFavorites(next); writeJson('favorites', next);
  };
  const setEnabled = (value) => { setNotificationsEnabled(value); writeJson('notificationsEnabled', value); };
  const navigate = (next) => setScreen(next);
  const openItem = (item) => { setSelected(item); setScreen('Detail'); };
  return <SafeAreaProvider><SafeAreaView style={s.root}>
    {loading ? <ActivityIndicator size="large" style={{ marginTop: 40 }} /> : <>
      {screen === 'Login' && <LoginScreen onSignup={() => navigate('Signup')} onSuccess={name => { setUsername(name); navigate('Home'); }} />}
      {screen === 'Signup' && <SignupScreen onLogin={() => navigate('Login')} />}
      {screen === 'Home' && <><Text style={s.hello}>Hello, {username}!</Text>{error ? <Text style={s.error}>{error}</Text> : null}
        <HomeScreen items={items} favorites={favorites} onDetail={openItem} onFavorite={toggleFavorite} onMenu={() => navigate('Menu')} /></>}
      {screen === 'Detail' && <DetailScreen item={selected} onBack={() => navigate('Home')} onFavorite={toggleFavorite} isFavorite={favorites.some(x => x.id === selected?.id)} />}
      {screen === 'Favorites' && <ScrollView><Text style={s.heading}>♥ Favorites</Text><HomeScreen items={favorites} favorites={favorites} onDetail={openItem} onFavorite={toggleFavorite} onMenu={() => navigate('Menu')} /></ScrollView>}
      {screen === 'Menu' && <SettingsMenu navigate={navigate} />}
      {screen === 'Settings' && <SettingsScreen enabled={notificationsEnabled} onEnabled={setEnabled} />}
      {screen === 'Notifications' && <NotificationScreen enabled={notificationsEnabled} onEnabled={setEnabled} />}
      {screen !== 'Login' && screen !== 'Signup' && <View style={s.footer}>
        <Pressable onPress={() => navigate('Home')}><Text style={s.link}>⌂ Home</Text></Pressable>
        <Pressable onPress={() => navigate('Favorites')}><Text style={s.link}>♥ Favorites</Text></Pressable>
        <Pressable onPress={() => navigate('Menu')}><Text style={s.link}>⚙ Settings</Text></Pressable>
      </View>}
    </>}
  </SafeAreaView></SafeAreaProvider>;
}
const s = StyleSheet.create({ root: { flex: 1, backgroundColor: '#edf4fa' }, footer: { flexDirection: 'row', justifyContent: 'space-around', padding: 16, borderTopColor: '#cbd7e6', borderTopWidth: 1, backgroundColor: 'white' }, link: { fontWeight: '700', color: '#275d91' }, hello: { paddingHorizontal: 16, paddingTop: 8, color: '#596e83' }, heading: { fontSize: 28, fontWeight: '800', padding: 20 }, error: { padding: 16, color: '#b42222' } });
