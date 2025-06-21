import React from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  Text,
  TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useUserStore } from '@/store/useUserStore';
import { mockUsers } from '@/mocks/users';
import MatchCard from '@/components/MatchCard';
import Colors from '@/constants/colors';
import { User } from '@/types';
import type { RelativePathString } from "expo-router";

export default function MatchesScreen() {
  const router = useRouter();
  const matches = useUserStore(state => state.matches);
  
  // Get user data for each match
  const matchesWithUsers = matches.map(match => {
    const user = mockUsers.find(user => user.id === match.matchedUserId);
    return { match, user };
  }).filter(item => item.user) as { match: typeof matches[0], user: User }[];
  
  const handleViewProfile = (userId: string) => {
    router.push({ pathname: "/profile/[id]" as RelativePathString, params: { id: userId } });
  };
  
  if (matches.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }}
          style={styles.emptyImage}
          contentFit="cover"
        />
        <Text style={styles.emptyTitle}>No Matches Yet</Text>
        <Text style={styles.emptyText}>
          Start liking videos to match with people who like you back
        </Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={matchesWithUsers}
        keyExtractor={(item) => item.match.id}
        renderItem={({ item }) => (
          <MatchCard match={item.match} user={item.user} />
        )}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.title}>Your Matches</Text>
            <Text style={styles.subtitle}>
              {matches.length} {matches.length === 1 ? 'person' : 'people'} matched with you
            </Text>
          </View>
        )}
        ListFooterComponent={() => <View style={{ height: 20 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.subtext,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.dark.background,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 24,
    borderRadius: 100,
    opacity: 0.8,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.dark.subtext,
    textAlign: 'center',
    lineHeight: 24,
  },
});