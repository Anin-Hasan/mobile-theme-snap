import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Dashboard } from '../components/Dashboard';
import { Quiz } from '../components/Quiz';
import { Profile } from '../components/Profile';
import { Login } from '../components/Login';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const mockUser = {
    name: 'Rakib Hassan',
    email: 'rakibhassan552@gmail.com',
    batch: 'Batch: HSC_24'
  };

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  const handleLogin = (phoneNumber: string) => {
    console.log('Logged in with:', phoneNumber);
    setIsLoggedIn(true);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'exam':
      case 'quiz':
        return <Quiz onBack={() => setCurrentPage('dashboard')} />;
      case 'profile':
        return <Profile user={mockUser} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex flex-col h-screen">
        {/* Header */}
        <Header 
          onMenuClick={handleMenuClick}
          isDark={isDark}
          onThemeToggle={toggleTheme}
          user={mockUser}
        />

        {/* Sidebar - appears below header when open */}
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={handleSidebarClose}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Quick Action Button */}
      <button
        onClick={() => setCurrentPage('profile')}
        className="fixed bottom-4 right-4 w-12 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 md:hidden"
      >
        <span className="text-lg">👤</span>
      </button>
    </div>
  );
};

export default Index;
