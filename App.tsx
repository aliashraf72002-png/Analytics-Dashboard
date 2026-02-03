
import React, { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { LandingPage } from './components/LandingPage';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { fetchInstagramAnalytics } from './services/n8nService';
import { InstagramData } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<InstagramData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchInstagramAnalytics(username);
      setData(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const resetView = () => {
    setData(null);
    setError(null);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="selection:bg-green-100 selection:text-green-900 min-h-screen">
        {error && (
          <div className="fixed top-20 right-4 z-[100] bg-white border-l-4 border-red-500 shadow-xl p-4 rounded-lg animate-in slide-in-from-right-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-bold text-gray-900">Analysis Failed</p>
                <p className="text-sm text-gray-500">{error}</p>
              </div>
              <button onClick={() => setError(null)} className="ml-4 text-gray-400 hover:text-gray-600">×</button>
            </div>
          </div>
        )}

        {!data ? (
          <LandingPage onAnalyze={handleAnalyze} isLoading={loading} />
        ) : (
          <AnalyticsDashboard data={data} onReset={resetView} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
