
import React, { useState } from 'react';
import { DotScreenShader } from './ui/dot-shader-background';

interface LandingPageProps {
  onAnalyze: (username: string) => void;
  isLoading: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onAnalyze, isLoading }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onAnalyze(username.trim());
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <DotScreenShader />
      
      <div className="max-w-xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 relative z-10">
        <div className="space-y-4">
          <div className="inline-block p-3 bg-green-100 rounded-2xl mb-4 shadow-sm">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-5xl font-extrabold text-green-950 tracking-tight leading-tight">
            Instagram <br /> 
            <span className="text-green-600">Analytics Dashboard</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Get deep insights into any Instagram profile with our professional-grade scraping and analysis tool.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute -inset-1 bg-green-200 rounded-2xl blur opacity-25 group-focus-within:opacity-75 transition duration-200"></div>
          <div className="relative flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter Instagram Username (e.g. natgeo)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-100 focus:border-green-500 focus:outline-none bg-white/80 backdrop-blur-md text-green-900 placeholder-gray-400 font-medium transition-all shadow-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !username.trim()}
              className="sm:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center min-w-[140px]"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Analyze Now"
              )}
            </button>
          </div>
        </form>

        <div className="flex justify-center items-center gap-6 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            n8n Integration
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Real-time Scraping
          </div>
        </div>
      </div>
    </div>
  );
};
