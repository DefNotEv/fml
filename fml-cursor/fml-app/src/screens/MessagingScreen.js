import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockMatches, mockUsers, mockMessages } from '../data/mockData';

const MessagingScreen = () => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const getMatchUser = (matchId) => {
    const match = mockMatches.find(m => m.id === matchId);
    return mockUsers.find(u => u.id === match?.userId);
  };

  const getLastMessage = (matchId) => {
    const matchMessages = messages.filter(m => m.matchId === matchId);
    return matchMessages[matchMessages.length - 1];
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedMatch) {
      const message = {
        id: Date.now().toString(),
        matchId: selectedMatch,
        senderId: 'currentUser',
        message: newMessage.trim(),
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const renderConversationItem = ({ item }) => {
    const user = getMatchUser(item.id);
    const lastMessage = getLastMessage(item.id);

    return (
      <TouchableOpacity
        style={styles.conversationItem}
        onPress={() => setSelectedMatch(item.id)}
      >
        <Image source={{ uri: user?.profilePicture }} style={styles.conversationAvatar} />
        <View style={styles.conversationInfo}>
          <Text style={styles.conversationName}>{user?.name}</Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {lastMessage?.message || 'Start a conversation!'}
          </Text>
        </View>
        {item.isNew && <View style={styles.newIndicator} />}
      </TouchableOpacity>
    );
  };

  const renderMessage = ({ item }) => {
    const isOwnMessage = item.senderId === 'currentUser';
    const user = getMatchUser(selectedMatch);

    return (
      <View style={[
        styles.messageContainer,
        isOwnMessage ? styles.ownMessage : styles.otherMessage
      ]}>
        {!isOwnMessage && (
          <Image source={{ uri: user?.profilePicture }} style={styles.messageAvatar} />
        )}
        <View style={[
          styles.messageBubble,
          isOwnMessage ? styles.ownBubble : styles.otherBubble
        ]}>
          <Text style={[
            styles.messageText,
            isOwnMessage ? styles.ownMessageText : styles.otherMessageText
          ]}>
            {item.message}
          </Text>
        </View>
      </View>
    );
  };

  const renderChatScreen = () => {
    const user = getMatchUser(selectedMatch);
    const chatMessages = messages.filter(m => m.matchId === selectedMatch);

    return (
      <View style={styles.chatContainer}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setSelectedMatch(null)}>
            <Ionicons name="arrow-back" size={24} color="#3DBABE" />
          </TouchableOpacity>
          <Image source={{ uri: user?.profilePicture }} style={styles.chatAvatar} />
          <Text style={styles.chatName}>{user?.name}</Text>
        </View>

        <FlatList
          data={chatMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          inverted
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.messageInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={newMessage.trim() ? "white" : "#ccc"} 
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  };

  const renderConversationsList = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      <FlatList
        data={mockMatches}
        renderItem={renderConversationItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {selectedMatch ? renderChatScreen() : renderConversationsList()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3DBABE',
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  conversationAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  conversationInfo: {
    flex: 1,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  newIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ff4757',
  },
  chatContainer: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 15,
  },
  chatName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  ownMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '70%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  ownBubble: {
    backgroundColor: '#3DBABE',
  },
  otherBubble: {
    backgroundColor: '#f0f0f0',
  },
  messageText: {
    fontSize: 16,
  },
  ownMessageText: {
    color: 'white',
  },
  otherMessageText: {
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3DBABE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
});

export default MessagingScreen; 