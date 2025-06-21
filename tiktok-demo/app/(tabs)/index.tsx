import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, FlatList, ListRenderItem, Text, Image, Pressable, Modal, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { Video } from 'expo-av';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { height } = Dimensions.get('window');

type VideoItem = { id: string; url: string; username: string; avatar: string };

type Comment = { id: string; user: string; text: string };

const videos: VideoItem[] = [
  { id: '1', url: 'https://www.w3schools.com/html/mov_bbb.mp4', username: 'alice', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '2', url: 'https://samplelib.com/mp4/sample-5s.mp4', username: 'bob', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: '3', url: 'https://www.w3schools.com/html/movie.mp4', username: 'carol', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
];

export default function TikTokDemo() {
  const router = useRouter();
  const [liked, setLiked] = useState<{ [id: string]: boolean }>({});
  const [commentModal, setCommentModal] = useState<string | null>(null); // video id or null
  const [comments, setComments] = useState<{ [id: string]: Comment[] }>({});
  const [input, setInput] = useState('');

  const openComments = (id: string) => setCommentModal(id);
  const closeComments = () => setCommentModal(null);

  const handleSend = () => {
    if (!input.trim() || !commentModal) return;
    setComments(prev => ({
      ...prev,
      [commentModal]: [
        ...(prev[commentModal] || []),
        { id: Math.random().toString(), user: 'you', text: input.trim() },
      ],
    }));
    setInput('');
  };

  const renderItem: ListRenderItem<VideoItem> = ({ item }) => (
    <View style={styles.videoContainer}>
      <Video
        source={{ uri: item.url }}
        style={styles.video}
        resizeMode="cover"
        isLooping
        shouldPlay
        useNativeControls={false}
      />
      <Pressable
        style={styles.profileOverlay}
        onPress={() => router.push({ pathname: '/(tabs)/profile', params: { username: item.username, avatar: item.avatar } })}
      >
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{item.username.toLowerCase()}</Text>
      </Pressable>
      <View style={styles.rightButtons}>
        <Pressable onPress={() => setLiked(l => ({ ...l, [item.id]: !l[item.id] }))} style={styles.iconButton}>
          <MaterialIcons name={liked[item.id] ? 'favorite' : 'favorite-border'} size={36} color={liked[item.id] ? '#9939B8' : '#fff'} />
        </Pressable>
        <Pressable style={styles.iconButton} onPress={() => openComments(item.id)}>
          <MaterialIcons name="chat-bubble-outline" size={36} color="#fff" />
        </Pressable>
      </View>
      {/* Comment Modal */}
      <Modal
        visible={commentModal === item.id}
        animationType="slide"
        transparent
        onRequestClose={closeComments}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Send a message</Text>
              <Pressable onPress={closeComments}>
                <MaterialIcons name="close" size={28} color="#333" />
              </Pressable>
            </View>
            <FlatList
              data={comments[item.id] || []}
              keyExtractor={c => c.id}
              renderItem={({ item: c }) => (
                <View style={styles.commentRow}>
                  <Text style={styles.commentUser}>{c.user.toLowerCase()}:</Text>
                  <Text style={styles.commentText}>{c.text.toLowerCase()}</Text>
                </View>
              )}
              style={styles.commentList}
            />
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Add a comment..."
                placeholderTextColor="#888"
                value={input}
                onChangeText={setInput}
                onSubmitEditing={handleSend}
                returnKeyType="send"
              />
              <Pressable onPress={handleSend} style={styles.sendButton}>
                <MaterialIcons name="send" size={24} color="#3DBABE" />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );

  return (
    <FlatList
      data={videos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToAlignment="start"
      decelerationRate="fast"
    />
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    height,
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    height: '100%',
    width: '100%',
  },
  profileOverlay: {
    position: 'absolute',
    left: 16,
    bottom: 110,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rightButtons: {
    position: 'absolute',
    right: 16,
    bottom: 180,
    alignItems: 'center',
    gap: 24,
  },
  iconButton: {
    marginBottom: 8,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  commentList: {
    marginBottom: 8,
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUser: {
    fontWeight: 'bold',
    marginRight: 4,
    color: '#3DBABE',
  },
  commentText: {
    color: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  input: {
    flex: 1,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    fontSize: 16,
    marginRight: 8,
    color: '#333',
  },
  sendButton: {
    padding: 6,
  },
});
