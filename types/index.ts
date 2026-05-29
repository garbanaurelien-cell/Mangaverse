export type User = {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
};

export type Profile = {
  id: string;
  userId: string;
  displayName: string;
  bio: string;
  favoriteUniverse: string;
  level: number;
  xp: number;
  followers: number;
  following: number;
  posts: number;
  coverUrl: string;
};

export type Anime = {
  id: string;
  title: string;
  coverUrl: string;
  type: "anime" | "manga";
  status: "watching" | "completed" | "planned" | "dropped";
  score: number;
  genres: string[];
};

export type Post = {
  id: string;
  author: User;
  content: string;
  mediaUrls: string[];
  animeContext?: Anime;
  likes: number;
  comments: number;
  reposts: number;
  createdAt: string;
};

export type Salon = {
  id: string;
  name: string;
  topic: string;
  isPrivate: boolean;
  participantCount: number;
  activeSpeakers: number;
  createdAt: string;
};
