export interface User {
    id: string;
    name: string;
    age: number;
    bio: string;
    location: string;
    avatar: string;
    interests: string[];
    videoUrl: string;
    videoThumbnail: string;
  }
  
  export interface Match {
    id: string;
    userId: string;
    matchedUserId: string;
    timestamp: number;
    lastMessage?: {
      text: string;
      timestamp: number;
      isRead: boolean;
    };
  }