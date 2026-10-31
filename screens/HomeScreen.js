import React from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet } from 'react-native';
export default function HomeScreen({ items, favorites, onDetail, onFavorite, onMenu }) {
  return <ScrollView contentContainerStyle={styles.wrap}>
    <View style={styles.header}><Text style={styles.title}>📘 StudyHub</Text>
      <Pressable accessibilityLabel="Open settings menu" onPress={onMenu}><Text style={styles.menu}>☰</Text></Pressable></View>
    <Text style={styles.subtitle}>Explore products from an external API</Text>
    {items.map(item => <View style={styles.card} key={item.id}>
      <Image style={styles.thumb} source={{ uri: item.thumbnail }} />
      <View style={styles.details}><Text style={styles.name}>{item.title}</Text><Text>${item.price}</Text>
        <View style={styles.row}><Pressable onPress={() => onDetail(item)}><Text style={styles.link}>View details →</Text></Pressable>
          <Pressable onPress={() => onFavorite(item)}><Text style={styles.link}>{favorites.some(x => x.id === item.id) ? '♥ Saved' : '♡ Save'}</Text></Pressable></View>
      </View></View>)}
  </ScrollView>;
}
const styles = StyleSheet.create({ wrap: { padding: 16, paddingBottom: 60 }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, title: { fontSize: 27, fontWeight: '800', color: '#234d77' }, menu: { fontSize: 30 }, subtitle: { marginVertical: 18, color: '#586b80' }, card: { backgroundColor: 'white', borderRadius: 12, marginBottom: 12, padding: 12, flexDirection: 'row' }, thumb: { width: 90, height: 100, resizeMode: 'contain' }, details: { flex: 1, paddingLeft: 12, justifyContent: 'space-around' }, name: { fontWeight: '700', fontSize: 16 }, row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }, link: { color: '#1d6ca3', fontWeight: '700' } });
