
import React from 'react';
import { InstagramData } from '../types';
import { MetricCard } from './ui/MetricCard';
import { DotScreenShader } from './ui/dot-shader-background';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';

interface AnalyticsDashboardProps {
  data: InstagramData;
  onReset: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data, onReset }) => {
  const { profile, analytics, posts } = data;
  const PIE_COLORS = ['#22C55E', '#166534', '#bbf7d0'];

  return (
    <div className="min-h-screen relative pb-20 overflow-x-hidden">
      <DotScreenShader />
      
      {/* Top Navigation / Reset */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">I</div>
          <h2 className="text-xl font-bold text-green-900">Analytica<span className="text-green-600">Pro</span></h2>
        </div>
        <button 
          onClick={onReset}
          className="text-sm font-semibold text-gray-500 hover:text-green-600 transition-colors"
        >
          ← Back to Search
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8 relative z-10">
        {/* Profile Overview Card */}
        <section className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full ring-4 ring-green-100 p-1 overflow-hidden">
              <img src={profile.profilePicUrl} alt={profile.username} className="w-full h-full object-cover rounded-full" />
            </div>
            {profile.isVerified && (
              <div className="absolute bottom-1 right-1 bg-green-500 text-white p-1 rounded-full border-4 border-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-3xl font-bold text-green-950">@{profile.username}</h1>
            <p className="text-lg font-medium text-gray-700">{profile.fullName}</p>
            <p className="text-gray-500 max-w-lg">{profile.bio}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4">
              <div>
                <span className="block text-xl font-bold text-green-900">{profile.followers.toLocaleString()}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Followers</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-green-900">{profile.following.toLocaleString()}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Following</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-green-900">{profile.postsCount.toLocaleString()}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Posts</span>
              </div>
            </div>
          </div>
        </section>

        {/* Engagement Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            label="Avg. Likes" 
            value={analytics.avgLikes.toLocaleString()} 
            change="12%" 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>}
          />
          <MetricCard 
            label="Avg. Comments" 
            value={analytics.avgComments} 
            change="5.4%" 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" /></svg>}
          />
          <MetricCard 
            label="Engagement Rate" 
            value={`${analytics.engagementRate}%`} 
            change="2.1%" 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>}
          />
          <MetricCard 
            label="Best Performance" 
            value={`${analytics.bestPost.likes}`} 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" /></svg>}
          />
        </section>

        {/* Charts Row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-green-900">Engagement Over Time</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.historicalEngagement}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    itemStyle={{ color: '#22C55E' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#22C55E" strokeWidth={3} dot={{ r: 4, fill: '#22C55E' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-green-900">Content Type Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.contentTypeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {analytics.contentTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6">
              {analytics.contentTypeDistribution.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }}></div>
                  <span className="text-sm text-gray-500 font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Content */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-green-950 px-2">Latest Posts Analysis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-100 shadow-sm group">
                <div className="aspect-square relative overflow-hidden">
                  <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-800">
                    {post.type}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{post.caption}</p>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-green-700">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>
                        <span className="text-sm font-bold">{post.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-green-700">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" /></svg>
                        <span className="text-sm font-bold">{post.comments}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{post.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
