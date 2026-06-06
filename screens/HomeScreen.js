import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  FlatList, StatusBar, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import messages from '../data/messages';

const directories = [
  { name: 'You',     icon: 'person',    color: '#E8522A' },
  { name: 'Home',    icon: 'home',      color: '#185FA5' },
  { name: 'Love',    icon: 'heart',     color: '#993556' },
  { name: 'Family',  icon: 'people',    color: '#3C3489' },
  { name: 'Friends', icon: 'happy',     color: '#0F6E56' },
  { name: 'School',  icon: 'book',      color: '#854F0B' },
];

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = React.useState('');

  const filtered = directories.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => {
    const count = messages[item.name].length;
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: item.color }]}
        onPress={() => navigation.navigate('Messages', {
          category: item.name,
          color: item.color,
          icon: item.icon,
        })}
        activeOpacity={0.85}
      >
        <View style={styles.iconBox}>
          <Ionicons name={item.icon + '-outline'} size={22} color="#fff" />
        </View>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardCount}>{count} messages</Text>
        <Ionicons
          name="arrow-forward"
          size={16}
          color="rgba(255,255,255,0.4)"
          style={styles.arrow}
        />
      </TouchableOpacity>
    );
  };

  const totalMessages = directories.reduce(
    (sum, d) => sum + messages[d.name].length, 0
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Messages</Text>
            <Text style={styles.headerSub}>{totalMessages} total messages</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SC</Text>
          </View>
        </View>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={16} color="rgba(255,255,255,0.45)" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search directories..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={16} color="rgba(255,255,255,0.45)" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.sectionLabel}>YOUR DIRECTORIES</Text>

        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={40} color="#ccc" />
            <Text style={styles.emptyText}>No directories found</Text>
            <Text style={styles.emptySubText}>Try a different search term</Text>
          </View>
        ) : (
          <FlatList
            data={filtered}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 18,
    paddingTop: 52,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  headerSub: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#534AB7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#CECBF6',
    fontSize: 14,
    fontWeight: '700',
  },
  searchBar: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  body: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    paddingTop: 20,
  },
  sectionLabel: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    width: '48%',
    borderRadius: 18,
    padding: 14,
    minHeight: 115,
  },
  iconBox: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cardCount: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    marginTop: 3,
  },
  arrow: {
    position: 'absolute',
    right: 12,
    bottom: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginTop: 12,
  },
  emptySubText: {
    fontSize: 13,
    color: '#bbb',
    marginTop: 4,
  },
});