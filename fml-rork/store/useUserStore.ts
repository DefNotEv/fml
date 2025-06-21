import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Match } from '@/types';
import { mockUsers } from '@/mocks/users';
import { mockMatches } from '@/mocks/matches';

interface UserState {
  currentUser: {
    id: string;
    name: string;
    avatar: string;
  };
  likedUsers: string[];
  matches: Match[];
  viewedUsers: string[];
  addLike: (userId: string) => void;
  addMatch: (userId: string) => void;
  addViewedUser: (userId: string) => void;
  resetViewedUsers: () => void;
  isMatch: (userId: string) => boolean;
  hasLiked: (userId: string) => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      currentUser: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      likedUsers: [],
      matches: [...mockMatches],
      viewedUsers: [],
      
      addLike: (userId: string) => {
        const { likedUsers } = get();
        if (!likedUsers.includes(userId)) {
          set({ likedUsers: [...likedUsers, userId] });
          
          // Simulate 30% chance of match when liking someone
          if (Math.random() < 0.3) {
            get().addMatch(userId);
          }
        }
      },
      
      addMatch: (userId: string) => {
        const { matches } = get();
        const newMatch: Match = {
          id: `m${matches.length + 1}`,
          userId: 'current-user',
          matchedUserId: userId,
          timestamp: Date.now(),
        };
        set({ matches: [newMatch, ...matches] });
      },
      
      addViewedUser: (userId: string) => {
        const { viewedUsers } = get();
        if (!viewedUsers.includes(userId)) {
          set({ viewedUsers: [...viewedUsers, userId] });
        }
      },
      
      resetViewedUsers: () => {
        set({ viewedUsers: [] });
      },
      
      isMatch: (userId: string) => {
        return get().matches.some(match => match.matchedUserId === userId);
      },
      
      hasLiked: (userId: string) => {
        return get().likedUsers.includes(userId);
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);