# FML - TikTok-Style Social App

A React Native Expo app that combines TikTok-style video scrolling with social dating features.

## Features

### 🏠 Home Page
- TikTok-style vertical video scrolling
- Like, comment, and share buttons
- User profile pictures and names (clickable)
- Video play/pause functionality
- Beautiful gradient overlays

### 🔔 Notifications Page
- Real-time notifications for matches, likes, and comments
- Different notification types with custom icons
- Read/unread status
- Timestamp formatting

### ❤️ Matches Page
- Shows only videos from people who liked you back
- "NEW MATCH!" badges for recent matches
- Same TikTok-style interface as home
- Empty state when no matches

### 💬 Messaging Page
- Conversation list with matched users
- Real-time chat interface
- Message bubbles with user avatars
- Send/receive functionality
- Keyboard-aware input

### 👤 Profile Page
- Editable profile fields (name, pronouns, birthday, bio)
- Editable interests (tag-style)
- Hinge-style prompts with questions and answers
- Profile picture with edit button
- Save/cancel functionality

## Design

The app uses a custom color scheme:
- Primary: `#3DBABE` (Teal)
- Secondary: `#3986B8` (Blue)
- Accent: `#9939B8` (Purple)
- Background: White

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Expo Go app on your phone (for testing)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fml-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
- Scan the QR code with Expo Go (iOS/Android)
- Or press 'a' for Android emulator
- Or press 'i' for iOS simulator

## Project Structure

```
src/
├── components/
│   └── VideoCard.js          # TikTok-style video component
├── screens/
│   ├── HomeScreen.js         # Main video feed
│   ├── NotificationsScreen.js # Notifications list
│   ├── MatchesScreen.js      # Matched users videos
│   ├── MessagingScreen.js    # Chat interface
│   └── ProfileScreen.js      # Editable profile
├── navigation/
│   └── AppNavigator.js       # Bottom tab navigation
├── data/
│   └── mockData.js           # Mock data for demo
└── utils/                    # Utility functions
```

## Dependencies

- `@react-navigation/native` - Navigation framework
- `@react-navigation/bottom-tabs` - Bottom tab navigation
- `expo-av` - Video playback
- `expo-linear-gradient` - Gradient overlays
- `@expo/vector-icons` - Icons

## Demo Data

The app includes mock data for:
- 5 sample users with profiles
- 5 sample videos with different content
- 2 matches
- 4 notifications
- Sample messages

## Features to Add

- User authentication
- Real backend integration
- Video upload functionality
- Push notifications
- User blocking/reporting
- Advanced matching algorithms
- Video filters and effects

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for demo purposes only. 