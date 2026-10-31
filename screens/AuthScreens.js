import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
import { readJson, writeJson } from '../services/storage';

function Field({ value, onChangeText, placeholder, secureTextEntry }) {
  return <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder}
    secureTextEntry={secureTextEntry} autoCapitalize="none" style={styles.field} />;
}
const Action = ({ title, onPress }) => <Pressable style={styles.button} onPress={onPress}><Text style={styles.buttonText}>{title}</Text></Pressable>;

export function SignupScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signup = async () => {
    if (!username.trim() || !email.includes('@') || password.length < 6) {
      Alert.alert('Signup error', 'Enter a username, valid email, and password with at least 6 characters.'); return;
    }
    await writeJson('demoUser', { username, email: email.trim().toLowerCase(), password });
    Alert.alert('Registered', 'Demo account saved on this device. Please log in.'); onLogin();
  };
  return <View style={styles.container}><Text style={styles.heading}>Create an account</Text>
    <Field placeholder="Username" value={username} onChangeText={setUsername} />
    <Field placeholder="Email" value={email} onChangeText={setEmail} />
    <Field placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
    <Action title="Sign Up" onPress={signup} /><Action title="Already have an account? Login" onPress={onLogin} />
  </View>;
}
export function LoginScreen({ onSignup, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = async () => {
    const saved = await readJson('demoUser', null);
    if (!saved || saved.email !== email.trim().toLowerCase() || saved.password !== password) {
      Alert.alert('Login error', 'Invalid email or password.'); return;
    }
    onSuccess(saved.username);
  };
  return <View style={styles.container}><Text style={styles.heading}>Welcome back</Text>
    <Field placeholder="Email" value={email} onChangeText={setEmail} />
    <Field placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
    <Action title="Login" onPress={login} /><Action title="New here? Sign Up" onPress={onSignup} />
  </View>;
}
const styles = StyleSheet.create({
  container: { padding: 20, gap: 14 }, heading: { fontSize: 27, fontWeight: '700', color: '#183755', marginBottom: 12 },
  field: { backgroundColor: 'white', borderColor: '#cad4e0', borderWidth: 1, borderRadius: 12, padding: 13 },
  button: { backgroundColor: '#275d91', padding: 15, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '700' },
});
