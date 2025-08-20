
import React from 'react';
import { BookOpen, Zap, FileImage, Calendar, MessageSquare, Shield, ArrowRight } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const features = [
    { id: 'bank', title: 'প্রশ্ন ব্যাংক', icon: '🏦', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' },
    { id: 'mock-exam', title: 'মক পরীক্ষা', icon: '⚡', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' },
    { id: 'book-review', title: 'বই পর্যালোচনা', icon: '📖', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300' },
    { id: 'routine', title: 'রুটিন', icon: '📅', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
    { id: 'chatbot', title: 'চ্যাটবট', icon: '💬', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
    { id: 'leaderboard', title: 'লিডারবোর্ড', icon: '🏆', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' },
  ];

  const leaderboardData = [
    { rank: 1349, name: 'সাব্বীর', points: '৩ মাস', avatar: '🚀' },
    { rank: 1350, name: 'Rakib Hassan (YOU)', points: '৩ মাস', avatar: '🏆', isMe: true },
    { rank: 1351, name: 'Arif-ul Asif', points: '৩ মাস', subtitle: 'BIAM MODEL SCHOOL AND COLLEGE', avatar: '👤' },
  ];

  const reports = [
    { title: 'পরীক্ষাহীন', progress: 0 },
    { title: 'কুমিল্লা', progress: 0 },
    { title: 'উত্তরঢাকা পশ্চিম', progress: 0 },
    { title: 'জগন্নাথন', progress: 0 },
  ];

  return (
    <div className="p-4 space-y-6 max-w-md mx-auto">
      {/* Dashboard Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">ড্যাশবোর্ড</h1>
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          <span className="text-sm">৬</span>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-3 gap-3">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => onNavigate(feature.id)}
            className={`${feature.color} rounded-xl p-4 text-center transition-transform hover:scale-105 active:scale-95`}
          >
            <div className="text-2xl mb-2">{feature.icon}</div>
            <div className="text-sm font-medium">{feature.title}</div>
          </button>
        ))}
      </div>

      {/* Leaderboard Section */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">লিডারবোর্ড</h2>
          <span className="text-sm text-gray-500">আজকে নতুন</span>
          <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="space-y-3">
          {leaderboardData.map((user, index) => (
            <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
              user.isMe ? 'bg-green-100 dark:bg-green-900 border-2 border-green-500' : 'bg-white dark:bg-gray-800'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-sm">{user.avatar}</span>
                </div>
                <div>
                  <div className="font-medium text-sm">{user.name}</div>
                  {user.subtitle && (
                    <div className="text-xs text-gray-500">{user.subtitle}</div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">{user.rank}</div>
                <div className="text-xs text-gray-500">{user.points}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Reports */}
      <div>
        <h2 className="font-bold text-lg mb-4">কোর্সের রিপোর্ট</h2>
        <div className="space-y-3">
          {reports.map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
              <span className="font-medium">{report.title}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-green-600">{report.progress}%</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
