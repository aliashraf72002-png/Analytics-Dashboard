
export interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  timestamp: string;
  caption: string;
  type: 'IMAGE' | 'VIDEO' | 'CAROUSEL';
}

export interface InstagramProfile {
  username: string;
  fullName: string;
  bio: string;
  profilePicUrl: string;
  followers: number;
  following: number;
  postsCount: number;
  isVerified: boolean;
}

export interface AnalyticsSummary {
  avgLikes: number;
  avgComments: number;
  engagementRate: number;
  bestPost: InstagramPost;
  historicalEngagement: { date: string; value: number }[];
  contentTypeDistribution: { name: string; value: number }[];
}

export interface InstagramData {
  profile: InstagramProfile;
  posts: InstagramPost[];
  analytics: AnalyticsSummary;
}

export interface WebhookRequest {
  username: string;
  timestamp: string;
  request_id: string;
}
