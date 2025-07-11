
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
    { id: 'brand-promotion', label: 'ব্র্যান্ড প্রমোশন', icon: Zap },
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
    <div className="w-full bg-background border-b shadow-sm">
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
  );
};
