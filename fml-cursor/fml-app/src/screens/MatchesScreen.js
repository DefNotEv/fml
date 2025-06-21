import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
  Text,
} from 'react-native';
import VideoCard from '../components/VideoCard';
import { mockMatches, mockUsers, mockVideos } from '../data/mockData';

const { height } = Dimensions.get('window');

const MatchesScreen = () => {
  const [matches, setMatches] = useState(mockMatches);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const flatListRef = useRef(null);

  // Filter videos to only show those from users who matched with you
  const matchedUserIds = matches.map(match => match.userId);
  const matchedVideos = mockVideos.filter(video => 
    matchedUserIds.includes(video.userId)
  );

  const handleLike = (videoId, isLiked) => {
    // Handle like action for matched videos
    console.log('Liked video:', videoId, isLiked);
  };

  const handleUserPress = (userId) => {
    // Navigate to user profile
    console.log('Navigate to matched user profile:', userId);
  };

  const handleComment = (videoId) => {
    // Handle comment action
    console.log('Open comments for matched video:', videoId);
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentVideoIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderVideo = ({ item, index }) => {
    const user = mockUsers.find(u => u.id === item.userId);
    const match = matches.find(m => m.userId === item.userId);
    const isCurrentVideo = index === currentVideoIndex;
    
    return (
      <View style={styles.videoContainer}>
        <VideoCard
          video={item}
          user={user}
          onUserPress={handleUserPress}
          onLike={handleLike}
          onComment={handleComment}
          shouldPlay={isCurrentVideo}
        />
        {match?.isNew && (
          <View style={styles.newMatchBadge}>
            <Text style={styles.newMatchText}>NEW MATCH!</Text>
          </View>
        )}
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No Matches Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start liking videos to get matches! When someone likes you back, their videos will appear here.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      
      {matchedVideos.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={matchedVideos}
          renderItem={renderVideo}
          keyExtractor={(item) => item.id}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          snapToInterval={height}
          snapToAlignment="start"
          decelerationRate="fast"
          style={styles.flatList}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          removeClippedSubviews={false}
        />
      ) : (
        renderEmptyState()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  flatList: {
    flex: 1,
  },
  videoContainer: {
    position: 'relative',
  },
  newMatchBadge: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#ff4757',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    zIndex: 10,
  },
  newMatchText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default MatchesScreen; 