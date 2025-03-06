import React, { useState } from 'react';

const ProfileUploader = ({ onProfilesUploaded }) => {
  const [profileA, setProfileA] = useState('');
  const [profileB, setProfileB] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Mock API call - replace with actual API integration later
      setTimeout(() => {
        // Generate mock profiles
        const mockProfileA = generateMockProfile(profileA);
        const mockProfileB = generateMockProfile(profileB);
        
        onProfilesUploaded(mockProfileA, mockProfileB);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error processing profiles:", error);
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload LinkedIn Profiles</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Your LinkedIn Profile URL</label>
          <input
            type="text"
            value={profileA}
            onChange={(e) => setProfileA(e.target.value)}
            placeholder="https://linkedin.com/in/your-profile"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Target LinkedIn Profile URL</label>
          <input
            type="text" 
            value={profileB}
            onChange={(e) => setProfileB(e.target.value)}
            placeholder="https://linkedin.com/in/target-profile"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <button 
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {isLoading ? 'Processing...' : 'Analyze Profiles'}
        </button>
      </form>
    </div>
  );
};

// Mock profile generator function
const generateMockProfile = (linkedinUrl) => {
  // Extract username from URL
  const username = linkedinUrl.split('/').pop() || 'user';
  
  return {
    personalInfo: {
      name: {
        firstName: username.split('-')[0] || 'John',
        lastName: username.split('-')[1] || 'Doe',
        fullName: username.replace('-', ' ') || 'John Doe'
      },
      title: 'Product Manager',
      location: 'San Francisco, CA'
    },
    skills: [
      { name: 'Product Management', level: 'Expert' },
      { name: 'Data Analytics', level: 'Advanced' },
      { name: 'Strategic Planning', level: 'Expert' },
      { name: 'Team Leadership', level: 'Advanced' }
    ],
    workExperience: [
      {
        company: { name: 'TechCorp' },
        title: 'Senior Product Manager',
        duration: '2019-2022',
        description: 'Led product development...'
      },
      {
        company: { name: 'StartupX' },
        title: 'Product Manager',
        duration: '2016-2019',
        description: 'Developed product strategy...'
      }
    ]
  };
};

export default ProfileUploader;