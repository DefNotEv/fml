// Mock data for the FML app

export const mockUsers = [
  {
    id: '1',
    name: 'Alex Chen',
    pronouns: 'they/them',
    birthday: '1995-03-15',
    interests: ['Photography', 'Hiking', 'Cooking', 'Travel'],
    prompts: [
      { question: 'My ideal Sunday is...', answer: 'Hiking with my camera and ending the day with homemade pasta' },
      { question: 'I\'m looking for...', answer: 'Someone who loves adventure and good conversation' },
      { question: 'My most controversial opinion...', answer: 'Pineapple belongs on pizza' }
    ],
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    bio: 'Adventure seeker and amateur photographer 📸'
  },
  {
    id: '2',
    name: 'Jordan Smith',
    pronouns: 'he/him',
    birthday: '1992-07-22',
    interests: ['Music', 'Gaming', 'Fitness', 'Biking'],
    prompts: [
      { question: 'My ideal Sunday is...', answer: 'Playing guitar and watching classic films' },
      { question: 'I\'m looking for...', answer: 'Someone who shares my passion for music and gaming' },
      { question: 'My most controversial opinion...', answer: 'The original Star Wars trilogy is overrated' }
    ],
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Musician by day, gamer by night 🎸🎮'
  },
  {
    id: '3',
    name: 'Sam Rivera',
    pronouns: 'she/her',
    birthday: '1998-11-08',
    interests: ['Art', 'Yoga', 'Reading', 'Matcha'],
    prompts: [
      { question: 'My ideal Sunday is...', answer: 'Morning yoga, coffee shop reading, and painting' },
      { question: 'I\'m looking for...', answer: 'Someone who appreciates art and quiet moments' },
      { question: 'My most controversial opinion...', answer: 'Books are better than movies' }
    ],
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    bio: 'Artist and coffee enthusiast ☕🎨'
  },
  {
    id: '4',
    name: 'Taylor Kim',
    pronouns: 'they/them',
    birthday: '1994-05-12',
    interests: ['Dancing', 'Fashion', 'Travel', 'Food'],
    prompts: [
      { question: 'My ideal Sunday is...', answer: 'Brunch with friends and exploring new neighborhoods' },
      { question: 'I\'m looking for...', answer: 'Someone who loves to dance and try new restaurants' },
      { question: 'My most controversial opinion...', answer: 'Fashion is art' }
    ],
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    bio: 'Dance instructor and foodie 💃🍜'
  },
  {
    id: '5',
    name: 'Casey Johnson',
    pronouns: 'he/him',
    birthday: '1996-09-30',
    interests: ['Basketball', 'Cooking', 'Podcasts', 'Dogs'],
    prompts: [
      { question: 'My ideal Sunday is...', answer: 'Playing basketball and cooking dinner for friends' },
      { question: 'I\'m looking for...', answer: 'Someone who loves sports and has a dog' },
      { question: 'My most controversial opinion...', answer: 'Basketball is the best sport' }
    ],
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    bio: 'Basketball coach and dog dad 🏀🐕'
  }
];

export const mockVideos = [
  {
    id: '1',
    userId: '1',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    caption: 'Beautiful sunset from my hike today! 🌅',
    likes: 124,
    comments: 18,
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    userId: '2',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    caption: 'New song I\'m working on 🎵',
    likes: 89,
    comments: 12,
    timestamp: '2024-01-14T15:45:00Z'
  },
  {
    id: '3',
    userId: '3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    caption: 'Morning painting session 🎨',
    likes: 156,
    comments: 23,
    timestamp: '2024-01-13T09:20:00Z'
  },
  {
    id: '4',
    userId: '4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    caption: 'Dance practice in the studio 💃',
    likes: 203,
    comments: 31,
    timestamp: '2024-01-12T14:15:00Z'
  },
  {
    id: '5',
    userId: '5',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    caption: 'Basketball game highlights 🏀',
    likes: 167,
    comments: 28,
    timestamp: '2024-01-11T19:30:00Z'
  }
];

export const mockMatches = [
  {
    id: '1',
    userId: '2',
    matchedAt: '2024-01-15T12:00:00Z',
    isNew: true
  },
  {
    id: '2',
    userId: '4',
    matchedAt: '2024-01-14T16:30:00Z',
    isNew: false
  }
];

export const mockNotifications = [
  {
    id: '1',
    type: 'match',
    title: 'New Match!',
    message: 'You and Jordan matched!',
    timestamp: '2024-01-15T12:00:00Z',
    isRead: false,
    userId: '2'
  },
  {
    id: '2',
    type: 'like',
    title: 'New Like',
    message: 'Sam liked your video',
    timestamp: '2024-01-15T10:30:00Z',
    isRead: false,
    userId: '3'
  },
  {
    id: '3',
    type: 'comment',
    title: 'New Comment',
    message: 'Taylor commented on your video',
    timestamp: '2024-01-14T18:45:00Z',
    isRead: true,
    userId: '4'
  },
  {
    id: '4',
    type: 'app_update',
    title: 'App Update',
    message: 'New features available! Check out the latest update.',
    timestamp: '2024-01-14T09:00:00Z',
    isRead: true
  }
];

export const mockMessages = [
  {
    id: '1',
    matchId: '1',
    senderId: '2',
    message: 'Hey! I loved your guitar video 🎸',
    timestamp: '2024-01-15T12:05:00Z'
  },
  {
    id: '2',
    matchId: '1',
    senderId: 'currentUser',
    message: 'Thanks! I saw you play too, you\'re amazing!',
    timestamp: '2024-01-15T12:10:00Z'
  },
  {
    id: '3',
    matchId: '1',
    senderId: '2',
    message: 'Want to grab coffee sometime?',
    timestamp: '2024-01-15T12:15:00Z'
  },
  {
    id: '4',
    matchId: '2',
    senderId: '4',
    message: 'Your dance moves are incredible! 💃',
    timestamp: '2024-01-14T16:35:00Z'
  },
  {
    id: '5',
    matchId: '2',
    senderId: 'currentUser',
    message: 'Thank you! I\'d love to see you dance too',
    timestamp: '2024-01-14T16:40:00Z'
  }
];

// Current user profile (for demo purposes)
export const currentUser = {
  id: 'currentUser',
  name: 'You',
  pronouns: 'they/them',
  birthday: '1997-01-01',
  interests: ['Photography', 'Music', 'Travel', 'Cooking'],
  prompts: [
    { question: 'My ideal Sunday is...', answer: 'Exploring new places with my camera' },
    { question: 'I\'m looking for...', answer: 'Someone who shares my passion for creativity' },
    { question: 'My most controversial opinion...', answer: 'Pizza is better cold' }
  ],
  profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
  bio: 'Creative soul seeking adventure ✨'
}; 