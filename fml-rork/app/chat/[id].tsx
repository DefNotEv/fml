import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Send } from 'lucide-react-native';
import { mockUsers } from '@/mocks/users';
import Colors from '@/constants/colors';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'match';
  timestamp: number;
}

// Mock messages for demo
const generateMockMessages = (matchId: string): Message[] => {
  const baseMessages: Message[] = [
    {
      id: '1',
      text: "Hey there! I really liked your video!",
      sender: 'user',
      timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    },
  ];
  
  // Add different responses based on the match
  if (matchId === '1') {
    return [
      ...baseMessages,
      {
        id: '2',
        text: "Thanks! I love hiking and being outdoors. What about you?",
        sender: 'match',
        timestamp: Date.now() - 1000 * 60 * 60 * 23, // 23 hours ago
      },
      {
        id: '3',
        text: "I'm into photography and hiking too! We should go on a trail sometime.",
        sender: 'user',
        timestamp: Date.now() - 1000 * 60 * 60 * 22, // 22 hours ago
      },
    ];
  } else if (matchId === '3') {
    return [
      ...baseMessages,
      {
        id: '2',
        text: "Thank you! I teach yoga classes every weekend. Would you like to join sometime?",
        sender: 'match',
        timestamp: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
      },
    ];
  }
  
  return baseMessages;
};

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  
  const user = mockUsers.find(user => user.id === id);
  
  useEffect(() => {
    if (id) {
      setMessages(generateMockMessages(id));
    }
    
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [id]);
  
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 200);
    }
  }, [messages, keyboardVisible]);
  
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }
  
  const handleSend = () => {
    if (inputText.trim() === '') return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: Date.now(),
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');
    
    // Simulate response after 1-3 seconds
    if (Math.random() > 0.3) { // 70% chance of reply
      const responseTime = 1000 + Math.random() * 2000;
      
      setTimeout(() => {
        const responses = [
          "That sounds great!",
          "I'd love to chat more about that.",
          "Tell me more about yourself!",
          "What do you like to do for fun?",
          "Have you been to any good restaurants lately?",
          "Do you have any travel plans coming up?",
          "I really enjoyed your profile video!",
          "What kind of music do you listen to?",
          "Thanks for the message! How's your day going?",
          "I'm glad we matched! What are you up to this weekend?",
        ];
        
        const responseMessage: Message = {
          id: Date.now().toString(),
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'match',
          timestamp: Date.now(),
        };
        
        setMessages(prevMessages => [...prevMessages, responseMessage]);
      }, responseTime);
    }
  };
  
  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    
    return (
      <View style={[
        styles.messageContainer,
        isUser ? styles.userMessageContainer : styles.matchMessageContainer
      ]}>
        {!isUser && (
          <Image
            source={{ uri: user.avatar }}
            style={styles.avatar}
            contentFit="cover"
          />
        )}
        <View style={[
          styles.messageBubble,
          isUser ? styles.userMessageBubble : styles.matchMessageBubble
        ]}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      </View>
    );
  };
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: user.name,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push(`/profile/${id}`)}>
              <Image
                source={{ uri: user.avatar }}
                style={styles.headerAvatar}
                contentFit="cover"
              />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Say hello to {user.name}! Start a conversation about something you noticed in their video.
              </Text>
            </View>
          )}
        />
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={Colors.dark.subtext}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[
              styles.sendButton,
              !inputText.trim() && styles.disabledSendButton
            ]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Send size={20} color={Colors.dark.text} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messagesList: {
    padding: 16,
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  matchMessageContainer: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    maxWidth: '100%',
  },
  userMessageBubble: {
    backgroundColor: Colors.dark.primary,
    borderBottomRightRadius: 4,
  },
  matchMessageBubble: {
    backgroundColor: Colors.dark.card,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: Colors.dark.text,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: Colors.dark.text,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  disabledSendButton: {
    backgroundColor: Colors.dark.inactive,
    opacity: 0.7,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 100,
  },
  emptyText: {
    color: Colors.dark.subtext,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  errorText: {
    color: Colors.dark.text,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
});