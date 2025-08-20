
import React from 'react';
import { X, Menu, Home, BookOpen, Zap, MessageSquare, Award, BarChart3, HelpCircle, User } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentPage, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: Home },
    { id: 'book-review', label: 'বই পর্যালোচনা', icon: BookOpen },
    { id: 'mock-exam', label: 'মক পরীক্ষা', icon: Zap },
    { id: 'chatbot', label: 'চ্যাটবট', icon: MessageSquare },
    { id: 'job-prep', label: 'চাকরি', icon: Award },
    { id: 'exam', label: 'পরীক্ষা', icon: BarChart3 },
    { id: 'leaderboard', label: 'লিডারবোর্ড', icon: BarChart3 },
    { id: 'contact', label: 'যোগাযোগ', icon: HelpCircle },
  ];

  const handleItemClick = (pageId: string) => {
    onNavigate(pageId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile: Dropdown below header */}
      <div className="lg:hidden w-full bg-background border-b shadow-sm">
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                currentPage === item.id 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Desktop: Slide from side */}
      <div className="hidden lg:block">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
        
        {/* Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-background border-r transform transition-transform duration-300 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">শীর্ষ</span>
              </div>
              <span className="font-semibold text-lg">শীর্ষ</span>
            </div>
            <button onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                  currentPage === item.id 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};
