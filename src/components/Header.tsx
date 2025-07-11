
import React from 'react';
import { Menu, Sun, Moon, Bell, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
  user?: {
    name: string;
    batch: string;
  };
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, isDark, onThemeToggle, user }) => {
  return (
    <header className="bg-background border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center space-x-3">
        <button onClick={onMenuClick} className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">চট</span>
          </div>
          <span className="font-semibold text-lg hidden sm:block">চট</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button onClick={onThemeToggle} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        {user && (
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-gray-500">{user.batch}</div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
