import React from 'react';
import { Search, ArrowRight } from 'lucide-react';

const TalentMatchingInterface = () => {
  const labs = [
    { 
      name: 'OpenAI', 
      logo: '🤖', 
      projects: 24, 
      hiring: true,
      description: 'Pioneering AI research and deployment',
      location: 'San Francisco, CA',
      focus: ['LLMs', 'Reinforcement Learning', 'Computer Vision']
    },
    { 
      name: 'DeepMind', 
      logo: '🧠', 
      projects: 18, 
      hiring: true,
      description: 'Advancing the state of artificial intelligence',
      location: 'London, UK',
      focus: ['Deep Learning', 'Neuroscience', 'Robotics']
    },
    { 
      name: 'Anthropic', 
      logo: '🔍', 
      projects: 12, 
      hiring: false,
      description: 'Building reliable, interpretable AI systems',
      location: 'San Francisco, CA',
      focus: ['AI Safety', 'Constitutional AI', 'NLP']
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 w-full max-w-md mx-auto">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Top AI Labs</h3>
            <p className="text-sm text-gray-500">Connect with leading research teams</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-indigo-600">3,200+</p>
            <p className="text-sm text-gray-500">experts connected</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search AI labs..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="space-y-4">
          {labs.map((lab, index) => (
            <div key={index} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-xl">
                    {lab.logo}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{lab.name}</h4>
                    <p className="text-sm text-gray-500">{lab.location}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${lab.hiring ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {lab.hiring ? 'Hiring' : 'Not hiring'}
                </span>
              </div>
              
              <p className="mt-2 text-sm text-gray-600">{lab.description}</p>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {lab.focus.map((focus, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {focus}
                  </span>
                ))}
              </div>
              
              <button className="mt-4 w-full flex items-center justify-center space-x-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                <span>View open positions</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        
        <button className="mt-6 w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          Connect with a lab
        </button>
      </div>
    </div>
  );
};

export default TalentMatchingInterface;
