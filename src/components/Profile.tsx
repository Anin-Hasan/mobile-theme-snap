
import React from 'react';
import { ChevronRight, Trophy, Users, Settings, Smartphone, Info, Youtube, Share2 } from 'lucide-react';

interface ProfileProps {
  user: {
    name: string;
    email: string;
    batch: string;
  };
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const accountItems = [
    { icon: Settings, label: 'সেটিংস তথ্য', color: 'bg-red-100 text-red-600 dark:bg-red-900' },
    { icon: Users, label: 'আমাদের', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900' },
    { icon: Smartphone, label: 'স্মার্টফোনে', color: 'bg-orange-100 text-orange-600 dark:bg-orange-900' },
    { icon: Trophy, label: 'পার্টনারশিপ প্রোগ্রাম', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900' },
  ];

  const contentItems = [
    { icon: Youtube, label: 'দিনগুলির প্রশ্ন', count: 0, color: 'bg-red-100 text-red-600 dark:bg-red-900' },
    { icon: Info, label: 'নিয়ম', count: null, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900', hasNotification: true },
    { icon: Share2, label: 'নোটিফিকেশন', count: 0, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900' },
    { icon: Share2, label: 'চর্চা প্রশ্ন', count: null, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 max-w-md mx-auto space-y-6">
        {/* Profile Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full mt-1">
              {user.batch}
            </span>
          </div>
        </div>

        {/* Account Section */}
        <div>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            ACCOUNT
          </h2>
          <div className="space-y-1">
            {accountItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="flex-1 text-left font-medium">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            CONTENT
          </h2>
          <div className="space-y-1">
            {contentItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="flex-1 text-left font-medium">{item.label}</span>
                <div className="flex items-center space-x-2">
                  {item.count !== null && (
                    <span className="text-sm text-gray-500">{item.count}</span>
                  )}
                  {item.hasNotification && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
