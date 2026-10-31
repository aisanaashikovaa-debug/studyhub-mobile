import AsyncStorage from '@react-native-async-storage/async-storage';
export const readJson = async (key, fallback) => {
  try { const value = await AsyncStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
};
export const writeJson = (key, value) => AsyncStorage.setItem(key, JSON.stringify(value));
