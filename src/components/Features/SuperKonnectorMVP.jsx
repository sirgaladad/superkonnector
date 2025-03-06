import React, { useState } from 'react';
import ProfileUploader from './ProfileUploader';
import ProfileMatchingAnalysis from './ProfileMatchingAnalysis';

const SuperKonnectorMVP = () => {
  const [profileA, setProfileA] = useState(null);
  const [profileB, setProfileB] = useState(null);
  const [theme, setTheme] = useState('light');
  
  const handleProfilesUploaded = (profileA, profileB) => {
    setProfileA(profileA);
    setProfileB(profileB);
  };
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <header className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SuperKonnector</h1>
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">AI-Powered LinkedIn Relationship Analysis</h2>
        
        {!profileA || !profileB ? (
          <div className="max-w-2xl mx-auto">
            <ProfileUploader onProfilesUploaded={handleProfilesUploaded} />
          </div>
        ) : (
          <div className="mb-6">
            <button 
              onClick={() => {setProfileA(null); setProfileB(null);}}
              className="mb-4 text-blue-500 hover:underline"
            >
              ← Start New Analysis
            </button>
            <ProfileMatchingAnalysis 
              profileA={profileA} 
              profileB={profileB} 
              theme={theme} 
            />
          </div>
        )}
      </main>
      
      <footer className={`mt-auto p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className="container mx-auto text-center">
          <p>© 2025 SuperKonnector. Powered by Agent.ai & Lovable.dev</p>
        </div>
      </footer>
    </div>
  );
};

export default SuperKonnectorMVP;