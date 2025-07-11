
import React from 'react';
import { ArrowLeft, Clock, Users, BookOpen, Calculator, Microscope, Globe } from 'lucide-react';

interface ExamSelectionProps {
  onBack: () => void;
  onSelectExam: (examType: string) => void;
}

export const ExamSelection: React.FC<ExamSelectionProps> = ({ onBack, onSelectExam }) => {
  const examTypes = [
    {
      id: 'math',
      title: 'গণিত পরীক্ষা',
      description: 'মধ্যমিক ও উচ্চমাধ্যমিক গণিত',
      icon: Calculator,
      questions: 50,
      duration: 60,
      color: 'bg-blue-100 dark:bg-blue-900',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 'science',
      title: 'বিজ্ঞান পরীক্ষা',
      description: 'পদার্থ, রসায়ন ও জীববিজ্ঞান',
      icon: Microscope,
      questions: 40,
      duration: 45,
      color: 'bg-green-100 dark:bg-green-900',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      id: 'general',
      title: 'সাধারণ জ্ঞান',
      description: 'বাংলাদেশ ও আন্তর্জাতিক বিষয়াবলী',
      icon: Globe,
      questions: 60,
      duration: 45,
      color: 'bg-purple-100 dark:bg-purple-900',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      id: 'bangla',
      title: 'বাংলা সাহিত্য',
      description: 'ব্যাকরণ ও সাহিত্য',
      icon: BookOpen,
      questions: 35,
      duration: 40,
      color: 'bg-orange-100 dark:bg-orange-900',
      iconColor: 'text-orange-600 dark:text-orange-400'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <button onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="w-5 h-5" />
          <span>পরীক্ষা নির্বাচন</span>
        </button>
        <span className="text-sm text-green-600">৪২ জন অনলাইন</span>
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">পরীক্ষার ধরন নির্বাচন করুন</h1>
          <p className="text-gray-600 dark:text-gray-400">আপনার পছন্দের বিষয়ে পরীক্ষা দিন</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-semibold">১,২৩৪</div>
                <div className="text-xs text-gray-500">মোট অংশগ্রহণকারী</div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-semibold">৪২</div>
                <div className="text-xs text-gray-500">অনলাইন এখন</div>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {examTypes.map((exam) => (
            <div key={exam.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${exam.color}`}>
                  <exam.icon className={`w-6 h-6 ${exam.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{exam.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{exam.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span>{exam.questions} প্রশ্ন</span>
                    <span>•</span>
                    <span>{exam.duration} মিনিট</span>
                  </div>

                  <button
                    onClick={() => onSelectExam(exam.id)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    পরীক্ষা শুরু করুন
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Exams */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">সাম্প্রতিক পরীক্ষা</h2>
          <div className="space-y-3">
            {[
              { subject: 'গণিত', score: '৮৫%', date: '২ দিন আগে', status: 'সম্পন্ন' },
              { subject: 'বিজ্ঞান', score: '৭২%', date: '৫ দিন আগে', status: 'সম্পন্ন' },
              { subject: 'সাধারণ জ্ঞান', score: '৯১%', date: '১ সপ্তাহ আগে', status: 'সম্পন্ন' }
            ].map((exam, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{exam.subject}</div>
                  <div className="text-sm text-gray-500">{exam.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">{exam.score}</div>
                  <div className="text-xs text-gray-500">{exam.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
