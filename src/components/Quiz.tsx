
import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';

interface QuizProps {
  onBack: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ onBack }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeLeft, setTimeLeft] = useState(25);
  
  const question = {
    text: 'কেন কিভাবে পরীক্ষা দিতে চাও?',
    options: [
      '১ম বর্ষ',
      'কোইভাবে এর পরীক্ষা',
      'ফ্রি',
      'পরীক্ষা',
      'নিয়মিত পরীক্ষা দিবো',
      'জাতি, ধর্ম, ও অঞ্চল',
      'আমার এর পরীক্ষা',
      'পড়ালেখা সহ্যায়ক বই',
      'পড়ালেখা শহীদ',
      'পরীক্ষা',
      'আমার গেট ও গার্লস পরীক্ষা',
      '২য় বর্ষ',
      'প্রকল্প বিতরণ'
    ]
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    // Handle answer submission
    console.log('Selected answer:', selectedAnswer);
  };

  const handleNext = () => {
    // Move to next question or finish
    setCurrentQuestion(prev => prev + 1);
    setSelectedAnswer('');
    setTimeLeft(25);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <button onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="w-5 h-5" />
          <span>কেন কিভাবে পরীক্ষা দিতে চাও?</span>
        </button>
        <span className="text-sm text-green-600">৩৮ জন অনলাইন</span>
      </div>

      <div className="p-4 max-w-md mx-auto space-y-6">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: '10%' }}></div>
        </div>

        {/* Question */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">{question.text}</h2>
          
          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="w-4 h-4 text-green-600"
                />
                <span className="text-sm">{option}</span>
                {option.includes('৩৯৯') && (
                  <span className="text-xs text-gray-500 ml-auto">৩৯৯ টি প্রশ্ন</span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center justify-center space-x-2 text-sm">
          <Clock className="w-4 h-4" />
          <span>প্রয় সময়ঃ</span>
          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            {timeLeft}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium">
            প্রশ্নটি রিভিউ করো রাখুন
          </button>
          <button 
            onClick={selectedAnswer ? handleNext : handleSubmit}
            disabled={!selectedAnswer}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
          >
            পরবর্তী প্রশ্ন
          </button>
        </div>
      </div>
    </div>
  );
};
