import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import VideoCard from '../components/VideoCard';
import { mockVideos, mockUsers } from '../data/mockData';

const { height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [videos, setVideos] = useState(mockVideos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleLike = (videoId, isLiked) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId
          ? { ...video, likes: isLiked ? video.likes + 1 : video.likes - 1 }
          : video
      )
    );
  };

  const handleUserPress = (userId) => {
    // Navigate to user profile (we'll implement this later)
    console.log('Navigate to user profile:', userId);
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
    const isCurrentVideo = index === currentVideoIndex;
    
    return (
      <VideoCard
        video={item}
        user={user}
        onUserPress={handleUserPress}
        onLike={handleLike}
        shouldPlay={isCurrentVideo}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <FlatList
        ref={flatListRef}
        data={videos}
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
});

export default HomeScreen; 