import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Dimensions,
  Platform
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { MessageCircle, X } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { User } from '@/types';

interface MatchModalProps {
  visible: boolean;
  onClose: () => void;
  matchedUser: User | null;
}

const { width } = Dimensions.get('window');

export default function MatchModal({ visible, onClose, matchedUser }: MatchModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (visible && Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [visible]);

  if (!matchedUser) return null;

  const handleMessage = () => {
    onClose();
    router.push(`/chat/${matchedUser.id}`);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={[Colors.dark.primary, Colors.dark.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
          >
            <X size={24} color={Colors.dark.text} />
          </TouchableOpacity>
          
          <View style={styles.content}>
            <Text style={styles.matchText}>It's a Match!</Text>
            <Text style={styles.matchSubtext}>You and {matchedUser.name} liked each other</Text>
            
            <View style={styles.avatarsContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }}
                style={styles.avatar}
              />
              <Image
                source={{ uri: matchedUser.avatar }}
                style={styles.avatar}
              />
            </View>
            
            <TouchableOpacity 
              style={styles.messageButton}
              onPress={handleMessage}
            >
              <MessageCircle size={20} color={Colors.dark.text} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Send a Message</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.keepSwipingButton}
              onPress={onClose}
            >
              <Text style={styles.keepSwipingText}>Keep Browsing</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  gradientBackground: {
    width: width * 0.9,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 30,
  },
  matchText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 10,
  },
  matchSubtext: {
    fontSize: 16,
    color: Colors.dark.text,
    opacity: 0.8,
    marginBottom: 30,
    textAlign: 'center',
  },
  avatarsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.dark.text,
    marginHorizontal: 10,
  },
  messageButton: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
  keepSwipingButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.dark.text,
    width: '100%',
    alignItems: 'center',
  },
  keepSwipingText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
});