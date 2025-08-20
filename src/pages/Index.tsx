import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Dashboard } from '../components/Dashboard';
import { Profile } from '../components/Profile';
import { Login } from '../components/Login';
import { ExamSelection } from '../components/ExamSelection';
import { Quiz } from '../components/Quiz';
import { MockExamResult } from '../components/MockExamResult';
import * as api from '../api/user';


const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true for dev, false for prod

  // State for the mock exam flow
  const [examQuestions, setExamQuestions] = useState<api.Question[]>([]);
  const [examOptions, setExamOptions] = useState<api.ExamSetupOptions | null>(null);
  const [examResult, setExamResult] = useState<api.ExamResult | null>(null);

  const mockUser = {
    name: 'Rakib Hassan',
    email: 'rakibhassan552@gmail.com',
    batch: 'Batch: HSC_24'
  };

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
  
  const resetExamState = () => {
    setExamQuestions([]);
    setExamOptions(null);
    setExamResult(null);
  };

  const handleLogin = (phoneNumber: string) => {
    console.log('Logged in with:', phoneNumber);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    if (page !== 'quiz' && page !== 'exam-result') {
        resetExamState();
    }
    setCurrentPage(page);
  };

  const handleStartExam = (questions: api.Question[], options: api.ExamSetupOptions) => {
    setExamQuestions(questions);
    setExamOptions(options);
    setCurrentPage('quiz');
  };
  
  const handleSubmitExam = (result: api.ExamResult) => {
    setExamResult(result);
    setExamQuestions([]);
    setExamOptions(null);
    setCurrentPage('exam-result');
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      // The "mock-exam" value is used by Dashboard/Sidebar buttons
      case 'mock-exam':
        return <ExamSelection onBack={() => handleNavigate('dashboard')} onStartExam={handleStartExam} />;
      case 'quiz':
        if (examQuestions.length > 0 && examOptions) {
          return <Quiz questions={examQuestions} options={examOptions} onSubmit={handleSubmitExam} onBack={() => handleNavigate('mock-exam')} />;
        }
        // Fallback if state is lost (e.g., page refresh)
        handleNavigate('dashboard');
        return null;
      case 'exam-result':
        if (examResult) {
          return <MockExamResult examResult={examResult} onBack={() => handleNavigate('dashboard')} />;
        }
        handleNavigate('dashboard');
        return null;
      case 'profile':
        return <Profile user={mockUser} />;
      default:
        // Handle cases like 'book-review', 'chatbot' from sidebar
        // For now, they all go to the dashboard.
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex flex-col h-screen">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          isDark={isDark}
          onThemeToggle={toggleTheme}
          user={mockUser}
        />

        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentPage={currentPage}
          onNavigate={(page) => {
            handleNavigate(page);
            setSidebarOpen(false);
          }}
        />

        <main className="flex-1 overflow-auto">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};

export default Index;