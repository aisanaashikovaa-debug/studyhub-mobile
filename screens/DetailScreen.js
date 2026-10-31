import React from 'react';
import { ScrollView, Text, Image, Pressable, StyleSheet } from 'react-native';
export default function DetailScreen({ item, onBack, onFavorite, isFavorite }) {
  if (!item) return null;
  return <ScrollView contentContainerStyle={s.wrap}>
    <Pressable onPress={onBack}><Text style={s.link}>← Back</Text></Pressable>
    <Image source={{ uri: item.thumbnail }} style={s.image} />
    <Text style={s.title}>{item.title}</Text>
    <Text>Category: {item.category}</Text><Text>Price: ${item.price}</Text>
    <Text style={s.description}>{item.description}</Text>
    <Pressable onPress={() => onFavorite(item)} style={s.button}><Text style={s.buttonText}>{isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}</Text></Pressable>
  </ScrollView>;
}
const s = StyleSheet.create({ wrap: { padding: 20, gap: 12 }, link: { color: '#1d6ca3', fontSize: 17 }, image: { height: 220, resizeMode: 'contain' }, title: { fontSize: 26, fontWeight: '800' }, description: { lineHeight: 22, marginVertical: 12 }, button: { padding: 15, borderRadius: 10, backgroundColor: '#275d91' }, buttonText: { textAlign: 'center', color: 'white' } });
