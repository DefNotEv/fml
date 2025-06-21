import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Heart, MessageCircle, X } from 'lucide-react-native';
import { mockUsers } from '@/mocks/users';
import { useUserStore } from '@/store/useUserStore';
import Colors from '@/constants/colors';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const user = mockUsers.find(user => user.id === id);
  const addLike = useUserStore(state => state.addLike);
  const hasLiked = useUserStore(state => state.hasLiked(id));
  const isMatch = useUserStore(state => state.isMatch(id));
  
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }
  
  const handleLike = () => {
    if (!hasLiked) {
      addLike(id);
      
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    }
  };
  
  const handleMessage = () => {
    router.push(`/chat/${id}`);
  };
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: user.videoUrl }}
            style={styles.video}
            resizeMode="cover"
            shouldPlay={true}
            isLooping
            isMuted={true}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          />
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <X size={24} color={Colors.dark.text} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
              contentFit="cover"
            />
          </View>
          
          <Text style={styles.name}>{user.name}, {user.age}</Text>
          <Text style={styles.location}>{user.location}</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[
                styles.actionButton, 
                hasLiked && styles.likedButton
              ]}
              onPress={handleLike}
              disabled={hasLiked}
            >
              <Heart 
                size={24} 
                color={hasLiked ? Colors.dark.primary : Colors.dark.text} 
                fill={hasLiked ? Colors.dark.primary : 'transparent'} 
              />
              <Text style={[
                styles.actionButtonText,
                hasLiked && styles.likedButtonText
              ]}>
                {hasLiked ? 'Liked' : 'Like'}
              </Text>
            </TouchableOpacity>
            
            {isMatch && (
              <TouchableOpacity 
                style={styles.messageButton}
                onPress={handleMessage}
              >
                <MessageCircle size={24} color={Colors.dark.text} />
                <Text style={styles.actionButtonText}>Message</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.bio}>{user.bio}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={styles.interestsContainer}>
              {user.interests.map((interest, index) => (
                <View key={index} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  videoContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
  },
  video: {
    height: '100%',
    width: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.dark.background,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.dark.text,
    textAlign: 'center',
    marginTop: 16,
  },
  location: {
    fontSize: 16,
    color: Colors.dark.subtext,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.card,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginHorizontal: 8,
    minWidth: 120,
  },
  likedButton: {
    backgroundColor: 'rgba(255, 94, 135, 0.2)',
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginHorizontal: 8,
    minWidth: 120,
  },
  actionButtonText: {
    color: Colors.dark.text,
    fontWeight: '600',
    marginLeft: 8,
  },
  likedButtonText: {
    color: Colors.dark.primary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    color: Colors.dark.text,
    lineHeight: 24,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    color: Colors.dark.text,
    fontSize: 14,
  },
  errorText: {
    color: Colors.dark.text,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
});