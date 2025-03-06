import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const ProfileMatchingAnalysis = ({ profileA, profileB, theme = 'dark' }) => {
  const [matchingData, setMatchingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Theme-based styling
  const themeClasses = {
    background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
    card: theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    text: theme === 'dark' ? 'text-gray-100' : 'text-gray-800',
    textMuted: theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
    activeTab: theme === 'dark' ? 'text-blue-400 border-blue-400' : 'text-blue-600 border-blue-600',
    inactiveTab: theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700',
    border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    chartColors: {
      primary: theme === 'dark' ? '#3b82f6' : '#2563eb',
      secondary: theme === 'dark' ? '#8b5cf6' : '#7c3aed',
      success: theme === 'dark' ? '#10b981' : '#10b981',
    }
  };

  // Simulated matching algorithm output
  // In a real implementation, this would come from your backend service
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    
    setTimeout(() => {
      // Generate matching data based on the two profiles
      const data = generateMatchingData(profileA, profileB);
      setMatchingData(data);
      setIsLoading(false);
    }, 1500);
  }, [profileA, profileB]);

  if (isLoading) {
    return (
      <div className={`${themeClasses.card} p-8 rounded-lg shadow-lg border ${themeClasses.border} flex justify-center items-center`}>
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className={themeClasses.text}>Analyzing professional synergies...</p>
        </div>
      </div>
    );
  }

  if (!matchingData) {
    return (
      <div className={`${themeClasses.card} p-8 rounded-lg shadow-lg border ${themeClasses.border}`}>
        <p className={themeClasses.text}>No matching data available for the selected profiles.</p>
      </div>
    );
  }

  const { 
    synergyScores, 
    skillsComparison, 
    workExperienceOverlap,
    connectionPoints,
    compatibleRoles,
    careerTimeline,
    companyOverlap
  } = matchingData;

  return (
    <div className={`${themeClasses.card} rounded-lg shadow-lg border ${themeClasses.border}`}>
      {/* Header with profile details */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className={`w-12 h-12 ${theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600'} text-white rounded-full flex items-center justify-center text-xl font-bold`}>
                {getInitials(profileA.personalInfo.name.fullName)}
              </div>
              <div className="ml-3">
                <h3 className="font-bold">{profileA.personalInfo.name.fullName}</h3>
                <p className={themeClasses.textMuted}>{profileA.personalInfo.title}</p>
              </div>
            </div>
            
            <div className={themeClasses.textMuted}>vs</div>
            
            <div className="flex items-center">
              <div className={`w-12 h-12 ${theme === 'dark' ? 'bg-purple-700' : 'bg-purple-600'} text-white rounded-full flex items-center justify-center text-xl font-bold`}>
                {getInitials(profileB.personalInfo.name.fullName)}
              </div>
              <div className="ml-3">
                <h3 className="font-bold">{profileB.personalInfo.name.fullName}</h3>
                <p className={themeClasses.textMuted}>{profileB.personalInfo.title}</p>
              </div>
            </div>
          </div>
          
          <div className={`px-4 py-2 rounded-full font-semibold ${getScoreColorClass(synergyScores.overall)}`}>
            {synergyScores.overall}% Match
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`border-b ${themeClasses.border}`}>
        <nav className="flex">
          <button 
            className={`px-6 py-3 text-sm font-medium border-b-2 ${activeTab === 'overview' ? themeClasses.activeTab : themeClasses.inactiveTab} ${activeTab !== 'overview' ? 'border-transparent' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`px-6 py-3 text-sm font-medium border-b-2 ${activeTab === 'skills' ? themeClasses.activeTab : themeClasses.inactiveTab} ${activeTab !== 'skills' ? 'border-transparent' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            Skills Analysis
          </button>
          <button 
            className={`px-6 py-3 text-sm font-medium border-b-2 ${activeTab === 'experience' ? themeClasses.activeTab : themeClasses.inactiveTab} ${activeTab !== 'experience' ? 'border-transparent' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            Experience
          </button>
          <button 
            className={`px-6 py-3 text-sm font-medium border-b-2 ${activeTab === 'timeline' ? themeClasses.activeTab : themeClasses.inactiveTab} ${activeTab !== 'timeline' ? 'border-transparent' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            Timeline
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className={`border ${themeClasses.border} rounded-lg p-6 ${themeClasses.card}`}>
              <h3 className="text-lg font-semibold mb-4">Professional Synergy Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className={`text-sm font-medium ${themeClasses.textMuted} mb-2`}>Synergy Score Breakdown</div>
                  <div className={`h-64 border ${themeClasses.border} rounded p-4 ${themeClasses.card}`}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsComparison.radarData}>
                        <PolarGrid stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                        <PolarAngleAxis dataKey="category" tick={{ fill: theme === 'dark' ? '#e5e7eb' : '#4b5563' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: theme === 'dark' ? '#e5e7eb' : '#4b5563' }} />
                        <Radar name={profileA.personalInfo.name.firstName} dataKey="personA" stroke={themeClasses.chartColors.primary} fill={themeClasses.chartColors.primary} fillOpacity={0.3} />
                        <Radar name={profileB.personalInfo.name.firstName} dataKey="personB" stroke={themeClasses.chartColors.secondary} fill={themeClasses.chartColors.secondary} fillOpacity={0.3} />
                        <Legend />
                        <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1f2937' : 'white', borderColor: theme === 'dark' ? '#374151' : '#e5e7eb', color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <div className={`text-sm font-medium ${themeClasses.textMuted} mb-2`}>Synergy Components</div>
                  <div className="space-y-4">
                    {Object.entries(synergyScores.componentScores).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{formatLabel(key)}</span>
                          <span className="font-medium">{value}%</span>
                        </div>
                        <div className={`h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                          <div className="h-full rounded-full" style={{width: `${value}%`, backgroundColor: getScoreColor(value)}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`${themeClasses.card} p-6 rounded-lg border ${themeClasses.border} shadow-sm`}>
                <h4 className="font-medium mb-2">Top Connection Points</h4>
                <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  {connectionPoints.length}
                </div>
                <ul className="mt-4 space-y-2">
                  {connectionPoints.slice(0, 3).map((point, index) => (
                    <li key={index} className="flex items-center justify-between py-1">
                      <span>{point.name}</span>
                      <span className={`${theme === 'dark' ? 'text-green-400' : 'text-green-600'} font-medium`}>
                        {point.strength}% match
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={`${themeClasses.card} p-6 rounded-lg border ${themeClasses.border} shadow-sm`}>
                <h4 className="font-medium mb-2">Compatible Roles</h4>
                <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  {compatibleRoles.length}
                </div>
                <ul className="mt-4 space-y-2">
                  {compatibleRoles.map((role, index) => (
                    <li key={index} className="flex items-center justify-between py-1">
                      <span>{role.role}</span>
                      <span className={`${theme === 'dark' ? 'text-green-400' : 'text-green-600'} font-medium`}>
                        {role.compatibilityScore}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={`${themeClasses.card} p-6 rounded-lg border ${themeClasses.border} shadow-sm`}>
                <h4 className="font-medium mb-2">Shared Experience</h4>
                <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  {workExperienceOverlap.totalOverlapMonths} months
                </div>
                <ul className="mt-4 space-y-2">
                  {companyOverlap.slice(0, 3).map((company, index) => (
                    <li key={index} className="flex items-center justify-between py-1">
                      <span>{company.company}</span>
                      <span className={`${theme === 'dark' ? 'text-green-400' : 'text-green-600'} font-medium`}>
                        {company.overlapMonths} months
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className={`p-4 ${theme === 'dark' ? 'bg-blue-900 border-blue-800' : 'bg-blue-50 border-blue-100'} rounded-lg border`}>
              <h4 className={`font-medium ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>Conversation Starters</h4>
              <ul className="mt-2 space-y-2">
                {connectionPoints.slice(0, 2).map((point, index) => (
                  <li key={index} className="mb-2">
                    <p>"{generateConversationStarter(profileA, profileB, point)}"</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Skills Analysis Tab */}
        {activeTab === 'skills' && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Skills Comparison</h3>
              <p className={`text-sm ${themeClasses.textMuted} mb-4`}>Detailed analysis of professional skills and expertise between {profileA.personalInfo.name.firstName} and {profileB.personalInfo.name.firstName}.</p>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsComparison.radarData}>
                    <PolarGrid stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                    <PolarAngleAxis dataKey="category" tick={{ fill: theme === 'dark' ? '#e5e7eb' : '#4b5563' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: theme === 'dark' ? '#e5e7eb' : '#4b5563' }} />
                    <Radar name={profileA.personalInfo.name.firstName} dataKey="personA" stroke={themeClasses.chartColors.primary} fill={themeClasses.chartColors.primary} fillOpacity={0.3} />
                    <Radar name={profileB.personalInfo.name.firstName} dataKey="personB" stroke={themeClasses.chartColors.secondary} fill={themeClasses.chartColors.secondary} fillOpacity={0.3} />
                    <Legend />
                    <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1f2937' : 'white', borderColor: theme === 'dark' ? '#374151' : '#e5e7eb', color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`border ${themeClasses.border} rounded-lg p-6 ${themeClasses.card}`}>
                <h4 className="font-medium mb-3">Common Skills</h4>
                <div className="space-y-4">
                  {skillsComparison.commonSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{skill.name}</span>
                        <span className="font-medium">{skill.matchPercentage}% match</span>
                      </div>
                      <div className={`h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                        <div className="h-full bg-green-500 rounded-full" style={{width: `${skill.matchPercentage}%`}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={`border ${themeClasses.border} rounded-lg p-6 ${themeClasses.card}`}>
                <h4 className="font-medium mb-3">Complementary Skills</h4>
                <div className="space-y-2">
                  {skillsComparison.complementarySkills.map((skill, index) => (
                    <div key={index} className={`flex justify-between items-center p-2 ${
                      skill.person === profileA.personalInfo.name.firstName 
                        ? theme === 'dark' ? 'bg-blue-900' : 'bg-blue-50' 
                        : theme === 'dark' ? 'bg-purple-900' : 'bg-purple-50'
                    } rounded`}>
                      <div>
                        <span className={`${
                          skill.person === profileA.personalInfo.name.firstName
                            ? theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                            : theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
                        } font-medium`}>{skill.person}:</span>
                        <span className="ml-2">{skill.name}</span>
                      </div>
                      <div className={`text-sm ${themeClasses.textMuted}`}>{skill.level}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Work Experience Analysis</h3>
              <p className={`text-sm ${themeClasses.textMuted} mb-4`}>Detailed breakdown of shared companies and career overlaps.</p>
              
              <div className="h-80 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={companyOverlap}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                    <XAxis type="number" tick={{ fill: theme === 'dark' ? '#e5e7eb' : '#4b5563' }} />
                    <YAxis dataKey="company" type="category" tick={{ fill: theme === 'dark' ? '#e5e7eb' : '#4b5563' }} />
                    <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1f2937' : 'white', borderColor: theme === 'dark' ? '#374151' : '#e5e7eb', color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }} />
                    <Legend />
                    <Bar dataKey="personAMonths" name={`${profileA.personalInfo.name.firstName} (months)`} fill={themeClasses.chartColors.primary} />
                    <Bar dataKey="personBMonths" name={`${profileB.personalInfo.name.firstName} (months)`} fill={themeClasses.chartColors.secondary} />
                    <Bar dataKey="overlapMonths" name="Overlap (months)" fill={themeClasses.chartColors.success} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className={`border ${themeClasses.border} rounded-lg p-6 ${themeClasses.card}`}>
                <h4 className="font-medium mb-3">Career Progression Comparison</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <tr>
                        <th className={`px-4 py-2 text-left text-xs font-medium ${themeClasses.textMuted} uppercase tracking-wider`}>Year</th>
                        <th className={`px-4 py-2 text-left text-xs font-medium ${themeClasses.textMuted} uppercase tracking-wider`}>{profileA.personalInfo.name.firstName}</th>
                        <th className={`px-4 py-2 text-left text-xs font-medium ${themeClasses.textMuted} uppercase tracking-wider`}>{profileB.personalInfo.name.firstName}</th>
                        <th className={`px-4 py-2 text-left text-xs font-medium ${themeClasses.textMuted} uppercase tracking-wider`}>Alignment</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${themeClasses.border}`}>
                      {careerTimeline.map((entry, index) => (
                        <tr key={index} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                          <td className="px-4 py-2 text-sm">{entry.period}</td>
                          <td className="px-4 py-2 text-sm">{entry.personA}</td>
                          <td className="px-4 py-2 text-sm">{entry.personB}</td>
                          <td className="px-4 py-2 text-sm">
                            <span className={`${getAlignmentClass(entry.alignment)} text-xs px-2 py-1 rounded`}>
                              {entry.alignment}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Career Timeline Analysis</h3>
              <p className={`text-sm ${themeClasses.textMuted} mb-4`}>Visualizing career progression and timeline overlap between {profileA.personalInfo.name.firstName} and {profileB.personalInfo.name.firstName}.</p>
              
              <div className="h-64 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={workExperienceOverlap.timelineData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                    <XAxis dataKey="year" tick={{ fill: theme === 'dark' ? '#e5e7eb' : '#4b5563' }} />
                    <YAxis tick={{ fill: theme === 'dark' ? '#e5e7eb' : '#4b5563' }} />
                    <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1f2937' : 'white', borderColor: theme === 'dark' ? '#374151' : '#e5e7eb', color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }} />
                    <Legend />
                    <Bar dataKey="personA" stackId="a" fill={themeClasses.chartColors.primary} name={profileA.personalInfo.name.firstName} />
                    <Bar dataKey="personB" stackId="a" fill={themeClasses.chartColors.secondary} name={profileB.personalInfo.name.firstName} />
                    <Bar dataKey="overlap" stackId="a" fill={themeClasses.chartColors.success} name="Overlap" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className={`p-4 ${theme === 'dark' ? 'bg-blue-900 border-blue-800' : 'bg-blue-50 border-blue-100'} rounded-lg border mb-6`}>
                <h4 className={`font-medium ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>Career Insights</h4>
                <ul className="mt-2 space-y-2">
                  {workExperienceOverlap.insights.map((insight, index) => (
                    <li key={index} className="mb-2">
                      <p>{insight}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 flex justify-end gap-4">
        <button className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
          Download Report
        </button>
        <button className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700`}>
          Generate Email
        </button>
      </div>
    </div>
  );
};

// Helper Functions
const getInitials = (name) => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getScoreColor = (score) => {
  if (score >= 80) return '#10b981'; // green
  if (score >= 60) return '#60a5fa'; // blue
  if (score >= 40) return '#f59e0b'; // yellow
  return '#ef4444'; // red
};

const getScoreColorClass = (score) => {
  if (score >= 80) return 'bg-green-900 text-green-200';
  if (score >= 60) return 'bg-blue-900 text-blue-200';
  if (score >= 40) return 'bg-yellow-900 text-yellow-200';
  return 'bg-red-900 text-red-200';
};

const getAlignmentClass = (alignment) => {
  switch (alignment) {
    case 'High':
      return 'bg-green-900 text-green-200';
    case 'Medium':
      return 'bg-yellow-900 text-yellow-200';
    case 'Low':
      return 'bg-red-900 text-red-200';
    default:
      return 'bg-gray-900 text-gray-200';
  }
};

const generateConversationStarter = (profileA, profileB, connectionPoint) => {
  const typeMap = {
    'Company': `I noticed we both worked at ${connectionPoint.name}. I'd love to hear about your experience there.`,
    'Skill': `I see you're skilled in ${connectionPoint.name}. I've been working with that too and would love to exchange insights.`,
    'Industry': `We both have experience in the ${connectionPoint.name} industry. How do you see it evolving in the next few years?`,
    'Education': `I noticed we both studied at ${connectionPoint.name}. What was your experience like there?`
  };
  
  return typeMap[connectionPoint.type] || `I noticed we have a connection through ${connectionPoint.name}. I'd love to learn more about your experience.`;
};

// Function to generate realistic matching data based on two profiles
const generateMatchingData = (profileA, profileB) => {
  // In a real implementation, this would be a complex algorithm
  // running on your backend. This is a simplified simulation.
  
  // Calculate skills overlap
  const skillsA = profileA.skills.map(s => s.name.toLowerCase());
  const skillsB = profileB.skills.map(s => s.name.toLowerCase());
  
  const commonSkills = skillsA.filter(skill => 
    skillsB.some(s => s === skill || s.includes(skill) || skill.includes(s))
  );
  
  // Calculate company overlap
  const companiesA = profileA.workExperience.map(w => w.company.name.toLowerCase());
  const companiesB = profileB.workExperience.map(w => w.company.name.toLowerCase());
  
  const commonCompanies = companiesA.filter(company => 
    companiesB.some(c => c === company || c.includes(company) || company.includes(c))
  );
  
  // Mock data generation - would be calculated by algorithm
  return {
    synergyScores: {
      overall: 78,
      skillsOverlap: 82,
      industryAlignment: 75,
      careerAlignment: 70,
      educationMatch: 85,
      networkProximity: 65,
      componentScores: {
        technicalSkills: 80,
        domainExpertise: 75,
        leadership: 65,
        communication: 90,
        teamwork: 85
      }
    },
    
    skillsComparison: {
      radarData: [
        { category: 'Technical', personA: 85, personB: 75 },
        { category: 'Leadership', personA: 70, personB: 90 },
        { category: 'Industry', personA: 80, personB: 75 },
        { category: 'Communication', personA: 75, personB: 85 },
        { category: 'Strategic', personA: 80, personB: 90 },
        { category: 'Analytical', personA: 90, personB: 80 }
      ],
      commonSkills: [
        { name: 'Product Management', matchPercentage: 95 },
        { name: 'Strategic Planning', matchPercentage: 85 },
        { name: 'Data Analytics', matchPercentage: 80 },
        { name: 'Agile Methods', matchPercentage: 90 }
      ],
      complementarySkills: [
        { person: profileA.personalInfo.name.firstName, name: 'Technical Implementation', level: 'Expert' },
        { person: profileB.personalInfo.name.firstName, name: 'User Research', level: 'Expert' },
        { person: profileA.personalInfo.name.firstName, name: 'Data Science', level: 'Advanced' },
        { person: profileB.personalInfo.name.firstName, name: 'Team Leadership', level: 'Expert' }
      ]
    },
    
    workExperienceOverlap: {
      totalOverlapMonths: 36,
      timelineData: [
        { year: '2015-2016', personA: 1, personB: 1, overlap: 1 },
        { year: '2017-2018', personA: 1, personB: 1, overlap: 1 },
        { year: '2019-2020', personA: 1, personB: 1, overlap: 1 },
        { year: '2021-2022', personA: 1, personB: 1, overlap: 0 },
        { year: '2023-2024', personA: 1, personB: 1, overlap: 0 }
      ],
      insights: [
        `Both ${profileA.personalInfo.name.firstName} and ${profileB.personalInfo.name.firstName} have followed similar career trajectories in the technology sector.`,
        `${profileA.personalInfo.name.firstName} has more specialized technical experience, while ${profileB.personalInfo.name.firstName} has more leadership roles.`,
        `You spent 3 years working in the same industry during the same time period.`
      ]
    },
    
    connectionPoints: [
      { type: 'Company', name: 'TechCorp', strength: 85, timeOverlap: true },
      { type: 'Skill', name: 'Product Management', strength: 90, timeOverlap: false },
      { type: 'Industry', name: 'Software Development', strength: 75, timeOverlap: true },
      { type: 'Education', name: 'University of California', strength: 80, timeOverlap: false }
    ],
    
    compatibleRoles: [
      { role: 'Mentor/Mentee', compatibilityScore: 85 },
      { role: 'Collaborators', compatibilityScore: 90 },
      { role: 'Peer Network', compatibilityScore: 80 }
    ],
    
    careerTimeline: [
      { period: '2015-2016', personA: 'Junior Developer at StartupX', personB: 'Product Intern at TechCorp', alignment: 'Medium' },
      { period: '2017-2018', personA: 'Software Developer at TechCorp', personB: 'Junior PM at TechCorp', alignment: 'High' },
      { period: '2019-2020', personA: 'Senior Developer at TechCorp', personB: 'Product Manager at TechCorp', alignment: 'High' },
      { period: '2021-2022', personA: 'Lead Developer at InnovateInc', personB: 'Senior PM at TechCorp', alignment: 'Medium' },
      { period: '2023-Present', personA: 'CTO at StartupY', personB: 'Director of Product at FinanceFlow', alignment: 'Medium' }
    ],
    
    companyOverlap: [
      { company: 'TechCorp', personAMonths: 48, personBMonths: 72, overlapMonths: 36 },
      { company: 'StartupX', personAMonths: 24, personBMonths: 0, overlapMonths: 0 },
      { company: 'InnovateInc', personAMonths: 24, personBMonths: 0, overlapMonths: 0 },
      { company: 'FinanceFlow', personAMonths: 0, personBMonths: 36, overlapMonths: 0 },
      { company: 'StartupY', personAMonths: 18, personBMonths: 0, overlapMonths: 0 }
    ]
  };
};

ProfileMatchingAnalysis.propTypes = {
  profileA: PropTypes.object.isRequired,
  profileB: PropTypes.object.isRequired,
  theme: PropTypes.oneOf(['light', 'dark'])
};

export default ProfileMatchingAnalysis;