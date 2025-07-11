
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';

interface MathExamProps {
  onBack: () => void;
}

export const MathExam: React.FC<MathExamProps> = ({ onBack }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  
  const questions = [
    {
      id: 1,
      question: 'নিচের কোন ম্যাট্রিক্স A এর জন্য A⁻¹ বিদ্যমান?',
      image: true,
      options: [
        '2  4  5\n7  8  9  হলে, A⁻¹ = ?\n3  6  12',
        '3  4  5\n7  8  9\n10 12 13',
        '-7  1  2\n18 -4 17\n-3  4  0',
        '-7  1  2\n18 -4 17\n-3  4  17',
        '-7  1  2\n18 -4 17\n-3  4  17'
      ]
    },
    {
      id: 2,
      question: '2x - y + z = 2, 2x + z = 5, x + 2y - 3z = -4 সমীকরণ জোট সমাধান কর।',
      options: [
        '(-1, -2, -3)',
        '(1, 2, 3)',
        '(-31, -17, 113)',
        '(-2, -4, -8)'
      ]
    },
    {
      id: 3,
      question: 'যে কোন ত্রিভুজ △ এর ক্ষেত্রফল △ এবং এই ত্রিভুজে অন্তর্লিখিত বৃত্তের ব্যাসার্ধ r হলে-',
      options: [
        '△ = (a+b+c)r/2',
        '△ = (a+b-c)r/2', 
        '△ = abcr/4',
        '△ = √s(s-a)(s-b)(s-c)'
      ]
    }
  ];

  const currentQ = questions[currentQuestion - 1];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer('');
    } else {
      // End exam
      onBack();
    }
  };

  const progress = (currentQuestion / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <button onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="w-5 h-5" />
          <span>গণিত পরীক্ষা</span>
        </button>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-green-600">৩৮ জন অনলাইন</span>
          <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4 text-red-600" />
            <span className="font-mono text-red-600">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>প্রশ্ন {currentQuestion} / {questions.length}</span>
            <span>{Math.round(progress)}% সম্পন্ন</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="mb-4">
            <span className="text-sm text-gray-500 mb-2 block">প্রশ্ন {currentQuestion}</span>
            <h2 className="text-lg font-semibold mb-4">{currentQ.question}</h2>
          </div>
          
          {/* Matrix Display for Question 1 */}
          {currentQuestion === 1 && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="font-mono text-center space-y-2">
                <div>A = [2  4  5 ]</div>
                <div>    [7  8  9 ]</div>
                <div>    [3  6  12]</div>
              </div>
            </div>
          )}
          
          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <label key={index} className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="w-4 h-4 text-green-600 mt-1"
                />
                <span className="text-sm whitespace-pre-wrap">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button 
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            disabled={currentQuestion === 1}
          >
            পূর্ববর্তী
          </button>
          
          <div className="text-sm text-gray-500">
            {selectedAnswer ? '✓ উত্তর নির্বাচিত' : 'একটি উত্তর নির্বাচন করুন'}
          </div>
          
          <button 
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            {currentQuestion === questions.length ? 'সমাপ্ত করুন' : 'পরবর্তী'}
          </button>
        </div>

        {/* Question Navigator */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <h3 className="font-medium mb-3">প্রশ্ন নেভিগেটর</h3>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index + 1)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  currentQuestion === index + 1
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
