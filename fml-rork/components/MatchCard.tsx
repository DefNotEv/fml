import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { formatDistanceToNow } from '@/utils/dateUtils';
import Colors from '@/constants/colors';
import { User, Match } from '@/types';
import type { RelativePathString } from "expo-router";

interface MatchCardProps {
  match: Match;
  user: User;
}

export default function MatchCard({ match, user }: MatchCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push({ pathname: "/chat/[id]" as RelativePathString, params: { id: user.id } });
  };
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
    >
      <Image
        source={{ uri: user.avatar }}
        style={styles.avatar}
        contentFit="cover"
        transition={200}
      />
      
      <View style={styles.infoContainer}>
        <View style={styles.nameTimeContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.time}>{formatDistanceToNow(match.timestamp)}</Text>
        </View>
        
        {match.lastMessage ? (
          <Text 
            style={[
              styles.message, 
              !match.lastMessage.isRead && styles.unreadMessage
            ]}
            numberOfLines={1}
          >
            {match.lastMessage.text}
          </Text>
        ) : (
          <Text style={styles.newMatch}>New match! Say hello 👋</Text>
        )}
      </View>
      
      {match.lastMessage && !match.lastMessage.isRead && (
        <View style={styles.unreadIndicator} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    backgroundColor: Colors.dark.card,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  time: {
    fontSize: 12,
    color: Colors.dark.subtext,
  },
  message: {
    fontSize: 14,
    color: Colors.dark.subtext,
  },
  unreadMessage: {
    color: Colors.dark.text,
    fontWeight: '500',
  },
  newMatch: {
    fontSize: 14,
    color: Colors.dark.primary,
    fontStyle: 'italic',
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.dark.primary,
    alignSelf: 'center',
    marginLeft: 8,
  },
});