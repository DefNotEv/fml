import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CommentSection from './CommentSection';

const { width, height } = Dimensions.get('window');

const VideoCard = ({ video, user, onUserPress, onLike, onComment, shouldPlay = true }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(shouldPlay);
  const [showComments, setShowComments] = useState(false);
  const videoRef = useRef(null);

  // Handle shouldPlay prop changes
  useEffect(() => {
    if (shouldPlay && !isPlaying) {
      videoRef.current?.playAsync();
      setIsPlaying(true);
    } else if (!shouldPlay && isPlaying) {
      videoRef.current?.pauseAsync();
      setIsPlaying(false);
    }
  }, [shouldPlay]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (onLike) onLike(video.id, !isLiked);
  };

  const handleVideoPress = () => {
    if (isPlaying) {
      videoRef.current?.pauseAsync();
    } else {
      videoRef.current?.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleCommentPress = () => {
    console.log('Comment button pressed, opening comment section');
    setShowComments(true);
  };

  const closeComments = () => {
    console.log('Closing comment section');
    setShowComments(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.videoContainer} onPress={handleVideoPress}>
        <Video
          ref={videoRef}
          source={{ uri: video.videoUrl }}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          shouldPlay={shouldPlay}
          isLooping={true}
          isMuted={false}
          onPlaybackStatusUpdate={(status) => {
            // Update playing state based on video status
            if (status.isLoaded) {
              setIsPlaying(status.isPlaying);
            }
          }}
        />
      </TouchableOpacity>

      {/* Right side actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Ionicons 
            name={isLiked ? "heart" : "heart-outline"} 
            size={30} 
            color={isLiked ? "#ff4757" : "white"} 
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleCommentPress}>
          <Ionicons name="chatbubble-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Bottom info with full-width gradient */}
      <View style={styles.bottomContainer}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <View style={styles.contentContainer}>
            <View style={styles.userInfo}>
              <TouchableOpacity style={styles.userContainer} onPress={() => onUserPress && onUserPress(user.id)}>
                <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
                <Text style={styles.username}>{user.name}</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.caption}>{video.caption}</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Comment Section Modal */}
      <CommentSection
        visible={showComments}
        onClose={closeComments}
        videoId={video.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: 'black',
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  actionsContainer: {
    position: 'absolute',
    right: 15,
    bottom: 150,
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 10, // Add padding to make touch target larger
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  gradient: {
    width: '100%',
    paddingTop: 50,
    paddingBottom: 100,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  caption: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default VideoCard; 