
import { InstagramData, WebhookRequest } from '../types';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || '';

export const fetchInstagramAnalytics = async (username: string): Promise<InstagramData> => {
  if (!N8N_WEBHOOK_URL) {
    console.warn("N8N_WEBHOOK_URL not configured. Returning mock data for demonstration.");
    return getMockData(username);
  }

  const payload: WebhookRequest = {
    username,
    timestamp: new Date().toISOString(),
    request_id: crypto.randomUUID(),
  };

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`n8n API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    throw error;
  }
};

const getMockData = (username: string): InstagramData => {
  return {
    profile: {
      username: username,
      fullName: "Green Tech Enthusiast",
      bio: "Exploring the intersections of nature and technology. 🌿💻 | Sustainability & Code.",
      profilePicUrl: `https://picsum.photos/seed/${username}/200`,
      followers: 12500,
      following: 840,
      postsCount: 156,
      isVerified: true,
    },
    posts: [
      { id: '1', imageUrl: 'https://picsum.photos/seed/post1/600', likes: 1200, comments: 45, timestamp: '2025-01-20', caption: 'Eco-friendly setup! #tech #eco', type: 'IMAGE' },
      { id: '2', imageUrl: 'https://picsum.photos/seed/post2/600', likes: 850, comments: 30, timestamp: '2025-01-18', caption: 'Hiking morning.', type: 'IMAGE' },
      { id: '3', imageUrl: 'https://picsum.photos/seed/post3/600', likes: 2100, comments: 98, timestamp: '2025-01-15', caption: 'New tutorial out now!', type: 'VIDEO' },
    ],
    analytics: {
      avgLikes: 1450,
      avgComments: 52,
      engagementRate: 4.8,
      bestPost: { id: '3', imageUrl: 'https://picsum.photos/seed/post3/600', likes: 2100, comments: 98, timestamp: '2025-01-15', caption: 'New tutorial out now!', type: 'VIDEO' },
      historicalEngagement: [
        { date: 'Jan 01', value: 3.2 },
        { date: 'Jan 05', value: 3.8 },
        { date: 'Jan 10', value: 4.1 },
        { date: 'Jan 15', value: 4.8 },
        { date: 'Jan 20', value: 4.5 },
      ],
      contentTypeDistribution: [
        { name: 'Images', value: 65 },
        { name: 'Videos', value: 25 },
        { name: 'Carousels', value: 10 },
      ]
    }
  };
};
