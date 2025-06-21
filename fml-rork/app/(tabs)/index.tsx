import React, { useState, useRef, useCallback } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  Dimensions, 
  ActivityIndicator,
  Text
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import VideoCard from '@/components/VideoCard';
import MatchModal from '@/components/MatchModal';
import { mockUsers } from '@/mocks/users';
import { useUserStore } from '@/store/useUserStore';
import Colors from '@/constants/colors';
import { User } from '@/types';
import type { ViewToken } from 'react-native';

const { height } = Dimensions.get('window');

export default function DiscoverScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  
  const flatListRef = useRef<FlatList>(null);
  const addLike = useUserStore(state => state.addLike);
  const isMatch = useUserStore(state => state.isMatch);
  const viewedUsers = useUserStore(state => state.viewedUsers);
  const addViewedUser = useUserStore(state => state.addViewedUser);
  const resetViewedUsers = useUserStore(state => state.resetViewedUsers);
  
  // Filter out already viewed users
  const filteredUsers = mockUsers.filter(user => !viewedUsers.includes(user.id));
  
  useFocusEffect(
    useCallback(() => {
      // Reset viewed users when the screen is focused if all users have been viewed
      if (filteredUsers.length === 0) {
        resetViewedUsers();
      }
    }, [filteredUsers.length, resetViewedUsers])
  );
  
  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index ?? 0);
        addViewedUser(viewableItems[0].item.id);
      }
    },
    [addViewedUser]
  );
  
  const handleLike = (user: User) => {
    addLike(user.id);
    
    // Check if it's a match after liking
    setTimeout(() => {
      if (isMatch(user.id)) {
        setMatchedUser(user);
        setShowMatchModal(true);
      }
    }, 1000);
  };
  
  if (filteredUsers.length === 0 && loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.dark.primary} />
        <Text style={styles.loadingText}>Finding new people...</Text>
      </View>
    );
  }
  
  if (filteredUsers.length === 0) {
    setLoading(true);
    // Simulate loading new users
    setTimeout(() => {
      resetViewedUsers();
      setLoading(false);
    }, 2000);
    
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.dark.primary} />
        <Text style={styles.loadingText}>Finding new people...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={filteredUsers}
        renderItem={({ item, index }) => (
          <VideoCard 
            user={item} 
            isActive={index === activeIndex}
            onLike={() => handleLike(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50
        }}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={3}
      />
      
      <MatchModal 
        visible={showMatchModal}
        onClose={() => setShowMatchModal(false)}
        matchedUser={matchedUser}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
  },
  loadingText: {
    color: Colors.dark.text,
    marginTop: 16,
    fontSize: 16,
  },
});