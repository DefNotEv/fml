import { Match } from '@/types';

export const mockMatches: Match[] = [
  {
    id: 'm1',
    userId: 'current-user',
    matchedUserId: '1',
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    lastMessage: {
      text: "Hey! I loved your hiking video. Where was that taken?",
      timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
      isRead: true,
    },
  },
  {
    id: 'm2',
    userId: 'current-user',
    matchedUserId: '3',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    lastMessage: {
      text: "Would you like to join my yoga class this weekend?",
      timestamp: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
      isRead: false,
    },
  },
  {
    id: 'm3',
    userId: 'current-user',
    matchedUserId: '5',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
  },
];