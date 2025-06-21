import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { currentUser } from '../data/mockData';

const ProfileScreen = () => {
  const [profile, setProfile] = useState(currentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState(null);

  const handleSave = () => {
    setIsEditing(false);
    setEditingField(null);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingField(null);
    setProfile(currentUser); // Reset to original data
  };

  const updateField = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const updatePrompt = (index, field, value) => {
    setProfile(prev => ({
      ...prev,
      prompts: prev.prompts.map((prompt, i) =>
        i === index ? { ...prompt, [field]: value } : prompt
      )
    }));
  };

  const updateInterest = (index, value) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.map((interest, i) =>
        i === index ? value : interest
      )
    }));
  };

  const renderEditableField = (label, value, field, multiline = false) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {editingField === field ? (
        <View style={styles.editContainer}>
          <TextInput
            style={[styles.textInput, multiline && styles.multilineInput]}
            value={value}
            onChangeText={(text) => updateField(field, text)}
            multiline={multiline}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
          <View style={styles.editButtons}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setEditingField(null)}
            >
              <Ionicons name="checkmark" size={20} color="#3DBABE" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleCancel}
            >
              <Ionicons name="close" size={20} color="#ff4757" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.fieldValue}
          onPress={() => setEditingField(field)}
        >
          <Text style={styles.fieldText}>{value}</Text>
          <Ionicons name="pencil" size={16} color="#3DBABE" />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderInterests = () => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>Interests</Text>
      <View style={styles.interestsContainer}>
        {profile.interests.map((interest, index) => (
          <View key={index} style={styles.interestTag}>
            {editingField === `interest-${index}` ? (
              <TextInput
                style={styles.interestInput}
                value={interest}
                onChangeText={(text) => updateInterest(index, text)}
                onBlur={() => setEditingField(null)}
                autoFocus
              />
            ) : (
              <TouchableOpacity
                onPress={() => setEditingField(`interest-${index}`)}
                style={styles.interestButton}
              >
                <Text style={styles.interestText}>{interest}</Text>
                <Ionicons name="pencil" size={12} color="#3DBABE" />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );

  const renderPrompts = () => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>Prompts</Text>
      {profile.prompts.map((prompt, index) => (
        <View key={index} style={styles.promptContainer}>
          <Text style={styles.promptQuestion}>{prompt.question}</Text>
          {editingField === `prompt-${index}` ? (
            <View style={styles.editContainer}>
              <TextInput
                style={[styles.textInput, styles.multilineInput]}
                value={prompt.answer}
                onChangeText={(text) => updatePrompt(index, 'answer', text)}
                multiline
                placeholder="Your answer..."
              />
              <View style={styles.editButtons}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setEditingField(null)}
                >
                  <Ionicons name="checkmark" size={20} color="#3DBABE" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleCancel}
                >
                  <Ionicons name="close" size={20} color="#ff4757" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.fieldValue}
              onPress={() => setEditingField(`prompt-${index}`)}
            >
              <Text style={styles.fieldText}>{prompt.answer}</Text>
              <Ionicons name="pencil" size={16} color="#3DBABE" />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerButtons}>
          {isEditing ? (
            <>
              <TouchableOpacity style={styles.headerButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setIsEditing(true)}
            >
              <Ionicons name="pencil" size={24} color="#3DBABE" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: profile.profilePicture }} style={styles.profileImage} />
          <TouchableOpacity style={styles.editImageButton}>
            <Ionicons name="camera" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {renderEditableField('Name', profile.name, 'name')}
        {renderEditableField('Pronouns', profile.pronouns, 'pronouns')}
        {renderEditableField('Birthday', profile.birthday, 'birthday')}
        {renderEditableField('Bio', profile.bio, 'bio', true)}
        
        {renderInterests()}
        {renderPrompts()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 15,
  },
  saveButtonText: {
    color: '#3DBABE',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#ff4757',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 30,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3DBABE',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  fieldContainer: {
    marginBottom: 25,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  fieldValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  fieldText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  editContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
  },
  textInput: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#3DBABE',
  },
  multilineInput: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    marginLeft: 15,
    padding: 5,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  interestTag: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  interestButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interestText: {
    fontSize: 14,
    color: '#333',
    marginRight: 5,
  },
  interestInput: {
    fontSize: 14,
    color: '#333',
    minWidth: 80,
  },
  promptContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  promptQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
});

export default ProfileScreen; 