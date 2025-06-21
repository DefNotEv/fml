import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  Pressable,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Video } from 'expo-av';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Heart, MessageCircle, Info } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { User } from '@/types';
import Colors from '@/constants/colors';
import { useUserStore } from '@/store/useUserStore';

interface VideoCardProps {
  user: User;
  isActive: boolean;
  onLike: () => void;
}

const { height, width } = Dimensions.get('window');

export default function VideoCard({ user, isActive, onLike }: VideoCardProps) {
  const router = useRouter();
  const videoRef = useRef<Video>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  const hasLiked = useUserStore(state => state.hasLiked(user.id));
  const isMatch = useUserStore(state => state.isMatch(user.id));

  useEffect(() => {
    if (isActive) {
      videoRef.current?.playAsync();
    } else {
      videoRef.current?.pauseAsync();
    }
  }, [isActive]);

  useEffect(() => {
    setLiked(hasLiked);
  }, [hasLiked]);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setShowLikeAnimation(true);
      
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      
      onLike();
      
      setTimeout(() => {
        setShowLikeAnimation(false);
      }, 1000);
    }
  };

  const handleDoubleTap = () => {
    if (!liked) {
      handleLike();
    }
  };

  const handleViewProfile = () => {
    router.push(`/profile/${user.id}`);
  };

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.videoContainer} 
        onPress={handleDoubleTap}
      >
        <Video
          ref={videoRef}
          source={{ uri: user.videoUrl }}
          style={styles.video}
          resizeMode="cover"
          isLooping
          shouldPlay={isActive}
          onLoad={() => setIsLoading(false)}
          onError={(error) => console.log('Video error:', error)}
        />
        
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.dark.primary} />
          </View>
        )}
        
        {/* Gradient overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        />
        
        {/* Like animation */}
        {showLikeAnimation && (
          <View style={styles.likeAnimationContainer}>
            <Heart size={100} color={Colors.dark.primary} fill={Colors.dark.primary} />
          </View>
        )}
        
        {/* User info */}
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}, {user.age}</Text>
            <Text style={styles.userLocation}>{user.location}</Text>
            
            <View style={styles.interestsContainer}>
              {user.interests.map((interest, index) => (
                <View key={index} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        
        {/* Action buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, liked && styles.likedButton]} 
            onPress={handleLike}
          >
            <Heart 
              size={28} 
              color={liked ? Colors.dark.primary : Colors.dark.text} 
              fill={liked ? Colors.dark.primary : 'transparent'} 
            />
            {isMatch && <View style={styles.matchIndicator} />}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleViewProfile}
          >
            <Info size={28} color={Colors.dark.text} />
          </TouchableOpacity>
          
          {isMatch && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push(`/chat/${user.id}`)}
            >
              <MessageCircle size={28} color={Colors.dark.text} />
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: Colors.dark.background,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  likeAnimationContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    padding: 20,
  },
  userInfo: {
    marginBottom: 10,
  },
  userName: {
    color: Colors.dark.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userLocation: {
    color: Colors.dark.subtext,
    fontSize: 16,
    marginBottom: 12,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  interestTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    color: Colors.dark.text,
    fontSize: 14,
  },
  actionButtonsContainer: {
    position: 'absolute',
    right: 16,
    bottom: 120,
    alignItems: 'center',
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  likedButton: {
    backgroundColor: 'rgba(255, 94, 135, 0.2)',
  },
  matchIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.dark.primary,
    borderWidth: 2,
    borderColor: Colors.dark.background,
  },
});